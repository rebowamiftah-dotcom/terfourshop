import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import AppProviders from "@/components/Providers/AppProviders";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/UI/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerfourShop",
  description: "Temukan berbagai produk berkualitas tinggi dengan penawaran terbaik dan layanan pelanggan 24 jam hanya di TerfourShop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-w-[350px] min-h-full flex flex-col">
        <AppProviders>
          <Header />
          <main>
            {children}
          </main>

          <Footer />

          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
