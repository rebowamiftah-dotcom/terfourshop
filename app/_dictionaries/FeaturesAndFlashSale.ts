import { LanguageKey } from "@/lib/language";

export const dictionary: Record<LanguageKey, {
  features: Array<{ number: string; title: string; desc: string }>;
  flashSaleBadge: string;
  flashSaleTitle: string;
  flashSaleDesc: string;
  hours: string;
  minutes: string;
  seconds: string;
  claimButton: string;
  successTitle: string;
  successDesc: string;
  useVoucherButton: string;
}> = {
  id: {
    features: [
      {
        number: "01",
        title: "Pengiriman Super Cepat",
        desc: "Sistem pengiriman otomatis dengan latensi rendah untuk item fisik & digital.",
      },
      {
        number: "02",
        title: "Jaminan Original 100%",
        desc: "Setiap produk memiliki verifikasi otentik berbasis enkripsi terpercaya.",
      },
      {
        number: "03",
        title: "Pembayaran Aman & Imersif",
        desc: "Mendukung berbagai metode pembayaran modern secara aman dan praktis.",
      },
      {
        number: "04",
        title: "Dukungan AI 24/7",
        desc: "Layanan bantuan responsif yang siap melayani pertanyaan Anda kapan saja.",
      },
    ],
    flashSaleBadge: "Flash Sale Hari Ini",
    flashSaleTitle: "Dapatkan Diskon Hingga 50% Untuk Produk Pilihan",
    flashSaleDesc: "Penawaran ini berlaku dalam waktu terbatas. Segera klaim voucher diskon Anda sebelum kehabisan.",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    claimButton: "Klaim Promo Now",
    successTitle: "Selamat! Promo Diskon 50% Berhasil Diklaim",
    successDesc: "Voucher promo Anda telah tersimpan otomatis dan dapat langsung digunakan saat checkout belanjaan Anda.",
    useVoucherButton: "Gunakan Voucher Sekarang →",
  },
  en: {
    features: [
      {
        number: "01",
        title: "Super Fast Delivery",
        desc: "Automated delivery system with low latency for physical & digital items.",
      },
      {
        number: "02",
        title: "100% Original Guarantee",
        desc: "Every product features reliable encryption-based authentic verification.",
      },
      {
        number: "03",
        title: "Secure & Immersive Payment",
        desc: "Supports various modern payment methods securely and practically.",
      },
      {
        number: "04",
        title: "24/7 AI Support",
        desc: "Responsive support service ready to assist your inquiries anytime.",
      },
    ],
    flashSaleBadge: "Today's Flash Sale",
    flashSaleTitle: "Get Up to 50% Off on Selected Products",
    flashSaleDesc: "This offer is valid for a limited time. Claim your discount voucher before it runs out.",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    claimButton: "Claim Promo Now",
    successTitle: "Congratulations! 50% Discount Claimed Successfully",
    successDesc: "Your promo voucher has been saved automatically and can be used during your checkout.",
    useVoucherButton: "Use Voucher Now →",
  },
};