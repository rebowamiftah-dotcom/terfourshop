import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

import { generateUsername } from "@/app/lib/utils";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
      confirmPassword,
    } = body;

    // VALIDASI

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Konfirmasi password tidak cocok.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password minimal 8 karakter.",
        },
        { status: 400 }
      );
    }

    // CEK USER

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar."
        },
        { status: 409 }
      );
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 12);

    // ROLE CUSTOMER

    const customerRole = await prisma.role.findUnique({
      where: { name: "CUSTOMER" }
    });

    if (!customerRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Role CUSTOMER belum tersedia.",
        },
        { status: 500 }
      );
    }

    // CREATE USER

    const user = await prisma.user.create({
      data: {
        id: uuidv7(),
        username: generateUsername(email),
        email,
        password: hashedPassword,
        role_id: customerRole.id,
      },
    });

    // const profile = await prisma.profile.create({
    //   data: {
    //     id: uuidv7(),
    //     user_id: user["id"],
    //   },
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil.",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTRASI ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}