import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";

import {
  LOGIN_COOKIE,
  LOGIN_VERIFICATION_MAX_AGE,
} from "@/app/_lib/verifyLogin";

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

    const praLogin = await prisma.praLogin.findFirst({
      where: { login_token: tokenHash },
      include: { user: true },
    });

    if (!praLogin) {
      return NextResponse.json(
        {
          success: false,
          message: "Data login tidak ditemukan. Silakan melakukan login kembali.",
        },
        { status: 404 }
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

    // CEK COOLDOWN

    const remaining = getOTPResendCooldown(praLogin.last_otp_sent_at);

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
    const hashedOTP = await hashOTP(otp);
    const expiresAt = getOTPExpiration();
    const now = new Date();

    // GENERATE TOKEN LOGIN VERIFIKASI BARU

    const loginToken = generateAuthToken();
    const loginTokenHash = hashAuthToken(loginToken);
    const loginTokenExpiresAt = getAuthTokenExpiration(LOGIN_VERIFICATION_MAX_AGE);

    // UPDATE PRA LOGIN

    await prisma.praLogin.update({
      where: { id: praLogin.id },
      data: {
        otp: hashedOTP,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: expiresAt,
        login_token: loginTokenHash,
        login_token_expires_at: loginTokenExpiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(praLogin.user.email, otp);

    // RESPONSE

    const response = NextResponse.json({
      success: true,
      message: "Kode OTP baru telah dikirim ke email Anda.",
      otpExpiresAt: expiresAt.getTime(),
      resendAvailableAt: now.getTime() + 60 * 1000,
    });

    // UPDATE COOKIE DENGAN TOKEN BARU

    response.cookies.set(LOGIN_COOKIE, loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: LOGIN_VERIFICATION_MAX_AGE * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login Resend OTP Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}