import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import AppProviders from "@/components/Providers/AppProviders";
import { Toaster } from "@/components/UI/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terfour Shop",
  description: "Terfour Shop Ecommerce",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-w-87.5 min-h-full">
        <AppProviders>
          {children}

          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}