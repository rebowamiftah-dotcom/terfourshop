'use client';

import clsx from "clsx";
import { useLanguage } from "../Contexts/LanguageContext";

export default function LanguageToggle() {
  const {
    language,
    setLanguage,
  } = useLanguage();

  // Tampilan desktop
  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("ID")}
        className={clsx(
          "px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
          language === 'ID'
            ? 'bg-white text-black font-bold shadow-md'
            : 'text-gray-400 hover:text-white'
        )}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLanguage("EN")}
        className={clsx(
          "px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
          language === 'EN'
            ? 'bg-white text-black font-bold shadow-md'
            : 'text-gray-400 hover:text-white'
        )}
      >
        EN
      </button>
    </div>
  );
}