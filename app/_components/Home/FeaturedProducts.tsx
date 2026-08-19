"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/FeaturedProducts";

// Fungsi cek harga >= 1 Juta
const checkIsPriceOneMillionOrMore = (priceNumber: number) => {
  return priceNumber >= 1000000;
};

export default function FeaturedProducts() {
  const router = useRouter();
  const { data: session } = useSession(); // Mengecek status login/pendaftaran user secara nyata
  const { language } = useLanguage();
  const text = dictionary[getLangKey(language)];
  
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA PRODUK DARI API
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (data.success) {
          // Ambil 4 produk teratas untuk ditampilkan
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

  const handleGoToStore = () => {
    if (!session) {
      router.push("/register");
    } else {
      router.push("/shopping");
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-900/30 border-t border-white/5 relative text-white text-center">
        <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
          {text.loadingText}
        </p>
      </section>
    );
  }

  if (popularProducts.length === 0) {
    return null; 
  }

  return (
    <section className="py-24 bg-slate-900/30 border-t border-white/5 relative text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-400">
            {text.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
            {text.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {popularProducts.map((item, index) => {
            const isLimited = index === 2 || item.tag === "Limited";
            
            const rawPrice = Number(item.price) || 0;
            const priceFormatted = `Rp.${rawPrice.toLocaleString("id-ID")}`;
            const isExpensive = checkIsPriceOneMillionOrMore(rawPrice);

            const categoryName = item.product_categories?.[0]?.categories?.name || text.defaultCategory;
            const primaryImage = item.product_images?.[0]?.image_url || "";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: isLimited ? -8 : -4 }}
                onClick={() => router.push(`/shopping`)}
                className={`group relative rounded-2xl p-[1.5px] cursor-pointer transition-all duration-300 ${
                  isLimited
                    ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 shadow-xl shadow-pink-500/10 z-20"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`w-full h-full p-5 rounded-[15px] flex flex-col justify-between relative overflow-hidden ${
                    isLimited
                      ? "bg-slate-950/95 border border-amber-500/20"
                      : "bg-slate-950"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        isLimited
                          ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-amber-500/20"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {item.tag || (isLimited ? text.limitedEdition : text.bestSeller)}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      ⭐ {item.rating || "5.0"}
                    </span>
                  </div>

                  {/* KOTAK GAMBAR PRODUK */}
                  <div
                    className={`w-full h-44 rounded-xl flex items-center justify-center my-2 relative overflow-hidden text-center p-3 bg-slate-900/80`}
                  >
                    {primaryImage && primaryImage.startsWith("http") ? (
                      <img 
                        src={primaryImage} 
                        alt={item.name} 
                        loading="lazy"
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    ) : (
                      <span className="text-sm sm:text-base font-black text-slate-200 tracking-wide line-clamp-2">
                        {item.name}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className={`text-[11px] uppercase tracking-wider ${isLimited ? "text-amber-400 font-semibold" : "text-slate-400"}`}>
                      {categoryName}
                    </p>
                    <h3 className={`text-base font-bold mt-1 line-clamp-1 transition-colors ${isLimited ? "text-amber-200 group-hover:text-pink-300" : "text-white group-hover:text-pink-300"}`}>
                      {item.name}
                    </h3>

                    {/* HARGA DAN TOMBOL */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 gap-2">
                      <span className={`font-black shrink-0 ${isExpensive ? "text-sm sm:text-base" : "text-base sm:text-lg"} ${isLimited ? "text-amber-300" : "text-white"}`}>
                        {priceFormatted}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGoToStore();
                        }}
                        className={`rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer ${
                          isExpensive ? "px-2.5 py-1.5 text-[10px]" : "px-3.5 py-2 text-xs"
                        } ${
                          isLimited
                            ? "bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white shadow-md shadow-pink-500/20"
                            : "bg-white/10 hover:bg-purple-600 text-white"
                        }`}
                      >
                        {text.goToStore}
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