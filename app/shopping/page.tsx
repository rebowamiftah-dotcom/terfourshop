"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";

const MULTI_CATEGORIES = [
  { name: "All", label: "Semua Produk", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&auto=format&fit=crop&q=80" },
  { name: "Electronics", label: "Elektronik", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=150&auto=format&fit=crop&q=80" },
  { name: "Komputer", label: "Komputer & Aksesoris", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&auto=format&fit=crop&q=80" },
  { name: "Handphone", label: "Handphone & Aksesoris", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80" },
  { name: "Fashion Pria", label: "Pakaian Pria", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=150&auto=format&fit=crop&q=80" },
  { name: "Sepatu Pria", label: "Sepatu Pria", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80" },
  { name: "Tas Pria", label: "Tas Pria", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80" },
  { name: "Aksesoris", label: "Aksesoris Fashion", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&auto=format&fit=crop&q=80" },
  { name: "Kesehatan", label: "Kesehatan", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&auto=format&fit=crop&q=80" },
  { name: "Hobi", label: "Hobi & Koleksi", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150&auto=format&fit=crop&q=80" },
  { name: "Makanan", label: "Makanan & Minuman", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&auto=format&fit=crop&q=80" },
  { name: "Beauty", label: "Perawatan & Kecantikan", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80" },
  { name: "Rumah", label: "Perlengkapan Rumah", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&auto=format&fit=crop&q=80" },
  { name: "Fashion Wanita", label: "Pakaian Wanita", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=150&auto=format&fit=crop&q=80" },
  { name: "Otomotif", label: "Otomotif", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=150&auto=format&fit=crop&q=80" },
];

export default function ShoppingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== "All") queryParams.append("category", selectedCategory);
        if (searchQuery) queryParams.append("search", searchQuery);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleQuickAddToCart = (e: React.MouseEvent, productName: string) => {
    e.preventDefault();
    alert(`🛒 1x ${productName} ditambahkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* --- STICKY SEARCH BAR (MENGIKUTI SAAT DI SCROLL & TIDAK TERLALU KECIL) --- */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-6 shadow-xl">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-5xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300 hidden sm:inline">
              Cari Cepat
            </span>
          </div>

          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Cari produk cyber, fashion, elektronik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base">🔍</span>
          </div>
        </div>
      </div>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-b border-purple-500/20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[800px] h-[150px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Cyber Supply Vault
          </span>
          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight">
            Katalog Produk <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Futuristik</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Temukan berbagai koleksi produk pilihan terbaik dengan sistem pencarian instan.
          </p>
        </div>
      </section>

      {/* --- PANEL UTAMA (BANNER IKLAN + KATEGORI) --- */}
      <section className="py-8 container mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
          
          {/* --- BANNER IKLAN / PROMO UTAMA --- */}
          <div className="relative rounded-xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-purple-900/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 text-center sm:text-left space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Special Cyber Offer
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide">
                MEGA SALE DISKON HINGGA 50%
              </h3>
              <p className="text-xs text-slate-300 font-light max-w-lg">
                Dapatkan penawaran eksklusif untuk seluruh produk pilihan minggu ini. Stok terbatas!
              </p>
            </div>

            <button 
              onClick={() => alert("Mengarahkan ke halaman klaim promo...")}
              className="relative z-10 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              Klaim Voucher
            </button>
          </div>

          {/* GRID KATEGORI */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Kategori Pilihan
              </h2>
              {selectedCategory !== "All" && (
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="text-xs text-cyan-400 hover:underline font-mono cursor-pointer"
                >
                  Reset Filter (Tampilkan Semua)
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 max-h-[320px] overflow-y-auto no-scrollbar pr-1">
              {MULTI_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;

                return (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`group flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-purple-600/25 border border-purple-500/60 scale-105 shadow-lg shadow-purple-500/20"
                        : "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400 transition-colors shadow-md relative mb-2 bg-slate-950">
                      <img 
                        src={cat.image} 
                        alt={cat.label} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className={`text-[11px] font-medium text-center leading-tight line-clamp-2 transition-colors ${
                      isSelected ? "text-cyan-300 font-bold" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="py-4 sm:py-8 container mx-auto px-3 sm:px-6 mb-12 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-mono text-slate-400">
            Kategori Aktif: <strong className="text-cyan-400">{selectedCategory}</strong>
          </p>
        </div>

        {isLoading ? (
          <div className="w-full py-12 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 border-r-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-4" />
            <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
              MENYARING DATA PRODUK...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-xs sm:text-sm">Belum ada produk untuk pencarian atau kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <AnimatePresence>
              {products.map((product) => {
                const categoryName = product.product_categories?.[0]?.categories?.name || "General";
                const storeName = product.stores?.name || "Official Store";
                const priceFormatted = `Rp ${Number(product.price).toLocaleString("id-ID")}`;

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative rounded-xl sm:rounded-2xl p-[1px] sm:p-[1.5px] cursor-pointer transition-all duration-300 bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500"
                  >
                    <div className="w-full h-full p-2.5 sm:p-5 rounded-[11px] sm:rounded-[15px] bg-slate-950/95 flex flex-col justify-between relative overflow-hidden border border-white/5">
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2 z-10">
                        <span className={`w-max px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider ${
                          product.tag === 'Limited' 
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

                      <div className="w-full h-28 sm:h-36 rounded-lg sm:rounded-xl flex items-center justify-center p-4 relative group-hover:scale-105 transition-transform duration-300 bg-slate-900/80 border border-white/5 overflow-hidden text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-500/10 pointer-events-none" />
                        <span className="text-sm sm:text-lg font-black text-slate-200 tracking-wide line-clamp-2 z-10 group-hover:text-cyan-300 transition-colors">
                          {product.name}
                        </span>
                      </div>

                      <div className="mt-2 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-widest font-mono">
                              {categoryName}
                            </p>
                            <p className="text-[9px] text-slate-500 truncate max-w-[80px]">
                              {storeName}
                            </p>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                            {product.name}
                          </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-2 border-t border-white/10 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-black text-white shrink-0">
                              {priceFormatted}
                            </span>
                            <span className="text-[9px] text-emerald-400">
                              Sisa Stok: {product.stock}
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
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}