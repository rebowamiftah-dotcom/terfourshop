'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type HeaderContextType = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isLoggedIn: boolean;
};

const HeaderContext = createContext<HeaderContextType | null>(null);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isLoggedIn,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }

  return context;
}