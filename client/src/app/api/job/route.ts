import { ObjectId } from "mongodb";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("connecting");

    await connectDB();
    console.log("Connected");
    const job = await jobModel.findById({ _id: `${request}` });

    if (!job) {
      console.log("Job not found");
      return NextResponse.json({ msg: "Job not found" }, { status: 404 });
    }

    console.log(job);
    return NextResponse.json({ "result": job }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
