import { NextRequest, NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";
import { forgotPasswordSchema } from "@/lib/validations/auth";

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
} from "@/lib/authToken";

import {
  FORGOT_PASSWORD_COOKIE,
  FORGOT_PASSWORD_VERIFICATION_MAX_AGE,
} from "@/lib/verifyForgotPassword";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

    const validationResult = forgotPasswordSchema.safeParse(body);

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

    const email = validationResult.data.email;

    // CARI USER

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email belum terdaftar di akun TerfourShop",
      });
    };

    // CARI PRA FORGOT PASSWORD

    const praForgotPassword = await prisma.praForgotPassword.findUnique({
      where: { user_id: user.id },
    });

    // CEK COOLDOWN OTP

    const remaining = getOTPResendCooldown(praForgotPassword?.last_otp_sent_at);

    if (remaining > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Silakan tunggu ${remaining} detik sebelum meminta OTP lagi.`,
          remainingSeconds: remaining,
        },
        { status: 429 }
      );
    };

    // GENERATE OTP

    const otp = generateOTP();
    const otpHash = await hashOTP(otp);

    // OTP EXPIRATION

    const otpExpiresAt = getOTPExpiration();
    const now = new Date();

    // GENERATE FORGOT TOKEN

    const forgotToken = generateAuthToken();
    const forgotTokenHash = hashAuthToken(forgotToken);
    const forgotTokenExpiresAt = getAuthTokenExpiration(FORGOT_PASSWORD_VERIFICATION_MAX_AGE);

    // UPSERT PRA FORGOT PASSWORD

    await prisma.praForgotPassword.upsert({
      where: { user_id: user.id },

      update: {
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiresAt,
        forgot_token: forgotTokenHash,
        forgot_token_expires_at: forgotTokenExpiresAt,
      },

      create: {
        id: uuidv7(),
        user_id: user.id,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiresAt,
        forgot_token: forgotTokenHash,
        forgot_token_expires_at: forgotTokenExpiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(user.email, otp);

    // RESPONSE

    const response = NextResponse.json({
      success: true,
      message: "Kode verifikasi telah dikirim ke email Anda.",
      otpExpiresAt: otpExpiresAt.getTime(),
      resendAvailableAt: now.getTime() + 60 * 1000,
    });

    // SET HTTP-ONLY COOKIE FORGOT

    response.cookies.set(FORGOT_PASSWORD_COOKIE, forgotToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: FORGOT_PASSWORD_VERIFICATION_MAX_AGE * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}