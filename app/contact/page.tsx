"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// --- DUMMY DATA KONTAK LANGSUNG ---
const DIRECT_CONTACTS = [
  {
    id: 1,
    title: "WhatsApp CS (Respon Tercepat)",
    detail: "+62 881-6120-414",
    actionText: "Chat WhatsApp",
    href: "https://wa.me/628816120414?text=Halo%20Admin%20TerfourShop,%20saya%20butuh%20bantuan",
    gradient: "from-emerald-500 to-teal-600",
    badge: "Online • 24 Jam",
    isExternal: true,
  },
  {
    id: 2,
    title: "Email Support Resmi",
    detail: "supportterfourshop@gmail.com",
    actionText: "Kirim Email",
    href: "mailto:supportterfourshop@gmail.com?subject=Kritik%20dan%20Saran%20TerfourShop",
    gradient: "from-pink-500 to-rose-600",
    badge: "Dibalas < 2 Jam",
    isExternal: false,
  },
];

// --- SHORTCUT BANTUAN CEPAT (E-COMMERCE QUICK LINKS) ---
const QUICK_HELP = [
  { 
    id: 1, 
    title: "Lacak Pesanan", 
    desc: "Fitur sedang dalam tahap pengembangan", 
    href: "#", 
    comingSoon: true 
  },
  { 
    id: 2, 
    title: "Kebijakan Retur", 
    desc: "Panduan pengembalian & Garansi", 
    href: "contact/returns", 
    comingSoon: false 
  },
  { 
    id: 3, 
    title: "Pusat FAQ", 
    desc: "Jawaban instan masalah umum", 
    href: "contact/faq", 
    comingSoon: false 
  },
];

