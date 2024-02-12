import { User } from "@/types/user";
import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
    backendTokens: {
      accessToken: string;
    };
  }

  interface User {
    id: number;
    email: string;
    name: string;
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_API_URL}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const authToken = await authResponse.json();
        if (authResponse.ok && authToken) {
          const userResponse = await fetch(`${process.env.NEXT_API_URL}/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken.access_token}`,
            },
          });
          const user = await userResponse.json();
          if (userResponse.ok && user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              accessToken: authToken.access_token,
            };
          }
        }
        return null;
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.backendTokens = {
          accessToken: user.accessToken,
        } as JWT["backendTokens"];
      }
      // Ensure that the token object always has a user and backendTokens properties
      token.user = token.user || {};
      token.backendTokens = token.backendTokens || {};
      return token as JWT;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
        },
        backendTokens: {
          accessToken: token.backendTokens.accessToken,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/auth",
  },
};
