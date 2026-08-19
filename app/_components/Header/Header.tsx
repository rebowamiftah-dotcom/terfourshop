"use client";

import { HeaderProvider, useHeader } from "../Contexts/HeaderContext";
import { useLanguage } from "../Contexts/LanguageContext";
import { useSession } from "next-auth/react";   // Context

import Link from "next/link";
import Dropdown from "../Navbar/Dropdown";
import Logo from "../Navbar/Logo";
import LanguageToggle from "../Navbar/LanguageToggle";
import ImageUser from "../Navbar/ImageUser";
import { HamburgerIcon, XIcon } from "../Icon";

interface HeaderProps {
  navLinks: {
    title: {
      id: string;
      en: string;
    };
    href: string;
  }[];
}

// HEADER CONTENT

function HeaderContent({ navLinks }: HeaderProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeader();
  const { language } = useLanguage();
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated" && !!session?.user;

  return (
    <div className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
      <header className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18 gap-1 sm:gap-4">
          {/* BAGIAN KIRI: LOGO */}
          <Logo
            title="TerfourShop"
            link="/"
            img="/logo.jpg"
          />

          {/* BAGIAN KANAN: */}
          <div className="flex items-center gap-6">
            {/* LANGUAGE */}
            <LanguageToggle />

            {/* AUTH */}
            {isLoggedIn ? (
              <ImageUser />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/registrasi"
                  className="bg-slate-950 text-white font-semibold px-3 py-2 rounded-md hover:text-gray-300 transition-colors hidden lg:block">
                  {language === "ID" ? "Daftar" : "Registrasi"}
                </Link>

                <Link
                  href="/login"
                  className="bg-white text-black font-semibold px-3 py-2 rounded-md hover:bg-gray-200 transition-all active:scale-95">
                  {language === "ID" ? "Masuk" : "Login"}
                </Link>
              </div>
            )}

            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-1 cursor-pointer">
              {isMobileMenuOpen ? <XIcon className="h-7 w-7" /> : <HamburgerIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </header>

      <Dropdown menus={navLinks} />
    </div>
  );
}

// HEADER
export default function Header({ navLinks }: HeaderProps) {
  return (
    <HeaderProvider>
      <HeaderContent navLinks={navLinks} />
    </HeaderProvider>
  );
}