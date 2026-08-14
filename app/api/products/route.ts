import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const whereCondition: any = {
      status: "ACTIVE",
    };

    if (search) {
      whereCondition.name = { contains: search };
    }

    if (category && category !== "All") {
      whereCondition.product_categories = {
        some: { categories: { name: category } },
      };
    }

    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        product_images: { orderBy: { is_primary: "desc" } },
        product_categories: { include: { categories: true } },
        stores: { select: { name: true } },
        // Tarik data order_items dan reviews untuk menghitung Terjual & Rating
        order_items: {
          include: {
            reviews: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    // Kalkulasi Dinamis: Rating, Terjual, dan Badge Tag
    const formattedProducts = products.map((prod) => {
      // 1. Hitung total barang terjual (berdasarkan quantity di order_items)
      const soldCount = prod.order_items.reduce((total, item) => total + item.quantity, 0);

      // 2. Hitung rata-rata rating dari pembeli
      const reviewItems = prod.order_items.filter((item) => item.reviews !== null);
      const avgRating = reviewItems.length > 0
        ? (reviewItems.reduce((acc, item) => acc + item.reviews!.rating, 0) / reviewItems.length).toFixed(1)
        : "0.0"; // Jika belum ada ulasan

      // 3. Logika untuk Badge/Tag (Bisa disesuaikan)
      let tag = "Ready Stock";
      if (soldCount > 50) tag = "Best Seller";
      else if (prod.stock < 15) tag = "Limited";
      // Jika produk dibuat kurang dari 7 hari yang lalu
      else if (new Date(prod.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) tag = "New";

      // Hapus data order_items murni agar response API tidak terlalu berat
      const { order_items, ...restProduct } = prod;

      return {
        ...restProduct,
        soldCount,
        rating: avgRating,
        tag,
      };
    });

    return NextResponse.json({ success: true, products: formattedProducts });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}