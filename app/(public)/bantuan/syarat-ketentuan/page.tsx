"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      

      <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 flex-grow relative z-10 max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-slate-400">Bantuan</span>
          <span>/</span>
          <span className="text-slate-200 font-medium">Syarat & Ketentuan</span>
        </div>

        <div className="text-center mb-10 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
            Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Syarat & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Ketentuan</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Ketentuan penggunaan layanan dan kesepakatan transaksi belanja di TerfourShop.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              📝 1. Akun & Pembelian
            </h2>
            <p className="font-light">
              Pembeli wajib memberikan informasi diri yang akurat saat pendaftaran dan pesanan. Pengguna bertanggung jawab penuh atas keamanan kata sandi dan kerahasiaan akun pribadi.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              💳 2. Harga & Pembayaran
            </h2>
            <p className="font-light">
              Semua harga tertera dalam Rupiah (IDR). Pembayaran harus diselesaikan sesuai dengan invoice batas waktu yang telah ditentukan (1x24 jam) untuk menghindari pembatalan otomatis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              📦 3. Pengembalian Produk (Retur)
            </h2>
            <p className="font-light">
              Pengajuan retur hanya diterima apabila disertai dengan <strong>Video Unboxing</strong> tanpa terputus sejak paket pertama kali diterima. Batas pengajuan klaim maksimal 2x24 jam dari waktu status pengiriman selesai.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}