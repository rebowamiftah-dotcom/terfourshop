import { NextRequest, NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";
import { loginSchema } from "@/lib/validations/auth";

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
  LOGIN_COOKIE,
  LOGIN_VERIFICATION_MAX_AGE,
} from "@/lib/verifyLogin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

    const validationResult = loginSchema.safeParse(body);

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

    const { identity, password } = validationResult.data;
    const cleanIdentity = identity.trim().toLowerCase();

    // TENTUKAN JENIS LOGIN

    const isUsernameLogin = cleanIdentity.startsWith("@");

    // JALUR 1 --> @USERNAME + PASSWORD

    if (isUsernameLogin) {
      // Hilangkan  @ dari Username
      const username = cleanIdentity.slice(1);

      if (!username) {
        return NextResponse.json(
          {
            success: false,
            message: "Username wajib diisi.",
          },
          { status: 400 }
        );
      };

      // CARI USER

      const user = await prisma.user.findUnique({
        where: { username },
        include: { roles: true },
      });

      if (!user?.password) {
        return NextResponse.json(
          {
            success: false,
            message: "Username atau password salah.",
          },
          { status: 401 }
        );
      };

      // CEK PASSWORD

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          {
            success: false,
            message: "Username atau password salah.",
          },
          { status: 401 }
        );
      };

      // LOGIN USERNAME BERHASIL

      return NextResponse.json({
        success: true,
        loginType: "username",
        message: "Login berhasil.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.roles.name,
        },
      });
    };

    // JALUR 2 --> EMAIL + PASSWORD + OTP

    // CARI USER

    const user = await prisma.user.findUnique({
      where: { email: cleanIdentity },
      include: { roles: true },
    });

    if (!user?.password || !user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah.",
        },
        { status: 401 }
      );
    };

    // CEK PASSWORD

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah.",
        },
        { status: 401 }
      );
    };

    // CARI PRA LOGIN

    const praLogin = await prisma.praLogin.findUnique({
      where: { user_id: user.id },
    });

    // CEK COOLDOWN OTP

    const remaining = getOTPResendCooldown(praLogin?.last_otp_sent_at);

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

    // GENERATE TOKEN LOGIN

    const loginToken = generateAuthToken();   // Disimpan pd HTTP-only cookie
    const loginTokenHash = hashAuthToken(loginToken);   // Disimpan di DB
    const loginTokenExpiresAt = getAuthTokenExpiration(LOGIN_VERIFICATION_MAX_AGE);

    // UPSERT PRA LOGIN

    await prisma.praLogin.upsert({
      where: { user_id: user.id },

      update: {
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiresAt,
        login_token: loginTokenHash,
        login_token_expires_at: loginTokenExpiresAt,
      },

      create: {
        id: uuidv7(),
        user_id: user.id,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiresAt,
        login_token: loginTokenHash,
        login_token_expires_at: loginTokenExpiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(user.email, otp);

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      loginType: "email",
      message: "Kode OTP telah dikirim ke email Anda.",
    });

    // SET HTTPONLY COOKIE

    response.cookies.set(LOGIN_COOKIE, loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: LOGIN_VERIFICATION_MAX_AGE * 60,   // Menit
      path: "/",
    });

    return response;
    
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}