import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

import { prisma } from "@/lib/prisma";
import { hashAuthToken, isAuthTokenExpired } from "@/app/_lib/authToken";

import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identity: {
          label: "Email / Username",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },

        loginToken: {
          label: "Login Token",
          type: "text",
        },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        // JALUR 1: LOGIN MENGGUNAKAN LOGIN TOKEN

        if (credentials.loginToken) {
          const loginTokenHash = hashAuthToken(credentials.loginToken);

          const praLogin = await prisma.praLogin.findUnique({
            where: { login_token: loginTokenHash },
            include: {
              user: {
                include: {
                  roles: true,
                  profiles: true,
                },
              },
            },
          });

          if (!praLogin || isAuthTokenExpired(praLogin.login_token_expires_at)) {
            return null;
          };

          return {
            id: praLogin.user.id,
            name: praLogin.user.username,
            email: praLogin.user.email,
            image: praLogin.user.profiles?.avatar ?? null,
            role: praLogin.user.roles.name,
          };
        };

        // JALUR 2: USERNAME + PASSWORD

        if (!credentials.identity || !credentials.password ) {
          return null;
        };

        const username = credentials.identity.trim().toLowerCase();

        if (!username) {
          return null;
        };

        // CARI USER

        const user = await prisma.user.findUnique({
          where: { username, },
          include: {
            roles: true,
            profiles: true,
          },
        });

        if (!user?.password) {
          return null;
        };

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          return null;
        };

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.profiles?.avatar ?? null,
          role: user.roles.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,   // Masa berlaku session = 30 hari
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name ?? "";
        token.email = user.email ?? "";
        token.image = user.image ?? null;
        token.role = user.role;
      };

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);