import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { hashAuthToken, isAuthTokenExpired } from "@/lib/authToken";

export const LOGIN_COOKIE = "login_verification_token";
export const LOGIN_VERIFICATION_MAX_AGE = 5;   // Menit

// VERIFIKASI TOKEN LOGIN

export async function getLoginVerify() {
  const cookieStore = await cookies();

  const token = cookieStore.get(LOGIN_COOKIE)?.value;

  if (!token) {
    return null;
  };

  const tokenHash = hashAuthToken(token);

  const praLogin = await prisma.praLogin.findFirst({
    where: { login_token: tokenHash },
  });

  if (!praLogin) {
    return null;
  };

  if (isAuthTokenExpired(praLogin.login_token_expires_at)) {
    return null;
  };

  return praLogin;
}