import { NextResponse } from "next/server";
import { 
  Judge0Endpoint, 
  makeJudge0Request, 
  tryJudge0Endpoints,
  encodeBase64,
  decodeBase64,
  type Judge0Error,
  type Judge0SubmissionRequest 
} from "@/app/lib/judge0Config";

interface CompilationResult {
  status: {
    id: number;
    description: string;
  };
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  time?: string | null;
  memory?: number | null;
}

interface ErrorResponse {
  error: string;
  endpoint?: string;
  statusCode: number;
}

async function submitCode(endpoint: Judge0Endpoint, request: Judge0SubmissionRequest) {
  // Handle base64 encoding if needed
  const submissionBody = {
    ...request,
    source_code: request.base64_encoded ? request.source_code : encodeBase64(request.source_code),
    stdin: request.stdin ? (request.base64_encoded ? request.stdin : encodeBase64(request.stdin)) : undefined,
    expected_output: request.expected_output ? (request.base64_encoded ? request.expected_output : encodeBase64(request.expected_output)) : undefined,
    base64_encoded: true // Always send as base64 to the API
  };

  const queryParams = new URLSearchParams({
    base64_encoded: 'true',
    wait: (request.wait ?? false).toString(),
    fields: request.fields || '*'
  });

  const response = await makeJudge0Request(endpoint, `/submissions?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionBody)
  });

  const result = await response.json();
  if (!result.token) {
    throw new Error("No submission token received");
  }

  return result;
}

async function getSubmissionResult(endpoint: Judge0Endpoint, token: string, base64_encoded = true): Promise<CompilationResult> {
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
  if (!result.status) {
    throw new Error("Invalid response format");
  }

  // Decode base64 fields if needed
  if (base64_encoded) {
    if (result.stdout) result.stdout = decodeBase64(result.stdout);
    if (result.stderr) result.stderr = decodeBase64(result.stderr);
    if (result.compile_output) result.compile_output = decodeBase64(result.compile_output);
    if (result.message) result.message = decodeBase64(result.message);
  }

  return result;
}

async function pollForResult(
  endpoint: Judge0Endpoint, 
  token: string, 
  maxAttempts = 30, 
  interval = 1000
): Promise<CompilationResult> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await getSubmissionResult(endpoint, token);
      
      // Status IDs:
      // 1: In Queue, 2: Processing
      // 3: Accepted, 4: Wrong Answer, 5: Time Limit Exceeded
      // 6: Compilation Error, 7: Runtime Error (SIGSEGV)
      // 8: Runtime Error (SIGXFSZ), 9: Runtime Error (SIGFPE)
      // 10: Runtime Error (SIGABRT), 11: Runtime Error (NZEC)
      // 12: Runtime Error (Other), 13: Internal Error
      if (result.status.id >= 3) {
        return result;
      }
      
      // If still processing, wait and try again
      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {
      console.warn(`Polling attempt ${attempt} failed:`, error);
      // Only throw if it's the last attempt
      if (attempt === maxAttempts) {
        throw error;
      }
    }
  }
  
  throw new Error(`Polling timeout: Result not available after ${maxAttempts} attempts`);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submissionRequest: Judge0SubmissionRequest = {
      source_code: body.source_code,
      language_id: body.language_id,
      stdin: body.stdin,
      expected_output: body.expected_output,
      base64_encoded: body.base64_encoded ?? false,
      wait: body.wait ?? false,
      fields: body.fields || '*'
    };

    if (!submissionRequest.source_code || !submissionRequest.language_id) {
      const errorResponse: ErrorResponse = {
        error: "Missing required fields: source_code and language_id",
        statusCode: 400
      };
      return NextResponse.json(errorResponse, { status: errorResponse.statusCode });
    }

    // First, submit the code and get a token
    const submission = await tryJudge0Endpoints(async (endpoint) => {
      const result = await submitCode(endpoint, submissionRequest);
      return { endpoint, token: result.token };
    });

    // If wait is true, poll for results using the same endpoint that succeeded
    if (submissionRequest.wait) {
      const result = await pollForResult(submission.endpoint, submission.token);
      return NextResponse.json(result);
    }

    // Otherwise, return the token immediately
    return NextResponse.json({
      token: submission.token
    });

  } catch (error: any) {
    console.error("Error compiling code:", error);
    
    // Determine appropriate status code
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
