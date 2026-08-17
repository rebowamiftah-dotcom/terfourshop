import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { getOTPExpired, verifyOTP } from "@/lib/otp";
import { verifyOTPSchema } from "@/lib/validations/auth";

import {
  generateAuthToken,
  hashAuthToken,
  getAuthTokenExpiration,
  isAuthTokenExpired
} from "@/lib/authToken";

import {
  LOGIN_COOKIE,
  LOGIN_VERIFICATION_MAX_AGE,
} from "@/app/_lib/verifyLogin";

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

    // AMBIL COOKIE LOGIN

    const cookieStore = await cookies();

    const token = cookieStore.get(LOGIN_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi tidak ditemukan. Silakan melakukan login kembali.",
        },
        { status: 401 }
      );
    };

    // HASH TOKEN

    const tokenHash = hashAuthToken(token);

    // CARI PRA LOGIN

    const praLogin = await prisma.praLogin.findUnique({
      where: { login_token: tokenHash },
      include: {
        user: {
          include: { roles: true },
        },
      },
    });

    if (!praLogin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Sesi verifikasi tidak valid. Silakan melakukan login kembali.",
        },
        { status: 401 }
      );
    };

    // CEK TOKEN EXPIRED

    if (isAuthTokenExpired(praLogin.login_token_expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi telah kedaluwarsa. Silakan melakukan login kembali.",
        },
        { status: 401 }
      );
    };

    // CEK OTP EXPIRED

    if (getOTPExpired(praLogin.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP sudah kedaluwarsa. Silakan meminta OTP baru.",
        },
        { status: 400 }
      );
    };

    // CEK ATTEMPTS

    if (praLogin.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    };

    // VERIFIKASI OTP

    const isValidOTP = await verifyOTP(cleanOtp, praLogin.otp);

    if (!isValidOTP) {
      const newAttempts = praLogin.otp_attempts + 1;

      await prisma.praLogin.update({
        where: { user_id: praLogin.user_id},
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
    }

    // BUAT LOGIN TOKEN

    const verifiedLoginToken = generateAuthToken();
    const verifiedLoginTokenHash = hashAuthToken(verifiedLoginToken);
    const verifiedLoginTokenExpiresAt = getAuthTokenExpiration(LOGIN_VERIFICATION_MAX_AGE);

    // UPDATE PRA LOGIN

    await prisma.praLogin.update({
      where: {
        user_id: praLogin.user_id,
      },
      data: {
        login_token: verifiedLoginTokenHash,
        login_token_expires_at: verifiedLoginTokenExpiresAt,
        expires_at: new Date(0),
        otp_attempts: 0,
      },
    });

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "OTP berhasil diverifikasi.",
      loginToken: verifiedLoginToken,
      user: {
        id: praLogin.user.id,
        username: praLogin.user.username,
        email: praLogin.user.email,
        role: praLogin.user.roles.name,
      },
    });

    // HAPUS COOKIE

    response.cookies.delete(LOGIN_COOKIE);

    return response;

  } catch (error) {
    console.error("Login OTP verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memverifikasi OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}