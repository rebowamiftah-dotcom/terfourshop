import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { hashAuthToken, isAuthTokenExpired} from "@/lib/authToken";

import { RESET_PASSWORD_COOKIE,} from "@/lib/verifyResetPassword";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // VALIDASI PASSWORD

    const validationResult = resetPasswordSchema.safeParse(body);

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

    const { password } = validationResult.data;

    // AMBIL COOKIE RESET PASSWORD

    const cookieStore = await cookies();

    const token = cookieStore.get(RESET_PASSWORD_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi reset password tidak ditemukan. Silakan melakukan forgot password kembali.",
        },
        { status: 401 }
      );
    };

    // HASH TOKEN

    const tokenHash = hashAuthToken(token);

    // CARI PRA FORGOT PASSWORD

    const praForgotPassword = await prisma.praForgotPassword.findUnique({
      where: { reset_token: tokenHash },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    if (!praForgotPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi reset password tidak valid. Silakan melakukan forgot password kembali.",
        },
        { status: 401 }
      );
    };

    // CEK TOKEN EXPIRED

    if (isAuthTokenExpired(praForgotPassword.reset_token_expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi reset password telah kedaluwarsa. Silakan melakukan forgot password kembali.",
        },
        { status: 401 }
      );
    };

    // HASH PASSWORD BARU

    const hashedPassword = await bcrypt.hash(password, 12);

    // TRANSACTION

    await prisma.$transaction(async (tx) => {
      // Update password User
      await tx.user.update({
        where: { id: praForgotPassword.user_id },
        data: { password: hashedPassword },
      });

      // Hapus data Pra Forgot Password
      await tx.praForgotPassword.delete({
        where: { user_id: praForgotPassword.user_id },
      });
    });

    // RESPONSE SUKSES

    const response = NextResponse.json({
      success: true,
      message: "Password berhasil diubah. Silakan login kembali.",
    });

    // HAPUS COOKIE RESET PASSWORD

    response.cookies.delete(RESET_PASSWORD_COOKIE);

    return response;

  } catch (error) {
    console.error("Forgot password reset error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengubah password. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}