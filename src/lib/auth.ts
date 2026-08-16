import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const DEFAULT_ADMIN_EMAIL = "admin@haprvisual.com";
const DEFAULT_ADMIN_PASSWORD = "admin1234";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

const loginAttempts = new Map<string, number[]>();

function checkLoginRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (loginAttempts.get(key) ?? []).filter(
    (t) => now - t < LOGIN_WINDOW_MS
  );
  if (recent.length >= LOGIN_MAX_ATTEMPTS) {
    loginAttempts.set(key, recent);
    return false;
  }
  recent.push(now);
  loginAttempts.set(key, recent);
  return true;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const normalizedEmail = credentials?.email?.toLowerCase() ?? "";

        if (!checkLoginRateLimit(normalizedEmail || "unknown")) {
          throw new Error(
            "Too many login attempts. Please try again later."
          );
        }

        if (
          !email ||
          !password ||
          !credentials ||
          normalizedEmail !== email.toLowerCase() ||
          credentials.password !== password
        ) {
          return null;
        }

        if (
          normalizedEmail === DEFAULT_ADMIN_EMAIL &&
          password === DEFAULT_ADMIN_PASSWORD
        ) {
          console.error(
            "[auth] Rejecting login with the default admin credentials. " +
              "Set ADMIN_EMAIL/ADMIN_PASSWORD in your environment."
          );
          return null;
        }

        return { id: "1", name: "Admin", email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = (token.role as string) ?? "admin";
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions);
}