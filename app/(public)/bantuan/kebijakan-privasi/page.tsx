"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">

      <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 flex-grow relative z-10 max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-slate-400">Bantuan</span>
          <span>/</span>
          <span className="text-slate-200 font-medium">Kebijakan Privasi</span>
        </div>

        <div className="text-center mb-10 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
            Privacy Vault
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Privasi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Komitmen TerfourShop dalam menjaga kerahasiaan dan keamanan data pribadi penggunanya.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              🔒 1. Pengumpulan Informasi
            </h2>
            <p className="font-light">
              Kami mengumpulkan informasi penting dari Anda seperti nama lengkap, alamat email, nomor telepon, dan alamat pengiriman saat Anda melakukan pendaftaran akun atau bertransaksi di TerfourShop.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              🛠️ 2. Penggunaan Data
            </h2>
            <p className="font-light">
              Informasi yang dikumpulkan digunakan untuk memproses pesanan, memverifikasi pembayaran, memfasilitasi pengiriman ekspedisi, serta meningkatkan pengalaman belanja Anda di platform kami.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              🛡️ 3. Keamanan Informasi
            </h2>
            <p className="font-light">
              TerfourShop menerapkan protokol enkripsi standar industri untuk melindungi data pengguna dari akses, perubahan, atau pengungkapan tanpa izin. Kami tidak membagikan data Anda ke pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit dari Anda.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}