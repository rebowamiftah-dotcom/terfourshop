import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendVerificationOTP } from "@/app/lib/mailer";
import { generateOTP, getOTPExpiration, getOTPResendCooldown, hashOTP } from "@/app/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();

    // VALIDASI EMAIL

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email wajib diisi.",
        },
        { status: 400 }
      );
    }

    // CARI PRA REGISTER

    const praRegister = await prisma.praRegister.findUnique({
      where: { email }
    });

    if (!praRegister) {
      return NextResponse.json(
        {
          success: false,
          message: "Data registrasi tidak ditemukan. Silakan melakukan registrasi kembali.",
        },
        { status: 404 }
      );
    }

    // CEK COOLDOWN

    const remaining = getOTPResendCooldown(
      praRegister?.last_otp_sent_at
    )

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

    // UPDATE PRA REGISTER

    const now = new Date();

    await prisma.praRegister.update({
      where: { email },

      data: {
        otp: hashedOTP,
        otp_attempts: 0,
        last_otp_sent_at: now,
        expires_at: expiresAt,
      },
    });

    // KIRIM EMAIL

    await sendVerificationOTP(email, otp);

    // RESPONSE

    return NextResponse.json({
      success: true,
      message: "Kode OTP baru telah dikirim ke email Anda.",
      expiresIn: 300,
    });

  } catch (error) {
    console.error( "Resend OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.",
      },
      { status: 500 }
    );
  };
};