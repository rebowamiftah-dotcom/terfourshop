import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password } = body;

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { message: "Semua kolom pendaftaran wajib diisi!" },
        { status: 400 }
      );
    }

    // 1. Cek apakah email sudah terdaftar di tabel users
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar! Silakan login terlebih dahulu." },
        { status: 400 }
      );
    }

    // 2. Generate Username Unik
    const baseUsername = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .slice(0, 30);
    let username = baseUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter++}`;
    }

    // 3. Ambil Role ID Default untuk Member
    let memberRole = await prisma.role.findFirst({
      where: { name: { contains: "member" } },
    });
    if (!memberRole) memberRole = await prisma.role.findFirst();

    if (!memberRole) {
      return NextResponse.json(
        { message: "Role belum dikonfigurasi di database!" },
        { status: 500 }
      );
    }

    // 4. Generate UUID
    const userId = randomUUID();
    const profileId = randomUUID();
    const memberId = randomUUID();

    // 5. Simpan Data ke Users (beserta Profiles & Members)
    // Field 'password' ada di dalam model 'users'
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        password, // Simpan password di sini
        phone: phone.slice(0, 13),
        role_id: memberRole.id,
        profiles: {
          create: {
            id: profileId,
            full_name: fullName.slice(0, 60),
          },
        },
        members: {
          create: {
            id: memberId,
            full_name: fullName,
            email,
            phone,
          },
        },
      },
      include: {
        profiles: true,
        members: true,
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran member berhasil!", member: newUser.members },
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