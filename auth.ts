import NextAuth, { AuthError, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      authorize: async (credentials): Promise<User | null | Error> => {
        //  Find and grab a user based on the email provided, if there is no user return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email as string } });
        if (!user) return null;

        //  Verify the password provided matches the one in the user otherwise return null
        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) return null;

        //  If all checks clear, user data is returned
        return { id: user.id, name: user.firstName, email: user.email, image: user.image };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  // 👇 This part is crucial
  callbacks: {
    async jwt({ token, user }) {
      // When the user logs in, merge their fields into the JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      // Copy token fields into the session object
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});
