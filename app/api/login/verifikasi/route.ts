import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOTPExpired, verifyOTP } from "@/lib/otp";
import {
  generateLoginToken,
  hashLoginToken,
  getLoginTokenExpiration,
} from "@/lib/loginToken";

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const otp = body.otp?.trim();

    // VALIDASI

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan OTP wajib diisi.",
        },
        { status: 400 }
      );
    };

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP harus terdiri dari 6 digit.",
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

    const praLogin = await prisma.praLogin.findUnique({
      where: { user_id: user.id }
    });

    if (!praLogin) {
      return NextResponse.json(
        {
          success: false,
          message: "Data login tidak ditemukan. Silakan login kembali.",
        },
        { status: 404 }
      );
    };

    // CEK OTP EXPIRED

    if (getOTPExpired(praLogin.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP sudah kedaluwarsa. Silakan meminta OTP baru.",
        },
        { status: 400 }
      );
    };

    // CEK BATAS PERCOBAAN

    if (praLogin.otp_attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas percobaan OTP telah tercapai. Silakan meminta OTP baru.",
        },
        { status: 429 }
      );
    };

    // VERIFIKASI OTP

    const isValidOTP = await verifyOTP(otp, praLogin.otp);

    if (!isValidOTP) {
      const newAttempts = praLogin.otp_attempts + 1;

      await prisma.praLogin.update({
        where: { user_id: user.id },
        data: { otp_attempts: newAttempts }
      });

      const remainingAttempts = MAX_OTP_ATTEMPTS - newAttempts;

      return NextResponse.json(
        {
          success: false,
          message:
            remainingAttempts > 0
              ? `Kode OTP tidak valid. Sisa percobaan: ${remainingAttempts}.`
              : "Kode OTP tidak valid. Batas percobaan telah tercapai. Silakan meminta kode OTP baru.",
        },
        { status: 400 }
      );
    };

    // OTP BENAR

    // Generate token login sementara
    const loginToken = generateLoginToken();

    // Hash token untuk disimpan di database
    const loginTokenHash = hashLoginToken(loginToken);

    // Waktu expired token
    const loginTokenExpiresAt = getLoginTokenExpiration();

    // SIMPAN LOGIN TOKEN

    await prisma.praLogin.update({
      where: { user_id: user.id },
      data: {
        login_token: loginTokenHash,
        login_token_expires_at: loginTokenExpiresAt,
        expires_at: new Date(0),   // OTP sudah berhasil digunakan
        otp_attempts: 0,
      },
    });

    // RESPONSE

    return NextResponse.json({
      success: true,
      message: "OTP berhasil diverifikasi.",
      loginToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login OTP verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memverifikasi OTP.",
      },
      { status: 500 }
    );
  }
}