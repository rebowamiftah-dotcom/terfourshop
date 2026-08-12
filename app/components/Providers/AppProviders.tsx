'use client';

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
        {children}
      </SessionProvider>
    </LanguageProvider>
  );
}