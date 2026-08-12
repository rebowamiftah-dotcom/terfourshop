"use client";

import React from "react";
import { motion } from "framer-motion";

const PAIN_POINTS = [
  {
    id: 1,
    problem: "Khawatir Produk KW & Kualitas Pas-Pasan",
    solution: "Jaminan 100% Produk Otentik & Terverifikasi",
    desc: "Setiap barang di TerfourShop melewati 5 tahap inspeksi kualitas dan memiliki sertifikat verifikasi digital.",
    icon: "🛡️",
    badge: "Garansi Ori",
  },
  {
    id: 2,
    problem: "Pengiriman Lambat & Resi Tidak Jelas",
    solution: "Sistem Logistik Latensi Rendah & Real-Time Tracking",
    desc: "Proses kemas otomatis kurang dari 2 jam dengan integrasi kurir express langsung ke lokasi Anda.",
    icon: "⚡",
    badge: "Super Cepat",
  },
  {
    id: 3,
    problem: "Desain Fashion & Gadget yang Pasaran",
    solution: "Koleksi Eksklusif Bertema Cyber-Futuristic",
    desc: "Kami menghadirkan rilis edisi terbatas (limited drop) dengan estetika modern minimalis yang beda dari yang lain.",
    icon: "🔮",
    badge: "Eksklusif",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Pengenalan */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Mengapa TerfourShop Ada?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Kami Mengubah Cara Anda Berbelanja Online
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Banyak toko online menawarkan barang serupa, tetapi kami fokus menyelesaikan masalah utama yang sering dialami pembeli modern.
          </p>
        </div>

        {/* Grid Penyelesaian Masalah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -2, scale: 0.98 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Running Rainbow Border */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 -z-10"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #ec4899)",
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

              {/* Inner Card Container */}
              <div className="w-full h-full p-8 rounded-[15px] bg-slate-900/90 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                  </div>

                  {/* Problem & Solution comparison */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-rose-400/90 font-medium line-through decoration-rose-500/60">
                      ✕ {item.problem}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      ✓ {item.solution}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}