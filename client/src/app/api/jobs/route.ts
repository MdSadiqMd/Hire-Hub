import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const query = searchParams.get("search");
  const workType = searchParams.getAll("workType").join(",");
  const salary = searchParams.getAll("salary").join(",");
  console.log(query);
  console.log("before");
  console.log(workType);
  console.log("after");
  console.log(salary);
  try {
    console.log("connecting MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    let result;
    switch (true) {
      case workType && workType !== "":
        console.log("Aggregation Pipeline Filter");
        result = await jobModel.aggregate([
          {
            $search: {
              index: "text-search",
              text: {
                query: workType,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ]);
        break;
      case query && query !== "null":
        console.log("Aggregation Pipeline");
        result = await jobModel.aggregate([
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
        break;
      default:
        result = await jobModel.find({});
    }
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "connection failed" }, { status: 400 });
  }
}
