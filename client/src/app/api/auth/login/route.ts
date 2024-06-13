import connectDB from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/Models/userModels";

connectDB();

export async function POST(request: NextRequest) {
  try {
    console.log("Request Body:", request.body); 
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the user exists or not
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: "User not Exist" }, { status: 200 });
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
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
