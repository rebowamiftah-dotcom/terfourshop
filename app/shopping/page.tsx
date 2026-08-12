"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";

// --- DATA PRODUK ---
const GENERATED_PRODUCTS = Array.from({ length: 35 }).map((_, index) => {
  const categories = ["Pakaian", "Aksesoris", "Sepatu", "Elektronik"];
  const category = categories[index % categories.length];
  const isLimited = index % 7 === 2;
  
  const icons: Record<string, string[]> = {
    Pakaian: ["👕", "🧥", "👔", "🎽"],
    Aksesoris: ["💍", "🕶️", "⌚", "🎒"],
    Sepatu: ["👟", "🥾", "👠", "🥿"],
    Elektronik: ["🖥️", "🥽", "🎧", "🔊"],
  };

  const iconList = icons[category];
  const icon = iconList[index % iconList.length];

  return {
    id: index + 1,
    name: `${category} Cyber Vault #${index + 1} Edisi Spesial Tactical`,
    category,
    price: (index + 1) * 150000 + 100000,
    priceFormatted: `Rp ${((index + 1) * 150000 + 100000).toLocaleString("id-ID")}`,
    rating: (4.5 + (index % 5) * 0.1).toFixed(1),
    soldCount: (index + 1) * 18 + 5,
    tag: isLimited ? "Limited" : index % 3 === 0 ? "Best Seller" : "New",
    icon,
    isLimited,
  };
});

const CATEGORIES = ["All", "Pakaian", "Aksesoris", "Sepatu", "Elektronik"];
const INITIAL_LOAD_COUNT = 20;
const LOAD_MORE_COUNT = 10;

export default function ShoppingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // --- STATE LAZY LOADING ---
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter Logika Produk
  const filteredProducts = GENERATED_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
  }, [selectedCategory, searchQuery]);

  // --- LOGIKA INTERSECTION OBSERVER (SCROLL MENTOK) ---
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
            setIsLoadingMore(false);
          }, 1200);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, isLoadingMore, filteredProducts.length]);

  const handleQuickAddToCart = (e: React.MouseEvent, productName: string) => {
    e.preventDefault();
    alert(`🛒 1x ${productName} ditambahkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* NAVBAR */}

      {/* --- HERO HEADER SUPPLY HUB --- */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-b border-purple-500/20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[800px] h-[150px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Cyber Supply Vault
          </span>
          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight">
            Katalog Produk <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Futuristik</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed px-2">
            Jelajahi perlengkapan eksklusif dengan sistem muat otomatis berkecepatan tinggi.
          </p>
        </div>
      </section>

      {/* --- CONTROLS & HUD FILTER INTERFACE --- */}
      <section className="py-4 sm:py-8 container mx-auto px-3 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          
          {/* Scroll Horizontal Filter Kategori */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/25 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari produk cyber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">🔍</span>
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID 3D VAULT (2 KOLOM DI MOBILE ALA SHOPEE) --- */}
      <section className="py-4 sm:py-8 container mx-auto px-3 sm:px-6 mb-12 flex-grow">
        {visibleProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-xs sm:text-sm">Produk tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <AnimatePresence>
              {visibleProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative rounded-xl sm:rounded-2xl p-[1px] sm:p-[1.5px] cursor-pointer transition-all duration-300 ${
                    product.isLimited
                      ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 shadow-[0_5px_15px_rgba(236,72,153,0.15)]"
                      : "bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500"
                  }`}
                >
                  <div className="w-full h-full p-2.5 sm:p-5 rounded-[11px] sm:rounded-[15px] bg-slate-950/95 flex flex-col justify-between relative overflow-hidden border border-white/5">
                    
                    {/* Badge & Terjual */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2 z-10">
                      <span className={`w-max px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider ${
                        product.isLimited
                          ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}>
                        {product.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1">
                        ⭐ <strong className="text-amber-400">{product.rating}</strong>
                        <span className="hidden sm:inline">| {product.soldCount} terjual</span>
                      </span>
                    </div>

                    {/* Visual Box Produk */}
                    <div className="w-full h-28 sm:h-36 rounded-lg sm:rounded-xl flex items-center justify-center text-4xl sm:text-6xl my-1 sm:my-2 relative group-hover:scale-105 transition-transform duration-300 bg-slate-900/80 border border-white/5">
                      {product.icon}
                    </div>

                    {/* Informasi Produk */}
                    <div className="mt-2 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-widest font-mono">
                          {product.category}
                        </p>
                        <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      {/* Footer Kartu: Harga & Tombol */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-2 border-t border-white/10 gap-2">
                        <div className="flex items-center justify-between sm:block">
                          <span className="text-xs sm:text-sm font-black text-white shrink-0">
                            {product.priceFormatted}
                          </span>
                          <span className="text-[9px] text-slate-400 sm:hidden">
                            {product.soldCount} terjual
                          </span>
                        </div>

                        <div className="flex items-center gap-1 justify-end w-full sm:w-auto">
                          <button
                            onClick={(e) => handleQuickAddToCart(e, product.name)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 text-xs transition-colors cursor-pointer"
                            title="Tambah ke Keranjang"
                          >
                            🛒
                          </button>

                          <Link
                            href={`/shopping/${product.id}`}
                            className="flex-1 sm:flex-initial text-center px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md transition-all active:scale-95"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- SENTINEL LAZY LOADING TARGET & SPINNER --- */}
        <div ref={observerTarget} className="w-full py-8 sm:py-12 flex flex-col items-center justify-center">
          {isLoadingMore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-cyan-500/20 border-t-cyan-400 border-r-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
                DECRYPTING MORE SUPPLIES...
              </p>
            </motion.div>
          )}

          {!hasMore && filteredProducts.length > 0 && (
            <p className="text-[10px] sm:text-xs text-slate-500 font-mono tracking-wider pt-2 sm:pt-4">
              -- ALL VAULT ITEMS LOADED ({filteredProducts.length} PRODUCTS) --
            </p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}