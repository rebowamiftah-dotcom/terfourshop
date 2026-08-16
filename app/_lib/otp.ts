import crypto from "crypto";
import bcrypt from "bcryptjs";

const OTP_EXPIRES_MINUTS = 5;   // Waktu OTP Berakhir: 5 Menit
const OTP_COOLDOWN_SECONDS = 60;   // Batas Waktu per 1 kali OTP

// Membuat kode OTP sebanyak 6 Digit angka
export function generateOTP(): string {
  return crypto.randomInt(100000, 1000000).toString();
};

// Hash hasil dari OTP supaya lbh aman
export async function hashOTP(otp:string): Promise<string> {
  return bcrypt.hash(otp, 10);
};

// Bandingkan OTP dgn nilai dari Inputan
export async function verifyOTP(otp:string, otpHash: string): Promise<boolean> {
  return bcrypt.compare(otp, otpHash);
};

// Generate Waktu Kadaluwarsa dari OTP
export function getOTPExpiration(): Date {
  return new Date(Date.now() + OTP_EXPIRES_MINUTS * 60 * 1000);   // Milisecond
};

export function getOTPResendCooldown(lastSentAt?: Date | null): number {
  if (!lastSentAt) return 0;

  const elapsed = Date.now() - lastSentAt.getTime();
  const cooldown = OTP_COOLDOWN_SECONDS * 1000;

  return Math.max(0, Math.ceil((cooldown - elapsed) / 1000));
};

// Generate Waktu Kadaluwarsa dari OTP
export function getOTPExpired(expiredAt: Date): boolean {
  return new Date() > expiredAt;
};