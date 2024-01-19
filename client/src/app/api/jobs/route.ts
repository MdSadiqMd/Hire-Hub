import connectDB from "@/db/config";
import jobModel from '@/Models/jobModels'
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    console.log("connecting MongoDB");
    await connectDB();
    const result=await jobModel.find({});
    console.log("MongoDB connected");
    return NextResponse.json({ "result": result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ "msg": "connection failed" }, { status: 400 });
  }
}
