import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENT_ID as string,
      clientSecret: process.env.GOOGLECLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUBCLIENT_ID as string,
      clientSecret: process.env.GITHUBCLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
