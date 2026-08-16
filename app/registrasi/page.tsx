"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FieldErrors, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrasiSchema, RegistrasiFormValues } from "@/lib/validations/auth";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { toast } from "@/components/UI/Toast";
import { CloseEyesIcon, OpenEyesIcon } from "@/components/Icon";

export default function RegistrasiPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inisialisasi React Hook Form
  const { register, handleSubmit } = useForm<RegistrasiFormValues>({
    resolver: zodResolver(registrasiSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
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

  // HANDLER REGISTRASI
  const onSubmit = async (data: RegistrasiFormValues) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/registrasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Registrasi gagal",
          description: result.message ?? "Tidak dapat melakukan registrasi.",
        });

        return;
      };

      toast.add({
        title: "Registrasi berhasil",
        description: "Kode verifikasi telah dikirim ke email Anda.",
      });

      router.push(`/registrasi/verifikasi?email=${encodeURIComponent(data.email.trim().toLowerCase())}`);

    } catch (error) {
      console.error("Register error:", error);

      toast.add({
        title: "Terjadi kesalahan",
        description: "Tidak dapat melakukan registrasi. Silakan coba lagi.",
      });

    } finally {
      setIsLoading(false);
    };
  };

  // HANDLER REGISTRASI KETIKA VALIDASI GAGAL
  const onError = (errors: FieldErrors<RegistrasiFormValues>) => {
    // Ambil pesan error pertama yang ditemukan
    const firstError = Object.values(errors)[0] as FieldError | undefined;

    if (firstError) {
      toast.add({
        title: "Input Tidak Valid",
        description: String(firstError),
      });
    };
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

          {/* FORM REGISTRASI: Pass `onError` sebagai parameter kedua */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alamat Email
              </label>

              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi
              </label>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan minimal 8 karakter"
                  className="w-full px-4 pr-12 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white transition-colors focus:outline-none"
                  title={showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                >
                  {showPassword ? (
                    <CloseEyesIcon className="w-4 h-4" />
                  ) : (
                    <OpenEyesIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Konfirmasi Kata Sandi
              </label>

              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Ulangi kata sandi"
                  className="w-full px-4 pr-12 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white transition-colors focus:outline-none"
                  title={showConfirmPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                >
                  {showConfirmPassword ? (
                    <CloseEyesIcon className="w-4 h-4" />
                  ) : (
                    <OpenEyesIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full py-3 mt-2 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2",
                "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
                "shadow-lg shadow-purple-500/25",
                "hover:scale-[1.01] active:scale-[0.99]",
                "transition-all duration-300",
                isLoading ? "cursor-wait opacity-80" : "cursor-pointer"
              )}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                "Daftarkan Akun Baru"
              )}
            </button>
          </form>

          {/* FOOTER CARD */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
            Sudah memiliki akun?{" "}
            <Link href="/login" className="font-semibold text-purple-300 hover:text-pink-400 transition-colors">
              Masuk di sini
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}