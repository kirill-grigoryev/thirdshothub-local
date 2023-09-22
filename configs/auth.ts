import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import type { AuthOptions, User } from "next-auth";

import prisma from "@/prisma";
import { connectToDb } from "@/utils";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        await connectToDb();

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        await prisma.$disconnect();

        if (
          user &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          const { password, ...userWithoutPass } = user;

          return userWithoutPass;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
