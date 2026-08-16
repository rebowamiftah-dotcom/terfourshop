import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUsername } from "@/lib/utils";
import { getOTPExpired, verifyOTP } from "@/lib/otp";
import { verifyOTPSchema } from "@/lib/validations/auth";
import { v7 as uuidv7 } from "uuid";

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

    const validationResult = verifyOTPSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message ?? "Input tidak valid.";

      return NextResponse.json(
        {
          success: false,
          message: firstError,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    };

    const { email, otp } = validationResult.data;
    const cleanEmail = email.toLowerCase();
    const cleanOtp = otp.trim();

    // CARI PRA REGISTER

    const praRegister = await prisma.praRegister.findUnique({
      where: { email: cleanEmail },
    });

    if (!praRegister) {
      return NextResponse.json(
        {
          success: false,
          message: "Data registrasi tidak ditemukan.",
        },
        { status: 404 }
      );
    };

    // CEK EXPIRED

    if (getOTPExpired(praRegister.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP sudah kedaluwarsa.",
        },
        { status: 400 }
      );
    };

    // CEK BATAS PERCOBAAN

    if (praRegister.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    };

    // VERIFIKASI OTP HASH
    const isValidOTP = await verifyOTP(cleanOtp, praRegister.otp);

    if (!isValidOTP) {
      const newAttempts = praRegister.otp_attempts + 1;

      await prisma.praRegister.update({
        where: { email: cleanEmail },
        data: { otp_attempts: newAttempts },
      });

      const remainingAttempts = MAX_OTP_ATTEMPTS - newAttempts;

      return NextResponse.json(
        {
          success: false,
          message:
            remainingAttempts > 0
              ? `Kode OTP tidak valid. Sisa percobaan: ${remainingAttempts}.`
              : "Kode OTP tidak valid. Batas percobaan telah tercapai. Silakan meminta kode OTP baru.",
        },
        { status: 400 }
      );
    };

    // GENERATE USERNAME UNIK
    let username = generateUsername(cleanEmail);

    while (await prisma.user.findUnique({ where: { username } })) {
      username = generateUsername(cleanEmail);
    }

    // PRISMA TRANSACTION (CREATE USER & PROFILES, DELETE PRA_REGISTER)
    const user = await prisma.$transaction(async (tx) => {
      const customerRole = await tx.role.findUnique({
        where: { name: "CUSTOMER" },
      });

      if (!customerRole) {
        throw new Error("Role CUSTOMER tidak ditemukan.");
      }

      const newUser = await tx.user.create({
        data: {
          id: uuidv7(),
          username,
          email: cleanEmail,
          password: praRegister.password,
          role_id: customerRole.id,
        },
      });

      await tx.profile.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      await tx.cart.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      await tx.address.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      await tx.praRegister.delete({
        where: { email: cleanEmail },
      });

      return newUser;
    });

    // RESPONSE SUKSES
    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil. Silakan login.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat memverifikasi OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}