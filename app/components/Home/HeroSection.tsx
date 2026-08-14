"use client";

// 1. Tambahkan useState & useEffect di sini
import { useState, useEffect } from "react"; 
import { motion, Variants } from "framer-motion";
import Link from "next/link";
// 2. Tambahkan useRouter dari next/navigation untuk handleExploreClick
import { useRouter } from "next/navigation"; 

import Background from "../Background/Background";
import CountUp from "../CountUp"; 

import { useLanguage } from "../Contexts/LanguageContext"; // Sesuaikan path jika berbeda
import { getLangKey } from "@/app/lib/language";
import { dictionary } from "@/app/_dictionaries/HeroSection";

export default function HeroSection() {
  const router = useRouter(); // Inisialisasi router
  const { language } = useLanguage();

  // Pilih teks sesuai bahasa aktif (default ke 'id')
  const text = dictionary[getLangKey(language)];

  // State untuk status pendaftaran dan login
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Pengecekan status pendaftaran dan login dari localStorage/auth
    const registeredUser = localStorage.getItem("isRegistered");
    const loggedInUser = localStorage.getItem("isLoggedIn");

    if (registeredUser === "true") setIsRegistered(true);
    if (loggedInUser === "true") setIsLoggedIn(true);
  }, []);

  // Handler navigasi tombol "Jelajahi Toko"
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isRegistered) {
      router.push("/register");
    } else if (isLoggedIn) {
      router.push("/shopping");
    } else {
      router.push("/login");
    }
  };

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
            {text.badge}
          </div>
        </motion.div>

        {/* Headline Utama */}
        <motion.h1 
          variants={itemVariants} 
          className="max-w-4xl text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4"
        >
          {text.headlinePrefix} <span className="whitespace-nowrap">E-Commerce</span> <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
            {text.headlineSuffix}
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={itemVariants} className="max-w-xl text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-light">
          {text.subheadline}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-sm sm:max-w-md">
          <Link
            href="/shopping"
            onClick={handleExploreClick}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
          >
            {text.btnShop}
          </Link>
          <Link
            href="/about"
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
          >
            {text.btnAbout}
          </Link>
        </motion.div>

        {/* Metric / Live Stats Menggunakan CountUp */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 pt-8 w-full max-w-2xl text-slate-300">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <CountUp from={0} to={10} duration={2} />K+
            </p>
            <p className="text-xs text-slate-400">{text.statsProduct}</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              <CountUp from={0} to={99.9} duration={2} />%
            </p>
            <p className="text-xs text-slate-400">{text.statsSatisfaction}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xl sm:text-2xl font-bold text-white">
              <CountUp from={0.00} to={0.02} duration={5} />s
            </p>
            <p className="text-xs text-slate-400">{text.statsLatency}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}