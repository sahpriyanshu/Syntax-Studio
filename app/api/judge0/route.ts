import { NextRequest, NextResponse } from "next/server";
import { tryJudge0Endpoints, makeJudge0Request } from "@/app/lib/judge0Config";

// Language ID mapping for Judge0
const languageMap: { [key: string]: number } = {
  "javascript": 63,  // Node.js 14.16.0
  "typescript": 74,  // Node.js 14.16.0 + TypeScript 4.1.3
  "python3": 71,    // Python 3.8.6
  "java": 62,       // OpenJDK 11.0.9
  "cpp": 54,        // g++ 9.3.0
  "c": 50,          // gcc 9.3.0
  "csharp": 51,     // Mono 6.12.0
  "ruby": 72,       // Ruby 2.7.1
  "swift": 83,      // Swift 5.3.1
  "go": 60,         // Go 1.15.6
  "rust": 73,       // Rust 1.48.0
  "php": 68,        // PHP 7.4.3
  "haskell": 61,    // GHC 8.10.3
  "kotlin": 78,     // Kotlin 1.4.10
  "scala": 81,      // Scala 2.13.3
  "objc": 79,       // Clang 10.0.0
  "r": 80,         // R 4.0.2
  "perl": 67,      // Perl 5.30.0
  "julia": 82      // Julia 1.5.3
};

// Helper function to wait for submission result with fallback
async function waitForResult(token: string) {
  let attempts = 0;
  const maxAttempts = 30; // 30 seconds timeout

  while (attempts < maxAttempts) {
    try {
      const result = await tryJudge0Endpoints(async (endpoint) => {
        const response = await makeJudge0Request(endpoint, `/${token}`, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error(`Failed to get results: ${response.statusText}`);
        }

        return response.json();
      });

      if (result.status.id >= 3) { // Status 3 or greater means the submission is finished
        return result;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before checking again
      attempts++;
    } catch (error) {
      console.warn("Error checking submission status:", error);
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
  }

  throw new Error("Execution timed out after 30 seconds");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, language, input = "" } = body;

    // Validate required fields
    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    // Get language ID from map
    const languageId = languageMap[language.toLowerCase()];
    if (!languageId) {
      return NextResponse.json(
        { error: "Unsupported programming language" },
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
          language_id: languageId,
          stdin: input,
          wait: false
        })
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      return response.json();
    });

    const { token } = submissionResult;

    // Wait for and get the result with fallback mechanism
    const result = await waitForResult(token);

    // Process the result
    const response = {
      status: result.status,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compile_output: result.compile_output || "",
      message: result.message || "",
      time: result.time,
      memory: result.memory
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Error executing code:', error);
    return NextResponse.json(
      { error: error.message || "Failed to execute code" },
      { status: 500 }
    );
  }
}

// GET method to check API health
export async function GET() {
  return NextResponse.json({ status: "OK" });
}
