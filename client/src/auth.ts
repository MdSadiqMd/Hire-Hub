import NextAuth, {
  CredentialsSignin,
  User as NextAuthUser,
  Account as NextAuthAccount,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import connectDB from "@/db/config";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
let User: typeof import("./Models/userModels").default;
if (typeof window === "undefined") {
  User = require("./Models/userModels").default;
}

export const authOptions: any = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUBCLIENT_ID,
      clientSecret: process.env.GITHUBCLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }
        await connectDB();
        const user = await User.findOne({ email }).select("+password");
        if (!user || !user.password) {
          throw new CredentialsSignin("Invalid email or password");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }
        return { email: user.email, password: user.password, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({
      user,
      account,
    }: {
      user: NextAuthUser;
      account: NextAuthAccount;
    }) => {
      if (account?.provider === "google" || "github") {
        try {
          const { name, email, id } = user;
          await connectDB();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({
              username: name,
              email: email,
              authProviderId: id,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (account?.provider === "credentials") return true;
      return false;
    },
  },
};

export async function auth(req: NextRequest) {
  const response = await NextAuth(authOptions);
  return NextResponse.json(response);
}
