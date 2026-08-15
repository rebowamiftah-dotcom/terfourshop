import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { generateUsername } from "@/app/lib/utils";
import { getOTPExpired, verifyOTP } from "@/app/lib/otp";
import { v7 as uuidv7 } from "uuid";

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const otp = body.otp?.trim();

    // VALIDASI

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan OTP wajib diisi.",
        },
        { status: 400 },
      );
    };

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP harus terdiri dari 6 digit.",
        },
        { status: 400 },
      );
    };

    // CARI PENDING REGISTRATION

    const praRegister = await prisma.praRegister.findUnique({
      where: { email, },
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
        { status: 400 },
      );
    };

    // CEK BATAS PERCOBAAN

    if (praRegister.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    };

    // OTP SALAH

    const isValidOTP = await verifyOTP(otp, praRegister.otp);

    if (!isValidOTP) {
      const newAttempts = praRegister.otp_attempts + 1;

      await prisma.praRegister.update({
        where: { email },
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

    // OTP BENAR

    // GENERATE USERNAME

    let username = generateUsername(email);

    while (
      await prisma.user.findUnique({
        where: { username },
      })
    ) {
      username = generateUsername(email);
    };

    // TRANSACTION

    const user = await prisma.$transaction(async (tx) => {
      // CARI ROLE CUSTOMER

      const customerRole = await tx.role.findUnique({
        where: { name: "CUSTOMER", },
      });

      if (!customerRole) {
        throw new Error("Role CUSTOMER tidak ditemukan.");
      };

      // BUAT USER

      const newUser = await tx.user.create({
        data: {
          id: uuidv7(),
          username,
          email,
          password: praRegister.password,
          role_id: customerRole.id,
        },
      });

      // BUAT PROFILE

      await tx.profile.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      // BUAT CART

      await tx.cart.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      // BUAT ADDRESS

      await tx.address.create({
        data: {
          id: uuidv7(),
          user_id: newUser.id,
        },
      });

      // HAPUS PENDING REGISTRATION

      await tx.praRegister.delete({
        where: { email }
      });

      return newUser;
    });

    // BERHASIL

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