'use client';

import { useHeader } from "../Contexts/HeaderContext";
import { useLanguage } from "../Contexts/LanguageContext";

import Image from "next/image";
import Link from "next/link";

export default function ProfileUser() {
  const {
    setIsMobileMenuOpen,
  } = useHeader();

  const {
    language
  } = useLanguage();

  return (
    <div className="flex items-center gap-5 p-2 bg-zinc-800 rounded-lg">
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
        <Image src="/jason.jpg" alt={"username"} fill className="object-cover" />
      </div>

      <span className="flex-1 text-white font-medium truncate">
        {"@username"}
      </span>

      <Link
        href="/profile"
        className="shrink-0 px-3 py-1.5 text-sm font-bold text-gray-300 rounded-md transition-all duration-200 hover:bg-zinc-700 hover:text-white"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {language === "ID" ? "Kunjungi" : "Visit"}
      </Link>
    </div>
  )
}