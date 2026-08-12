"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- DUMMY DATA CATEGORIES ---
const CATEGORIES = [
  {
    id: 1,
    name: "Kategori 1",
    description: "Keterangan kategori terfavorit 1 yang dapat disesuaikan",
    image: "/jason.jpg",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    name: "Kategori 2",
    description: "Keterangan kategori terfavorit 2 yang dapat disesuaikan",
    image: "/jason.jpg",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    name: "Kategori 3",
    description: "Keterangan kategori terfavorit 3 yang dapat disesuaikan",
    image: "/jason.jpg",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 4,
    name: "Kategori 4",
    description: "Keterangan kategori terfavorit 4 yang dapat disesuaikan",
    image: "/jason.jpg",
    gradient: "from-amber-400 to-orange-500",
  },
];

// --- DUMMY DATA PRODUCTS ---
const PRODUCTS = [
  {
    id: 1,
    name: "T-shirt Patrick Jane",
    category: "Pakaian",
    price: "Rp.300.000",
    rating: "4.9",
    tag: "Best Seller",
    image: "🎧",
    isLimitedEdition: false,
  },
  {
    id: 2,
    name: "Gelang Loopy",
    category: "Aksesoris",
    price: "Rp.1.500.000",
    rating: "4.8",
    tag: "Hot item",
    image: "🧥",
    isLimitedEdition: false,
  },
  {
    id: 3,
    name: "Nike Spongebob Squarepants",
    category: "Sepatu",
    price: "Rp.4.000.000",
    rating: "5.0",
    tag: "Limited Edition",
    image: "🪷",
    isLimitedEdition: true, // CARD TIMBUL & PROMINENT
  },
  {
    id: 4,
    name: "Monitor SAMSUNG",
    category: "Elektronik",
    price: "Rp.3.500.000",
    rating: "4.7",
    tag: "New",
    image: "🔊",
    isLimitedEdition: false,
  },
];

const FEATURES = [
  {
    title: "Pengiriman Super Cepat",
    desc: "Sistem pengiriman otomatis dengan latensi rendah untuk item fisik & digital.",
    icon: "🚀",
  },
  {
    title: "Jaminan Original 100%",
    desc: "Setiap produk memiliki verifikasi otentik berbasis enkripsi terpercaya.",
    icon: "🛡️",
  },
  {
    title: "Pembayaran Aman & Imersif",
    desc: "Mendukung berbagai metode pembayaran modern secara aman dan praktis.",
    icon: "💳",
  },
];

// FUNGSI CEK APABILA HARGA >= 1 JUTA
const checkIsPriceOneMillionOrMore = (priceString: string) => {
  const numericValue = parseInt(priceString.replace(/\D/g, ""), 10);
  return numericValue >= 1000000;
};

