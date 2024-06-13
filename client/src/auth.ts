import NextAuth, {
  CredentialsSignin,
  User as NextAuthUser,
  Account as NextAuthAccount,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "./db/config";
import { compare } from "bcryptjs";
import userModel from "./Models/userModels";

let User: typeof userModel;
if (typeof window === "undefined") {
  User = require("./Models/userModels").default;
}

type AuthorizeCredentials = {
  email: string;
  password: string;
};

const authorize: any = async (credentials: any) => {
  const { email, password } = credentials as AuthorizeCredentials;
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
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUBCLIENT_ID as string,
      clientSecret: process.env.GITHUBCLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize,
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
      account: NextAuthAccount | null;
    }) => {
      if (account?.provider === "google") {
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
});
