import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const query = searchParams.get("search");
  const workType = searchParams.getAll("workType").join(",");
  const salary = searchParams.getAll("salary").join(",");
  const experience = searchParams.get("experience");
  console.log(query);
  console.log("before");
  console.log(workType);
  console.log("after");
  console.log(salary);
  console.log("before");
  console.log(experience);
  try {
    console.log("connecting MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    let result;
    switch (true) {
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
      case salary && salary !== "null":
        const salaryValue = parseInt(salary.slice(0, -1)) * 1000;
        console.log(salaryValue);
        result = await jobModel.aggregate([
          {
            $match: {
              $expr: {
                $eq: [{ $arrayElemAt: ["$salary", 0] }, salaryValue],
              },
            },
          },
        ]);
        break;
      case experience && experience !== "null" && experience !== "-1":
        console.log(experience);
        result = await jobModel.aggregate([
          {
            $match: {
              experience: { $eq: parseInt(experience) },
            },
          },
        ]);
        break;
      case experience &&
        experience !== "null" &&
        experience !== "-1" &&
        salary &&
        salary !== "null" &&
        workType &&
        workType !== "":
        const salaryValueAll = parseInt(salary.slice(0, -1)) * 1000;
        result = await jobModel.aggregate([
          {
            $match: {
              experience: { $eq: parseInt(experience) },
              $expr: { $eq: [{ $arrayElemAt: ["$salary", 0] }, salaryValueAll] },
              $text: { $search: workType },
            },
          },
        ]);
        break;
      case experience == "-1":
        result = await jobModel.find({});
      default:
        result = await jobModel.find({});
    }
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "connection failed" }, { status: 400 });
  }
}
