"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// FUNGSI CEK APABILA HARGA >= 1 JUTA
const checkIsPriceOneMillionOrMore = (priceNumber: number) => {
  return priceNumber >= 1000000;
};

export default function FeaturedProducts() {
  const router = useRouter();
  
  // --- STATE DATA PRODUK & STATUS LOGIN ---
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  // --- FETCH DATA PRODUK DARI DATABASE API ---
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (data.success) {
          // Ambil 4 produk teratas untuk ditampilkan sebagai produk populer
          setPopularProducts(data.products.slice(0, 4));
        }
      } catch (err) {
        console.error("Gagal memuat produk populer:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  // --- LOGIKA TOMBOL PERGI KE TOKO ---
  const handleGoToStore = () => {
    if (!isRegistered) {
      router.push("/register");
    } else {
      router.push("/shopping");
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-900/30 border-t border-white/5 relative text-white text-center">
        <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
          LOADING POPULAR VAULT...
        </p>
      </section>
    );
  }

  if (popularProducts.length === 0) {
    return null; // Sembunyikan jika database masih kosong
  }

  return (
    <section className="py-24 bg-slate-900/30 border-t border-white/5 relative text-white">
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
          {popularProducts.map((item, index) => {
            // Tentukan card ketiga/tertentu sebagai Limited Edition secara dinamis atau berdasarkan tag
            const isLimited = index === 2 || item.tag === "Limited";
            
            const rawPrice = Number(item.price) || 0;
            const priceFormatted = `Rp.${rawPrice.toLocaleString("id-ID")}`;
            const isExpensive = checkIsPriceOneMillionOrMore(rawPrice);

            // Ekstraksi data relasi dari database
            const categoryName = item.product_categories?.[0]?.categories?.name || "UMUM";
            const primaryImage = item.product_images?.[0]?.image_url || "";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: isLimited ? 1.05 : 0.95 }}
                whileInView={{ opacity: 1, scale: isLimited ? 1.05 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  y: isLimited ? -10 : -5,
                  scale: isLimited ? 1.08 : 1.02,
                }}
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
                    isLimited
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-active:opacity-100"
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

                <div
                  className={`w-full h-full p-5 rounded-[15px] flex flex-col justify-between relative overflow-hidden ${
                    isLimited
                      ? "bg-slate-950/95 border border-amber-500/20"
                      : "bg-slate-950"
                  }`}
                >
                  {/* ACCENT GLOW DALAM CARD LIMITED */}
                  {isLimited && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-pink-500/20 blur-2xl pointer-events-none" />
                  )}

                  <div className="flex justify-between items-center mb-4 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        isLimited
                          ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-amber-500/20 border border-amber-300/40 animate-bounce"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {item.tag || (isLimited ? "Limited Edition" : "Best Seller")}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      ⭐ {item.rating || "5.0"}
                    </span>
                  </div>

                  {/* KOTAK VISUAL (MENAMPILKAN GAMBAR JIKA ADA, ATAU NAMA PRODUK SEBAGAI ESTETIKA) */}
                  <div
                    className={`w-full h-44 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 my-2 relative overflow-hidden text-center p-3 ${
                      isLimited
                        ? "bg-gradient-to-b from-amber-500/10 to-pink-500/10 border border-amber-500/20"
                        : "bg-slate-900/80"
                    }`}
                  >
                    {primaryImage && primaryImage.startsWith("http") ? (
                      <img 
                        src={primaryImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://via.placeholder.com/300x300/0f172a/a855f7?text=No+Image";
                        }}
                      />
                    ) : (
                      <span className="text-sm sm:text-base font-black text-slate-200 tracking-wide line-clamp-2">
                        {item.name}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p
                      className={`text-[11px] uppercase tracking-wider ${
                        isLimited
                          ? "text-amber-400 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {categoryName}
                    </p>
                    <h3
                      className={`text-base font-bold mt-1 line-clamp-1 transition-colors ${
                        isLimited
                          ? "text-amber-200 group-hover:text-pink-300"
                          : "text-white group-hover:text-pink-300"
                      }`}
                    >
                      {item.name}
                    </h3>

                    {/* KONTAINER HARGA DAN TOMBOL */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 gap-2">
                      <span
                        className={`font-black shrink-0 ${
                          isExpensive
                            ? "text-sm sm:text-base"
                            : "text-base sm:text-lg"
                        } ${isLimited ? "text-amber-300" : "text-white"}`}
                      >
                        {priceFormatted}
                      </span>

                      {/* TOMBOL PERGI KE TOKO / DETAIL */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGoToStore();
                        }}
                        className={`rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer ${
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
  );
}