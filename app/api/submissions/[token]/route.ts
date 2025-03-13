import { NextResponse } from "next/server";
import { 
  Judge0Endpoint, 
  makeJudge0Request, 
  tryJudge0Endpoints,
  decodeBase64,
  type Judge0Error
} from "@/app/lib/judge0Config";

interface ErrorResponse {
  error: string;
  endpoint?: string;
  statusCode: number;
}

interface SubmissionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  language_id: number;
  time: string | null;
  memory: number | null;
  token?: string;
}

async function getSubmissionResult(endpoint: Judge0Endpoint, token: string, base64_encoded = true): Promise<SubmissionResult> {
  const queryParams = new URLSearchParams({
    base64_encoded: base64_encoded.toString(),
    fields: '*'
  });

  const response = await makeJudge0Request(
    endpoint,
    `/submissions/${token}?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  const result = await response.json();
  
  // Validate required fields
  if (!result.status || typeof result.status.id !== 'number') {
    throw new Error("Invalid response: missing or invalid status");
  }

  // Decode base64 fields if needed and ensure proper typing
  const submissionResult: SubmissionResult = {
    stdout: base64_encoded && result.stdout ? decodeBase64(result.stdout) : result.stdout,
    stderr: base64_encoded && result.stderr ? decodeBase64(result.stderr) : result.stderr,
    compile_output: base64_encoded && result.compile_output ? decodeBase64(result.compile_output) : result.compile_output,
    message: base64_encoded && result.message ? decodeBase64(result.message) : result.message,
    status: {
      id: result.status.id,
      description: result.status.description || getStatusDescription(result.status.id)
    },
    language_id: typeof result.language_id === 'number' ? result.language_id : 0, // Default to 0 if not provided
    time: result.time,
    memory: result.memory,
    token: token
  };

  return submissionResult;
}

// Helper function to get status descriptions
function getStatusDescription(statusId: number): string {
  const statusMap: Record<number, string> = {
    1: "In Queue",
    2: "Processing",
    3: "Accepted",
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error"
  };
  return statusMap[statusId] || "Unknown Status";
}

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const { searchParams } = new URL(request.url);
    const base64_encoded = searchParams.get('base64_encoded') === 'true';

    if (!token) {
      const errorResponse: ErrorResponse = {
        error: "Missing required parameter: token",
        statusCode: 400
      };
      return NextResponse.json(errorResponse, { status: errorResponse.statusCode });
    }

    const result = await tryJudge0Endpoints(async (endpoint) => {
      return await getSubmissionResult(endpoint, token, base64_encoded);
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Error fetching submission:", error);
    
    const isJudge0Error = typeof error === 'object' && error !== null && 'status' in error;
    const statusCode = isJudge0Error && typeof (error as Judge0Error).status === 'number' 
      ? (error as Judge0Error).status 
      : 500;

    const errorResponse: ErrorResponse = {
      error: error.message || "Unknown error occurred",
      endpoint: isJudge0Error ? (error as Judge0Error).endpoint : undefined,
      statusCode
    };

    return NextResponse.json(errorResponse, { status: errorResponse.statusCode });
  }
}
