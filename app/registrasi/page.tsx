"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, Variants } from "framer-motion";

import Link from "next/link";
import { GoogleIcon } from "../components/Icon";
import { toast } from "../components/UI/Toast";
import clsx from "clsx";

export default function RegistrasiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const googleStatus = searchParams.get("google");

    if (googleStatus !== "success") return;

    toast.add({
      title: "Login Google berhasil",
      description: "Selamat datang! Anda akan diarahkan ke toko.",
    });

    const timer = setTimeout(() => {
      router.replace("/shopping");
    }, 5000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  // Login Google
  const handleGoogleSignIn = async () => {
    if (isGoogleLoading || isLoading) return;

    setIsGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/registrasi?google=success",
    });
  };

  // Login Manual
  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isGoogleLoading || isLoading) return;

    try {
      setIsLoading(true);

      // REGISTRASI

      const response = await fetch("/api/registrasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // REGISTER GAGAL

      if (!response.ok || !result.success) {
        toast.add({
          title: "Registrasi gagal",
          description: result.message,
        });

        return;
      }

      // SUCCESS

      toast.add({
        title: "Registrasi berhasil",
        description: "Akun berhasil dibuat. Anda akan diarahkan ke Toko.",
      });

      // Tunggu 3 detik
      await new Promise( (resolve) => setTimeout(resolve, 5000) );

      router.push("/login");

    } catch (error) {
      console.error("Register error:", error);

      toast.add({
        title: "Terjadi kesalahan",
        description: "Tidak dapat melakukan Registrasi. Silakan coba lagi.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-x-hidden bg-slate-950 text-white py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-w-xl"
      >
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
              Buat Akun{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                TerfourShop
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Daftar sekarang untuk mulai menjelajahi produk eksklusif kami.
            </p>
          </div>

          {/* FORM REGISTRASI MANUAL */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alamat Email
              </label>

              <input
                type="email"
                id ="email"
                name ="email"
                placeholder="nama@email.com"
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi
              </label>

              <input
                type="password"
                id ="password"
                name ="password"
                placeholder="••••••••"
                maxLength={12}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Konfirmasi Kata Sandi
              </label>

              <input
                type="password"
                id ="confirmPassword"
                name ="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={clsx(
                "w-full py-3 mt-2 text-white text-sm font-semibold rounded-xl",
                "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                "shadow-lg shadow-purple-500/25",
                "hover:scale-[1.01] active:scale-[0.99] ",
                "transition-all duration-300",
                (isGoogleLoading || isLoading) ? "cursor-wait" : "cursor-pointer"
              )}
            >
              {isLoading ? "Mendaftarkan..." : "Daftarkan Akun Baru"}
            </button>
          </form>

          {/* PEMBATAS */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10" />
            <span className="px-3 text-xs text-slate-500 uppercase tracking-widest font-mono">
              atau via google
            </span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          {/* TOMBOL REGISTER WITH GOOGLE */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className={clsx(
              "w-full py-3 px-4 text-sm text-white font-semibold rounded-xl shadow-md",
              "bg-white/10 hover:bg-white/15 border border-white/15",
              "flex items-center justify-center gap-3",
              "transition-all duration-300",
              "hover:scale-[1.01] active:scale-[0.99]",
              (isGoogleLoading || isLoading) ? "cursor-wait" : "cursor-pointer"
            )}
          >
            <GoogleIcon className="h-5 w-5" />
            <span>
              {isGoogleLoading ? "Mengalihkan ke Google..." : "Daftarkan dengan Google"}
            </span>
          </motion.button>

          {/* FOOTER CARD */}
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