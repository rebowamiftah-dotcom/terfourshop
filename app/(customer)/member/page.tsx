"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { OpenEyesIcon, CloseEyesIcon } from "@/components/Icon";

export default function GabungMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { fullName, email, phone, password, confirmPassword } = formData;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("Semua kolom pendaftaran wajib diisi!");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Format alamat email tidak valid!");
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^(08|628)[0-9]{8,11}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Nomor WhatsApp harus valid (contoh: 081234567890)!");
      setIsLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka!"
      );
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal mendaftar member");
      }

      setSuccessMessage("Pendaftaran Member Berhasil Tersimpan di Database!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 flex-grow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* IKLAN & PENJELASAN BENEFIT MEMBER */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
               Terfour Membership Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Gabung Member, <br />
              Dapatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Keuntungan Spesial!</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Daftarkan dirimu menjadi member VIP TerfourShop dan rasakan sensasi belanja produk futuristik dengan banyak benefit eksklusif.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                <span className="text-2xl">🎁</span>
                <h4 className="text-xs font-bold text-purple-300">Poin Belanja VIP</h4>
                <p className="text-[11px] text-slate-400">Tukarkan poin setiap kali transaksi menjadi cashback dan voucher belanja.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                <span className="text-2xl">⚡</span>
                <h4 className="text-xs font-bold text-pink-300">Prioritas Akses Drop</h4>
                <p className="text-[11px] text-slate-400">Miliki produk edisi terbatas (*Limited Cyber Drop*) lebih cepat dari pembeli biasa.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                <span className="text-2xl">🚚</span>
                <h4 className="text-xs font-bold text-cyan-300">Kupon Gratis Ongkir</h4>
                <p className="text-[11px] text-slate-400">Dapatkan alokasi voucer potongan ongkos kirim setiap bulannya.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                <span className="text-2xl">🛡️</span>
                <h4 className="text-xs font-bold text-emerald-300">Layanan Fast-Track</h4>
                <p className="text-[11px] text-slate-400">Bantuan CS khusus dan proses pengembalian barang yang jauh lebih cepat.</p>
              </div>
            </div>
          </motion.div>

          {/* FORM PENDAFTARAN MEMBER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(168,85,247,0.15)]"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Pendaftaran Member Baru
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Isi data otentik kamu di bawah ini untuk mengaktifkan lisensi member.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <span>✅</span>
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Masukkan nama lengkap"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Alamat Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 karakter (Besar, Kecil & Angka)"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
                    title={showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                  >
                    {showPassword ? (
                      <CloseEyesIcon className="w-5 h-5" />
                    ) : (
                      <OpenEyesIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD FIELD */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Konfirmasi Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
                    title={showConfirmPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                  >
                    {showConfirmPassword ? (
                      <CloseEyesIcon className="w-5 h-5" />
                    ) : (
                      <OpenEyesIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-purple-500/25 active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? "Memproses Akun Member..." : "Daftar Member Sekarang"}
              </button>
            </form>

            <div className="mt-6 text-center text-slate-400 text-xs">
              Sudah pernah mendaftar?{" "}
              <Link href="/login" className="text-purple-400 font-bold hover:underline">
                Masuk ke Akun
              </Link>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}