export default function Contact() {
  const router = useRouter();

  // State Form Khusus E-Commerce (Kritik & Saran)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    category: "Saran Pengembangan Web / Aplikasi",
    customCategory: "", 
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalCategory =
      formData.category === "Lainnya" ? formData.customCategory : formData.category;

    const subject = `Kritik & Saran TerfourShop: ${finalCategory}`;
    const body = `Nama: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ANomor Pesanan: ${formData.orderId || "Tidak ada"}%0D%0AKategori: ${finalCategory}%0D%0A%0D%0APesan:%0D%0A${formData.message}`;
    
    window.location.href = `mailto:supportterfourshop@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({
        name: "",
        email: "",
        orderId: "",
        category: "Saran Pengembangan Web / Aplikasi",
        customCategory: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-hidden pt-20 sm:pt-10 relative flex flex-col justify-between">
      {/* GLOW BACKGROUND DEKORATIF */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl pb-16 sm:pb-24">
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20"
          >
            Layanan Pelanggan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight"
          >
            Hubungi Kami Langsung
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm mt-3 font-light leading-relaxed"
          >
            Pilih saluran kontak langsung di bawah ini untuk respons cepat, atau sampaikan kritik dan saran Anda melalui formulir.
          </motion.p>
        </div>

        {/* QUICK E-COMMERCE SHORTCUTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {QUICK_HELP.map((item) => (
            <motion.div
              key={item.id}
              whileHover={item.comingSoon ? {} : { y: -4 }}
              onClick={() => {
                if (!item.comingSoon) {
                  router.push(item.href);
                }
              }}
              className={`p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 transition-all ${
                item.comingSoon 
                  ? "opacity-60 cursor-not-allowed" 
                  : "cursor-pointer hover:border-pink-500/40 hover:bg-white/10"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  {item.comingSoon && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold tracking-wider">
                      COMING SOON
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAIN CONTENT: DIRECT CONTACTS & CRITIQUE/SUGGESTION FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* BAGIAN KIRI: KARTU KONTAK LANGSUNG & GOOGLE MAPS INTERAKTIF */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
              Kontak Langsung
            </h2>

            {DIRECT_CONTACTS.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="block group relative rounded-2xl p-[1.5px] bg-white/10 overflow-hidden cursor-pointer"
              >
                {/* RUNNING RAINBOW BORDER */}
                <motion.div
                  className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #f43f5e, #eab308, #22c55e, #06b6d4, #a855f7, #f43f5e)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                <div className="w-full h-full p-5 rounded-[15px] bg-slate-950/90 flex flex-col justify-between gap-4 relative overflow-hidden">
                  <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-25 transition-opacity`} />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-purple-300 transition-colors">
                        {item.detail}
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-pink-300 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-end text-xs font-bold text-pink-400 group-hover:text-pink-300 transition-colors">
                    <span>{item.actionText}</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* --- KARTU LOKASI KANTOR DENGAN GOOGLE MAPS INTERAKTIF --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-2xl p-[1.5px] bg-white/10 overflow-hidden relative"
            >
              <div className="w-full p-5 rounded-[15px] bg-slate-950/90 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Alamat Sekolah
                    </h3>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      SMKS TERATAI PUTIH GLOBAL 4 BEKASI
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-purple-300">
                    Kunjungan Resmi
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Alamat SMKS TERATAI PUTIH GLOBAL 4 BEKASI terletak di JL. BKKBN CIKETING MUSTIKA JAYA, Mustika Jaya, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat.
                </p>

                {/* --- GOOGLE MAPS EMBED (Bisa Zoom In/Out) --- */}
                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 relative">
                  <iframe
                    title="Peta Lokasi SMKS TERATAI PUTIH GLOBAL 4 BEKASI"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.079212267438!2d107.0321!3d-6.2575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698e72c575cb27%3A0x19df770e5b3cb245!2sSMK%20Teratai%20Putih%20Global%204%20Bekasi!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "contrast(1.1) invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Gunakan ctrl + scroll untuk zoom peta</span>
                  <a
                    href="https://maps.google.com/?q=SMK+Teratai+Putih+Global+4+Bekasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                  >
                    <span>Petunjuk Arah</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* BAGIAN KANAN: FORMULIR KRITIK & SARAN */}
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
                backgroundImage:
                  "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4, #ec4899)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-full h-full p-8 sm:p-10 rounded-[23px] bg-slate-950/90 backdrop-blur-md relative">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Kirim Kritik & Saran</h2>
              <p className="text-xs text-slate-400 font-light mb-8">
                Masukan Anda sangat berharga bagi kami. Isi formulir di bawah ini untuk memberikan kritik atau saran guna meningkatkan kualitas layanan kami.
              </p>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <h3 className="text-lg font-bold text-emerald-400 mt-2">Kritik & Saran Terkirim!</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Terima kasih telah memberikan masukan. Setiap tanggapan Anda sangat berarti untuk kemajuan TerfourShop.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold transition-all"
                  >
                    Kirim Masukan Lain
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
                        placeholder="Contoh: Heri Kurniawan"
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
                        placeholder="Heri@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* DROPDOWN KATEGORI MASUKAN */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Kategori Masukan
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      >
                        <option value="Saran Pengembangan Web / Aplikasi">Saran Pengembangan Web / Aplikasi</option>
                        <option value="Pengalaman Layanan / CS">Pengalaman Layanan / CS</option>
                        <option value="Kualitas Produk / Barang">Kualitas Produk / Barang</option>
                        <option value="Kendala Pesanan / Pengiriman">Kendala Pesanan / Pengiriman</option>
                        <option value="Kendala Akun & Teknis">Kendala Akun & Teknis</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    {/* INPUT NOMOR PESANAN (ORDER ID) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Nomor Pesanan (Opsional)
                      </label>
                      <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleChange}
                        placeholder="Contoh: #TF-88219"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* INPUT KATEGORI KUSTOM */}
                  <AnimatePresence>
                    {formData.category === "Lainnya" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-semibold text-pink-400 mb-1.5 uppercase tracking-wider">
                          Tuliskan Kategori Masukan Anda
                        </label>
                        <input
                          type="text"
                          name="customCategory"
                          required={formData.category === "Lainnya"}
                          value={formData.customCategory}
                          onChange={handleChange}
                          placeholder="Contoh: Masukan Promo & Diskon"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-pink-500/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INPUT PESAN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Detail Kritik & Saran
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan kritik, masukan, atau saran Anda selengkap mungkin..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    />
                  </div>

                  {/* TOMBOL SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? "Mengirim Masukan..." : "Kirim Kritik & Saran"}
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