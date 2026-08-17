import { LanguageKey } from "@/lib/language";

export const dictionary: Record<LanguageKey, {
  badge: string;
  headlinePrefix: string;
  headlineSuffix: string;
  subheadline: string;
  btnShop: string;
  btnAbout: string;
  statsProduct: string;
  statsSatisfaction: string;
  statsLatency: string;
}> = {
  id: {
    badge: "Pengalaman Belanja Modern & Terpercaya",
    headlinePrefix: "Temukan Gaya",
    headlineSuffix: "Terbaikmu Bersama TerfourShop",
    subheadline:
      "Jelajahi berbagai pilihan produk berkualitas tinggi dengan pengalaman belanja yang cepat, mudah, dan aman langsung dari genggaman Anda.",
    btnShop: "Kunjungi Toko",
    btnAbout: "Tentang Kami",
    statsProduct: "Produk Berkualitas",
    statsSatisfaction: "Kepuasan Pelanggan",
    statsLatency: "Respon Sistem",
  },
  en: {
    badge: "Modern & Trusted Shopping Experience",
    headlinePrefix: "Find Your Best",
    headlineSuffix: "Style With TerfourShop",
    subheadline:
      "Explore a wide range of high-quality products with a fast, easy, and secure shopping experience right from your device.",
    btnShop: "Explore Shop",
    btnAbout: "About Us",
    statsProduct: "Quality Products",
    statsSatisfaction: "Customer Satisfaction",
    statsLatency: "System Response",
  },
};