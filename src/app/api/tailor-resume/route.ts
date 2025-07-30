// src/app/api/tailor-resume/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, jobDescription } = body;

    if (!jobTitle || !jobDescription) {
      return NextResponse.json({ message: "Missing job title or description" }, { status: 400 });
    }

    const response = await fetch("https://aimannaseem.app.n8n.cloud/webhook/tailor-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ jobTitle, jobDescription })
    });

    const data = await response.json();

    return NextResponse.json({ result: data.result || data }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ message: "Failed to generate resume" }, { status: 500 });
  }
}
