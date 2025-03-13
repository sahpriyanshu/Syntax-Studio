import { NextResponse } from "next/server";
import { JUDGE0_ENDPOINTS, makeJudge0Request } from "@/app/lib/judge0Config";

export async function GET() {
  const results = [];
  
  for (const endpoint of JUDGE0_ENDPOINTS) {
    try {
      console.log(`Testing ${endpoint.host}...`);
      
      // Test 1: Check languages endpoint
      const languagesResponse = await makeJudge0Request(endpoint, "/languages", {
        method: "GET"
      });

      // Test 2: Submit a simple Python program
      const submissionResponse = await makeJudge0Request(endpoint, "/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: "print('Hello from Judge0!')",
          language_id: 71,  // Python
          wait: false
        })
      });

      const submissionData = await submissionResponse.json();
      console.log("Submission response:", submissionData);

      // Test 3: Get submission result if we have a token
      let resultData = null;
      if (submissionData.token) {
        const resultResponse = await makeJudge0Request(
          endpoint,
          `/submissions/${submissionData.token}?base64_encoded=false`,
          {
            method: "GET"
          }
        );
        resultData = await resultResponse.json();
        console.log("Result data:", resultData);
      }

      results.push({
        endpoint: endpoint.host,
        type: endpoint.type,
        tests: {
          languages: {
            status: languagesResponse.status,
            ok: languagesResponse.ok
          },
          submission: {
            status: submissionResponse.status,
            ok: submissionResponse.ok,
            token: submissionData.token
          },
          result: resultData
        },
        rateLimit: {
          remaining: languagesResponse.headers.get("X-RateLimit-Remaining"),
          limit: languagesResponse.headers.get("X-RateLimit-Limit")
        }
      });
    } catch (error: any) {
      console.error(`Error testing ${endpoint.host}:`, error);
      results.push({
        endpoint: endpoint.host,
        type: endpoint.type,
        error: error.message,
        status: "failed"
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: JUDGE0_ENDPOINTS.length,
      successful: results.filter(r => !r.error).length,
      failed: results.filter(r => r.error).length
    }
  });
}
