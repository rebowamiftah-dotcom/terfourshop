"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Fungsi untuk memberikan gambar kategori yang dinamis dan sesuai jika database kosong
const getCategoryFallbackImage = (categoryName: string) => {
  const name = (categoryName || "").toLowerCase();
  
  if (name.includes("fashion") || name.includes("baju") || name.includes("pakaian")) {
    return "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("elektronik") || name.includes("tv") || name.includes("ac")) {
    return "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("komputer") || name.includes("aksesoris")) {
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("makanan") || name.includes("minuman") || name.includes("food")) {
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("rumah tangga") || name.includes("home")) {
    return "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("kecantikan") || name.includes("beauty") || name.includes("skincare")) {
    return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("mainan") || name.includes("toys") || name.includes("game")) {
    return "https://images.unsplash.com/photo-1606813902870-1f3e5b8c9f6d?auto=format&fit=crop&w=300&q=80";
  }
  if (name.includes("tas") || name.includes("sepatu") || name.includes("shoe")) {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80";
  }
  
  return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=300&q=80";
};

export default function ShoppingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // --- FETCH KATEGORI DINAMIS DARI DATABASE ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // --- FETCH PRODUK BERDASARKAN FILTER & SEARCH ---
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
        console.error("Gagal mengambil produk:", err);
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
    alert(`🛒 1x ${productName} berhasil diamankan ke keranjang TerfourShop!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* --- STICKY SEARCH BAR --- */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/15 py-4 px-3 sm:px-6 shadow-2xl">
        <div className="container mx-auto max-w-4xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari Yang Kamu Inginkan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900 border border-white/20 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">🔍</span>
          </div>
        </div>
      </div>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 sm:pt-20 pb-6 sm:pb-10 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-b border-purple-500/20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] sm:w-[600px] h-[120px] sm:h-[250px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
            TerfourShop
          </span>
          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight">
            Produk <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">yang Kami Jual</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed px-2">
            Temukan berbagai macam produk berkualitas tinggi yang dikurasi khusus untuk memenuhi kebutuhan gaya hidup Anda.
          </p>
        </div>
      </section>

      {/* --- PANEL UTAMA (KATEGORI DINAMIS) --- */}
      <section className="py-6 container mx-auto px-3 sm:px-6 relative z-10">
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              Klasifikasi Kategori
            </h2>
            {selectedCategory !== "All" && (
              <button 
                onClick={() => setSelectedCategory("All")}
                className="text-xs text-cyan-400 hover:underline font-mono cursor-pointer"
              >
                Reset Filter (Semua)
              </button>
            )}
          </div>

          {isLoadingCategories ? (
            <p className="text-xs font-mono text-purple-400 animate-pulse py-4">Memuat kategori...</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[280px] overflow-y-auto no-scrollbar pr-1">
              <div
                onClick={() => setSelectedCategory("All")}
                className={`group flex flex-col items-center p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                  selectedCategory === "All"
                    ? "bg-purple-600/25 border border-purple-500/60 scale-105 shadow-lg shadow-purple-500/20"
                    : "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400 transition-colors shadow-md relative mb-2 bg-slate-950 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300">ALL</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-center leading-tight text-cyan-300 font-bold">
                  Semua Kategori
                </span>
              </div>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const categoryImage = cat.image || getCategoryFallbackImage(cat.name);

                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`group flex flex-col items-center p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-purple-600/25 border border-purple-500/60 scale-105 shadow-lg shadow-purple-500/20"
                        : "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400 transition-colors shadow-md relative mb-2 bg-slate-950">
                      <img 
                        src={categoryImage} 
                        alt={cat.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getCategoryFallbackImage(cat.name);
                        }}
                      />
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-medium text-center leading-tight line-clamp-2 transition-colors ${
                      isSelected ? "text-cyan-300 font-bold" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {cat.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="py-4 container mx-auto px-3 sm:px-6 mb-12 flex-grow">
        <div className="mb-4 flex items-center justify-between px-1">
          <p className="text-xs font-mono text-slate-400">
            Jalur Aktif: <strong className="text-cyan-400">{selectedCategory}</strong>
          </p>
        </div>

        {isLoading ? (
          <div className="w-full py-12 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 border-r-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-4" />
            <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
              MENYINKRONKAN PRODUK...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-white/5 mx-2">
            <p className="text-slate-400 text-xs sm:text-sm">Belum ada produk terdaftar untuk kategori atau pencarian ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => {
              const categoryName = product.product_categories?.[0]?.categories?.name || "Produk Utama";
              const storeName = product.stores?.name || "Official Store";
              const priceFormatted = `Rp ${Number(product.price).toLocaleString("id-ID")}`;
              const imageUrl = product.product_images?.[0]?.image_url || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80";

              return (
                <div
                  key={product.id}
                  className="group relative rounded-xl sm:rounded-2xl p-[1px] sm:p-[1.5px] cursor-pointer bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 transition-all duration-200"
                >
                  <div className="w-full h-full p-3 sm:p-5 rounded-[11px] sm:rounded-[15px] bg-slate-950/95 flex flex-col justify-between relative overflow-hidden border border-white/5">
                    
                    <div className="flex items-center justify-between gap-1 mb-2 z-10">
                      <span className="w-max px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                        TERVERIFIKASI
                      </span>

                      <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        ⭐ <strong className="text-amber-400">4.9</strong>
                      </span>
                    </div>

                    {/* KOTAK GAMBAR PRODUK */}
                    <div className="w-full h-32 sm:h-40 rounded-lg sm:rounded-xl overflow-hidden relative mb-3 bg-slate-900 border border-white/5">
                      <img 
                        src={imageUrl} 
                        alt={product.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-1 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-widest font-mono truncate max-w-[100px]">
                            {categoryName}
                          </p>
                          <p className="text-[9px] text-slate-500 truncate max-w-[80px]">
                            {storeName}
                          </p>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-2 border-t border-white/10 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-black text-white shrink-0 font-mono">
                            {priceFormatted}
                          </span>
                          <span className="text-[9px] text-emerald-400 font-mono">
                            Stok: {product.stock}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 justify-end w-full sm:w-auto">
                          <button
                            onClick={(e) => handleQuickAddToCart(e, product.name)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 text-xs transition-colors cursor-pointer"
                            title="Tambah ke Keranjang"
                          >
                            🛒
                          </button>

                          <Link
                            href={`/shopping/${product.id}`}
                            className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md transition-all active:scale-95 font-mono"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}