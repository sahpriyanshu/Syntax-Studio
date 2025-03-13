import { NextResponse } from "next/server";
import { JUDGE0_ENDPOINTS, checkEndpointHealth } from "@/app/lib/judge0Config";

export async function GET() {
  try {
    const results = await Promise.all(
      JUDGE0_ENDPOINTS.map(async (endpoint) => {
        const health = await checkEndpointHealth(endpoint);
        return {
          host: endpoint.host,
          type: endpoint.type,
          priority: endpoint.priority,
          status: health.isHealthy ? "healthy" : "unhealthy",
          rateLimitRemaining: health.rateLimitRemaining,
        };
      })
    );

    // Test code execution on each healthy endpoint
    const testResults = await Promise.all(
      results
        .filter((r) => r.status === "healthy")
        .map(async (result) => {
          const endpoint = JUDGE0_ENDPOINTS.find((e) => e.host === result.host)!;
          try {
            // Simple Python hello world test
            const response = await fetch(`${endpoint.url}?base64_encoded=false&wait=true`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                ...(endpoint.type === "rapidapi"
                  ? {
                      "X-RapidAPI-Host": endpoint.host,
                      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
                    }
                  : {
                      Authorization: `Bearer ${process.env.JUDGE0_CE_KEY}`,
                    }),
              },
              body: JSON.stringify({
                source_code: 'print("Hello, World!")',
                language_id: 71, // Python
              }),
            });

            const data = await response.json();
            return {
              ...result,
              testExecution: {
                success: true,
                output: data.stdout,
                error: data.stderr,
              },
            };
          } catch (error: any) {
            return {
              ...result,
              testExecution: {
                success: false,
                error: error.message,
              },
            };
          }
        })
    );

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      endpoints: testResults,
      summary: {
        total: results.length,
        healthy: results.filter((r) => r.status === "healthy").length,
        unhealthy: results.filter((r) => r.status === "unhealthy").length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to verify endpoints",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
