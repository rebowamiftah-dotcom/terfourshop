"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const FEATURES = [
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
];

export default function FeaturesAndFlashSale() {
  const router = useRouter();

  // --- STATE STATUS PENDAFTARAN / LOGIN & KLAIM PROMO ---
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false); // State baru untuk melacak klaim promo

  // 1. STATE DUMMY TIMER (Jam, Menit, Detik)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  // 2. LOGIKA TIMER MUNDUR TERUS-MENERUS & REPEAT DETIK KE 19
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else {
          return { ...prev, seconds: 19 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- LOGIKA TOMBOL KLAIM PROMO ---
  const handleGoToStore = () => {
    if (!isRegistered) {
      router.push("/registrasi");
    } else {
      router.push("/shopping");
    }
    
    // Ubah status promo menjadi sudah diklaim
    setIsClaimed(true);
  };

  return (
    <div className="bg-slate-950 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* 4. VALUE PROPOSITION / KEUNGGULAN TOKO */}
      <section className="py-20 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -2, scale: 0.98 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
            >
              {/* RUNNING RAINBOW BORDER */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #a855f7, #06b6d4, #22c55e, #eab308, #ec4899, #a855f7)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="w-full h-full p-6 rounded-[15px] bg-slate-900/95 flex flex-col justify-between space-y-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-400 group-hover:border-purple-500/50 transition-colors">
                    {feat.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-purple-500/50 group-hover:bg-cyan-400 transition-colors shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. FLASH SALE BANNER / NOTIFIKASI PROMO */}
      <section className="py-16 container mx-auto px-6 mb-16">
        <AnimatePresence mode="wait">
          {!isClaimed ? (
            /* BANNER IKLAN PROMO */
            <motion.div
              key="flash-sale-banner"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-900/60 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="relative z-10 max-w-xl text-center md:text-left">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Flash Sale Hari Ini
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                  Dapatkan Diskon Hingga 50% Untuk Produk Pilihan
                </h2>
                <p className="text-slate-300 text-sm mt-2 font-light">
                  Penawaran ini berlaku dalam waktu terbatas. Segera klaim voucher diskon Anda sebelum kehabisan.
                </p>
              </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="flex gap-2 text-center">
              <div className="bg-slate-950/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-inner">
                <span className="text-xl font-bold text-purple-400 font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Jam</p>
              </div>
              <div className="bg-slate-950/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-inner">
                <span className="text-xl font-bold text-pink-400 font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Menit</p>
              </div>
              <div className="bg-slate-950/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-inner">
                <span className="text-xl font-bold text-cyan-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Detik</p>
              </div>
            </div>

                <button
                  onClick={handleGoToStore}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Klaim Promo Now
                </button>
              </div>
            </motion.div>
          ) : (
            /* NOTIFIKASI BAHWA PROMO SUDAH DIKLAIM */
            <motion.div
              key="claimed-success-card"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl p-8 sm:p-10 bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shrink-0">
                  🎉
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">
                    Selamat! Promo Diskon 50% Berhasil Diklaim
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                    Voucher promo Anda telah tersimpan otomatis dan dapat langsung digunakan saat checkout belanjaan Anda.
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/shopping")}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shrink-0 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Gunakan Voucher Sekarang →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}