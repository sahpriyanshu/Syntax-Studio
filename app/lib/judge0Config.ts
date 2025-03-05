export const JUDGE0_ENDPOINTS = [
  {
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    host: "judge0-ce.p.rapidapi.com"
  },
  {
    url: "https://judge029.p.rapidapi.com/submissions",
    host: "judge029.p.rapidapi.com"
  }
] as const;

export async function makeJudge0Request(endpoint: typeof JUDGE0_ENDPOINTS[number], path: string, options: RequestInit) {
  const url = `${endpoint.url}${path}`;
  const headers = {
    ...options.headers,
    "X-RapidAPI-Host": endpoint.host,
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
  };

  return fetch(url, { ...options, headers });
}

export async function tryJudge0Endpoints<T>(
  requestFn: (endpoint: typeof JUDGE0_ENDPOINTS[number]) => Promise<T>
): Promise<T> {
  let lastError: Error | null = null;

  for (const endpoint of JUDGE0_ENDPOINTS) {
    try {
      return await requestFn(endpoint);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Failed to use ${endpoint.host}, trying next endpoint...`);
      continue;
    }
  }

  throw lastError || new Error("All Judge0 endpoints failed");
}
