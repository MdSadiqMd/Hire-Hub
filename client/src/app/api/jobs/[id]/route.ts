// Import necessary modules and types
import { ObjectId } from "mongodb";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Define the handler function
/*export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to the database");
    await connectDB();
    console.log("Connected to the database");

    const jobId: string | string[] = req.query.id as string | string[];
    console.log("Received jobId:", jobId);

    // If jobId is an array (e.g., for multiple query parameters with the same name), handle accordingly
    const firstJobId = Array.isArray(jobId) ? jobId[0] : jobId;

    // Validate that jobId is a valid ObjectId
    if (!ObjectId.isValid(firstJobId)) {
      console.log("Invalid job ID");
      res.status(400).json({ msg: "Invalid job ID" });
      return;
    }

    console.log("Valid job ID:", firstJobId);

    const job = await jobModel.findOne({ _id: new ObjectId(firstJobId) });
    if (!job) {
      console.log("Job not found");
      res.status(404).json({ msg: "Job not found" });
      return;
    }

    console.log("Job found:", job);
    res.status(200).json({ result: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
}*/

export async function GET(req:NextResponse, params:NextResponse) {
  try {
    console.log("Connecting to the database");
    await connectDB();
    console.log("Connected to the database");

    const id = params;
    const job = await jobModel.findById(id);
    console.log("Job found:", job);
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
  }
}
