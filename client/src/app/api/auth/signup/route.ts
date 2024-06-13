import connectDB from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/Models/userModels";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      console.log("User found");
      return NextResponse.json(
        { message: "User already Found", success: true, user },
        { status: 200 }
      );
    }

    // Hashing
    const salt = await bcryptjs.genSalt(10); // Hashing over 10 rounds
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        message: "User Created Successfully",
        success: true,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
