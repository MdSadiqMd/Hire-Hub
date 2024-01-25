import { ObjectId } from "mongodb";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}) {
  try {
    console.log("Connecting to the database");
    await connectDB();
    console.log("Connected to the database");
    console.log(params.id)

    const jobId: string = params.id as string;
    console.log("Received jobId:", jobId);

    // Validate that jobId is a valid ObjectId
    if (!ObjectId.isValid(jobId)) {
      console.log("Invalid job ID");
      return NextResponse.json({ msg: "Invalid job ID" }, { status: 400 });
    }

    console.log("Valid job ID:", jobId);

    const job = await jobModel.findOne({ id: ObjectId(jobId) });
    if (!job) {
      console.log("Job not found");
      return NextResponse.json({ msg: "Job not found" }, { status: 404 });
    }

    console.log("Job found:", job);
    return NextResponse.json({ result: job }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
