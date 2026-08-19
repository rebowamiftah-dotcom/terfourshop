import { LanguageKey } from "@/lib/language";

export const dictionary: Record<LanguageKey, {
  badge: string;
  title: string;
  loadingText: string;
  limitedEdition: string;
  bestSeller: string;
  defaultCategory: string;
  goToStore: string;
}> = {
  id: {
    badge: "Koleksi Terbaik",
    title: "Produk Paling Populer",
    loadingText: "MEMUAT PRODUK POPULER...",
    limitedEdition: "Limited Edition",
    bestSeller: "Best Seller",
    defaultCategory: "UMUM",
    goToStore: "Pergi ke Toko",
  },
  en: {
    badge: "Best Collection",
    title: "Most Popular Products",
    loadingText: "LOADING POPULAR PRODUCTS...",
    limitedEdition: "Limited Edition",
    bestSeller: "Best Seller",
    defaultCategory: "GENERAL",
    goToStore: "Go to Store",
  },
};