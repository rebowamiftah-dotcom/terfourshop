"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "@/components/CountUp"; // Sesuaikan path CountUp Anda
import Footer from "@/components/Footer";   // Sesuaikan path Footer Anda

// --- DATA BENEFIT SELLER ---
const BENEFITS = [
  {
    id: 1,
    title: "Jangkauan Pasar Nasional",
    description:
      "Akses ke puluhan ribu pelanggan aktif setiap hari di seluruh Indonesia. Produk Anda langsung dilihat tanpa batas wilayah.",
    highlight: "100k+ Pembeli Aktif",
  },
  {
    id: 2,
    title: "Komisi Transaksi Rendah",
    description:
      "Nikmati potongan biaya admin super murah dan transparan. Maksimalkan keuntungan bersih dari setiap produk yang Anda jual.",
    highlight: "Biaya Mulai 0%",
  },
  {
    id: 3,
    title: "Pencairan Dana Instan",
    description:
      "Hasil penjualan dapat ditarik kapan saja langsung ke rekening bank atau e-wallet Anda tanpa delay berhari-hari.",
    highlight: "Real-time Payout",
  },
  {
    id: 4,
    title: "Dashboard Analitik Canggih",
    description:
      "Pantau performa toko, statistik pengunjung, laporan penjualan, hingga tren produk terbaik melalui panel kontrol intuitif.",
    highlight: "Live Data Analytics",
  },
  {
    id: 5,
    title: "Fitur Promosi & Ads Gratis",
    description:
      "Dapatkan promo flash sale, voucher toko kustom, serta slot iklan gratis di halaman utama untuk seller baru.",
    highlight: "Voucher Promosi",
  },
  {
    id: 6,
    title: "Dukungan CS Priority 24/7",
    description:
      "Tim support khusus seller siap membantu Anda kapan saja terkait kendala operasional, pengiriman, hingga sengketa.",
    highlight: "Bantuan Respon Cepat",
  },
];

// --- DATA LANGKAH PENDAFTARAN ---
const STEPS = [
  {
    step: "01",
    title: "Daftar Akun Toko",
    desc: "Isi formulir pendaftaran singkat dengan data diri & nama toko unik Anda.",
  },
  {
    step: "02",
    title: "Verifikasi Identitas",
    desc: "Unggah KTP & rekening bank untuk keamanan transaksi dan verifikasi resmi.",
  },
  {
    step: "03",
    title: "Upload Produk Pertama",
    desc: "Tambahkan foto, deskripsi, dan harga produk Anda dengan fitur batch upload.",
  },
  {
    step: "04",
    title: "Mulai Berjualan!",
    desc: "Toko Anda resmi buka. Terima pesanan pertama dan kembangkan bisnis Anda.",
  },
];

export default function SellerPage() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const registeredUser = localStorage.getItem("isRegistered");
    const sellerStatus = localStorage.getItem("isSeller");

    if (registeredUser === "true") setIsRegistered(true);
    if (sellerStatus === "true") setIsSeller(true);
  }, []);

  const handleRegisterSeller = () => {
    if (!isRegistered) {
      router.push("/register?redirect=seller-setup");
    } else if (isSeller) {
      router.push("/seller/dashboard");
    } else {
      router.push("/seller/register");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-hidden relative flex flex-col justify-between">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-3/4 right-10 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />
      <section className="pt-20 sm:pt-20 pb-12 sm:pb-16 px-6 relative z-10 min-h-[85vh] flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          {/* Badge Pengumuman */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-xs sm:text-sm text-purple-300 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Program Mitra TerfourShop Seller 2026
            </div>
          </motion.div>

          {/* Headline Utama */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4"
          >
            Kembangkan Bisnis Anda <br className="hidden sm:inline" />
            Bersama{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
              TerfourShop
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-xs sm:text-base text-slate-300 mb-6 leading-relaxed font-light"
          >
            Buka toko online Anda sekarang secara gratis. Dapatkan komisi rendah, dukungan alat analisis canggih, dan akses langsung ke ratusan ribu pembeli aktif.
          </motion.p>

          {/* Tombol CTA Utama */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm sm:max-w-md">
            <button
              onClick={handleRegisterSeller}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>{isSeller ? "Masuk ke Dashboard Seller" : "Daftar Menjadi Seller Sekarang"}</span>
            </button>
            <Link
              href="#benefit"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 text-center text-xs sm:text-sm"
            >
              Pelajari Keuntungan
            </Link>
          </motion.div>

          {/* Live Stats Seller */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 w-full text-slate-300"
          >
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                <CountUp from={0} to={15} duration={2} />K+
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Seller Aktif</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                Rp<CountUp from={0} to={2.5} duration={2} />M+
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Omset Transaksi/Bln</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                <CountUp from={0} to={98.5} duration={2} />%
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Kepuasan Seller</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                &lt;<CountUp from={0} to={5} duration={2} /> Menit
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Proses Pendaftaran</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* BENEFIT SECTION */}
      <section id="benefit" className="py-16 px-6 relative z-10 bg-slate-900/40 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              Mengapa Harus TerfourShop?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
              Keuntungan Utama Menjadi Seller
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-light">
              Kami menyediakan ekosistem dan fitur pendukung agar jualan Anda semakin laris dan efisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-[1.5px] bg-white/10 overflow-hidden"
              >
                <div className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 -z-10" />

                <div className="w-full h-full p-5 sm:p-6 rounded-[15px] bg-slate-950/90 backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-end mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-300">
                        {benefit.highlight}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Langkah Mudah
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
              4 Langkah Mulai Berjualan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, index) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div className="text-3xl font-black text-white/10 mb-2 font-mono">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  BANNER DAFTAR */}
      <section className="pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-900/60 border border-purple-500/30 overflow-hidden text-center flex flex-col items-center">
            <h2 className="text-xl sm:text-3xl font-extrabold max-w-xl leading-tight mb-3">
              Siap Meningkatkan Penjualan Anda?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6 font-light">
              Bergabunglah dengan ribuan seller sukses lainnya di TerfourShop. <br /> Gratis pendaftaran sekarang!
            </p>

            <button
              onClick={handleRegisterSeller}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
            >
              Daftar Sebagai Seller Gratis
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}