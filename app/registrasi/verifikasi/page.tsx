"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOTP } from "@/components/UI/InputOTP";
import { useAccurateTimer } from "@/hooks/useAccurateTimer";
import { toast } from "@/components/UI/Toast";

function VerifikasiForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Custom Timer Hook (300 detik = 5 menit)
  const otpTimer = useAccurateTimer(300);

  // Format detik ke format mm:ss (opsional untuk UI)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // HANDLER SUBMIT VERIFIKASI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.add({
        title: "Email Tidak Ditemukan",
        description: "Silakan lakukan registrasi ulang.",
      });

      router.replace("/registrasi");

      return;
    };

    if (otp.length !== 6 || otpTimer.isExpired) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/registrasi/verifikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Verifikasi Gagal",
          description: result.message ?? "OTP tidak valid",
        });

        return;
      };

      toast.add({
        title: "Verifikasi Berhasil",
        description: "Akun Anda telah terverifikasi!",
      });

      router.replace(result.redirectTo ?? "/login");

    } catch (error) {
      console.error("Verification error:", error);

      toast.add({
        title: "Terjadi kesalahan",
        description: "Gagal menghubungkan ke server. Silakan coba lagi.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  // HANDLER RESEND OTP
  const handleResendOTP = async () => {
    if (!email || !otpTimer.isExpired || isResending) return;

    try {
      setIsResending(true);

      const response = await fetch("/api/registrasi/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.add({
          title: "Gagal Kirim OTP",
          description: result.message ?? "Tidak dapat mengirim ulang kode OTP.",
        });

        return;
      };

      toast.add({
        title: "OTP Terkirim",
        description: "Kode OTP baru telah dikirimkan ke email Anda.",
      });

      otpTimer.resetTimer(300);   // Reset timer ke 5 menit lagi

      setOtp(""); // Reset input field

    } catch (error) {
      console.error("Resend OTP error:", error);

      toast.add({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungkan ke server.",
      });

    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input OTP Component */}
      <InputOTP
        length={6}
        value={otp}
        onChange={setOtp}
        disabled={isLoading || otpTimer.isExpired}
      />

      {/* Timer & Resend Option */}
      <div className="text-center text-xs text-slate-400">
        {!otpTimer.isExpired ? (
          <p>
            Waktu tersisa:{" "}
            <span className="font-semibold text-purple-400">
              {formatTime(otpTimer.remainingSeconds)}
            </span>
          </p>
        ) : (
          <p>
            Kode OTP telah kadaluarsa.{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending}
              className="font-semibold text-purple-300 hover:text-pink-400 underline transition-colors disabled:opacity-50"
            >
              {isResending ? "Mengirim..." : "Kirim Ulang Kode"}
            </button>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || otp.length !== 6 || otpTimer.isExpired}
        className="w-full py-3 bg-purple-600 rounded-xl font-semibold transition-all hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
      </button>
    </form>
  );
}

export default function VerifikasiPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-12">Loading...</div>}>
      <VerifikasiForm />
    </Suspense>
  );
}