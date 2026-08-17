"use client";

import { useState, useEffect, useCallback } from "react";

export function useAccurateTimer(targetTime: number | null) {
  const [currentTarget, setCurrentTarget] = useState<number | null>(
    targetTime
  );

  // Initial state HARUS statis agar SSR dan Client sama
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const resetTimer = useCallback((newTargetTime: number) => { setCurrentTarget(newTargetTime) }, []);

  useEffect(() => {
    if (currentTarget === null) {
      return;
    };

    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil((currentTarget - Date.now()) / 1000));

      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        setCurrentTarget(null);
      };
    };

    const interval = setInterval(updateRemaining, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateRemaining();
      };
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentTarget]);

  return {
    remainingSeconds,
    isExpired: currentTarget === null || remainingSeconds <= 0,
    resetTimer,
  };
}