import crypto from "crypto";

const LOGIN_TOKEN_EXPIRES_MINUTES = 5;

// Generate token Login sementara
export function generateLoginToken(): string {
  return crypto.randomBytes(32).toString("hex");
};

// Generate waktu expired token login
export function hashLoginToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
};

// Cek apakah login token sudah expired
export function getLoginTokenExpiration(): Date {
  return new Date(
    Date.now() + LOGIN_TOKEN_EXPIRES_MINUTES * 60 * 1000
  );
};