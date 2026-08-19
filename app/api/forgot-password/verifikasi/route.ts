import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyOTPSchema } from "@/lib/validations/auth";
import { getOTPExpired, verifyOTP } from "@/lib/otp";
import { FORGOT_PASSWORD_COOKIE } from "@/lib/verifyForgotPassword";

import {
  generateAuthToken,
  hashAuthToken,
  getAuthTokenExpiration,
  isAuthTokenExpired,
} from "@/lib/authToken";

import {
  RESET_PASSWORD_COOKIE,
  RESET_PASSWORD_VERIFICATION_MAX_AGE,
} from "@/lib/verifyResetPassword";

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

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

    const token = cookieStore.get(FORGOT_PASSWORD_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi tidak ditemukan. Silakan meminta reset password kembali.",
        },
        { status: 401 }
      );
    };

    // HASH TOKEN

    const tokenHash = hashAuthToken(token);

    // CARI PRA FORGOT PASSWORD

    const praForgotPassword = await prisma.praForgotPassword.findUnique({
      where: { forgot_token: tokenHash },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    if (!praForgotPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi tidak valid. Silakan meminta reset password kembali.",
        },
        { status: 401 }
      );
    };

    // CEK TOKEN EXPIRED

    if (isAuthTokenExpired(praForgotPassword.forgot_token_expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi verifikasi telah kedaluwarsa. Silakan meminta reset password kembali.",
        },
        { status: 401 }
      );
    };

    // CEK OTP EXPIRED

    if (getOTPExpired(praForgotPassword.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP sudah kedaluwarsa. Silakan meminta OTP baru.",
        },
        { status: 400 }
      );
    };

    // CEK MAX ATTEMPTS

    if (praForgotPassword.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    };

    // VERIFIKASI OTP

    const isValidOTP = await verifyOTP(cleanOtp, praForgotPassword.otp);

    if (!isValidOTP) {
      const newAttempts = praForgotPassword.otp_attempts + 1;

      await prisma.praForgotPassword.update({
        where: { user_id: praForgotPassword.user_id },
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

    // GENERATE TOKEN RESET

    const resetToken = generateAuthToken();
    const resetTokenHash = hashAuthToken(resetToken);
    const resetTokenExpiresAt = getAuthTokenExpiration(RESET_PASSWORD_VERIFICATION_MAX_AGE);

    // UPDATE PRA FORGOT PASSWORD DGN RESET TOKEN

    await prisma.praForgotPassword.update({
      where: { user_id: praForgotPassword.user_id },
      data: {
        reset_token: resetTokenHash,
        reset_token_expires_at: resetTokenExpiresAt,
        otp_attempts: 0,
        expires_at: new Date(0),
      },
    });

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "OTP berhasil diverifikasi.",
      user: {
        id: praForgotPassword.user.id,
        email: praForgotPassword.user.email,
        username: praForgotPassword.user.username,
      },
    });

    // HAPUS COOKIE FORGOT

    response.cookies.delete(FORGOT_PASSWORD_COOKIE);

    // SET HTTPONLY COOKIE RESET

    response.cookies.set(RESET_PASSWORD_COOKIE, resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: RESET_PASSWORD_VERIFICATION_MAX_AGE * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Forgot password OTP verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memverifikasi OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}