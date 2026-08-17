"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    q: "Bagaimana cara melacak pesanan saya?",
    a: "Saat ini fitur pelacakan otomatis sedang dalam pengembangan. Namun, Anda dapat menghubungi CS kami melalui WhatsApp untuk mendapatkan update status paket Anda secara real-time."
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima berbagai metode pembayaran mulai dari Transfer Bank, E-Wallet (Dana, OVO, GoPay), hingga pembayaran melalui gerai ritel seperti Indomaret/Alfamart."
  },
  {
    q: "Berapa lama estimasi pengiriman barang?",
    a: "Estimasi pengiriman bergantung pada lokasi tujuan dan ekspedisi yang dipilih. Biasanya memakan waktu 2-4 hari kerja untuk wilayah pulau Jawa dan 3-7 hari kerja untuk luar pulau."
  },
  {
    q: "Apakah produk di TerfourShop bergaransi?",
    a: "Ya, sebagian besar produk elektronik kami dilengkapi dengan garansi resmi. Untuk produk non-elektronik, kami memberikan garansi tukar barang jika terjadi kerusakan saat pengiriman (syarat & ketentuan berlaku)."
  },
  {
    q: "Bagaimana cara mengubah alamat pengiriman?",
    a: "Jika pesanan belum diproses/dikirim, Anda bisa segera menghubungi CS kami melalui WhatsApp untuk meminta perubahan alamat dengan melampirkan nomor pesanan Anda."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between pt-24 sm:pt-32">
      <div className="container mx-auto px-6 max-w-3xl flex-grow mb-16">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border border-pink-500/30">
            ❓
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Pusat FAQ</h1>
          <p className="text-slate-400 leading-relaxed">
            Temukan jawaban atas pertanyaan yang sering diajukan pelanggan kami. Jika tidak menemukan jawaban Anda di sini, tim kami siap membantu.
          </p>
        </div>

        {/* --- FAQ ACCORDION --- */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">{item.q}</span>
                <span className="text-pink-400">{activeIndex === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- TOMBOL KEMBALI --- */}
        <div className="mt-12 text-center">
          <Link 
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold transition-all shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95"
          >
            Kembali ke Pusat Bantuan
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}