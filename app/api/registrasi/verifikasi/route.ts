import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v7 as uuidv7 } from "uuid";

import { prisma } from "@/lib/prisma";
import { generateUsername } from "@/lib/utils";
import { verifyOTPSchema } from "@/lib/validations/auth";
import { REGISTRASI_COOKIE } from "@/app/_lib/verifyRegistrasi";
import { getOTPExpired, verifyOTP } from "@/lib/otp";
import { hashAuthToken, isAuthTokenExpired } from "@/lib/authToken";

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI OTP

    const validationResult = verifyOTPSchema.safeParse({ otp: body.otp });

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

    const cleanOtp = validationResult.data.otp.trim();

    // AMBIL COOKIE

    const cookieStore = await cookies();

    const token = cookieStore.get(REGISTRASI_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi tidak ditemukan. Silakan melakukan registrasi kembali.",
        },
        { status: 401 }
      );
    };

    // HASH TOKEN

    const tokenHash = hashAuthToken(token);

    // CARI PRA REGISTER

    const praRegister = await prisma.praRegister.findFirst({
      where: { registrasi_token: tokenHash },
    });

    if (!praRegister) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi tidak valid. Silakan melakukan registrasi kembali.",
        },
        { status: 401 }
      );
    }

    // CEK TOKEN EXPIRED

    if (isAuthTokenExpired(praRegister.registrasi_token_expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi telah kedaluwarsa. Silakan melakukan registrasi kembali.",
        },
        { status: 401 }
      );
    };

    // CEK OTP EXPIRED

    if (getOTPExpired(praRegister.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP sudah kedaluwarsa. Silakan meminta OTP baru.",
        },
        { status: 400 }
      );
    };

    // CEK ATTEMPTS

    if (praRegister.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    }

    // VERIFIKASI OTP

    const isValidOTP = await verifyOTP(cleanOtp, praRegister.otp);

    if (!isValidOTP) {
      const newAttempts = praRegister.otp_attempts + 1;

      await prisma.praRegister.update({
        where: { email: praRegister.email },
        data: { otp_attempts: newAttempts },
      });

      const remainingAttempts = MAX_OTP_ATTEMPTS - newAttempts;

      return NextResponse.json(
        {
          success: false,
          message:
            remainingAttempts > 0
              ? `Kode OTP tidak valid. Sisa percobaan: ${remainingAttempts}.`
              : "Kode OTP tidak valid. Batas percobaan telah tercapai. Silakan meminta OTP baru.",
        },
        { status: remainingAttempts > 0 ? 400 : 429 }
      );
    };

    // GENERATE USERNAME

    let username = generateUsername(praRegister.email);

    while (await prisma.user.findUnique({ where: { username } })) {
      username = generateUsername(praRegister.email);
    };

    // TRANSACTION

    const user = await prisma.$transaction(async (tx) => {
      const customerRole = await tx.role.findUnique({
        where: { name: "CUSTOMER" }
      });

      if (!customerRole) {
        throw new Error("Role CUSTOMER tidak ditemukan.");
      };

      const newUser = await tx.user.create({
        data: {
          id: uuidv7(),
          username,
          email: praRegister.email,
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
        where: { email: praRegister.email }
      });

      return newUser;
    });

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "Registrasi berhasil. Silakan login.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    // HAPUS COOKIE

    response.cookies.delete(REGISTRASI_COOKIE);

    return response;

  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memverifikasi OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}