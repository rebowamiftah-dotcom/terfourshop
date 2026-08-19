"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import { dictionary } from "@/dictionaries/ProblemSolution";

export default function ProblemSolution() {
  const { language } = useLanguage();
  const text = dictionary[getLangKey(language)];

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Glow Ambient */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            {text.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {text.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              {text.titleHighlight}
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl p-[1.5px] bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
            >
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
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                      <p className="text-xs text-rose-300/80 font-medium flex items-center gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>{" "}
                        {item.problem}
                      </p>
                    </div>

                    {/* Kotak Solusi (Solution) */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 group-hover:border-emerald-500/40 transition-colors">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-start gap-2 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>{" "}
                        {item.solution}
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