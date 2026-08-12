'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { hyperspeedPresets } from './HyperSpeedPresets';

const Hyperspeed = dynamic(
  () => import('./HyperSpeed'),
  { ssr: false }
);

export default function Background() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setIsVisible(true);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`w-full h-full transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {mounted ? <Hyperspeed effectOptions={hyperspeedPresets.one} /> : null}
    </div>
  );
}