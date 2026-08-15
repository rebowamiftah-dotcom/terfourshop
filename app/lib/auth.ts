import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { hashLoginToken } from "./loginToken";
import { isExpired } from "./utils";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        login: {
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
          const loginTokenHash = hashLoginToken(credentials.loginToken);

          // PraLogin + User + Role
          const praLogin = await prisma.praLogin.findUnique({
            where: { login_token: loginTokenHash },
            include: {
              user: {
                include: { roles: true }
              },
            },
          });

          if (!praLogin || isExpired(praLogin.login_token_expires_at)) {
            return null;
          };

          return {
            id: praLogin.user.id,
            name: praLogin.user.username,
            email: praLogin.user.email,
            role: praLogin.user.roles.name,
          };
        };

        // JALUR 2: USERNAME + PASSWORD

        if (!credentials.login || !credentials.password) {
          return null;
        };

        const login = credentials.login.trim().toLowerCase();

        const user = await prisma.user.findFirst({
          where: { username: login },
          include: { roles: true }
        });

        if (!user?.password) {
          return null;
        };

        const isValidPassword = await bcrypt.compare(credentials.password,user.password);

        if (!isValidPassword) {
          return null;
        };

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.roles.name,
        };
      },
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,    // Masa Waktu Session = 30 Hari
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name ?? "";
        token.email = user.email ?? "";
        token.role = user.role;
      };

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);