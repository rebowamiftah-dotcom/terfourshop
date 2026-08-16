import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        product_categories: {
          include: {
            products: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kategori" },
      { status: 500 }
    );
  }
}