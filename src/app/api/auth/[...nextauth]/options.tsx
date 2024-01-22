import { NextAuthOptions } from "next-auth";

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

                const data = await res.json();
                if (res.ok && data) {
                    console.log(data);
                    return data;
                }

                return null;
            },
        },
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: user.token,
                    refreshToken: user.refresh_token,
                    accessTokenExpires: Date.now() + user.expires_in * 1000,
                    user: {
                        ...user,
                        token: undefined,
                        refresh_token: undefined,
                        expires_in: undefined,
                    },
                };
            }

            // Token renewal
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            const res = await fetch(`${process.env.NEXT_API_URL}/auth/refreshToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh_token: token.refreshToken,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("Failed to refresh access token");
                return token;
            }

            return {
                ...token,
                accessToken: data.token,
                accessTokenExpires: Date.now() + data.expires_in * 1000,
            };
        },
        async session(session, token) {
            return {
                ...session,
                user: token.user,
                accessToken: token.accessToken,
                accessTokenExpires: token.accessTokenExpires,
            };
        },
    },
};
