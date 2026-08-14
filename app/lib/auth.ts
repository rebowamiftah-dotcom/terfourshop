import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth";
import type { Adapter, AdapterUser } from "next-auth/adapters";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

import bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { generateUsername } from "./utils";

const baseAdapter = PrismaAdapter(prisma);

export const authOptions: AuthOptions = {
  adapter: {
    ...baseAdapter,

    // Generate User
    async createUser( data: Omit<AdapterUser, "id"> ): Promise<AdapterUser> {
      // Cari Role: CUSTOMER
      const customerRole = await prisma.role.findUnique({
        where: {
          name: "CUSTOMER",
        },
      });

      if (!customerRole) {
        throw new Error("Role CUSTOMER tidak ditemukan.");
      }

      // Generate username
      let username = generateUsername(data.email);

      // Pastikan username benar-benar unik
      while (
        await prisma.user.findUnique({
          where: {
            username,
          },
        })
      ) {
        username = generateUsername(data.email);
      }

      // Buat User baru
      const user = await prisma.user.create({
        data: {
          id: uuidv7(),
          username,
          email: data.email,
          password: null,   // User Google tdk punya PW lokal
          role_id: customerRole.id,   // Role default
        },
      });

      // Kembalikan bentuk User yang dipahami NextAuth
      return {
        id: user.id,
        email: user.email,
        emailVerified: data.emailVerified ?? null,
        name: data.name ?? null,
        image: data.image ?? null,
      };
    },

    // Update ID nya saja sisanya sesuai dgn proses dari Authnya
    async linkAccount( data: Parameters<Adapter["linkAccount"]>[0] ) {
      return prisma.account.create({
        data: {
          id: uuidv7(),
          ...data,
        },
      });
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",   // Atur agar selalu pilih akun terlebih dahulu
        },
      },
    }),

    CredentialProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.login },
              { email: credentials.login },
            ],
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);