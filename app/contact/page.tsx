"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


// --- DUMMY DATA INFORMASI KONTAK ---
const CONTACT_INFO = [
  {
    id: 1,
    title: "Lokasi Kantor",
    detail: "Terfour Tower, Cyber District No. 88, Jakarta Selatan",
    icon: "📍",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    title: "Email Bantuan",
    detail: "support@terfourshop.id",
    icon: "✉️",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Telepon / WhatsApp",
    detail: "+62 (21) 8062-1234",
    icon: "📞",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 4,
    title: "Jam Operasional",
    detail: "Senin - Minggu: 24 Jam Nonstop",
    icon: "⚡",
    gradient: "from-amber-400 to-orange-500",
  },
];

export default function Contact() {
  const router = useRouter();

  // --- STATE STATUS LOGIN/REGISTER (Ganti ke true/false untuk pengujian) ---
  const [isRegistered, setIsRegistered] = useState(false);

  // State Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logika Cek Pendaftaran: Jika belum terdaftar, arahkan ke /register
    if (!isRegistered) {
      router.push("/register");
      return;
    }

    setIsSubmitting(true);
    // Simulasi pengiriman pesan
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-hidden py-16 sm:py-24 relative">
      {/* GLOW BACKGROUND DEKORATIF */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20"
          >
            Hubungi Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight"
          >
            Ada Pertanyaan? Kami Siap Membantu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm mt-3 font-light leading-relaxed"
          >
            Tim bantuan TerfourShop siap melayani pertanyaan seputar produk, pesanan, maupun kendala teknis Anda.
          </motion.p>
        </div>

        {/* MAIN CONTENT: INFO CARDS & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* BAGIAN KIRI: KARTU INFORMASI KONTAK */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {CONTACT_INFO.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl p-[1.5px] bg-white/10 overflow-hidden cursor-pointer"
              >
                {/* RUNNING RAINBOW BORDER */}
                <motion.div
                  className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #f43f5e, #eab308, #22c55e, #06b6d4, #a855f7, #f43f5e)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                <div className="w-full h-full p-5 rounded-[15px] bg-slate-950/90 flex items-center gap-4 relative overflow-hidden">
                  <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-25 transition-opacity`} />
                  
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.title}</h3>
                    <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-purple-300 transition-colors">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BAGIAN KANAN: FORMULIR PESAN */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 group relative rounded-3xl p-[1.5px] bg-white/10 overflow-hidden"
          >
            {/* HOVER GLOW BORDER FORM */}
            <motion.div
              className="absolute -inset-[1.5px] rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{
                backgroundImage: "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4, #ec4899)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-full h-full p-8 sm:p-10 rounded-[23px] bg-slate-950/90 backdrop-blur-md relative">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Kirim Pesan Langsung</h2>
              <p className="text-xs text-slate-400 font-light mb-8">
                Isi formulir di bawah ini, tim kami akan merespons dalam waktu 1x24 jam.
              </p>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <span className="text-4xl">🎉</span>
                  <h3 className="text-lg font-bold text-emerald-400 mt-2">Pesan Berhasil Terkirim!</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Terima kasih telah menghubungi kami. Tim TerfourShop akan membalas pesan Anda segera.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold transition-all"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* INPUT NAMA */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Alex Rivers"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    {/* INPUT EMAIL */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* INPUT SUBJEK */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Subjek Pesan
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Pertanyaan Seputar Produk / Kendala Pesanan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* INPUT PESAN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Isi Pesan
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan detail pertanyaan atau kendala Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    />
                  </div>

                  {/* TOMBOL SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? "Mengirim Pesan..." : "Kirim Pesan Sekarang 🚀"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}