import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import User from "@/Models/userModels";

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    const data = await req.json();
    console.log("Received data:", data);
    const { username, email } = data.data;
    // Creating a new job instance
    const user = new User(data);
    console.log("Profile Instance Created:", user);
    const result = await User.findOne({ email: email }).updateOne({
      username: username,
    });
    console.log("Profile Updated successfully:", result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ msg: "Connection failed" }, { status: 400 });
  }
}
