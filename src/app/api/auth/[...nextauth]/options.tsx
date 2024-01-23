import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
    interface Session {
        token: JWT;
        id: string;
        name: string;
        email: string;
        expires_at: string | number;
        refresh_token: string;
    }
}

interface ExtendedUser extends NextAuthUser {
    token: string;
    expires_at: string | number;
    refresh_token: string;
}

export const options: NextAuthOptions = {
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
                    console.log("user", user);
                    return user
                }
                return null;
            },
        },
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Check if the token is expired
            const now = new Date();
            if (typeof token.expires_at === 'string' || typeof token.expires_at === 'number') {
                const expiryDate = new Date(token.expires_at);
                if (now > expiryDate) {
                    // Token is expired, refresh it
                    try {
                        const res = await fetch(`${process.env.NEXT_API_URL}/auth/refreshToken`, {
                            method: "POST",
                            body: JSON.stringify({ refresh_token: token.refresh_token }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        const data = await res.json();
                        if (res.ok && data) {
                            session.token = data.token;
                            session.expires_at = data.expires_at;
                            return session;
                        }
                    } catch (error) {
                        console.error("Failed to refresh token:", error);
                    }
                }
            }

            if (!user) {
                try {
                    const res = await fetch(`${process.env.NEXT_API_URL}/auth/getCurrentUser`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await res.json();
                    if (res.ok && data) {
                        session.id = data.user._id;
                        session.name = `${data.user.firstName} ${data.user.lastName}`;
                        session.email = data.user.email;
                        return session;
                    }
                }
                catch (error) {
                    console.error("Failed to get current user:", error);
                }
            }

            // If the token is not expired, set the session token
            session.token = token;

            return session;
        },
        async jwt({ token, user, account, profile }) {
            const extendedUser = user as ExtendedUser;
            if (extendedUser) {
                token = { ...token, id: extendedUser.id, name: extendedUser?.name, email: extendedUser.email, token: extendedUser.token, expires_at: extendedUser.expires_at, refresh_token: extendedUser.refresh_token };
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            console.log("redirect", url, baseUrl);
            return url
        },
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        //strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    pages: {
        signIn: '/dashboard/auth/signin',
        //signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
};
