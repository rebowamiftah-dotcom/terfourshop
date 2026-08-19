"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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
        <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">MENYINKRONKAN VAULT...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400 text-sm font-mono"> produk tidak ditemukan.</p>
        <Link href="/shopping" className="px-4 py-2 bg-purple-600 rounded-xl text-xs font-bold hover:bg-purple-500 transition-colors font-mono">
          Kembali ke Direktori
        </Link>
      </div>
    );
  }

  const priceFormatted = `Rp ${Number(product.price).toLocaleString("id-ID")}`;
  // Mengambil gambar dari relasi product_images Prisma
  const images = product.product_images?.length > 0 
    ? product.product_images 
    : [{ image_url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80" }];

  const storeName = product.stores?.name || "Official Vault Store";
  const categoryName = product.product_categories?.[0]?.categories?.name || "Unclassified";

  const handleAddToCart = () => {
    alert(`Berhasil mengamankan ${quantity}x ${product.name} ke keranjang Vault!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow relative z-10 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono">
          <Link href="/" className="hover:text-purple-400">Beranda</Link>
          <span>/</span>
          <Link href="/shopping" className="hover:text-purple-400">Katalog</Link>
          <span>/</span>
          <span className="text-cyan-400">{categoryName}</span>
          <span>/</span>
          <span className="text-slate-200 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Sisi Kiri: Galeri Gambar Dinamis */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-96 rounded-2xl bg-slate-900 border border-purple-500/20 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] relative"
            >
              <img 
                src={images[selectedImage]?.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80";
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-white/15 backdrop-blur-md">
                NFC VERIFIED
              </span>
            </motion.div>

            {/* Thumbnail Pilihan Gambar (jika ada lebih dari 1 gambar) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === idx ? "border-purple-500 scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sisi Kanan: Informasi Produk & Aksi */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono">
                  {storeName}
                </span>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Kategori: {categoryName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
                <span>Stok Vault: <strong className="text-emerald-400">{product.stock} unit</strong></span>
                <span>•</span>
                <span>Status: <strong className="text-purple-300">{product.status}</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 shadow-inner">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-mono">
                {priceFormatted}
              </p>
            </div>

            {/* Kontrol Jumlah / Quantity */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase block mb-2 font-mono">
                Jumlah Alokasi
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded-xl bg-slate-900 overflow-hidden font-mono">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Subtotal: <strong className="text-white">Rp {(Number(product.price) * quantity).toLocaleString("id-ID")}</strong>
                </span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-sm cursor-pointer transition-all active:scale-95 font-mono"
              >
                🛒 + Keranjang Vault
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm cursor-pointer transition-all active:scale-95 font-mono shadow-lg shadow-purple-500/20"
              >
                Amankan Sekarang
              </button>
            </div>

          </div>

        </div>

        {/* Bagian Deskripsi Detail & Spesifikasi */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-4">
            Spesifikasi & Deskripsi Produk 
          </h3>
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5">
            <p className="text-slate-300 text-sm leading-relaxed max-w-4xl font-light">
              {product.description || "Tidak ada deskripsi teknis yang dilampirkan untuk artefak ini."}
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}