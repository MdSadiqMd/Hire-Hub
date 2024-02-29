'use client'
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
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
};
