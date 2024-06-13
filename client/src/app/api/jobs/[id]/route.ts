import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const jobId = segments[segments.length - 1];

  try {
    await connectDB();
    console.log("Connected to the database");
    if (jobId) {
      const job = await jobModel.findById(jobId);
      if (job) {
        return NextResponse.json({ result: job }, { status: 200 });
      } else {
        console.log("Job not found");
        return NextResponse.json({ message: "Job not found" }, { status: 400 });
      }
    } else {
      console.error("Missing jobId in request");
      return NextResponse.json({ message: "Job not found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ message: "Job not found" }, { status: 400 });
  }
}
