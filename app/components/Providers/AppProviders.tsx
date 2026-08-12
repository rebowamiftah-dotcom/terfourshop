'use client';

import { CartProvider } from '../Contexts/CartContext';
import { LanguageProvider } from '../Contexts/LanguageContext';
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from 'react';

export default function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LanguageProvider>
      <SessionProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </SessionProvider>
    </LanguageProvider>
  );
}
  