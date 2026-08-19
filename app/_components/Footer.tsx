"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/Footer";

export default function Footer() {
  const { language } = useLanguage();
  const text = dictionary[getLangKey(language)];

  return (
    <footer className="w-full bg-gradient-to-b from-slate-950 via-zinc-950 to-indigo-950/90 text-slate-300 border-t-2 border-purple-500/30 relative overflow-hidden shadow-[0_-20px_50px_rgba(15,23,42,0.8)]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-r from-purple-600/15 via-pink-600/10 to-cyan-600/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Grid Responsif: 1 kolom di HP, 2 kolom di Tablet (sm), 4 kolom di Laptop/Desktop (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center sm:text-left">
          
          {/*  BRAND INFO & SOCIALS */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              TERFOURSHOP
            </span>
            <p className="text-xs font-light leading-relaxed text-slate-400 max-w-xs sm:max-w-none">
              {text.brandDesc}
            </p>
          </div>

          {/* NAVIGASI CEPAT */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2.5">
              {text.navTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">
                  {text.navHome}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-300 transition-colors">
                  {text.navAbout}
                </Link>
              </li>
              <li>
                <Link href="/shopping" className="hover:text-purple-300 transition-colors">
                  {text.navCatalog}
                </Link>
              </li>
              <li>
                <Link href="/member" className="hover:text-purple-300 transition-colors">
                  {text.navMember}
                </Link>
              </li>
            </ul>
          </div>

          {/* BANTUAN & LAYANAN */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-pink-400 pl-2.5">
              {text.helpTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="#" 
                  className="hover:text-pink-300 transition-colors opacity-60 cursor-not-allowed" 
                  title={text.helpTrackingBadge}
                >
                  {text.helpTracking}
                </a>
              </li>
              <li>
                <Link href="/bantuan/panduan-ukuran" className="hover:text-pink-300 transition-colors">
                  {text.helpSizeGuide}
                </Link>
              </li>
              <li>
                <Link href="/bantuan/kebijakan-privasi" className="hover:text-pink-300 transition-colors">
                  {text.helpPrivacy}
                </Link>
              </li>
              <li>
                <Link href="/bantuan/syarat-ketentuan" className="hover:text-pink-300 transition-colors">
                  {text.helpTerms}
                </Link>
              </li>
            </ul>
          </div>

          {/* KONTAK */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2.5">
              {text.contactTitle}
            </h4>
            <div className="space-y-2 text-xs font-light">
              <p className="text-slate-200 font-medium">{text.schoolName}</p>
              <p className="text-slate-400">{text.majorName}</p>
              <p className="text-slate-400 pt-1">{text.location}</p>
              <p className="text-cyan-400 pt-2 font-mono font-semibold">support@terfourshop.com</p>
            </div>
          </div>

        </div>

        {/*  COPYRIGHT LINE */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center sm:text-left">
          <p>{text.copyright}</p>
          <p className="text-[11px] font-mono">
            {text.craftedBy.split("♥")[0]}<span className="text-pink-500">♥</span>{text.craftedBy.split("♥")[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}