"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identity: "",
    password: "",
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payload Login:", formData);
  };

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 3D BACKGROUND CONTAINER */}
     

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-h-[900px] py-12"
      >
        {/* Card Container Glassmorphism */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/20 text-left"
        >
          {/* Badge & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-xs text-purple-300 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Secure Gateway
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Selamat Datang <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Kembali ke TerfourShop
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Masukkan kredensial Anda untuk mengakses akun e-commerce.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Identitas */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Email / Username
              </label>
              <input
                type="text"
                required
                value={formData.identity}
                onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Kata Sandi
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-purple-400 hover:text-pink-400 transition-colors"
                >
                  Lupa sandi?
                </Link>
              </div>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
            >
              Masuk Sekarang
            </button>
          </form>

          {/* Footer Card / Register Link */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-purple-300 hover:text-pink-400 transition-colors"
            >
              Daftar akun baru
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}