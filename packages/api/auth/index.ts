import type { DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "../src/db";
import { env } from "./env";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/english"];
      const isProtected = paths.some((path) => nextUrl.pathname.includes(path));

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      if (nextUrl.pathname.includes("/signin") && isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },

    // @TODO - if you wanna have auth on the edge
    // jwt: ({ token, profile }) => {
    //   if (profile?.id) {
    //     token.id = profile.id;
    //     token.image = profile.picture;
    //   }
    //   return token;
    // },

    // @TODO
    // authorized({ request, auth }) {
    //   return !!auth?.user
    // }
  },
});
