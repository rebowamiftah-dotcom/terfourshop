"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// --- DUMMY DATA ---
const CATEGORIES = [
  { id: 1, name: "Digital Assets", count: "1.2k+ Items", icon: "⚡", gradient: "from-purple-600 to-indigo-600" },
  { id: 2, name: "Cyber Fashion", count: "850+ Items", icon: "💎", gradient: "from-pink-500 to-rose-600" },
  { id: 3, name: "3D Hardware", count: "420+ Items", icon: "⚙️", gradient: "from-cyan-500 to-blue-600" },
  { id: 4, name: "Exclusive NFT", count: "310+ Items", icon: "🔮", gradient: "from-amber-400 to-orange-500" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Terfour Neural Headset V2",
    category: "3D Hardware",
    price: "$299.00",
    rating: "4.9",
    tag: "Best Seller",
    image: "🎧",
  },
  {
    id: 2,
    name: "Hologram Jacket Cyber-X",
    category: "Cyber Fashion",
    price: "$149.00",
    rating: "4.8",
    tag: "Hot item",
    image: "🧥",
  },
  {
    id: 3,
    name: "Lotus Metaverse Pass",
    category: "Digital Assets",
    price: "$89.00",
    rating: "5.0",
    tag: "Exclusive",
    image: "🪷",
  },
  {
    id: 4,
    name: "Quantum Soundbar 3D",
    category: "3D Hardware",
    price: "$199.00",
    rating: "4.7",
    tag: "New",
    image: "🔊",
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
  {
    title: "Dukungan AI 24/7",
    desc: "Layanan bantuan responsif yang siap melayani pertanyaan Anda kapan saja.",
    icon: "🤖",
  },
];

export default function HomeSections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState<number[]>([]);

  const toggleCart = (id: number) => {
    setCartCount((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
      {/* 1. INFINITE RUNNING MARQUEE (Bilah Pengumuman Berjalan) */}
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

      {/* 2. FEATURED CATEGORIES (Kategori Pilihan) */}
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
            Temukan berbagai koleksi produk masa depan yang telah dikategorikan untuk kemudahan navigasi Anda.
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
              {/* RUNNING RAINBOW BORDER (BERJALAN HANYA DI PINGGIRAN) */}
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

              {/* INNER SOLID CARD CONTAINER */}
              <div className="w-full h-full p-6 rounded-[15px] bg-slate-950 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-200`} />
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Katalog Produk Terlaris) */}
      <section className="py-20 bg-slate-900/30 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-400">
              Koleksi Terbaik
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Produk Paling Populer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((item, index) => {
              const isAdded = cartCount.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: -2, scale: 0.98 }}
                  className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  {/* RUNNING RAINBOW BORDER (BERJALAN HANYA DI PINGGIRAN) */}
                  <motion.div
                    className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 -z-10"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #ec4899, #f43f5e, #eab308, #22c55e, #06b6d4, #a855f7, #ec4899)",
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

                  {/* INNER SOLID CARD CONTAINER */}
                  <div className="w-full h-full p-5 rounded-[15px] bg-slate-950 flex flex-col justify-between">
                    {/* Tag Header Card */}
                    <div className="flex justify-between items-center mb-4 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.tag}
                      </span>
                      <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                        ⭐ {item.rating}
                      </span>
                    </div>

                    {/* Thumbnail / Visual Produk */}
                    <div className="w-full h-44 rounded-xl bg-slate-900/80 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-200 my-2">
                      {item.image}
                    </div>

                    {/* Info Produk */}
                    <div className="mt-4">
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">{item.category}</p>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-pink-300 transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                        <span className="text-lg font-black text-white">{item.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCart(item.id);
                          }}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-white/10 hover:bg-purple-600 text-white"
                          }`}
                        >
                          {isAdded ? "✓ Tersimpan" : "+ Keranjang"}
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

      {/* 4. VALUE PROPOSITION (Keunggulan Toko) */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              {/* RUNNING RAINBOW BORDER (BERJALAN HANYA DI PINGGIRAN) */}
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

              {/* INNER SOLID CARD CONTAINER */}
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

      {/* 5. FLASH SALE BANNER (Penawaran Terbatas) */}
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
                <span className="text-xl font-bold text-purple-400">08</span>
                <p className="text-[10px] text-slate-400 uppercase">Jam</p>
              </div>
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-pink-400">42</span>
                <p className="text-[10px] text-slate-400 uppercase">Menit</p>
              </div>
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-400">19</span>
                <p className="text-[10px] text-slate-400 uppercase">Detik</p>
              </div>
            </div>

            <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-105 active:scale-95">
              Klaim Promo Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}