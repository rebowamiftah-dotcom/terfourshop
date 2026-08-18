import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { hashAuthToken, isAuthTokenExpired } from "@/lib/authToken";

export const REGISTRASI_COOKIE = "registration_verification";
export const REGISTRASI_VERIFICATION_MAX_AGE = 10;   // Menit

// VERIFIKASI TOKEN REGISTRASI

export async function getRegistrasiVerify() {
  const cookieStore = await cookies();

  const token = cookieStore.get(REGISTRASI_COOKIE)?.value;

  if (!token) {
    return null;
  };

  const tokenHash = hashAuthToken(token);

  const praRegister = await prisma.praRegister.findFirst({
    where: { registrasi_token: tokenHash },
  });

  if (!praRegister) {
    return null;
  };

  if (isAuthTokenExpired(praRegister.registrasi_token_expires_at)) {
    return null;
  };

  return praRegister;
}