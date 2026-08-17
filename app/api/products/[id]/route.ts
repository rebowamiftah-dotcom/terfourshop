import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        product_images: {
          orderBy: { sort_order: "asc" },
        },
        product_categories: {
          include: {
            categories: true,
          },
        },
        stores: true,
        order_items: {
          include: {
            reviews: {
              include: {
                users: {
                  include: {
                    profiles: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Error fetching product detail:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}