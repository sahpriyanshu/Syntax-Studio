export interface Judge0Endpoint {
  url: string;
  host: string;
  type: 'rapidapi' | 'ce';
  priority: number;
}

export const JUDGE0_ENDPOINTS: Judge0Endpoint[] = [
  {
    url: "https://judge0-ce.p.rapidapi.com",
    host: "judge0-ce.p.rapidapi.com",
    type: 'rapidapi',
    priority: 1
  },
  {
    url: "https://judge029.p.rapidapi.com",
    host: "judge029.p.rapidapi.com",
    type: 'rapidapi',
    priority: 2
  }
];

interface RequestOptions extends RequestInit {
  rateLimitRemaining?: number;
}

export interface Judge0Error extends Error {
  status?: number;
  endpoint?: string;
}

export interface Judge0SubmissionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  base64_encoded?: boolean;
  wait?: boolean;
  fields?: string;
}

export async function makeJudge0Request(
  endpoint: Judge0Endpoint,
  path: string,
  options: RequestOptions
): Promise<Response> {
  const url = `${endpoint.url}${path}`;
  const customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    'X-RapidAPI-Host': endpoint.host
  };

  // Merge custom headers with existing headers
  const headers = new Headers(options.headers);
  Object.entries(customHeaders).forEach(([key, value]) => {
    if (value) {
      headers.set(key, value);
    }
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Track rate limits for RapidAPI endpoints
    if (endpoint.type === 'rapidapi') {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining) {
        options.rateLimitRemaining = parseInt(remaining, 10);
      }
    }

    // Enhanced error handling
    if (!response.ok) {
      const error = new Error(`Request failed: ${response.statusText}`) as Judge0Error;
      error.status = response.status;
      error.endpoint = endpoint.host;
      throw error;
    }

    return response;
  } catch (error: any) {
    // Enhance error with endpoint information if not already present
    if (error.endpoint === undefined) {
      (error as Judge0Error).endpoint = endpoint.host;
    }
    throw error;
  }
}

export async function tryJudge0Endpoints<T>(
  requestFn: (endpoint: Judge0Endpoint) => Promise<T>
): Promise<T> {
  const sortedEndpoints = [...JUDGE0_ENDPOINTS].sort((a, b) => a.priority - b.priority);
  let lastError: Judge0Error | null = null;
  let rateLimitedEndpoints = new Set<string>();

  for (const endpoint of sortedEndpoints) {
    try {
      console.log(`Attempting to use ${endpoint.host} (${endpoint.type})`);
      const result = await requestFn(endpoint);
      console.log(`Successfully used ${endpoint.host}`);
      return result;
    } catch (error: any) {
      lastError = error as Judge0Error;
      const errorMessage = error.message || 'Unknown error';
      
      // Check for rate limiting
      if (error.status === 429) {
        rateLimitedEndpoints.add(endpoint.host);
        console.warn(`Rate limit reached for ${endpoint.host}`);
      }
      
      console.warn(
        `Failed to use ${endpoint.host} (${endpoint.type}): ${errorMessage}. ` +
        `Status: ${error.status || 'unknown'}. ` +
        `${sortedEndpoints.length > 1 ? 'Trying next endpoint...' : 'No more endpoints available.'}`
      );
      
      continue;
    }
  }

  // Enhance error message with rate limit information
  if (rateLimitedEndpoints.size > 0) {
    throw new Error(
      `All endpoints failed. Rate limited endpoints: ${Array.from(rateLimitedEndpoints).join(', ')}. ` +
      `Last error: ${lastError?.message || 'Unknown error'}`
    );
  }

  throw lastError || new Error('All Judge0 endpoints failed');
}

export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

export function decodeBase64(str: string): string {
  return Buffer.from(str, 'base64').toString();
}

export async function checkEndpointHealth(endpoint: Judge0Endpoint): Promise<{
  isHealthy: boolean;
  rateLimitRemaining?: number;
  error?: string;
}> {
  try {
    const response = await makeJudge0Request(endpoint, '/languages', {
      method: 'GET'
    });

    const rateLimitRemaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0', 10);

    return {
      isHealthy: true,
      rateLimitRemaining,
      error: undefined
    };
  } catch (error: any) {
    console.error(`Health check failed for ${endpoint.host}:`, error);
    return {
      isHealthy: false,
      error: error.message || 'Unknown error'
    };
  }
}
