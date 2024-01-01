import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import UserModel, { Designation } from "@/models/user";
import connectToDB from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ account, profile, user, credentials }): Promise<boolean> {
      try {
        await connectToDB();
        const userExists = await UserModel.find({ email: profile?.email });

        if (userExists.length === 0) {
          const newUser = new UserModel({
            name: profile?.name,
            email: profile?.email,
            designation: Designation.EMPLOYEE,
          });

          await newUser.save();
        }

        // Return a string or boolean here, for example:
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
