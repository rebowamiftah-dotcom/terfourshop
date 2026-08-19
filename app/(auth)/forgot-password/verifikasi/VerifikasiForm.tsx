"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

import { InputOTP } from "@/components/UI/InputOTP";
import { useAccurateTimer } from "@/hooks/useAccurateTimer";
import { toast } from "@/components/UI/Toast";

interface VerifikasiFormProps {
  email: string;
  otpExpiresAt: number;
  resendAvailableAt: number | null;
};

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

export default function VerifikasiForm({ email, otpExpiresAt, resendAvailableAt }: VerifikasiFormProps) {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isMaxAttempts, setIsMaxAttempts] = useState(false);

  // TIMER

  const otpTimer = useAccurateTimer(otpExpiresAt);
  const resendTimer = useAccurateTimer(resendAvailableAt);

  // FORMAT TIMER

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
  };

  // HANDLER VERIFIKASI OTP

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || isResending || isMaxAttempts ) {
      return;
    };

    if (otp.length !== 6) {
      toast.add({
        title: "OTP Belum Lengkap",
        description: "Masukkan 6 digit kode verifikasi.",
      });

      return;
    };

    if (otpTimer.isExpired) {
      toast.add({
        title: "OTP Telah Kedaluwarsa",
        description: "Silakan meminta kode OTP baru.",
      });

      return;
    };

    try {
      setIsLoading(true);

      const response = await fetch("/api/forgot-password/verifikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          toast.add({
            title: "Sesi Verifikasi Berakhir",
            description: "Silakan melakukan forgot password kembali.",
          });

          router.replace("/forgot-password");

          return;
        };

        if (response.status === 429) {
          setIsMaxAttempts(true);
        };

        toast.add({
          title: "Verifikasi Gagal",
          description: result.message ?? "Kode OTP tidak valid.",
        });

        return;
      };

      toast.add({
        title: "OTP Berhasil Diverifikasi",
        description: "Silakan buat password baru.",
      });

      router.replace("/forgot-password/reset");

    } catch (error) {
      console.error("Forgot password verification error:", error);

      toast.add({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungkan ke server.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  // HANDLER RESEND OTP

  const handleResendOTP = async () => {
    const canResend = resendTimer.isExpired || isMaxAttempts;

    if (isLoading || isResending || !canResend) {
      return;
    };

    try {
      setIsResending(true);

      const response = await fetch("/api/forgot-password/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          toast.add({
            title: "Sesi Verifikasi Berakhir",
            description: "Silakan melakukan forgot password kembali.",
          });

          router.replace("/forgot-password");

          return;
        };

        toast.add({
          title: "Gagal Kirim OTP",
          description: result.message ?? "Tidak dapat mengirim ulang OTP.",
        });

        return;
      };

      if (
        typeof result.otpExpiresAt !== "number" ||
        typeof result.resendAvailableAt !== "number"
      ) {
        toast.add({
          title: "Terjadi Kesalahan",
          description: "Data timer dari server tidak valid.",
        });

        return;
      };

      otpTimer.resetTimer(result.otpExpiresAt);
      resendTimer.resetTimer(result.resendAvailableAt);

      setOtp("");
      setIsMaxAttempts(false);

      toast.add({
        title: "OTP Terkirim",
        description: "Kode OTP baru telah dikirim ke email Anda.",
      });

    } catch (error) {
      console.error("Forgot password resend OTP error:", error);

      toast.add({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungkan ke server.",
      });

    } finally {
      setIsResending(false);
    }
  };

  // RESEND STATE

  const isResendAllowed = (resendTimer.isExpired || isMaxAttempts) && !isLoading && !isResending;

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
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-xs text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Email Verification
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Verifikasi{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Email
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Masukkan kode verifikasi yang telah kami kirimkan ke email Anda.
            </p>
          </div>

          <div className="mb-6 text-center">
            <p className="text-xs sm:text-md text-slate-400 mb-1">
              Kode dikirim ke{" "}
              <span className="font-medium text-purple-300 break-all">
                {email}
              </span>
            </p>
          </div>

          {/* Form Otp */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-2 text-center">
                Kode OTP
              </label>

              <InputOTP
                length={6}
                value={otp}
                onChange={setOtp}
                disabled={isLoading || otpTimer.isExpired ||isMaxAttempts}
              />
            </div>

            {/* Countdown & Status */}
            <div className="text-center min-h-[20px]">
              {isMaxAttempts ? (
                <p className="text-xs text-red-400 font-medium">
                  Batas percobaan OTP telah tercapai.
                  Silakan kirim ulang kode OTP baru.
                </p>
              ) : !otpTimer.isExpired ? (
                <p className="text-xs text-slate-400">
                  Kode berlaku selama{" "}
                  <span className="font-semibold text-purple-300">
                    {formatTime(otpTimer.remainingSeconds)}
                  </span>
                </p>
              ) : (
                <p className="text-xs text-red-400">
                  Kode OTP telah kedaluwarsa. Silakan minta kode OTP baru.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={ isLoading || otp.length !== 6 || otpTimer.isExpired || isMaxAttempts }
              className={clsx(
                "w-full py-2 sm:py-3 text-white text-sm font-semibold rounded-xl",
                "bg-gradient-to-r from-purple-600 to-indigo-600",
                "hover:from-purple-500 hover:to-indigo-500",
                "shadow-lg shadow-purple-500/25",
                "hover:scale-[1.01] active:scale-[0.99]",
                "transition-all duration-300",
                "disabled:opacity-50 disabled:hover:scale-100",
                "disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 mb-1">
              {isMaxAttempts ? "Batas verifikasi tercapai. Minta kode baru:" : "Tidak menerima kode?"}
            </p>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!isResendAllowed}
              className={clsx(
                "text-xs font-semibold transition-colors",
                !isResendAllowed
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-purple-300 hover:text-pink-400 cursor-pointer"
              )}
            >
              {isResending
                ? "Mengirim OTP..."
                : !resendTimer.isExpired &&
                  !isMaxAttempts
                    ? `Kirim ulang OTP (${resendTimer.remainingSeconds}s)`
                    : "Kirim ulang OTP"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
            Salah memasukkan email?{" "}

            <Link href="/forgot-password" className="font-semibold text-purple-300 hover:text-pink-400 transition-colors">
              Kembali
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}