export default function HomeSections() {
  const router = useRouter();

  // --- STATE STATUS PENDAFTARAN / LOGIN ---
  const [isRegistered, setIsRegistered] = useState(false);

  // 1. STATE DUMMY TIMER
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  // 2. LOGIKA TIMER MUNDUR
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

  // --- LOGIKA TOMBOL PERGI KE TOKO ---
  const handleGoToStore = () => {
    if (!isRegistered) {
      router.push("/register");
    } else {
      router.push("/shopping");
    }
  };

  const marqueeText = (
    <div className="flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wider text-purple-200 pr-8 shrink-0">
      <span>🪷 GRATIS ONGKIR SELURUH INDONESIA UNTUK MEMBER BARU</span>
      <span className="text-pink-400">✦</span>
      <span>DISKON SPESIAL PELUNCURAN TERFOURSHOP HINGGA 40%</span>
      <span className="text-cyan-400">✦</span>
      <span>PENGALAMAN BELANJA BERSAMA TERFOURSHOP</span>
      <span className="text-purple-400">✦</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-950 text-white overflow-hidden">
      {/* 1. INFINITE RUNNING MARQUEE */}
      <section className="py-3.5 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-slate-900/40 border-y border-white/10 overflow-hidden relative">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {marqueeText}
          {marqueeText}
          {marqueeText}
          {marqueeText}
        </motion.div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="py-20 container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
              Kategori Terfavorit
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">
              Jelajahi Berdasarkan Kategori
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0 font-light">
            Temukan berbagai koleksi produk pilihan yang telah dikategorikan untuk kemudahan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -2, scale: 0.98 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 -z-10"
                style={{
                  backgroundImage: "linear-gradient(90deg, #f43f5e, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #f43f5e)",
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

              <div className="w-full h-full p-5 rounded-[15px] bg-slate-950 flex flex-col justify-between relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-200`} />

                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (PRODUK POPULER) */}
      <section className="py-24 bg-slate-900/30 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-400">
              Koleksi Terbaik
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Produk Paling Populer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {PRODUCTS.map((item, index) => {
              const isLimited = item.isLimitedEdition;
              const isExpensive = checkIsPriceOneMillionOrMore(item.price);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: isLimited ? 1.05 : 0.95 }}
                  whileInView={{ opacity: 1, scale: isLimited ? 1.05 : 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: isLimited ? -10 : -5, scale: isLimited ? 1.08 : 1.02 }}
                  whileTap={{ y: -2, scale: 0.98 }}
                  className={`group relative rounded-2xl p-[1.5px] cursor-pointer transition-all duration-300 ${
                    isLimited
                      ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 -translate-y-3 lg:-translate-y-4 shadow-[0_15px_35px_rgba(236,72,153,0.3)] z-20"
                      : "bg-white/10"
                  }`}
                >
                  {/* RUNNING RAINBOW BORDER */}
                  <motion.div
                    className={`absolute -inset-[1.5px] rounded-[17px] transition-opacity duration-200 -z-10 ${
                      isLimited ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-active:opacity-100"
                    }`}
                    style={{
                      backgroundImage: isLimited
                        ? "linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #f59e0b)"
                        : "linear-gradient(90deg, #ec4899, #f43f5e, #eab308, #22c55e, #06b6d4, #a855f7, #ec4899)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%"],
                    }}
                    transition={{
                      duration: isLimited ? 1.8 : 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* GLOW ATMOSPHERE BAGIAN BELAKANG CARD LIMITED */}
                  {isLimited && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-pink-500/30 rounded-2xl blur-xl -z-20 animate-pulse" />
                  )}

                  <div className={`w-full h-full p-5 rounded-[15px] flex flex-col justify-between relative overflow-hidden ${
                    isLimited ? "bg-slate-950/95 border border-amber-500/20" : "bg-slate-950"
                  }`}>
                    
                    {/* ACCENT GLOW DALAM CARD LIMITED */}
                    {isLimited && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-pink-500/20 blur-2xl pointer-events-none" />
                    )}

                    <div className="flex justify-between items-center mb-4 z-10">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        isLimited
                          ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-amber-500/20 border border-amber-300/40 animate-bounce"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}>
                        {item.tag}
                      </span>
                      <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                        ⭐ {item.rating}
                      </span>
                    </div>

                    <div className={`w-full h-44 rounded-xl flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-200 my-2 relative ${
                      isLimited ? "bg-gradient-to-b from-amber-500/10 to-pink-500/10 border border-amber-500/20" : "bg-slate-900/80"
                    }`}>
                      {item.image}
                    </div>

                    <div className="mt-4">
                      <p className={`text-[11px] uppercase tracking-wider ${isLimited ? "text-amber-400 font-semibold" : "text-slate-400"}`}>
                        {item.category}
                      </p>
                      <h3 className={`text-base font-bold mt-1 line-clamp-1 transition-colors ${
                        isLimited ? "text-amber-200 group-hover:text-pink-300" : "text-white group-hover:text-pink-300"
                      }`}>
                        {item.name}
                      </h3>

                      {/* KONTAINER HARGA DAN TOMBOL (DIATUR GAP AGAR TIDAK MEPET) */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 gap-2">
                        <span className={`font-black shrink-0 ${
                          isExpensive ? "text-sm sm:text-base" : "text-base sm:text-lg"
                        } ${isLimited ? "text-amber-300" : "text-white"}`}>
                          {item.price}
                        </span>
                        
                        {/* TOMBOL PERGI KE TOKO (UKURAN DIPERKECEIL APABILA HARGA >= 1 JUTA) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGoToStore();
                          }}
                          className={`rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 shrink-0 active:scale-95 ${
                            isExpensive
                              ? "px-2.5 py-1.5 text-[10px]" 
                              : "px-3.5 py-2 text-xs"
                          } ${
                            isLimited
                              ? "bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white shadow-md shadow-pink-500/20"
                              : "bg-white/10 hover:bg-purple-600 text-white"
                          }`}
                        >
                          Pergi ke Toko
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -2, scale: 0.98 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 -z-10"
                style={{
                  backgroundImage: "linear-gradient(90deg, #a855f7, #06b6d4, #22c55e, #eab308, #ec4899, #a855f7)",
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

              <div className="w-full h-full p-6 rounded-[15px] bg-slate-950">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. FLASH SALE BANNER */}
      <section className="py-16 container mx-auto px-6 mb-16">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-900/60 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
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
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-purple-400">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase">Jam</p>
              </div>
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-pink-400">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase">Menit</p>
              </div>
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-400">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-slate-400 uppercase">Detik</p>
              </div>
            </div>

            <button 
              onClick={handleGoToStore}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Klaim Promo Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}