"use client";

import { motion, useSpring, useTransform, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Background from "../Background/Background";
import CountUp from "../CountUp"; // Impor komponen CountUp (sesuaikan path foldernya)

export default function HeroSection() {
  const router = useRouter();

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
    <section className="relative h-[84dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 3D BACKGROUND CONTAINER */}
      <Background />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-h-[900px] py-12"
      >
        {/* Badge Pengumuman */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-xs sm:text-sm text-purple-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Next-Gen Shopping Experience
          </div>
        </motion.div>

       {/* Headline Utama */}
        <motion.h1 
           variants={itemVariants} 
           className="max-w-4xl text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4">
           Masa Depan <span className="whitespace-nowrap">E-Commerce</span> <br className="hidden sm:inline" />
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

        {/* Metric / Live Stats Menggunakan CountUp */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 pt-8 w-full max-w-2xl text-slate-300">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <CountUp from={0} to={10} duration={2} />K+
            </p>
            <p className="text-xs text-slate-400">Produk Digital & Fisik</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <CountUp from={0} to={99.9} duration={2} />%
            </p>
            <p className="text-xs text-slate-400">Kepuasan Pelanggan</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xl sm:text-2xl font-bold text-white">
             <CountUp from={0.00} to={0.02} duration={5} />s
            </p>
            <p className="text-xs text-slate-400">Render Latency</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}