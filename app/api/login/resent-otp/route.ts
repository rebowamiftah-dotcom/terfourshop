import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationOTP } from "@/lib/mailer";
import {
  generateOTP,
  hashOTP,
  getOTPExpiration,
  getOTPResendCooldown,
} from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();

    // VALIDASI

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email wajib diisi.",
        },
        { status: 400 }
      );
    };

    // CARI USER

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Akun tidak ditemukan.",
        },
        { status: 404 }
      );
    };

    // CARI PRA LOGIN

    const praLogin = await prisma.praLogin.findUnique({
      where: { user_id: user.id }
    });

    if (!praLogin) {
      return NextResponse.json(
        {
          success: false,
          message: "Data login tidak ditemukan. Silakan melakukan login kembali.",
        },
        { status: 404 }
      );
    }

    // CEK COOLDOWN

    const remaining = getOTPResendCooldown(
      praLogin.last_otp_sent_at
    );

    if (remaining > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Silakan tunggu ${remaining} detik sebelum meminta OTP baru.`,
          remainingSeconds: remaining,
        },
        { status: 429 }
      );
    }

    // GENERATE OTP BARU

    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);
    const expiresAt = getOTPExpiration();
    
    // UPDATE PRA LOGIN

    const now = new Date();

    await prisma.praLogin.update({
      where: { id: praLogin.id },

      data: {
        otp: hashedOTP,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: expiresAt,
      },
    });

    // KIRIM OTP

    await sendVerificationOTP(email, otp);

    // RESPONSE

    return NextResponse.json({
      success: true,
      message: "Kode OTP baru telah dikirim ke email Anda.",
      expiresIn: 300,
    });

  } catch (error) {
    console.error("Login Resend OTP Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}