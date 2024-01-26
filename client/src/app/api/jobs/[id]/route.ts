import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const jobId = res.params.id;
  try {
    console.log("Connecting to the database");
    await connectDB();
    console.log("Connected to the database");

    if (jobId) {
      console.log("Job ID:", jobId);
      const job = await jobModel.findById(jobId);
      if (job) {
        console.log("Job found:", job);
        return NextResponse.json({ result: job }, { status: 200 });
      } else {
        console.log("Job not found");
        return NextResponse.json({ message: "job not found" }, { status: 400 });
      }
    } else {
      console.error("Missing jobId in request");
      return NextResponse.json({ message: "job not found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ message: "job not found" }, { status: 400 });
  }
}
