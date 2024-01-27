import { User } from "@/types/user";
import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

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
                console.log("Authorizing through the API")
                const res = await fetch(
                    `${process.env.NEXT_API_URL}/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const userResponse = await res.json();
                if (res.ok && userResponse) {
                    return {
                        accessToken: userResponse.token,
                        refreshToken: userResponse.refresh_token,
                        expiresAt: Date.now() + userResponse.expires_in * 1000,
                    };
                }
                return null;
            },
        },
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.backendTokens = {
                    accessToken: user?.accessToken,
                    refreshToken: user?.refreshToken,
                    expiresAt: user?.expiresAt,
                } as JWT["backendTokens"];
            }

            // If the access token has expired
            if (token.backendTokens.expiresAt && (token.backendTokens.expiresAt as number) <= Date.now()) {
                if (!token.backendTokens.refreshToken) {
                    // handle error according to your needs
                    console.log("no refresh token, logging out");
                    signOut();
                    return;
                }
                // Get a new token
                const refreshedToken = await refreshAccessToken(token.backendTokens.refreshToken);
                if (refreshedToken.error) {
                    // handle error according to your need
                    console.log("error refreshing token", refreshedToken.error);
                } else {
                    token.backendTokens.accessToken = refreshedToken.accessToken as string;
                    token.backendTokens.expiresAt = refreshedToken.accessTokenExpires as number;
                }
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    id: token.id,
                },
                backendTokens: {
                    accessToken: token.backendTokens.accessToken,
                    refreshToken: token.backendTokens.refreshToken,
                    expiresAt: token.backendTokens.expiresAt,
                },
                error: token.error,
            };
        },
        async redirect({ url, baseUrl }) {
            return url
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    pages: {
        signIn: '/auth',
    }
};

async function refreshAccessToken(refreshToken: string) {
    try {
        console.log("refreshing token from", refreshToken)
        const res = await fetch(`${process.env.NEXT_API_URL}/auth/refreshToken`, {
            method: "POST",
            body: JSON.stringify({ refresh_token: refreshToken }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const response = await res.json();

        return {
            accessToken: response.token as string,
            accessTokenExpires: (Date.now() + response.expires_in * 1000) as number,
        }
    } catch (error) {
        console.log("error refreshing token", error)
        return {
            error: "RefreshAccessTokenError",
        }
    }
}
