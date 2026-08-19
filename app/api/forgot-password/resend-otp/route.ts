import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";

import {
  FORGOT_PASSWORD_COOKIE,
  FORGOT_PASSWORD_VERIFICATION_MAX_AGE,
} from "@/lib/verifyForgotPassword";

import {
  generateOTP,
  hashOTP,
  getOTPExpiration,
  getOTPResendCooldown,
} from "@/lib/otp";

import {
  generateAuthToken,
  hashAuthToken,
  getAuthTokenExpiration,
  isAuthTokenExpired,
} from "@/lib/authToken";

export async function POST() {
  try {
    // AMBIL COOKIE

    const cookieStore = await cookies();

    const token = cookieStore.get(FORGOT_PASSWORD_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi pemulihan password tidak ditemukan. Silakan ulangi Forgot Password.",
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
          },
        },
      },
    });

    if (!praForgotPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi pemulihan password tidak valid. Silakan ulangi Forgot Password.",
        },
        { status: 401 }
      );
    };

    // CEK TOKEN EXPIRED

    if (isAuthTokenExpired(praForgotPassword.forgot_token_expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi pemulihan password telah kedaluwarsa. Silakan ulangi Forgot Password.",
        },
        { status: 401 }
      );
    };

    // CEK COOLDOWN OTP

    const remaining = getOTPResendCooldown(praForgotPassword.last_otp_sent_at);

    if (remaining > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Silakan tunggu ${remaining} detik sebelum meminta OTP baru.`,
          remainingSeconds: remaining,
        },
        { status: 429 }
      );
    };

    // GENERATE OTP BARU

    const otp = generateOTP();
    const otpHash = await hashOTP(otp);
    const otpExpiresAt = getOTPExpiration();
    const now = new Date();

    // GENERATE FORGOT TOKEN BARU

    const forgotToken = generateAuthToken();
    const forgotTokenHash = hashAuthToken(forgotToken);
    const forgotTokenExpiresAt = getAuthTokenExpiration(FORGOT_PASSWORD_VERIFICATION_MAX_AGE);

    // UPDATE PRA FORGOT PASSWORD

    await prisma.praForgotPassword.update({
      where: { id: praForgotPassword.id },
      data: {
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiresAt,
        forgot_token: forgotTokenHash,
        forgot_token_expires_at: forgotTokenExpiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(praForgotPassword.user.email,otp);

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "Kode OTP baru telah dikirim ke email Anda.",
      otpExpiresAt: otpExpiresAt.getTime(),
      resendAvailableAt: now.getTime() + 60 * 1000,
    });

    // PERBARUI COOKIE FORGOT

    response.cookies.set(FORGOT_PASSWORD_COOKIE, forgotToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: FORGOT_PASSWORD_VERIFICATION_MAX_AGE * 60,   // Menit
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Forgot Password Resend OTP Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengirim ulang OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}