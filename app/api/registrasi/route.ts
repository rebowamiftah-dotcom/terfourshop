import { NextRequest, NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";
import { registrasiSchema } from "@/lib/validations/auth";

import {
  generateOTP,
  hashOTP,
  getOTPExpiration,
  getOTPResendCooldown,
} from "@/lib/otp";

import {
  generateAuthToken,
  hashAuthToken,
  getAuthTokenExpiration
} from "@/lib/authToken";

import {
  REGISTRASI_COOKIE,
  REGISTRASI_VERIFICATION_MAX_AGE
} from "@/lib/verifyRegistrasi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

    const validationResult = registrasiSchema.safeParse(body);

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

    const { email, password } = validationResult.data;
    const cleanEmail = email.toLowerCase();

    // CEK USER

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar.",
        },
        { status: 409 }
      );
    };

    // CARI PRA REGISTER

    const praRegister = await prisma.praRegister.findUnique({
      where: { email: cleanEmail },
    });

    // CEK COOLDOWN OTP

    const remaining = getOTPResendCooldown(praRegister?.last_otp_sent_at);

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

    // HASH PASSWORD
  
    const passwordHash = await bcrypt.hash(password, 12);

    // TOKEN VERIFIKASI

    const registrasiToken = generateAuthToken();   // Disimpan pd HTTP-only cookie
    const registrasiTokenHash =  hashAuthToken(registrasiToken);   // Disimpan di DB
    const registrasiTokenExpiresAt = getAuthTokenExpiration(REGISTRASI_VERIFICATION_MAX_AGE);   // Menit

    // OTP EXPIRATION

    const otpExpiredAt = getOTPExpiration();
    const now = new Date();

    // UPSERT PRA REGISTER

    await prisma.praRegister.upsert({
      where: { email: cleanEmail },
      
      update: {
        password: passwordHash,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiredAt,
        registrasi_token: registrasiTokenHash,
        registrasi_token_expires_at: registrasiTokenExpiresAt,
      },

      create: {
        id: uuidv7(),
        email: cleanEmail,
        password: passwordHash,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiredAt,
        registrasi_token: registrasiTokenHash,
        registrasi_token_expires_at: registrasiTokenExpiresAt,
      },
    });

    // KIRIM EMAIL OTP

    await sendVerificationOTP(cleanEmail, otp);

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "Kode OTP telah dikirim ke email Anda.",
    });

    // SET HTTPONLY COOKIE

    response.cookies.set(REGISTRASI_COOKIE, registrasiToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: REGISTRASI_VERIFICATION_MAX_AGE * 60,   // Menit
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Registrasi Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}