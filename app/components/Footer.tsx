"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-slate-950 via-zinc-950 to-indigo-950/90 text-slate-300 border-t-2 border-purple-500/30 relative overflow-hidden shadow-[0_-20px_50px_rgba(15,23,42,0.8)]">
      {/* Background Accent Glow & Top Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-r from-purple-600/15 via-pink-600/10 to-cyan-600/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* 1. BRAND INFO & SOCIALS */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                TERFOURSHOP
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-slate-400">
              Interactive Cyber-Futuristic E-Commerce Platform. Menghadirkan produk unggulan dengan pengalaman visual 3D yang imersif dan terpercaya.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-purple-600/30 border border-purple-500/20 flex items-center justify-center text-sm text-white transition-all duration-200 hover:scale-110 shadow-md shadow-purple-950/50"
              >
                🌐
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-pink-600/30 border border-pink-500/20 flex items-center justify-center text-sm text-white transition-all duration-200 hover:scale-110 shadow-md shadow-pink-950/50"
              >
                📸
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-cyan-600/30 border border-cyan-500/20 flex items-center justify-center text-sm text-white transition-all duration-200 hover:scale-110 shadow-md shadow-cyan-950/50"
              >
                💬
              </a>
            </div>
          </div>

          {/* 2. NAVIGASI CEPAT */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2.5">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-300 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/shopping" className="hover:text-purple-300 transition-colors">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/member" className="hover:text-purple-300 transition-colors">
                  Gabung Member
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. BANTUAN & LAYANAN */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-pink-400 pl-2.5">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-pink-300 transition-colors opacity-60 cursor-not-allowed" title="Fitur Segera Hadir">
                  Lacak Pesanan
                </a>
              </li>
              <li>
                <Link href="/bantuan/panduan-ukuran" className="hover:text-pink-300 transition-colors">
                  Panduan Ukuran
                </Link>
              </li>
              <li>
                <Link href="/bantuan/kebijakan-privasi" className="hover:text-pink-300 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/bantuan/syarat-ketentuan" className="hover:text-pink-300 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. INFORMASI KONTAK */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2.5">
              Kontak Tim
            </h4>
            <div className="space-y-2 text-xs font-light">
              <p className="text-slate-200 font-medium">SMK Teratai Putih Global 4 Bekasi</p>
              <p className="text-slate-400">Jurusan Rekayasa Perangkat Lunak (RPL)</p>
              <p className="text-slate-400 pt-1">Bekasi, Jawa Barat, Indonesia</p>
              <p className="text-cyan-400 pt-2 font-mono font-semibold">support@terfourshop.com</p>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT LINE */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 TerfourShop Team. All rights reserved.</p>
          <p className="text-[11px] font-mono">
            Crafted with <span className="text-pink-500">♥</span> by Tim RPL SMK TPG 4
          </p>
        </div>
      </div>
    </footer>
  );
}