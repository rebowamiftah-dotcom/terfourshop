import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid";

// Helper untuk Merge Component dari Library Shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper untuk mengenerate Username DataBase berdasarkan Emailnya
export function generateUsername(email: string): string {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/^-+|-+$/g, "");

  const safeBase = base || "user";
  const uniqueId = uuidv4().replace(/-/g, "").slice(0, 8);

  return `@${safeBase}_${uniqueId}`;
}

// Helper untuk Memformat Nomor Telepon
export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("62")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("08")) {
    digits = digits.slice(1);
  } else if (!digits.startsWith("8")) {
    throw new Error("Format nomor handphone tidak valid.");
  }

  const normalized = `62${digits}`;

  if (!/^628\d{8,11}$/.test(normalized)) {
    throw new Error("Nomor handphone tidak valid.");
  }

  return normalized;
}

export function isExpired(expiredAt?: Date | null): boolean {
  if (!expiredAt) return true;

  return new Date() > expiredAt;
}