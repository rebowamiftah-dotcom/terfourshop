'use client';

import clsx from "clsx";
import { useLanguage } from "../Contexts/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center bg-zinc-900 border border-zinc-700 rounded-full p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("ID")}
        className={clsx(
          "relative z-10 px-3 py-1 rounded-full cursor-pointer transition-colors duration-200",
          language === 'ID' ? 'text-black font-bold' : 'text-gray-400 hover:text-white'
        )}
      >
        ID
        {language === 'ID' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => setLanguage("EN")}
        className={clsx(
          "relative z-10 px-3 py-1 rounded-full cursor-pointer transition-colors duration-200",
          language === 'EN' ? 'text-black font-bold' : 'text-gray-400 hover:text-white'
        )}
      >
        EN
        {language === 'EN' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </button>
    </div>
  );
}