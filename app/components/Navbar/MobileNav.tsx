'use client';

import { useHeader } from '../Contexts/HeaderContext';
import { useLanguage } from '../Contexts/LanguageContext';
import { getLangKey } from '@/app/lib/language';

import Link from 'next/link';
import NavLink from './NavLink';
import ProfileUser from './ProfileUser';

type MobileNavProps = {
  menus: {
    title: { id: string; en: string };
    href: string;
  }[]
};

export default function MobileNav(
  { menus }: MobileNavProps
) {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLoggedIn,
  } = useHeader();

  const {
    language
  } = useLanguage();

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
        <div className="absolute left-0 right-0 top-full z-50 bg-zinc-900/95 border-t border-zinc-800 px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-auto backdrop-blur-sm shadow-lg tablet:hidden">
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

          {/* Logika Login (Mobile) */}
          <div className="pt-2 flex flex-col gap-3">
            {!isLoggedIn ? (
              <ProfileUser />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/registrasi" 
                  className="block w-full text-center border border-zinc-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === "ID" ? "Daftar" : "Registrasi"}
                </Link>
                <Link 
                  href="/login" 
                  className="block w-full text-center bg-white text-black font-semibold py-2 rounded-lg transition-all duration-200 hover:bg-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === "ID" ? "Masuk" : "Login"}
                </Link>
              </div>
            )}
          </div>
        </div>
  )
}