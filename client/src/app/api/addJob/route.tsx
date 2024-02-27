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
    const skillsRequired: string[] = data.data.skillsRequired.map((skill: { value: string }) => skill.value);
    const salary: string[] = [
      `${data.data.salary.min}`, 
      `${data.data.salary.max}`
    ];

    const jobData = {
      companyName: data.data.companyName,
      location: data.data.location,
      salary, 
      skillsRequired,
      jobDescription: data.data.jobDescription,
      educationQualification: data.data.educationQualification,
      experience: parseInt(data.data.experience),
      postedAt: new Date(data.data.postedAt),
      workType: data.data.workType,
      jobtitle: data.data.jobtitle 
    };

    // Creating a new job instance
    const job = new Job(jobData);
    console.log("Job instance created:", job);
    console.log("Saving job...");
    const result = await job.save();
    console.log("Job saved successfully:", result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ msg: "Connection failed" }, { status: 400 });
  }
}
