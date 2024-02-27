import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import Job from "@/Models/jobModels";

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to MongoDB");
    await connectDB();
    console.log("MongoDB connected");
    
    const data = await req.json();
    console.log("Received data:", data);
    
    // Extracting skillsRequired values
    const skillsRequired: string[] = data.data.skillsRequired.map((skill: { value: string }) => skill.value);
    
    // Renaming jobtitle to title
    const newData = { ...data.data, title: data.data.jobtitle, skillsRequired };
    delete newData.jobtitle;
    
    // Creating a new job instance
    const job = new Job(newData);
    console.log("Job instance created:", job);
    
    // Saving the job instance
    console.log("Saving job...");
    const result = await job.save();
    console.log("Job saved successfully:", result);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ msg: "Connection failed" }, { status: 400 });
  }
}
