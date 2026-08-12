"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
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
    console.log("Payload Register Form:", formData);
  };

  const handleGoogleSignIn = () => {
    console.log("Triggering Google OAuth Sign In...");
    // Integrasikan dengan NextAuth.js / Firebase / backend OAuth kamu di sini:
    // e.g. signIn("google", { callbackUrl: "/dashboard" })
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-x-hidden bg-slate-950 text-white py-12">
      {/* 3D BACKGROUND CONTAINER */}
 

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-w-lg"
      >
        {/* Card Container Glassmorphism */}
        <motion.div
          variants={itemVariants}
          className="w-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/20 text-left"
        >
          {/* Badge & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-xs text-purple-300 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Join Next-Gen Network
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Buat Akun Baru <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                TerfourShop
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Daftar sekarang untuk mulai menjelajahi produk eksklusif kami.
            </p>
          </div>

          {/* TOMBOL SIGN IN / REGISTER WITH GOOGLE */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-sm shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Daftar dengan Google</span>
          </motion.button>

          {/* PEMBATAS (DIVIDER) */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-3 text-xs text-slate-500 uppercase tracking-widest font-mono">
              atau via email
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* FORM REGISTRASI MANUAL */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-sm"
            >
              Buat Akun Sekarang
            </button>
          </form>

          {/* Footer Card / Link ke Login */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-purple-300 hover:text-pink-400 transition-colors"
            >
              Masuk di sini
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}