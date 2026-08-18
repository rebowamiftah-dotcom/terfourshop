"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, Variants } from "framer-motion";
import { useForm, FieldErrors, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { CloseEyesIcon, OpenEyesIcon } from "@/components/Icon";
import { toast } from "@/components/UI/Toast";

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

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // INISIALISASI REACT HOOK FORM

  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });

  // HANDLER LOGIN

  const onSubmit = async (data: LoginFormValues) => {
    if (isLoading) return;

    const cleanIdentity = data.identity.trim().toLowerCase();

    // @ hanya digunakan sebagai indikator username.
    const isUsernameLogin = cleanIdentity.startsWith("@");

    try {
      setIsLoading(true);

      // JALUR 1 --> @USERNAME + PASSWORD

      if (isUsernameLogin) {
        // Hilangkan @  dari Username
        const username = cleanIdentity.slice(1);

        if (!username) {
          toast.add({
            title: "Login Gagal",
            description: "Username wajib diisi.",
          });

          return;
        };

        // Login menggunakan Credentials Next-Auth
        const response = await signIn("credentials", {
          identity: username,
          password: data.password,
          redirect: false,
        });

        // Login Gagal

        if (response?.error) {
          toast.add({
            title: "Login Gagal",
            description: "Username atau password salah.",
          });

          return;
        };

        // Login Berhasil

        toast.add({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });

        router.push("/shopping");
        router.refresh();

        return;
      };

      // JALUR 2 --> EMAIL + PASSWORD + OTP

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity: cleanIdentity,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Login Gagal",
          description: result.message ?? "Tidak dapat melakukan login.",
        });

        return;
      };

      // LOGIN BERHASIL

      toast.add({
        title: "Kode OTP Terkirim",
        description: "Silakan periksa email Anda untuk verifikasi.",
      });

      router.push("/login/verifikasi");

    } catch (error) {
      console.error("Login error:", error);

      toast.add({
        title: "Terjadi kesalahan",
        description: "Tidak dapat menghubungkan ke server. Silakan coba lagi.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  // HANDLER VALIDASI

  const onError = (errors: FieldErrors<LoginFormValues>) => {
    const firstError = Object.values(errors)[0] as | FieldError | undefined;

    if (firstError?.message) {
      toast.add({
        title: "Input Tidak Valid",
        description: firstError.message,
      });
    };
  };

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full max-h-[900px] py-12"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md px-8 py-6 sm:py-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/20 text-left"
        >
          {/* Badge & Title */}
          <div className="text-center mb-5 sm:mb-8">
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
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-3 sm:space-y-5">
            {/* Identitas (Username / Email) */}
            <div>
              <label htmlFor="identity" className="block text-xs font-semibold text-slate-300 mb-2">
                Email / Username
              </label>

              <input
                {...register("identity")}
                type="text"
                id="identity"
                placeholder="@username / nama@email.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-xs font-semibold text-slate-300">
                  Kata Sandi
                </label>

                <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-pink-400 transition-colors">
                  Lupa sandi?
                </Link>
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm pr-10"
                  disabled={isLoading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                  title={ showPassword ? "Sembunyikan Password" : "Tampilkan Password" }
                >
                  {showPassword ? <CloseEyesIcon className="w-4 h-4" /> : <OpenEyesIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full py-2.5 sm:py-3.5 mt-2 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2",
                "bg-gradient-to-r from-purple-600 to-indigo-600",
                "hover:from-purple-500 hover:to-indigo-500",
                "shadow-lg shadow-purple-500/25",
                "transition-all duration-300",
                "hover:scale-[1.02]",
                "active:scale-[0.98]",
                isLoading ? "cursor-wait opacity-80" : "cursor-pointer"
              )}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-6 border-t border-white/10 text-center text-xs text-slate-400">
            Belum memiliki akun?{" "}

            <Link href="/registrasi" className="font-semibold text-purple-300 hover:text-pink-400 transition-colors">
              Daftar akun baru
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}