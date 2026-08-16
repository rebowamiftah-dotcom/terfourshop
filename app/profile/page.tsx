"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Cropper from "react-easy-crop";

// --- TYPE DEFINITIONS SESUAI SKEMA PRISMA ---
type ProfileData = {
  id: string;
  user_id: string;
  full_name: string;
  avatar?: string | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  birth_date?: string | null;
  created_at: string;
  updated_at: string;
};

type SellerData = {
  id: string;
  user_id: string;
  seller_type: "INDIVIDUAL" | "BUSINESS";
  verification_status: "PENDING" | "VERIFIED" | "REJECTED";
  verified_at?: string | null;
  created_at: string;
  updated_at: string;
} | null;

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");

  // Mock Data Profile
  const [profile, setProfile] = useState<ProfileData>({
    id: "prof_1234567890",
    user_id: "usr_9876543210",
    full_name: "Alex User Terfour",
    avatar: "/jason.jpg",
    gender: "MALE",
    birth_date: "1998-05-20",
    created_at: "2024-01-15T00:00:00.000Z",
    updated_at: "2026-08-14T00:00:00.000Z",
  });

  // Mock Data Seller
  const [seller, setSeller] = useState<SellerData>(null);

  // Form State untuk Tab Settings
  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    gender: profile.gender || "MALE",
    birth_date: profile.birth_date || "",
    avatar_url: profile.avatar || "",
    email_notifications: true,
    two_factor_auth: false,
  });

  const [isSaved, setIsSaved] = useState(false);

  // --- STATE UNTUK IMAGE CROPPER & CLOUDINARY ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Ambil File Foto dari Perangkat
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result as string));
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 2. Fungsi memotong gambar menggunakan HTML5 Canvas
  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob> => {
    const image = new window.Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/jpeg");
    });
  };

  // 3. Potong Gambar & Upload ke Cloudinary
  const handleCropAndUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsUploading(true);

      // Crop gambar
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Buat FormData untuk Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append("file", croppedBlob);
      uploadFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "terfour_avatar"
      );

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      // Unggah langsung ke API Cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        // Update URL di form dan profile
        setFormData((prev) => ({ ...prev, avatar_url: data.secure_url }));
        setProfile((prev) => ({ ...prev, avatar: data.secure_url }));
        setImageSrc(null); // Tutup modal crop
      } else {
        alert("Gagal mengunggah foto profil. Periksa Cloud Name & Preset Cloudinary Anda.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      full_name: formData.full_name,
      gender: formData.gender as "MALE" | "FEMALE" | "OTHER",
      birth_date: formData.birth_date,
      avatar: formData.avatar_url,
      updated_at: new Date().toISOString(),
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER TITLE */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Akun Saya</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Kelola informasi profil, foto profil, dan pendaftaran seller.
            </p>
          </div>

          {seller && (
            <div className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Seller ({seller.seller_type}) - <span className="uppercase">{seller.verification_status}</span>
            </div>
          )}
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-2 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl w-fit backdrop-blur-md">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            👤 Profile Info
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* TAB CONTENT WITH ANIMATION */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            /* ================= TAB 1: PROFIL INFO ================= */
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* CARD DATA PROFILE */}
              <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* AVATAR DISPLAY */}
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-purple-500/40 relative bg-slate-800">
                      {profile.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt={profile.full_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-slate-500 font-bold">
                          {profile.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DETAIL DATA */}
                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                        {profile.full_name}
                      </h2>
                      <p className="text-slate-400 text-xs font-mono text-center sm:text-left mt-0.5">
                        ID: {profile.id}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Jenis Kelamin</span>
                        <p className="text-sm font-medium text-slate-200 mt-0.5">
                          {profile.gender === "MALE"
                            ? "Laki-laki"
                            : profile.gender === "FEMALE"
                            ? "Perempuan"
                            : "Tidak Diketahui"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Tanggal Lahir</span>
                        <p className="text-sm font-medium text-slate-200 mt-0.5">
                          {profile.birth_date
                            ? new Date(profile.birth_date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Belum Diatur"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Bergabung Sejak</span>
                        <p className="text-sm font-medium text-slate-200 mt-0.5">
                          {new Date(profile.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Terakhir Diperbarui</span>
                        <p className="text-sm font-medium text-slate-200 mt-0.5">
                          {new Date(profile.updated_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BANNER SELLER */}
              {!seller ? (
                <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-purple-900/40 via-slate-900 to-indigo-900/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      Peluang Bisnis
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Ingin Mulai Jualan di TerfourShop?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md font-light">
                      Buka toko online Anda sekarang. Dapatkan akses ke ratusan ribu pembeli, biaya komisi rendah, dan analisis jualan real-time.
                    </p>
                  </div>

                  <Link
                    href="/seller"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/20 transition-all hover:scale-105 shrink-0"
                  >
                    Daftar Seller Sekarang 
                  </Link>
                </div>
              ) : (
                <div className="rounded-3xl bg-slate-900/60 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>🏪</span> Informasi Toko & Seller
                    </h3>
                    <span className="text-xs font-mono text-slate-400">ID Seller: {seller.id}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Tipe Seller</span>
                      <p className="text-sm font-semibold text-purple-300 mt-0.5">{seller.seller_type}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Status Verifikasi</span>
                      <p className="text-sm font-semibold text-emerald-400 mt-0.5">{seller.verification_status}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Terverifikasi Pada</span>
                      <p className="text-sm font-medium text-slate-200 mt-0.5">
                        {seller.verified_at
                          ? new Date(seller.verified_at).toLocaleDateString("id-ID")
                          : "Dalam Proses"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Link
                      href="/seller/dashboard"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20"
                    >
                      Masuk ke Dashboard Seller →
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* ================= TAB 2: SETTINGS PAGE ================= */
            <motion.div
              key="settings-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md p-6 sm:p-8 space-y-6"
            >
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Pengaturan Akun
              </h2>

              {/* NOTIFIKASI SUKSES EDIT */}
              {isSaved && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <span>✅</span> Perubahan profil berhasil disimpan!
                </div>
              )}

              {/* SECTION UPLOAD FOTO PROFIL (CLOUDINARY + CROPPER) */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-4">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Foto Profil
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-800 shrink-0">
                    {formData.avatar_url ? (
                      <Image
                        src={formData.avatar_url}
                        alt="Avatar Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        No Pic
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <label className="inline-block px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-purple-500/20">
                      Pilih Foto dari Perangkat
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Pilih foto dari penyimpanan perangkat, lalu sesuaikan (crop) sebelum mengunggah.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* FIELD 1: FULL NAME */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* FIELD 2: RADIO BUTTON JENIS KELAMIN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Jenis Kelamin
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      formData.gender === "MALE"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}>
                      <input
                        type="radio"
                        name="gender"
                        value="MALE"
                        checked={formData.gender === "MALE"}
                        onChange={handleInputChange}
                        className="accent-purple-500"
                      />
                      <span>Laki-laki</span>
                    </label>

                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      formData.gender === "FEMALE"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}>
                      <input
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        checked={formData.gender === "FEMALE"}
                        onChange={handleInputChange}
                        className="accent-purple-500"
                      />
                      <span>Perempuan</span>
                    </label>

                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      formData.gender === "OTHER"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}>
                      <input
                        type="radio"
                        name="gender"
                        value="OTHER"
                        checked={formData.gender === "OTHER"}
                        onChange={handleInputChange}
                        className="accent-purple-500"
                      />
                      <span>Tidak Diketahui</span>
                    </label>
                  </div>
                </div>

                {/* FIELD 3: DATE PICKER TANGGAL LAHIR */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date ? formData.birth_date.split("T")[0] : ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* PREFERENSI & KEAMANAN */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200">Keamanan & Notifikasi</h3>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-white/5">
                    <div>
                      <p className="text-xs font-semibold text-white">Notifikasi Email</p>
                      <p className="text-[11px] text-slate-400">Terima promo dan informasi akun via email</p>
                    </div>
                    <input
                      type="checkbox"
                      name="email_notifications"
                      checked={formData.email_notifications}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-white/5">
                    <div>
                      <p className="text-xs font-semibold text-white">Autentikasi Dua Faktor (2FA)</p>
                      <p className="text-[11px] text-slate-400">Tingkatkan keamanan login akun Anda</p>
                    </div>
                    <input
                      type="checkbox"
                      name="two_factor_auth"
                      checked={formData.two_factor_auth}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* TOMBOL SAVE */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-105 cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* MODAL CROPPER */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white text-center">
              Sesuaikan Foto Profil
            </h3>

            {/* Container Canvas Crop */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Slider Zoom */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Zoom
              </span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setImageSrc(null)}
                disabled={isUploading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCropAndUpload}
                disabled={isUploading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
              >
                {isUploading ? "Mengunggah..." : "Potong & Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}