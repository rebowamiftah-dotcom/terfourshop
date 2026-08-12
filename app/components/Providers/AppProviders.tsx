'use client';

import { CartProvider } from '../Contexts/CartContext';
import { LanguageProvider } from '../Contexts/LanguageContext';
import type { ReactNode } from 'react';

export default function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LanguageProvider>
  );
}
  