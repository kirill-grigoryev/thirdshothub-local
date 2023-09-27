import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import type { AuthOptions, User } from 'next-auth';

import prisma from '@/prisma';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          },
          include: {
            roles: true
          }
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          const { password, ...userWithoutPass } = user;

          return {
            ...userWithoutPass,
            role: user.roles.map((role) => role.value)
          } as User;
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role;

      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
};
