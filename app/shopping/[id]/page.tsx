"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productId = params?.id;

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error("Gagal mengambil detail produk:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 border-r-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-4" />
        <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">MEMUAT DETAIL DATA...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Produk tidak ditemukan.</p>
        <Link href="/shopping" className="px-4 py-2 bg-purple-600 rounded-xl text-xs font-bold hover:bg-purple-500 transition-colors">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const priceFormatted = `Rp ${Number(product.price).toLocaleString("id-ID")}`;
  const images = product.product_images?.length > 0 ? product.product_images : [{ image_url: "📦" }];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-purple-400">Beranda</Link>
          <span>/</span>
          <Link href="/shopping" className="hover:text-purple-400">Katalog</Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Gambar Produk */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-96 rounded-2xl bg-slate-900 border border-purple-500/20 flex items-center justify-center text-8xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]"
            >
              {images[selectedImage]?.image_url?.startsWith("http") ? (
                <img 
                  src={images[selectedImage].image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/600x600/0f172a/a855f7?text=No+Image";
                  }}
                />
              ) : (
                <span>{images[selectedImage].image_url}</span>
              )}
            </motion.div>
          </div>

          {/* Informasi Produk */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {product.stores?.name || "Official Store"}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span>Stok: <strong className="text-emerald-400">{product.stock} unit</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                {priceFormatted}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase block mb-2">
                Jumlah Pesanan
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded-xl bg-slate-900 overflow-hidden">
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
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Subtotal: <strong className="text-white">Rp {(Number(product.price) * quantity).toLocaleString("id-ID")}</strong>
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => alert(`Berhasil menambah ${quantity}x ${product.name} ke keranjang!`)}
                className="flex-1 py-3.5 px-6 rounded-xl border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-sm cursor-pointer"
              >
                🛒 + Keranjang
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm cursor-pointer"
              >
                Beli Sekarang
              </button>
            </div>

          </div>

        </div>

        {/* Deskripsi Produk */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4">
            Deskripsi Produk
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {product.description || "Tidak ada deskripsi untuk produk ini."}
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}