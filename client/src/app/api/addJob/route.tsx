import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log(req.body);
    return NextResponse.json({ req }, { success: true });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error(new Error("Failed to process the request"));
  }
}
