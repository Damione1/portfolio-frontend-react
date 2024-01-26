declare module "next-auth" {
    interface Session {
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

    interface User {
        id: number;
        email: string;
        name: string;
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
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
