"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Footer from "../../components/Footer";

// --- DUMMY DETAIL PRODUCT DATA ---
const PRODUCT_DATA = {
  id: "1",
  name: "Cyberpunk Tactical Jacket V2",
  category: "Pakaian",
  price: 1200000,
  priceFormatted: "Rp 1.200.000",
  rating: 4.9,
  soldCount: 342,
  stock: 15,
  description:
    "Jaket taktis edisi khusus dengan material waterproof grade militer dan striping LED neon terintegrasi. Dirancang untuk kenyamanan maksimal dengan estetika cyber-futuristic modern.",
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Neon Violet", class: "bg-purple-600" },
    { name: "Cyber Cyan", class: "bg-cyan-500" },
    { name: "Obsidian Black", class: "bg-slate-900" },
  ],
  images: ["🧥", "🎽", "🛡️"],
  reviews: [
    {
      id: 1,
      user: "Alex_R",
      rating: 5,
      comment: "Kualitas bahan luar biasa! Lampu neonnya menyala sangat jelas di malam hari.",
      date: "10 Aug 2026",
    },
    {
      id: 2,
      user: "Reza_Tech",
      rating: 5,
      comment: "Pengiriman cepat, packaging aman, ukurannya pas banget di badan.",
      date: "08 Aug 2026",
    },
  ],
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  // State untuk Daftar Ulasan & Form Ulasan Baru
  const [reviewsList, setReviewsList] = useState(PRODUCT_DATA.reviews);
  const [newUserName, setNewUserName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  const handleAddToCart = () => {
    alert(`Berhasil menambahkan ${quantity}x ${PRODUCT_DATA.name} (${selectedColor}, ${selectedSize}) ke Keranjang!`);
  };

  const handleBuyNow = () => {
    router.push("/cart");
  };

  // Fungsi Tambah Ulasan Baru
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Harap isi komentar ulasan Anda!");
      return;
    }

    const newReviewItem = {
      id: Date.now(),
      user: newUserName.trim() || "Pembeli Terfour",
      rating: newRating,
      comment: newComment,
      date: "Hari ini",
    };

    setReviewsList([newReviewItem, ...reviewsList]);
    setNewComment("");
    setNewUserName("");
    setNewRating(5);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/shopping" className="hover:text-purple-400 transition-colors">Katalog</Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">{PRODUCT_DATA.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 1. GALERI MEDIA (FOTO & PREVIEW 3D) */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-96 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/20 flex items-center justify-center text-9xl relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />
              {PRODUCT_DATA.images[selectedImage]}
            </motion.div>

            {/* Thumbnail Selector */}
            <div className="flex gap-4">
              {PRODUCT_DATA.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl border flex items-center justify-center text-3xl bg-slate-900 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-purple-500 shadow-md shadow-purple-500/30 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* 2. INFORMASI PRODUK & VARIASI (ALA SHOPEE) */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {PRODUCT_DATA.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                {PRODUCT_DATA.name}
              </h1>

              {/* Rating & Penjualan */}
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span className="text-amber-400 font-bold flex items-center gap-1 text-sm">
                  ⭐ {PRODUCT_DATA.rating}
                </span>
                <span>•</span>
                <span>Terjual <strong className="text-slate-200">{PRODUCT_DATA.soldCount}</strong></span>
                <span>•</span>
                <span>Stok: <strong className="text-emerald-400">{PRODUCT_DATA.stock} unit</strong></span>
              </div>
            </div>

            {/* Box Harga */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                {PRODUCT_DATA.priceFormatted}
              </p>
            </div>

            {/* Pilihan Warna */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Pilih Warna: <span className="text-purple-400">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {PRODUCT_DATA.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? "border-purple-400 bg-purple-500/20 text-white font-bold"
                        : "border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${c.class}`} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Ukuran */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Pilih Ukuran: <span className="text-purple-400">{selectedSize}</span>
              </label>
              <div className="flex gap-2">
                {PRODUCT_DATA.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "border-pink-500 bg-pink-500/20 text-pink-300 shadow-md shadow-pink-500/20"
                        : "border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pengatur Jumlah (Quantity Counter) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Jumlah Pesanan
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded-xl bg-slate-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-white/5 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(PRODUCT_DATA.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Subtotal: <strong className="text-white">Rp {(PRODUCT_DATA.price * quantity).toLocaleString("id-ID")}</strong>
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS (KERANJANG & BELI SEKARANG) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                🛒 + Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Beli Sekarang
              </button>
            </div>

          </div>

        </div>

        {/* 3. TABS DESKRIPSI & ULASAN PEMBELI */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="flex gap-8 border-b border-white/10 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("desc")}
              className={`text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "desc"
                  ? "text-purple-400 border-b-2 border-purple-500 pb-4 -mb-4"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "reviews"
                  ? "text-purple-400 border-b-2 border-purple-500 pb-4 -mb-4"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Ulasan ({reviewsList.length})
            </button>
          </div>

          {activeTab === "desc" ? (
            <div className="text-slate-300 text-sm leading-relaxed space-y-4 max-w-3xl">
              <p>{PRODUCT_DATA.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400 font-mono">
                <li>Material: High-Grade Cyber-Polymer & Cotton Blend</li>
                <li>Waterproof Rating: IPX-6</li>
                <li>Fit Type: Tactical Urban Fit</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl">
              {/* FORM BUAT ULASAN */}
              <form
                onSubmit={handleAddReview}
                className="p-5 rounded-xl bg-slate-900 border border-purple-500/20 space-y-4"
              >
                <h3 className="text-sm font-bold text-purple-300">Tulis Ulasan Anda</h3>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Nama Pengulas */}
                  <input
                    type="text"
                    placeholder="Nama Anda (opsional)"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />

                  {/* Rating Bintang (Clickable) */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`text-lg cursor-pointer transition-transform ${
                          star <= newRating ? "scale-110 opacity-100" : "opacity-30"
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                {/* Teks Komentar */}
                <textarea
                  rows={3}
                  placeholder="Tulis pendapat kamu tentang produk ini..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Kirim Ulasan
                </button>
              </form>

              {/* DAFTAR ULASAN */}
              <div className="space-y-4">
                <AnimatePresence>
                  {reviewsList.map((rev) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300">{rev.user}</span>
                        <span className="text-[10px] text-slate-500">{rev.date}</span>
                      </div>
                      <div className="text-xs text-amber-400">{"⭐".repeat(rev.rating)}</div>
                      <p className="text-xs text-slate-300 font-light">{rev.comment}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}