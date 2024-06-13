import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import userModel from '@/Models/userModels'

let User: typeof userModel;
if (typeof window === "undefined") {
  User = require("./Models/userModels").default;
}

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password"); // Need only Id excluding password 
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
