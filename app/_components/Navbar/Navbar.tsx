'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHeader } from '../Contexts/HeaderContext';
import { useLanguage } from '../Contexts/LanguageContext';
import { getLangKey } from '@/lib/language';

import { HamburgerIcon, XIcon } from '../Icon';
import Link from 'next/link';
import RightSide from './RightSide';
import NavLink from './NavLink';
import LanguageToggle from './LanguageToggle';
import ImageUser from './ImageUser';
import CartCount from './CartCount';

type NavbarProps = {
  menus: {
    title: { id: string; en: string };
    href: string;
  }[]
};

export default function Navbar({ menus }: NavbarProps) {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLoggedIn,
  } = useHeader();

  const {
    language
  } = useLanguage();

  useEffect(() => {
    // Pengecekan status pendaftaran dari localStorage
    const registeredUser = localStorage.getItem("isRegistered");
    if (registeredUser === "true") {
      setIsRegistered(true);
    }
  }, []);

  // Fungsi pengatur arah link menu
  const getMenuHref = (href: string, titleId: string) => {
    // Pengecekan spesifik untuk menu Belanja / Shopping
    if (href === '/shopping' || href === '/shop' || titleId.toLowerCase().includes('belanja')) {
      if (!isRegistered) {
        return '/shopping';
      }
      if (isLoggedIn) {
        return '/shopping';
      }
      return '/login';
    }
    return href;
  };

  return (
    <nav className="flex items-center justify-between h-16 md:h-18 gap-4">
      {/* BAGIAN KIRI: Logo & Nama Toko */}
      <RightSide title="TerfourShop" link="/" img="/logo.jpg" />

      {/* BAGIAN KANAN (DESKTOP) */}
      <div className="hidden tablet:flex items-center gap-6">
        {/* Navigasi */}
        {menus.map(({ title, href }, index) => (
          <NavLink
            key={`${index}-${language}`}
            title={title[getLangKey(language)]}
            href={getMenuHref(href, title.id)}
            className="text-md font-semibold text-gray-300 hover:text-white transition-colors"
          />
        ))}

        {/* Toggle Bahasa */}
        <LanguageToggle variant='desktop' />

        {/* Tampilan Berdasarkam Logika Login */}
        {isLoggedIn ? (
          <ImageUser link="/profile" img="/jason.jpg" />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/registrasi" className="text-white font-semibold px-3 py-2 rounded-md hover:text-gray-300 transition-colors hidden lg:block">
              {language === "ID" ? "Daftar" : "Registrasi"}
            </Link>
            <Link href="/login" className="bg-white text-black font-semibold px-3 py-2 rounded-md hover:bg-gray-200 transition-all active:scale-95">
              {language === "ID" ? "Masuk" : "Login"}
            </Link>
          </div>
        )}
      </div>

      {/* BAGIAN KANAN (IPAD KEBAWAH) */}
      <div className="flex tablet:hidden items-center gap-3">
        {/* Toggle Bahasa */}
        <LanguageToggle variant='mobile' />

        {/* Cart Icon */}
        <CartCount />

        {/* Icon Hamburger & X */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white focus:outline-none p-1 cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-7 w-7" />
          ) : (
            <HamburgerIcon className="h-7 w-7" />
          )}
        </button>
      </div>
    </nav>
  );
}