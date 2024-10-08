import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';

type ClientType = {
    clientId: string;
    clientSecret: string;
  };

export const config: NextAuthConfig = {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          } as ClientType),
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl;
                if (pathname === "/Month") return !!auth;
                if (pathname === "/Year") return !!auth;
                return true;
            } catch (err) {
                console.log(err);
            }
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name;
            return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);