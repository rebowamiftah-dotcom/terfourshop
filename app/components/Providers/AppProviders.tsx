'use client';

import { LanguageProvider } from '../Contexts/LanguageContext';
import type { ReactNode } from 'react';

export default function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}