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

    const {
      jobtitle,
      companyName,
      location,
      email,
      workType,
      salary,
      experience,
      jobDescription,
      educationQualification,
      postedAt,
      skillsRequired,
      companyLogo,
    } = data.data;
    const salaryArray: string[] = [`${salary.min}`, `${salary.max}`];
    const skillsRequiredArray: string[] = skillsRequired.map(
      (skill: { value: string }) => skill.value
    );
    const jobData = {
      jobtitle,
      companyName,
      location,
      email,
      workType,
      salary: salaryArray,
      experience: parseInt(experience),
      jobDescription,
      educationQualification,
      postedAt: new Date(postedAt),
      skillsRequired: skillsRequiredArray,
      companyLogo,
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
