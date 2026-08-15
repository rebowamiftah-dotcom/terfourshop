import { LanguageKey } from "@/app/lib/language";

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
    badge: "Pengalaman Belanja Generasi Baru",
    headlinePrefix: "Masa Depan",
    headlineSuffix: "Bersama TerfourShop",
    subheadline:
      "Jelajahi produk eksklusif dengan pengalaman interaktif imersif. Belanja lebih cepat, interaktif, dan futuristik langsung dari browser Anda.",
    btnShop: "Jelajahi Toko",
    btnAbout: "Tentang Kami",
    statsProduct: "Produk Digital & Fisik",
    statsSatisfaction: "Kepuasan Pelanggan",
    statsLatency: "Render Latency",
  },
  en: {
    badge: "Next-Gen Shopping Experience",
    headlinePrefix: "The Future of",
    headlineSuffix: "With TerfourShop",
    subheadline:
      "Explore exclusive products with an immersive interactive experience. Shop faster, interactively, and futuristically right from your browser.",
    btnShop: "Explore Shop",
    btnAbout: "About Us",
    statsProduct: "Digital & Physical Products",
    statsSatisfaction: "Customer Satisfaction",
    statsLatency: "Render Latency",
  },
};