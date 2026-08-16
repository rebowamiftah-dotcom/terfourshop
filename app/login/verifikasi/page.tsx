"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { InputOTP } from "@/components/UI/InputOTP";
import { useAccurateTimer } from "@/hooks/useAccurateTimer";
import { toast } from "@/components/UI/Toast";
import { verifyOTPSchema, resendOTPSchema } from "@/lib/validations/auth";
import { ShieldCheck, RefreshCw } from "lucide-react";

function VerifikasiLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Reusable Timer
  const otpTimer = useAccurateTimer(300);   // 5 Menit kedaluwarsa OTP
  const resendTimer = useAccurateTimer(60);   // 60 Detik cooldown kirim ulang

  // Format detik menjadi MM:SS untuk sisa waktu OTP
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.add({
        title: "Email Tidak Ditemukan",
        description: "Silakan login kembali.",
      });

      router.replace("/login");

      return;
    };

    if (otpTimer.isExpired) {
      toast.add({
        title: "OTP Kedaluwarsa",
        description: "Kode OTP sudah tidak berlaku. Silakan kirim ulang kode.",
      });

      return;
    };

    // Validasi Zod
    const validationResult = verifyOTPSchema.safeParse({ email, otp });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message ?? "Kode OTP tidak valid.";

      toast.add({
        title: "Gagal",
        description: firstError,
      });

      return;
    };

    try {
      setIsLoading(true);

      const response = await fetch("/api/login/verifikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Gagal",
          description: result.message ?? "Verifikasi OTP gagal.",
        });

        return;
      };

      // Login ke Sesi NextAuth menggunakan loginToken dari BE
      const authRes = await signIn("credentials", {
        loginToken: result.loginToken,
        redirect: false,
      });

      if (authRes?.error) {
        toast.add({
          title: "Gagal Sesi",
          description: "Gagal membuat sesi login.",
        });
        
        return;
      };

      toast.add({
        title: "Berhasil",
        description: "Verifikasi berhasil! Mengalihkan...",
      });

      router.replace(result.redirectTo ?? "/dashboard");
      router.refresh();

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan sistem.";

      toast.add({
        title: "Error",
        description: message,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!resendTimer.isExpired || isResending) return;

    const validationResult = resendOTPSchema.safeParse({ email });
    if (!validationResult.success) {
      toast.add({
        title: "Gagal",
        description: "Email tidak valid atau tidak ditemukan.",
      });

      return;
    };

    try {
      setIsResending(true);

      const response = await fetch("/api/login/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Gagal Kirim Ulang",
          description: result.message ?? "Gagal mengirim ulang OTP.",
        });

        return;
      };

      toast.add({
        title: "OTP Terkirim",
        description: "Kode OTP baru telah dikirim ke email Anda.",
      });

      // Reset Timer & Field
      resendTimer.resetTimer(60);
      otpTimer.resetTimer(300);
      setOtp("");

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mengirim ulang kode.";
      
      toast.add({
        title: "Error",
        description: message,
      });

    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-slate-950 p-8 border border-white/10 shadow-2xl">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">Verifikasi OTP</h1>
        <p className="mt-1 text-sm text-slate-400">
          Kode 6-digit telah dikirim ke{" "}
          <span className="font-semibold text-slate-200">
            {email || "email Anda"}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputOTP
          length={6}
          value={otp}
          onChange={setOtp}
          disabled={isLoading || otpTimer.isExpired}
        />

        {/* Indikator Sisa Waktu Kedaluwarsa OTP */}
        <div className="text-center text-xs text-slate-400">
          {!otpTimer.isExpired ? (
            <span>
              Kode berlaku selama{" "}
              <span className="font-semibold text-purple-400">
                {formatTime(otpTimer.remainingSeconds)}
              </span>
            </span>
          ) : (
            <span className="text-red-400 font-semibold">
              Kode OTP telah kedaluwarsa. Silakan kirim ulang.
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.length !== 6 || otpTimer.isExpired}
          className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/25"
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
        </button>
      </form>

      {/* Kirim Ulang OTP */}
      <div className="text-center text-sm text-slate-400">
        Tidak menerima kode?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={!resendTimer.isExpired || isResending}
          className="inline-flex items-center gap-1.5 font-semibold text-purple-400 hover:text-purple-300 disabled:text-slate-600 disabled:no-underline transition-colors disabled:cursor-not-allowed"
        >
          {isResending && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
          {!resendTimer.isExpired
            ? `Kirim ulang (${resendTimer.remainingSeconds}s)`
            : "Kirim Ulang OTP"}
        </button>
      </div>
    </div>
  );
}

export default function VerifikasiLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <Suspense fallback={<div className="text-sm text-slate-400">Loading...</div>}>
        <VerifikasiLoginForm />
      </Suspense>
    </div>
  );
}