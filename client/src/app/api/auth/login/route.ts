import connectDB from "@/db/config";
import User from "@/Models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const router = useRouter();
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the user exists or not
    const user = await User.findOne({ email });
    
    if (!user) {
      router.push('/signup');
      return NextResponse.json({ error: "User not Exist" }, { status: 400 });
    }
    console.log("User Exists");

    //check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { error: "Password is Invalid" },
        { status: 400 }
      );
    }
    console.log(user);

    // create token data
    const tokenData = {
      id: user._id, // In mongoDB Databse it is saved as _id
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Succesfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
