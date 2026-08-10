'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // State palsu (dummy) status login
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // State untuk kontrol bahasa (ID atau EN)
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');

  const cartItemCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* ================= 1. KIRI: Logo & Nama Toko ================= */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <Image 
                src="/jason.jpg" 
                alt="Logo Toko"
                width={28}
                height={28}
                className="object-contain rounded-full"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-gray-300 transition-colors hidden sm:inline">
              TerfourShop
            </span>
          </Link>

          {/* ================= 2. KANAN: Navigasi & Akun (Desktop) ================= */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>

            <Link href="/shopping" className="text-gray-300 hover:text-white transition-colors">
              Shopping
            </Link>

            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>

            {/* ================= TOMBOL TOGGLE BAHASA (DESKTOP) ================= */}
            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full p-1 text-xs font-semibold">
            <button
                type="button"
                onClick={() => setLanguage('ID')}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                language === 'ID'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                ID
            </button>
            <button
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                language === 'EN'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                EN
            </button>
            </div>

            {/* Logika Login (Desktop) */}
            {isLoggedIn ? (
              <Link href="/profile" className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-white transition-colors">
                <Image 
                  src="/jason.jpg" 
                  alt="Profil Pengguna"
                  fill
                  className="object-cover"
                />
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                >
                  Masuk
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                >
                  Daftar
                </Link>
              </div>
            )}
          </nav>

          {/* ================= 3. MOBILE HAMBURGER BUTTON ================= */}
          <div className="flex md:hidden items-center gap-3">
            {/* Tombol Toggle Bahasa Ringkas di Mobile Header */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'ID' ? 'EN' : 'ID')}
              className="text-xs font-bold border border-zinc-700 px-2 py-1 rounded-md text-gray-300 hover:text-white"
            >
              {language === 'ID' ? '🇮🇩 ID' : '🇬🇧 EN'}
            </button>

            <Link href="/cart" className="relative p-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none p-1"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ================= 4. DROPDOWN MENU MOBILE ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          
          <Link href="/" className="block py-2 text-gray-300 border-b border-zinc-800" onClick={() => setIsMobileMenuOpen(false)}>
            Beranda
          </Link>
          <Link href="/products" className="block py-2 text-gray-300 border-b border-zinc-800" onClick={() => setIsMobileMenuOpen(false)}>
            Semua Produk
          </Link>

          {/* Kategori Accordion/Dropdown Mobile */}
          <div className="border-b border-zinc-800 py-2">
            <button 
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full text-left text-gray-300 font-medium py-1"
            >
              <span>Kategori</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="pl-4 mt-2 space-y-2 border-l border-zinc-700">
                <Link href="/category/sepatu" className="block text-sm text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  👟 Sepatu Pria
                </Link>
                <Link href="/category/pakaian" className="block text-sm text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  👕 Pakaian
                </Link>
                <Link href="/category/aksesoris" className="block text-sm text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  ⌚ Aksesoris
                </Link>
              </div>
            )}
          </div>
          
          {/* Logika Login (Mobile) */}
          <div className="pt-2 flex flex-col gap-3">
            {isLoggedIn ? (
              <Link 
                href="/profile" 
                className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image 
                    src="/jason.jpg" 
                    alt="Profil"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white font-medium">Profil Saya</span>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/login" 
                  className="block w-full text-center border border-zinc-700 text-white font-semibold py-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link 
                  href="/register" 
                  className="block w-full text-center bg-white text-black font-semibold py-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}