import { randomBytes, randomUUID } from "crypto";
import nextAuth, { DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        email: string;
        name: string;
        role: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
    }

    interface Session extends DefaultSession {
        user: User;
        expires: string;
        error: string;
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
                const user = await res.json();
                if (res.ok && user) {
                    //mapping the user response to the user object expected by next-auth
                    user.accessToken = user.token;
                    user.refreshToken = user.refresh_token;
                    user.accessTokenExpires = Date.now() + user.expires_in * 1000;
                    return user
                }
                return null;
            },
        },
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = user.accessTokenExpires;
                token.role = user.role;
                token.id = user.id;
            }

            // If the access token has expired
            if (token.accessTokenExpires && (token.accessTokenExpires as number) < Date.now()) {

                // Get a new token
                const refreshedToken = await refreshAccessToken(token.refreshToken as string);

                if (refreshedToken.error) {
                    // handle error according to your need
                    console.log("error refreshing token", refreshedToken.error);
                } else {
                    token.accessToken = refreshedToken.accessToken;
                    token.refreshToken = refreshedToken.refreshToken;
                    token.accessTokenExpires = refreshedToken.accessTokenExpires;

                    user.accessToken = refreshedToken.accessToken;
                    user.refreshToken = refreshedToken.refreshToken;
                    user.accessTokenExpires = refreshedToken.accessTokenExpires as number;
                }
            }

            return token;
        },

        //  The session receives the token from JWT
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken as string,
                    refreshToken: token.refreshToken as string,
                    role: token.role,
                    id: token.id,
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
        console.log("Access token refreshed", response.access_token)

        return {
            accessToken: response.access_token,
            accessTokenExpires: Date.now() + response.expires_in * 1000,
            refreshToken: response.refresh_token,
        }
    } catch (error) {
        console.log("error refreshing token", error)
        return {
            error: "RefreshAccessTokenError",
        }
    }
}
