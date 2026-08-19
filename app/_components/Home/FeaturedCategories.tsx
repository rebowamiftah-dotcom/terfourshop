"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/FeaturedCategories";

const GRADIENTS = [
  "from-purple-600 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-amber-400 to-orange-500",
];

export default function FeaturedCategories() {
  const router = useRouter();
  const { language } = useLanguage();
  const text = dictionary[getLangKey(language)];

  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH KATEGORI DARI API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const responseData = await res.json();

        if (responseData.success) {
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
          {text.loadingText}
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
            {text.brand}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">
            {text.title}
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0 font-light">
          {text.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const gradientClass = GRADIENTS[index % GRADIENTS.length];

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
                {/* Kontainer Gambar Kategori (Murni dari image_url database) */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                  {cat.image_url ? (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                      No Image Available
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-cyan-300 border border-white/10 z-10 backdrop-blur-sm">
                    {cat.product_categories?.length || 0} {text.productCountText}
                  </span>
                </div>
                {/* Judul & Keterangan Kategori */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed line-clamp-2">
                    {cat.description || `${text.defaultDescription} ${cat.name}.`}
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