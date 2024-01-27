import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";
import { NextResponse } from "next/server";

export async function GET({ query }: { query: string }) {
  try {
    console.log("connecting MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    const result = await jobModel.find({});
    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "connection failed" }, { status: 400 });
  }
}
