"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ImageUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
        <div className="hidden sm:block w-20 h-4 rounded bg-zinc-800 animate-pulse" />
      </div>
    );
  }

  if (status !== "authenticated" || !session?.user) {
    return null;
  }

  const username = session.user.username ?? "";

  // Nama yang ditampilkan
  const displayName = username.trim() || "User";

  // Ambil inisial dari full name / username
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const imageSrc = session.user.image;

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 group"
    >
      {/* Profile Image */}
      <div
        className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-white transition-colors">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`Profil ${displayName}`}
            fill
            sizes="36px"
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-purple-600 text-white text-xs font-bold uppercase">
            {initials}
          </div>
        )}
      </div>

      {/* User Name */}
      <span
        className="hidden sm:block text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
        {displayName}
      </span>
    </Link>
  );
}