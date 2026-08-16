'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { hyperspeedPresets } from './HyperSpeedPresets';
import { motion } from 'framer-motion';

const Hyperspeed = dynamic(
  () => import('@/components/UI/HyperSpeed'),
  { ssr: false }
);

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="absolute inset-0 z-0 h-full w-full"
    >
      {mounted && <Hyperspeed effectOptions={hyperspeedPresets.one} />}
      <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />
    </motion.div>
  );
}
