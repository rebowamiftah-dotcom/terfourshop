"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';

const ProfileCard = dynamic(() => import('@/components/UI/ProfileCard'), { ssr: false });

// DATA ANGGOTA DEVELOPER
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Rebowa M.",
    title: "Anggota",
    handle: "Frontend",
    status: "Siswa SMK",
    avatarUrl: "/miftah.png", // Ganti dengan gambar di folder public Anda
    contactUrl: "https://instagram.com/",
    glowColor: "rgba(16, 185, 129, 0.6)" // Hijau
  },
  {
    id: 2,
    name: "Fauzian Ahmad P.",
    title: "Kapten",
    handle: "Backend",
    status: "Siswa SMK",
    avatarUrl: "/fauzian.png", // Ganti dengan gambar di folder public Anda
    contactUrl: "https://instagram.com/",
    glowColor: "rgba(16, 185, 129, 0.6)" // Hijau
  },
  {
    id: 3,
    name: "M. Fakhri A.A",
    title: "Anggota",
    handle: "Frontend",
    status: "Siswa SMK",
    avatarUrl: "/fahkri.png", // Ganti dengan gambar di folder public Anda
    contactUrl: "https://instagram.com/",
    glowColor: "rgba(217, 70, 239, 0.6)" // Pink
  }
];


// Animations (local to this file)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
};

// Inner gradient yang konsisten dengan preset
const cyberInnerGradient = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const CardProfileList: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center"
    >
      {TEAM_MEMBERS.map((member) => (
        <motion.div key={member.id} variants={fadeInUp} className="w-full flex justify-center">
          <ProfileCard
            avatarUrl={member.avatarUrl}
            innerGradient={cyberInnerGradient}
            behindGlowColor={member.glowColor}
            behindGlowEnabled={true}
            behindGlowSize="50%"
            name={member.name}
            title={member.title}
            handle={member.handle}
            status={member.status}
            contactText="Contact Me"
            enableTilt={true}
            enableMobileTilt={true}
            showUserInfo={true}
            iconUrl="/code-pattern.png"
            className="shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
            onContactClick={() => console.log(`Contact ${member.name}`)}
          />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default React.memo(CardProfileList);