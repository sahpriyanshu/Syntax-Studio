import { NextResponse } from "next/server"
import { tryJudge0Endpoints, makeJudge0Request } from "@/app/lib/judge0Config"

export async function POST(req: Request) {
  try {
    const { language_id, source_code, stdin } = await req.json()

    // Submit code to Judge0 with fallback
    const submitResult = await tryJudge0Endpoints(async (endpoint) => {
      const submitResponse = await makeJudge0Request(endpoint, "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin,
          base64_encoded: true,
        }),
      });

      if (!submitResponse.ok) {
        throw new Error(`Failed to submit code: ${submitResponse.statusText}`);
      }

      return submitResponse.json();
    });

    const { token } = submitResult;

    // Poll for results with fallback
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      try {
        result = await tryJudge0Endpoints(async (endpoint) => {
          const resultResponse = await makeJudge0Request(endpoint, `/${token}`, {
            method: "GET",
          });

          if (!resultResponse.ok) {
            throw new Error(`Failed to fetch results: ${resultResponse.statusText}`);
          }

          return resultResponse.json();
        });

        if (result.status.id <= 2) {
          // Still processing
          await new Promise((resolve) => setTimeout(resolve, 1000));
          attempts++;
          continue;
        }

        break;
      } catch (error) {
        console.error("Error polling results:", error);
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!result) {
      throw new Error("Compilation timed out");
    }

    return NextResponse.json({
      output: atob(result.stdout || ""),
      error: result.stderr ? atob(result.stderr) : null,
      details: {
        status: result.status,
        memory: result.memory,
        time: result.time,
      },
    });
  } catch (error) {
    console.error("Error compiling code:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to compile code" },
      { status: 500 }
    );
  }
}
