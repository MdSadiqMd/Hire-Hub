import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

interface GithubProviderConfig {
  clientId: string;
  clientSecret: string;
}

const handler: NextAuthOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUBCLIENT_ID!,
      clientSecret: process.env.GITHUBCLIENT_SECRET!,
    } as GithubProviderConfig),
  ],
});

export { handler as GET, handler as POST };
