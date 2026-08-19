import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { hashAuthToken, isAuthTokenExpired } from "@/lib/authToken";

export const RESET_PASSWORD_COOKIE = "reset_password_verification_token";
export const RESET_PASSWORD_VERIFICATION_MAX_AGE = 60;

// VERIFIKASI RESET PASSWORD

export async function getResetPasswordVerify() {
  const cookieStore = await cookies();

  const token = cookieStore.get(RESET_PASSWORD_COOKIE)?.value;

  if (!token) {
    return null;
  };

  const tokenHash = hashAuthToken(token);

  const praForgotPassword = await prisma.praForgotPassword.findUnique({
    where: { reset_token: tokenHash },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
        },
      },
    },
  });

  if (!praForgotPassword) {
    return null;
  };

  if (isAuthTokenExpired(praForgotPassword.reset_token_expires_at)) {
    return null;
  };

  return praForgotPassword;
}