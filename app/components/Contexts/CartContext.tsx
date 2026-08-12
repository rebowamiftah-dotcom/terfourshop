"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  icon: string;
  quantity: number;
}

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  icon: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, e: React.MouseEvent) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, e: React.MouseEvent) => {
    // 1. Ambil posisi titik klik tombol / kartu
    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = targetRect.left + targetRect.width / 2;
    const startY = targetRect.top + targetRect.height / 2;

    // 2. Ambil posisi target ikon Keranjang di Navbar
    const cartNavElement = document.getElementById("nav-cart-icon");
    let endX = window.innerWidth - 60;
    let endY = 30;

    if (cartNavElement) {
      const cartRect = cartNavElement.getBoundingClientRect();
      endX = cartRect.left + cartRect.width / 2;
      endY = cartRect.top + cartRect.height / 2;
    }

    // 3. Tambahkan objek animasi melayang
    const animId = Date.now();
    setFlyingItems((prev) => [
      ...prev,
      { id: animId, startX, startY, endX, endY, icon: product.icon || "📦" },
    ]);

    // 4. Masukkan produk ke state keranjang
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceFormatted: product.priceFormatted,
          icon: product.icon || "📦",
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen }}
    >
      {children}

      {/* RENDER ANIMASI ITEM MELAYANG */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              position: "fixed",
              left: item.startX,
              top: item.startY,
              scale: 1,
              opacity: 1,
              zIndex: 9999,
            }}
            animate={{
              left: item.endX,
              top: item.endY,
              scale: 0.2,
              opacity: 0.8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              setFlyingItems((prev) => prev.filter((i) => i.id !== item.id));
            }}
            className="pointer-events-none text-2xl flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white"
          >
            {item.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}