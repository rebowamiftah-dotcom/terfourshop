"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

export default function FeaturedCategories() {
  return (
    <section className="py-20 container mx-auto px-6 relative bg-slate-950 text-white">
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
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-200`}
              />

              {/* Kontainer Gambar Kategori */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Judul & Keterangan Kategori */}
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
  );
}