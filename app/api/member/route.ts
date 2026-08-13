import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password } = body;

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { message: "Semua kolom wajib diisi!" },
        { status: 400 }
      );
    }

    // 1. Cek apakah email sudah terdaftar di tabel members
    const existingMember = await prisma.members.findUnique({
      where: { email },
    });

    if (existingMember) {
      return NextResponse.json(
        { message: "Email sudah terdaftar sebagai member!" },
        { status: 400 }
      );
    }

    // 2. Simpan data langsung ke tabel members
    const newMember = await prisma.members.create({
      data: {
        id: randomUUID(),
        full_name: fullName,
        email,
        phone,
        password,
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran member berhasil!", member: newMember },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Register Member:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data ke database", error: error.message },
      { status: 500 }
    );
  }
}