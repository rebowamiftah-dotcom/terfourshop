'use client';

import { useHeader } from "../Contexts/HeaderContext";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";
import Link from "next/link";
import { motion } from "framer-motion";

import NavLink from "./NavLink";
import clsx from "clsx";

type DropdownProps = {
  menus: {
    title: {
      id: string;
      en: string;
    };
    href: string;
  }[];
};

export default function Dropdown({ menus }: DropdownProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeader();
  const { language } = useLanguage();

  return (
    <div
      className={clsx(
        "absolute left-0 right-0 top-full z-50",
        "bg-zinc-950/95 border-t border-zinc-800/80",
        "px-5 py-5",
        "space-y-3 max-h-[85vh] overflow-auto",
        "backdrop-blur-md shadow-2xl",
        "transition-all duration-300 ease-out",
        isMobileMenuOpen
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      {/* Navigasi dengan gaya lebih menarik */}
      <div className="space-y-1">
        {menus.map(({ title, href }, index) => (
          <motion.div
            key={`${index}-${language}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              title={title[getLangKey(language)]}
              href={href}
              className={clsx(
                "group relative flex items-center justify-between py-2.5 px-3 rounded-xl",
                "text-gray-300 font-medium text-sm transition-all duration-200",
                "hover:bg-zinc-900/80 hover:text-white hover:translate-x-1"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </motion.div>
        ))}
      </div>

      {/* Tombol Aksi */}
      <div className="pt-4 mt-4 border-t border-zinc-800/80 flex flex-col gap-2.5">
        {/* Tombol Registrasi */}
        <Link
          href="/registrasi"
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full text-center py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-700 text-gray-200 text-sm font-semibold hover:bg-zinc-800 transition-all duration-200"
        >
          {language === 'ID' ? 'Daftar Akun' : 'Register'}
        </Link>

        {/* Tombol Login */}
        <Link
          href="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full text-center py-2.5 px-4 rounded-xl bg-white text-black text-sm font-bold shadow-md hover:bg-gray-100 transition-all duration-200"
        >
          {language === 'ID' ? 'Masuk' : 'Login'}
        </Link>
      </div>
    </div>
  );
}