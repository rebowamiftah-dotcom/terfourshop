import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { hashAuthToken, isAuthTokenExpired } from "@/lib/authToken";

export const FORGOT_PASSWORD_COOKIE = "forgot_password_verification_token";
export const FORGOT_PASSWORD_VERIFICATION_MAX_AGE = 10;

// VERIFIKASI LUPA PASSWORD

export async function getForgotPasswordVerify() {
  const cookieStore = await cookies();

  const token = cookieStore.get(FORGOT_PASSWORD_COOKIE)?.value;

  if (!token) {
    return null;
  };

  const tokenHash = hashAuthToken(token);

  const praForgotPassword = await prisma.praForgotPassword.findUnique({
    where: { forgot_token: tokenHash },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!praForgotPassword) {
    return null;
  };

  if (isAuthTokenExpired(praForgotPassword.forgot_token_expires_at)) {
    return null;
  };

  return praForgotPassword;
}