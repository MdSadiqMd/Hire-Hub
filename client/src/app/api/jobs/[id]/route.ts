import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

interface IGetParams extends NextRequest {
  params: {
    id: string;
  };
}

export async function GET(req: IGetParams, res: NextResponse) {
  const { id } = req.params;
  try {
    //console.log("Connecting to the database");
    await connectDB();
    //console.log("Connected to the database");
    if (id) {
      const job = await jobModel.findById(id);
      if (job) {
        return NextResponse.json({ result: job }, { status: 200 });
      } else {
        console.log("Job not found");
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }
    } else {
      console.error("Missing jobId in request");
      return NextResponse.json(
        { message: "Job ID is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Error fetching job" },
      { status: 500 }
    );
  }
}
