import { NextRequest, NextResponse } from "next/server";
import { tryJudge0Endpoints, makeJudge0Request } from "@/app/lib/judge0Config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, language, input } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    // Submit code with fallback mechanism
    const submissionResult = await tryJudge0Endpoints(async (endpoint) => {
      const response = await makeJudge0Request(endpoint, "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language,
          stdin: input || "",
          wait: true
        })
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      return response.json();
    });

    const { token } = submissionResult;

    // Get submission result with fallback mechanism
    const result = await tryJudge0Endpoints(async (endpoint) => {
      const response = await makeJudge0Request(endpoint, `/${token}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`Failed to get results: ${response.statusText}`);
      }

      return response.json();
    });

    return NextResponse.json({
      status: result.status,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compile_output: result.compile_output || "",
      message: result.message || "",
      time: result.time,
      memory: result.memory
    });

  } catch (error: any) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
