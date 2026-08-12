'use client';

import { useLanguage } from "../Contexts/LanguageContext";

type LanguageToggleProps = {
  variant?: 'desktop' | 'mobile';
};

export default function LanguageToggle(
  { variant = 'desktop'}: LanguageToggleProps
) {
  const {
    language,
    setLanguage,
  } = useLanguage();

  // Tampilan khusus mobile
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
        aria-label={`Switch language to ${language === 'ID' ? 'English' : 'Indonesian'}`}
        className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-xs font-bold text-gray-300 transition-all duration-200 hover:border-zinc-500 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
      >
        {language}
      </button>
    );
  } 

  // Tampilan desktop
  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("ID")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === 'ID'
            ? 'bg-white text-black font-bold shadow-md'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLanguage("EN")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === 'EN'
            ? 'bg-white text-black font-bold shadow-md'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}