'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
// Pastikan path import ProfileCard ini benar sesuai struktur folder Anda
import ProfileCard from '../components/ProfileCard'; 

// --- KONFIGURASI ANIMASI ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } // Jeda antar elemen anak
  }
};

// --- DATA DUMMY UNTUK PROFILE CARDS ---
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Fauzian Ahmad P.",
    title: "Captain",
    handle: "Front-end, Database, Backend Development",
    status: "SMK Teratai Putih Global 4 Bekasi",
    avatarUrl: "/jason.jpg", // Ganti dengan gambar di folder public Anda
    glowColor: "rgba(16, 185, 129, 0.6)" // Hijau
  },
  {
    id: 2,
    name: "Rebowa Miftahurrahman",
    title: "Fullstack",
    handle: "Front-end Development",
    status: "SMK Teratai Putih Global 4 Bekasi",
    avatarUrl: "/jason.jpg", // Ganti dengan gambar di folder public Anda
    glowColor: "rgba(56, 189, 248, 0.6)" // Biru
  },
  {
    id: 3,
    name: "Mochamad Fakhri A.A",
    title: "Development",
    handle: "Frontend Development",
    status: "SMK Teratai Putih Global 4 Bekasi",
    avatarUrl: "/jason.jpg", // Ganti dengan gambar di folder public Anda
    glowColor: "rgba(217, 70, 239, 0.6)" // Pink
  }
];

export default function AboutCyberPage() {
  // Gradasi inner standar bertema cyber
  const cyberInnerGradient = 'linear-gradient(145deg, rgba(20, 20, 20, 0.3) 0%, rgba(50, 50, 50, 0.3) 100%)';

  return (
    <>
      {/* Tambahkan CSS Glitch via Tag Style Global (Optional, jika ingin efek glitch pada teks) */}
      <style jsx global>{`
        .cyber-glitch {
          position: relative;
          color: #fff;
        }
        .cyber-glitch::before,
        .cyber-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black; 
        }
        .cyber-glitch::before {
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .cyber-glitch::after {
          left: -2px;
          text-shadow: -2px 0 #ff00ff;
          clip: rect(87px, 450px, 103px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(31px, 9999px, 94px, 0); }
          100% { clip: rect(2px, 9999px, 11px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          100% { clip: rect(120px, 9999px, 133px, 0); }
        }
      `}</style>

      {/* MAIN CONTAINER bertema CYBER */}
      <div className="bg-black text-white min-h-screen selection:bg-emerald-500 selection:text-black overflow-hidden relative">
        
        {/* BACKGROUND DEKORATIF: GRID & GLOW */}
        <div className="absolute inset-0 z-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none z-0" />

        <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-24">
          
          {/* 1. HERO SECTION */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center space-y-6"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              // System Protocol: Core Team & History
            </span>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
              Di Balik <span className="relative inline-block cyber-glitch" data-text="TerfourShop">TerfourShop</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Arsitek fungsionalitas dan estetika minimalis modern. Mengenal tim inti dan prinsip operasional kami.
            </p>
          </motion.section>

          {/* 2. SECTION 3 PROFILE CARDS BERJEJER */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center"
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.div key={member.id} variants={fadeInUp} className="w-full flex justify-center">
                <ProfileCard 
                  avatarUrl={member.avatarUrl}
                  innerGradient={cyberInnerGradient}
                  behindGlowColor={member.glowColor}
                  behindGlowSize="60%"
                  name={member.name}
                  title={member.title}
                  handle={member.handle}
                  status={member.status}
                  // contactText="View Protocol" // Baris ini tidak diperlukan lagi
                  enableMobileTilt={true}
                  // onContactClick={() => alert(`Mengakses protokol ${member.name}...`)} // Baris ini tidak diperlukan lagi
                  showUserInfo={false} // MENYEMBUNYIKAN TOMBOL DAN INFO PENGGUNA DI BAWAH AVATAR
                  // Menambahkan shadow agar kartu lebih pop out
                  className="shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            ))}
          </motion.section>

          {/* 3. SECTION KISAH TERFOURSHOP (SEKARANG DI BAWAH CARDS) */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-zinc-950 p-10 md:p-16 rounded-3xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Garis aksen cyber dekoratif */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
              <div className="md:col-span-4">
                <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                  <span className="w-2 h-10 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
                  Kisah <span className="text-emerald-400">Kami</span>
                </h2>
                <p className="text-zinc-500 mt-2 tracking-widest uppercase text-xs">// Established 2023</p>
              </div>

              <div className="md:col-span-8 space-y-6 text-zinc-300 leading-relaxed font-light text-lg">
                <p>
                  TerfourShop muncul dari keinginan untuk menyederhanakan cara berpakaian elegan dalam kehidupan kasual. Di dunia yang semakin kompleks, kami percaya bahwa <span className="text-sky-400 font-medium">kesederhanaan adalah bentuk kecanggihan tertinggi</span>.
                </p>
                <p>
                  Komitmen kami adalah menghadirkan tren fashion terkini tanpa mengorbankan kenyamanan. Setiap produk—mulai dari pakaian fungsional hingga aksesoris minimalis—melalui pemeriksaan standar mutu menyeluruh sebelum diserahkan ke tangan Anda.
                </p>
                <p className="border-l-2 border-emerald-800 pl-6 italic text-zinc-400">
                  "Arsitektur gaya hidup modern dimulai dari pilihan berpakaian yang cerdas, premium, dan jujur."
                </p>
                
                <div className="pt-6 flex justify-center md:justify-start">
                  <Link href="/shopping">
                    <button className="inline-block bg-emerald-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 group text-lg">
                      Inisialisasi Belanja <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

        </main>
      </div>
    </>
  );
}