"use client";

import { useState, useEffect, useCallback } from "react";

export function useAccurateTimer(initialSeconds: number) {
  // Inisialisasi targetTime langsung di awal (Lazy Initial State)
  const [targetTime, setTargetTime] = useState<number | null>(() => {
    return initialSeconds > 0 ? Date.now() + initialSeconds * 1000 : null;
  });

  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds);

  // Fungsi manual untuk Reset Timer
  const startTimer = useCallback((seconds: number) => {
    const now = Date.now();

    setTargetTime(now + seconds * 1000);

    setRemainingSeconds(seconds);
  }, []);

  // Single Effect untuk menghitung Interval & Event Listener
  useEffect(() => {
    if (!targetTime) return;

    const calculateRemaining = () => {
      const now = Date.now();

      const diffInSeconds = Math.max(0, Math.ceil((targetTime - now) / 1000));

      setRemainingSeconds(diffInSeconds);

      if (diffInSeconds <= 0) {
        setTargetTime(null);
      };
    };

    // Hitung sisa waktu saat ini juga
    calculateRemaining();

    const timer = setInterval(calculateRemaining, 1000);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        calculateRemaining();
      };
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [targetTime]);

  return {
    remainingSeconds,
    isExpired: remainingSeconds <= 0,
    resetTimer: startTimer,
  };
}