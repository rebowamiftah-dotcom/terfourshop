"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RunningMarquee() {
  const marqueeText = (
    <div className="flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wider text-purple-200 pr-8 shrink-0 py-3">
      <span>GRATIS ONGKIR SELURUH INDONESIA UNTUK MEMBER BARU</span>
      <span className="text-pink-400">✦</span>
      <span>DISKON SPESIAL PELUNCURAN TERFOURSHOP HINGGA 40%</span>
      <span className="text-cyan-400">✦</span>
      <span>PENGALAMAN BELANJA BERSAMA TERFOURSHOP</span>
      <span className="text-purple-400">✦</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border-t border-white/10 overflow-hidden relative z-20">
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