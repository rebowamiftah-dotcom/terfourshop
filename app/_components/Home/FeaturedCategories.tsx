"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const GRADIENTS = [
  "from-purple-600 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-amber-400 to-orange-500",
];

// Fungsi untuk menentukan gambar asli yang berbeda sesuai nama kategori
const getFallbackImage = (categoryName: string) => {
  const name = (categoryName || "").toLowerCase();
  
  if (name.includes("fashion") || name.includes("baju") || name.includes("pakaian")) {
    return "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"; // Foto rak baju/fashion
  }
  if (name.includes("elektronik") || name.includes("tv") || name.includes("ac")) {
    // LINK DIPERBARUI: Menggunakan foto perangkat elektronik/gadget yang lebih stabil
    return "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80"; 
  }
  if (name.includes("komputer") || name.includes("aksesoris")) {
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"; // Foto setup komputer/aksesoris
  }
  if (name.includes("makanan") || name.includes("minuman") || name.includes("food")) {
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"; // Foto hidangan makanan
  }
  
  // Default gambar retail umum jika nama kategori tidak masuk dalam list di atas
  return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80"; 
};

export default function FeaturedCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH KATEGORI DARI API ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const responseData = await res.json();

        if (responseData.success) {
          // Dibatasi hanya mengambil 4 kategori teratas saja
          setCategories(responseData.categories.slice(0, 4));
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 container mx-auto px-6 relative bg-slate-950 text-white text-center">
        <p className="text-xs font-mono text-purple-400 tracking-widest animate-pulse">
          MEMUAT KATEGORI PRODUK...
        </p>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 container mx-auto px-6 relative bg-slate-950 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
            TERFOURSHOP
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">
            Jelajahi Kategori Pilihan
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0 font-light">
          Temukan berbagai macam produk berkualitas tinggi yang dikurasi khusus untuk memenuhi kebutuhan gaya hidup Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const gradientClass = GRADIENTS[index % GRADIENTS.length];
          // Gunakan gambar dari database JIKA ADA, jika kosong gunakan fungsi dinamis
          const categoryImage = cat.image || getFallbackImage(cat.name);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -2, scale: 0.98 }}
              onClick={() => router.push(`/shopping?category=${cat.name}`)}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* RUNNING RAINBOW BORDER */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 -z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #f43f5e, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #f43f5e)",
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
              <div className="w-full h-full p-5 rounded-[15px] bg-slate-950 flex flex-col justify-between relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-200`}
                />

                {/* Kontainer Gambar Kategori */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                  <img
                    src={categoryImage}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Jika URL database error/rusak, fallback ke fungsi dinamis
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackImage(cat.name);
                    }}
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-cyan-300 border border-white/10 z-10 backdrop-blur-sm">
                    {cat.product_categories?.length || 0} Produk
                  </span>
                </div>

                {/* Judul & Keterangan Kategori */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed line-clamp-2">
                    {cat.description || `Koleksi lengkap dan resmi di bawah klasifikasi ${cat.name}.`}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}