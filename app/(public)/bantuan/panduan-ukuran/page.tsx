"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function PanduanUkuranPage() {
  const [activeTab, setActiveTab] = useState<"pakaian" | "sepatu">("pakaian");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      

      <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 flex-grow relative z-10 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-slate-400">Bantuan</span>
          <span>/</span>
          <span className="text-slate-200 font-medium">Panduan Ukuran</span>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
            Size Chart Vault
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Panduan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Ukuran</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Pastikan barang pesananmu pas di badan. Gunakan acuan tabel ukuran resmi TerfourShop di bawah ini sebelum membeli.
          </p>
        </div>

        {/* Tab Selector Switcher */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("pakaian")}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "pakaian"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            👕 Pakaian & Jaket
          </button>
          <button
            onClick={() => setActiveTab("sepatu")}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "sepatu"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            👟 Sepatu & Alas Kaki
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "pakaian" ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md overflow-x-auto">
              <h2 className="text-base font-bold text-purple-300 mb-4 flex items-center gap-2">
                <span>📏</span> Ukuran Baju, Kaos & Jaket (Unisex)
              </h2>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="pb-3 px-3">Ukuran</th>
                    <th className="pb-3 px-3">Lebar Dada (cm)</th>
                    <th className="pb-3 px-3">Panjang Baju (cm)</th>
                    <th className="pb-3 px-3">Panjang Lengan (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-purple-400">S</td>
                    <td className="py-3 px-3">48 - 50</td>
                    <td className="py-3 px-3">68</td>
                    <td className="py-3 px-3">21</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-purple-400">M</td>
                    <td className="py-3 px-3">51 - 53</td>
                    <td className="py-3 px-3">71</td>
                    <td className="py-3 px-3">22</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-purple-400">L</td>
                    <td className="py-3 px-3">54 - 56</td>
                    <td className="py-3 px-3">74</td>
                    <td className="py-3 px-3">23</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-purple-400">XL</td>
                    <td className="py-3 px-3">57 - 59</td>
                    <td className="py-3 px-3">77</td>
                    <td className="py-3 px-3">24</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md overflow-x-auto">
              <h2 className="text-base font-bold text-cyan-300 mb-4 flex items-center gap-2">
                <span>👟</span> Konversi Ukuran Sepatu
              </h2>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="pb-3 px-3">EUR</th>
                    <th className="pb-3 px-3">US</th>
                    <th className="pb-3 px-3">UK</th>
                    <th className="pb-3 px-3">Panjang Kaki (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400">38</td>
                    <td className="py-3 px-3">6</td>
                    <td className="py-3 px-3">5.5</td>
                    <td className="py-3 px-3">24.0 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400">39</td>
                    <td className="py-3 px-3">6.5</td>
                    <td className="py-3 px-3">6</td>
                    <td className="py-3 px-3">24.5 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400">40</td>
                    <td className="py-3 px-3">7.5</td>
                    <td className="py-3 px-3">7</td>
                    <td className="py-3 px-3">25.5 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400">41</td>
                    <td className="py-3 px-3">8.5</td>
                    <td className="py-3 px-3">8</td>
                    <td className="py-3 px-3">26.5 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}