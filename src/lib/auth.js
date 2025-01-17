import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/db";
import { users, accounts } from "@/lib/db/schema";

const superUsers = [
  {
    username: "admin",
    password: "12345678",
    role: "mmca",
  },
  {
    username: "guard",
    password: "123",
    role: "guard",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return profile;
      },
    }),
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = superUsers.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );
        if (user) {
          return { username: user.username, role: user.role };
        } else {
          throw new Error("Invalid Username or Password");
        }
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  allowDangerousEmailAccountLinking: true,
  trustHost: true,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Restrict to specific email domains
        return profile?.email?.endsWith("@nith.ac.in") || false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
