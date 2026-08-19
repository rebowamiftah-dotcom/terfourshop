"use client";

import { useHeader } from "../Contexts/HeaderContext";
import { useLanguage } from "../Contexts/LanguageContext";
import { getLangKey } from "@/lib/language";

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
        "bg-zinc-900/95 border-t border-zinc-800",
        "px-4 pt-3 -6",
        "space-y-3 max-h-[80vh]  overflow-auto",
        "backdrop-blur-sm shadow-lg",
        "transition-all duration-200 ease-out",
        isMobileMenuOpen
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      {/* Navigasi */}
      {menus.map(({ title, href }, index) => (
        <NavLink
          key={`${index}-${language}`}
          title={title[getLangKey(language)]}
          href={href}
          className="group relative block py-2 text-gray-300 font-bold border-b border-zinc-800 transition-all duration-200 ease-out hover:translate-x-1 hover:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ))}
    </div>
  );
}