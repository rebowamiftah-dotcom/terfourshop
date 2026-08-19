"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/RunningMarquee";

export default function RunningMarquee() {
  const { language } = useLanguage();

  // Mengambil teks dari dictionary berdasarkan bahasa yang aktif
  const text = dictionary[getLangKey(language)];

  const marqueeText = (
    <div className="flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wider text-purple-200 pr-8 shrink-0 py-3">
      <span>{text.freeShipping}</span>
      <span className="text-pink-400">✦</span>
      <span>{text.launchDiscount}</span>
      <span className="text-cyan-400">✦</span>
      <span>{text.shoppingExperience}</span>
      <span className="text-purple-400">✦</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border-y border-white/50 overflow-hidden relative z-20">
      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {marqueeText}
        {marqueeText}
        {marqueeText}
        {marqueeText}
      </motion.div>
    </div>
  );
}