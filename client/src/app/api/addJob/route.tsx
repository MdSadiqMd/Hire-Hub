import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import jobModel from "@/Models/jobModels";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.body;
        const data = JSON.parse(body);
        console.log(data); 
        return NextResponse.json({ success: true }); 
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.error(new Error("Failed to process the request"));
    }
}
