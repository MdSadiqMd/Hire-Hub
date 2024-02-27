import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log(req);
    console.log(res);
    
    return NextResponse.json({ req }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ msg: "connection failed" }, { status: 400 });
  }
}
