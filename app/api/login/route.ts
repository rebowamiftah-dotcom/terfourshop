import { NextRequest, NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";

import { prisma } from "@/app/lib/prisma";
import { sendVerificationOTP } from "@/app/lib/mailer";
import {
  generateOTP,
  hashOTP,
  getOTPExpiration,
  getOTPResendCooldown
} from "@/app/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const login = body.login?.trim().toLowerCase();   // Bisa berupa Username / Email
    const password = body.password;

    // VALIDASI 

    if (!login || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/username dan password wajib diisi.",
        },
        { status: 400 }
      );
    };

    // CARI USER

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: login },
          { username: login },
        ],
      },
    });

    if (!user?.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/username atau password salah.",
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
          message: "Email/username atau password salah.",
        },
        { status: 401 }
      );
    };

    // CEK COOLDOWN OTP

    const praLogin = await prisma.praLogin.findUnique({
      where: { user_id: user.id }
    });

    const remaining = getOTPResendCooldown(
      praLogin?.last_otp_sent_at
    );

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
    const expiresAt = getOTPExpiration();

    // SIMPAN OTP LOGIN

    const now = new Date();

    await prisma.praLogin.upsert({
      where: { user_id: user.id },

      update: {
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: expiresAt,
      },

      create: {
        id: uuidv7(),
        user_id: user.id,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: expiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(user.email, otp);

    // RESPONSE

    return NextResponse.json({
      success: true,
      message: "Kode OTP telah dikirim ke email Anda.",
      expiresIn: 300,
    });

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