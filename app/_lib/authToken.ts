import crypto from "crypto";

// Generate Token
export function generateAuthToken(): string {
  return crypto.randomBytes(32).toString("hex");
};

// Hash Token
export function hashAuthToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
};

// Cek apakah Token sudah expired
export function getAuthTokenExpiration(minuts: number): Date {
  return new Date(Date.now() + minuts * 60 * 1000);
};

export function isAuthTokenExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return true;

  return expiresAt.getTime() <= Date.now();
};