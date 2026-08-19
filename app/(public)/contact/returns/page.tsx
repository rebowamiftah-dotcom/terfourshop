"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between pt-24 sm:pt-32">
      <div className="container mx-auto px-6 max-w-4xl flex-grow mb-16">
        
        {/* --- BAGIAN HEADER --- */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border border-purple-500/30">
            🔄
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Kebijakan Retur & Garansi</h1>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            TerfourShop berkomitmen untuk memastikan Anda mendapatkan produk terbaik. Jika Anda tidak sepenuhnya puas dengan pembelian Anda, kami siap membantu melalui prosedur yang jelas dan transparan.
          </p>
        </div>

        {/* --- BAGIAN KONTEN / ISI KEBIJAKAN --- */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 text-sm sm:text-base text-slate-300 shadow-2xl">
          
          {/* Poin 1 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-purple-400">1.</span> Syarat Utama Pengembalian Barang
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-slate-400">
              <li>Permintaan retur harus diajukan maksimal <strong className="text-slate-200">7x24 jam</strong> setelah status pesanan berubah menjadi "Diterima".</li>
              <li>Barang harus dalam kondisi utuh, belum digunakan, tidak kotor, dan lengkap dengan label serta kemasan aslinya.</li>
              <li>Wajib menyertakan <strong className="text-slate-200">Video Unboxing</strong> yang jelas, tanpa jeda (no pause), dari awal paket belum dibuka hingga terlihat cacat/kerusakan produk.</li>
            </ul>
          </div>

          <div className="w-full h-px bg-white/5" /> {/* Garis Pemisah */}

          {/* Poin 2 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-purple-400">2.</span> Pengecualian (Barang Non-Retur)
            </h2>
            <p className="mb-3 text-slate-400">Beberapa kategori produk di bawah ini tidak dapat dikembalikan dengan alasan kebersihan, lisensi, atau keamanan:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-slate-400">
              <li>Produk digital (Lisensi software, voucher game, e-book).</li>
              <li>Pakaian dalam, pakaian renang, kosmetik, dan produk kebersihan pribadi yang segelnya telah dibuka.</li>
              <li>Kerusakan produk yang disebabkan oleh kelalaian pengguna (<i className="text-slate-300">human error</i>) seperti terjatuh, tergores, atau terkena air.</li>
            </ul>
          </div>

          <div className="w-full h-px bg-white/5" /> {/* Garis Pemisah */}

          {/* Poin 3 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-purple-400">3.</span> Proses Pengembalian Dana (Refund)
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-slate-400">
              <li>Pengembalian dana akan diproses setelah paket retur sampai di gudang TerfourShop dan lolos pengecekan oleh tim Quality Control (maksimal 3x24 jam kerja).</li>
              <li>Dana akan dikembalikan langsung ke metode pembayaran awal atau dialihkan menjadi Saldo TerfourShop sesuai keinginan Anda.</li>
              <li>Biaya ongkos kirim untuk pengembalian barang karena cacat pabrik atau kesalahan pengiriman akan <strong className="text-slate-200">ditanggung sepenuhnya</strong> oleh TerfourShop.</li>
            </ul>
          </div>

        </div>

        {/* --- TOMBOL KEMBALI --- */}
        <div className="mt-12 text-center">
          <Link 
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95"
          >
            Kembali ke Pusat Bantuan
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}