import { LanguageKey } from "@/lib/language";

export const dictionary: Record<LanguageKey, {
  brand: string;
  title: string;
  subtitle: string;
  loadingText: string;
  productCountText: string;
  defaultDescription: string;
}> = {
  id: {
    brand: "TERFOURSHOP",
    title: "Jelajahi Kategori Pilihan",
    subtitle: "Temukan berbagai macam produk berkualitas tinggi yang dikurasi khusus untuk memenuhi kebutuhan gaya hidup Anda.",
    loadingText: "MEMUAT KATEGORI PRODUK...",
    productCountText: "Produk",
    defaultDescription: "Koleksi lengkap dan resmi di bawah klasifikasi",
  },
  en: {
    brand: "TERFOURSHOP",
    title: "Explore Featured Categories",
    subtitle: "Discover a wide variety of high-quality products specially curated to meet your lifestyle needs.",
    loadingText: "LOADING PRODUCT CATEGORIES...",
    productCountText: "Products",
    defaultDescription: "Complete and official collection under the classification of",
  },
};