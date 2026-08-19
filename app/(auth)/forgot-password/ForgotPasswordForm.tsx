"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { useForm, FieldErrors, FieldError, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormValues} from "@/lib/validations/auth";
import { toast } from "@/components/UI/Toast";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // HANDLER FORGOT PASSWORD

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // FORGOT PASSWORD GAGAL

      if (!response.ok || !result.success) {
        toast.add({
          title: "Forgot Password Gagal",
          description: result.message ?? "Tidak dapat memproses permintaan.",
        });

        return;
      };

      // BERHASIL

      toast.add({
        title: "OTP Terkirim",
        description: "Kode OTP telah dikirim ke email Anda.",
      });

      router.push("/forgot-password/verifikasi");

    } catch (error) {
      console.error("Forgot password error:", error);

      toast.add({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungkan ke server. Silakan coba lagi.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  // HANDLER VALIDASI GAGAL

  const onError = (errors: FieldErrors<ForgotPasswordFormValues>) => {
    const firstError = Object.values(errors)[0] as | FieldError | undefined;

    if (firstError?.message) {
      toast.add({
        title: "Input Tidak Valid",
        description: firstError.message,
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
          className="w-full px-8 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/20 text-left"
        >
          {/* Badge & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-xs text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Forgot Password
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Lupa{" "}

              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Password?
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Masukkan email yang terdaftar pada akun Anda.<br />
              Kami akan mengirimkan kode OTP untuk verifikasi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email
              </label>

              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Masukkan email Anda"
                disabled={isLoading}
                className={clsx(
                  "w-full px-4 py-2.5 sm:py-3 rounded-xl",
                  "bg-slate-900/80 border text-white",
                  "placeholder-slate-500",
                  "focus:outline-none focus:ring-1",
                  "transition-all text-sm",
                  "border-white/10 focus:border-purple-400 focus:ring-purple-400"
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full py-3 mt-2",
                "text-white text-xs sm:text-sm",
                "font-semibold rounded-xl",
                "flex items-center justify-center gap-2",
                "bg-gradient-to-r from-purple-600 to-indigo-600",
                "hover:from-purple-500 hover:to-indigo-500",
                "shadow-lg shadow-purple-500/25",
                "hover:scale-[1.01]",
                "active:scale-[0.99]",
                "transition-all duration-300",
                isLoading ? "cursor-wait opacity-80" : "cursor-pointer"
              )}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Mengirim OTP...
                </>
              ) : (
                "Kirim Kode OTP"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10 text-center text-xs text-slate-400">
            Ingat password Anda?{" "}

            <Link href="/login" className="font-semibold text-purple-300 hover:text-pink-400 transition-colors cursor-pointer">
              Kembali ke Login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}