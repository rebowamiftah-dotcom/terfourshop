"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

import Background from "../Background/Background";
import CountUp from "../CountUp"; 

import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/HeroSection";

export default function HeroSection() {
  const router = useRouter(); 
  const { language } = useLanguage();

  // Mengambil teks dari dictionary berdasarkan bahasa yang aktif
  const text = dictionary[getLangKey(language)];

  // Fungsi langsung mengarah ke halaman shopping
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/shopping");
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
    <section className="relative min-h-[85dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16">
      <Background />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center max-w-4xl my-auto"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-xs sm:text-sm text-purple-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            {text.badge}
          </div>
        </motion.div>

        {/* Headline diperbarui agar ukuran responsifnya pas dan tidak turun menjadi 3 baris */}
        <motion.h1 
          variants={itemVariants} 
          className="max-w-4xl text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.2] mb-4"
        >
          <span className="block mb-1">{text.headlinePrefix}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
            {text.headlineSuffix}
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-xl text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed font-light">
          {text.subheadline}
        </motion.p>

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

        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 sm:gap-12 mt-12 pt-8 w-full max-w-2xl text-slate-300">
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-2xl font-bold text-white">
              <CountUp from={0} to={42} duration={2} />+
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400">{text.statsProduct}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-2xl font-bold text-white">
              <CountUp from={0} to={99.9} duration={2} />%
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400">{text.statsSatisfaction}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-2xl font-bold text-white">
              <CountUp from={0.00} to={1.2} duration={3} />ms
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400">{text.statsLatency}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}