"use client";

import React, { useRef } from "react";
import clsx from "clsx";

interface InputOTPProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function InputOTP({ length = 6, value, onChange, disabled = false }: InputOTPProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array Representasi Digit
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value;
    const value = rawVal.replace(/\D/g, "");

    const newDigits = [...digits];

    if (!value) {
      // Jika input dikosongkan
      newDigits[index] = "";

      onChange(newDigits.join(""));

      return;
    };

    // Ambil karakter angka terakhir jika input ditimpa
    newDigits[index] = value.slice(-1);

    const newValue = newDigits.join("");

    onChange(newValue);

    // Otomatis pindah ke kotak berikutnya
    if (index < length - 1) {
      focusInput(index + 1);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Jika kotak kosong & tekan Backspace, pindah ke kotak sebelumnya
        focusInput(index - 1);
      } else {
        // Hapus karakter saat ini
        const newDigits = [...digits];

        newDigits[index] = "";

        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    };
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (!pastedData) return;

    onChange(pastedData);

    // Fokus ke kotak setelah digit terakhir yang terisi
    focusInput(Math.min(pastedData.length, length - 1));
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digits[index] || ""}
          disabled={disabled}
          onFocus={(e) => e.target.select()} // Select teks otomatis saat di-fokus
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={clsx(
            "w-10 h-12 sm:w-12 sm:h-14 rounded-xl text-center text-xl sm:text-2xl font-bold",
            "bg-slate-900/80 border border-white/10 text-white shadow-inner",
            "focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}