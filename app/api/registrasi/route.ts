import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";
import {
  generateOTP,
  hashOTP,
  getOTPExpiration,
  getOTPResendCooldown,
} from "@/lib/otp";
import { registrasiSchema } from "@/lib/validations/auth";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI

    const validationResult = registrasiSchema.safeParse(body);

    if (!validationResult.success) {
      // Mengambil pesan error pertama dari Zod
      const firstError = validationResult.error.issues[0]?.message ?? "Input tidak valid.";

      return NextResponse.json(
        {
          success: false,
          message: firstError,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

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
    }

    // CEK PRA REGISTER & COOLDOWN OTP

    const praRegister = await prisma.praRegister.findUnique({
      where: { email: cleanEmail },
    });

    const remainingCooldown = getOTPResendCooldown(praRegister?.last_otp_sent_at);

    if (remainingCooldown > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Silakan tunggu ${remainingCooldown} detik sebelum meminta OTP lagi.`,
        },
        { status: 429 }
      );
    }

    // GENERATE OTP & HASH PASSWORD

    const otp = generateOTP();
    const otpHash = await hashOTP(otp);
    const passwordHash = await bcrypt.hash(password, 12);
    const otpExpiredAt = getOTPExpiration();
    const now = new Date();

    // BUAT / UPDATE PRA REGISTER

    await prisma.praRegister.upsert({
      where: { email: cleanEmail },
      update: {
        password: passwordHash,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiredAt,
      },
      create: {
        id: uuidv7(),
        email: cleanEmail,
        password: passwordHash,
        otp: otpHash,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: otpExpiredAt,
      },
    });

    // KIRIM EMAIL OTP
    await sendVerificationOTP(cleanEmail, otp);

    // RESPONSE SUKSES
    return NextResponse.json({
      success: true,
      message: "Kode OTP telah dikirim ke email Anda.",
    });

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