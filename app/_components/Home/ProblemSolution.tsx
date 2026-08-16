"use client";

import { motion } from "framer-motion";

const PAIN_POINTS = [
  {
    id: 1,
    problem: "Khawatir Produk KW & Kualitas Pas-Pasan",
    solution: "Jaminan 100% Produk Otentik & Terverifikasi",
    desc: "Setiap barang di TerfourShop melewati 5 tahap inspeksi kualitas dan memiliki sertifikat verifikasi digital.",
    number: "01",
    badge: "Garansi Ori",
    glowColor: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    problem: "Pengiriman Lambat & Resi Tidak Jelas",
    solution: "Sistem Logistik Latensi Rendah & Real-Time Tracking",
    desc: "Proses kemas otomatis kurang dari 2 jam dengan integrasi kurir express langsung ke lokasi Anda.",
    number: "02",
    badge: "Super Cepat",
    glowColor: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 3,
    problem: "Desain Fashion & Gadget yang Pasaran",
    solution: "Koleksi Eksklusif Bertema Cyber-Futuristic",
    desc: "Kami menghadirkan rilis edisi terbatas (limited drop) dengan estetika modern minimalis yang beda dari yang lain.",
    number: "03",
    badge: "Eksklusif",
    glowColor: "from-pink-500/20 to-purple-500/20",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            Mengapa TerfourShop Ada?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Kami Mengubah Cara Anda <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Berbelanja Online</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Banyak toko online menawarkan barang serupa, tetapi kami fokus menyelesaikan masalah utama yang sering dialami pembeli modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              whileTap={{ y: -2, scale: 0.98 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
            >
              <motion.div
                className="absolute -inset-[1.5px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #ec4899)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="w-full h-full p-8 rounded-[15px] bg-slate-900/95 flex flex-col justify-between space-y-6 relative overflow-hidden backdrop-blur-sm">
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-purple-400">
                      {item.number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                      <p className="text-xs text-rose-300/80 font-medium flex items-center gap-1.5">
                        <span className="text-rose-500 font-bold">✕</span> {item.problem}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 group-hover:border-emerald-500/40 transition-colors">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span> {item.solution}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}