'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Variabel Animasi Scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {/* 1. NAVBAR DIPALING ATAS */}
      <Navbar />

      <main className="space-y-20 pb-20">
        {/* 2. HERO SECTION GELAP DENGAN ANIMASI */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 text-white py-20 px-6 sm:px-12 rounded-3xl text-center shadow-2xl overflow-hidden"
          >
            {/* Glow Effect Dekoratf */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-5 relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-gray-300 bg-zinc-800/80 px-3.5 py-1.5 rounded-full border border-zinc-700">
                Tentang Kami / About Us
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                Mengenal <span className="text-gray-400 underline decoration-zinc-600">TerfourShop</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Destinasi utama untuk fashion kasual, sepatu, dan aksesoris berkualitas tinggi dengan desain minimalis modern.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. KISAH KAMI (OUR STORY) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Teks Deskripsi */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Kisah & Visi TerfourShop
              </h2>
              <p className="text-gray-400 leading-relaxed font-light">
                Didirikan dengan komitmen tinggi pada gaya hidup kasual, TerfourShop berfokus menghadirkan tren fashion terkini tanpa mengorbankan kenyamanan pemakainya.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                Kami meyakini bahwa gaya berpakaian yang elegan berawal dari kesederhanaan, kualitas bahan premium, dan detail produk yang teruji secara seksama.
              </p>
              <div className="pt-2">
                <Link 
                  href="/shopping" 
                  className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-95"
                >
                  Jelajahi Produk &rarr;
                </Link>
              </div>
            </motion.div>

            {/* Visual Gambar Brand */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl"
            >
              <Image
                src="/jason.jpg"
                alt="TerfourShop Brand"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* 4. STATISTIK TOKO */}
        <section className="bg-zinc-900/60 border-y border-zinc-800 py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-3xl sm:text-5xl font-extrabold text-white">100%</p>
              <p className="text-gray-400 text-sm mt-2 font-medium">Produk Original</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="text-3xl sm:text-5xl font-extrabold text-white">10k+</p>
              <p className="text-gray-400 text-sm mt-2 font-medium">Pelanggan Puas</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="text-3xl sm:text-5xl font-extrabold text-white">24/7</p>
              <p className="text-gray-400 text-sm mt-2 font-medium">Layanan Pelanggan</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="text-3xl sm:text-5xl font-extrabold text-white">Fast</p>
              <p className="text-gray-400 text-sm mt-2 font-medium">Pengiriman Cepat</p>
            </motion.div>
          </motion.div>
        </section>

        {/* 5. KEUNGGULAN (CARDS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 space-y-2"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight">Mengapa Memilih TerfourShop?</h2>
            <p className="text-gray-400 text-sm">Prinsip dasar yang selalu kami jaga dalam setiap pengiriman.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center text-xl mb-6 font-bold shadow-md">
                🚚
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Pengiriman Terjamin</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Setiap pesanan dipacking aman dan dikirim menggunakan layanan logistik terbaik.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center text-xl mb-6 font-bold shadow-md">
                🛡️
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Garansi Kualitas</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Pemeriksaan standar mutu dilakukan secara menyeluruh sebelum produk diserahkan ke tangan Anda.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center text-xl mb-6 font-bold shadow-md">
                💬
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Dukungan Responsif</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Tim customer service kami siap membantu kendala ukuran, pesanan, dan informasi produk.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}