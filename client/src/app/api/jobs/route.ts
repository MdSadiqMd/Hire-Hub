import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log("before");
  
  console.log(searchParams.get("search"));
  console.log(searchParams.get("workType"));
  console.log("after");
  
  const query = searchParams.get("search");
  const queryFilter=searchParams.get("workType")
  try {
    console.log("connecting MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    if (query) {
      console.log("Aggregation Pipeline");
      const result = await jobModel.aggregate([
        {
          $search: {
            index: "text-search",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      console.log(result);
      return NextResponse.json({ result: result }, { status: 200 });
    } else {
      const result = await jobModel.find({});
      return NextResponse.json({ result: result }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ msg: "connection failed" }, { status: 400 });
  }
}
