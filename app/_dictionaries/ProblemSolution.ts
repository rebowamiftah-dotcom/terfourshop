import { LanguageKey } from "@/lib/language";

export const dictionary: Record<LanguageKey, {
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  items: Array<{
    number: string;
    badge: string;
    problem: string;
    solution: string;
    desc: string;
    glowColor: string;
  }>;
}> = {
  id: {
    tag: "Mengapa TerfourShop Ada?",
    titlePrefix: "Kami Mengubah Cara Anda",
    titleHighlight: "Berbelanja Online",
    subtitle: "Banyak toko online menawarkan barang serupa, tetapi kami fokus menyelesaikan masalah utama yang sering dialami pembeli modern.",
    items: [
      {
        number: "01",
        badge: "Garansi Ori",
        problem: "Khawatir Produk KW & Kualitas Pas-Pasan",
        solution: "Jaminan 100% Produk Otentik & Terverifikasi",
        desc: "Setiap barang di TerfourShop melewati 5 tahap inspeksi kualitas dan memiliki sertifikat verifikasi digital.",
        glowColor: "from-emerald-500/20 to-cyan-500/20",
      },
      {
        number: "02",
        badge: "Super Cepat",
        problem: "Pengiriman Lambat & Resi Tidak Jelas",
        solution: "Sistem Logistik Latensi Rendah & Real-Time Tracking",
        desc: "Proses kemas otomatis kurang dari 2 jam dengan integrasi kurir express langsung ke lokasi Anda.",
        glowColor: "from-cyan-500/20 to-blue-500/20",
      },
      {
        number: "03",
        badge: "Eksklusif",
        problem: "Desain Fashion & Gadget yang Pasaran",
        solution: "Koleksi Eksklusif Bertema Cyber-Futuristic",
        desc: "Kami menghadirkan rilis edisi terbatas (limited drop) dengan estetika modern minimalis yang beda dari yang lain.",
        glowColor: "from-pink-500/20 to-purple-500/20",
      },
    ],
  },
  en: {
    tag: "Why TerfourShop Exists?",
    titlePrefix: "We Transform How You",
    titleHighlight: "Shop Online",
    subtitle: "Many online stores offer similar items, but we focus on solving the core issues modern buyers often face.",
    items: [
      {
        number: "01",
        badge: "Original Warranty",
        problem: "Worrying About Fake Products & Poor Quality",
        solution: "100% Authentic & Verified Product Guarantee",
        desc: "Every item at TerfourShop goes through 5 quality inspection stages and features a digital verification certificate.",
        glowColor: "from-emerald-500/20 to-cyan-500/20",
      },
      {
        number: "02",
        badge: "Super Fast",
        problem: "Slow Delivery & Unclear Tracking",
        solution: "Low-Latency Logistics & Real-Time Tracking",
        desc: "Automated packing process in under 2 hours with express courier integration straight to your location.",
        glowColor: "from-cyan-500/20 to-blue-500/20",
      },
      {
        number: "03",
        badge: "Exclusive",
        problem: "Mainstream Fashion & Gadget Designs",
        solution: "Exclusive Cyber-Futuristic Themed Collections",
        desc: "We bring limited drops with a minimalist modern aesthetic that stands out from the rest.",
        glowColor: "from-pink-500/20 to-purple-500/20",
      },
    ],
  },
};