"use client";

import { motion, useSpring, useTransform, Variants } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";
import Background from "../Background/Background";

// Komponen Counter khusus yang pasti dimulai dari angka 0
function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [isClient, setIsClient] = useState(false);
  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  const display = useTransform(spring, (current) => `${current.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    setIsClient(true);
    // Memastikan angka mulai beranimasi dari 0 ke nilai target saat halaman dirender
    spring.set(0);
    const timer = setTimeout(() => {
      spring.set(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [spring, value]);

  if (!isClient) {
    return <span>0{suffix}</span>;
  }

  return <motion.span>{display}</motion.span>;
}

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 3D BACKGROUND CONTAINER (z-0 agar tidak tertutup bg-slate-950) */}

      <Background />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER (z-10 agar berada paling depan) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-h-[900px] py-12"
      >
        {/* Badge Pengumuman / Highlight */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-xs sm:text-sm text-purple-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Next-Gen Shopping Experience
          </div>
        </motion.div>

        {/* Headline Utama */}
        <motion.h1 variants={itemVariants} className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4">
          Masa Depan E-Commerce <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
            Bersama TerfourShop 
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={itemVariants} className="max-w-xl text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-light">
          Jelajahi produk eksklusif dengan pengalaman interaktif imersif. 
          Belanja lebih cepat, interaktif, dan futuristik langsung dari browser Anda.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-sm sm:max-w-md">
          <Link
            href="/shop"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
          >
            Jelajahi Toko
          </Link>
          <Link
            href="/about"
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
          >
            Tentang Kami
          </Link>
        </motion.div>

        {/* Metric / Live Stats dengan Animasi Angka Murni dari 0 */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 w-full max-w-2xl text-slate-300">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <Counter value={10} suffix="K+" />
            </p>
            <p className="text-xs text-slate-400">Produk Digital & Fisik</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <Counter value={99.9} decimals={1} suffix="%" />
            </p>
            <p className="text-xs text-slate-400">Kepuasan Pelanggan</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xl sm:text-2xl font-bold text-white">
              <Counter value={0.02} decimals={2} suffix="s" />
            </p>
            <p className="text-xs text-slate-400">Render Latency</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}