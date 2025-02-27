import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { language_id, source_code, stdin } = await req.json()

    // Submit code to Judge0
    const submitResponse = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST!,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      },
      body: JSON.stringify({
        language_id,
        source_code,
        stdin,
        base64_encoded: true,
      }),
    })

    if (!submitResponse.ok) {
      throw new Error("Failed to submit code")
    }

    const { token } = await submitResponse.json()

    // Poll for results
    let result
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
        headers: {
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST!,
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        },
      })

      if (!resultResponse.ok) {
        throw new Error("Failed to fetch results")
      }

      const data = await resultResponse.json()

      if (data.status.id <= 2) {
        // Still processing
        await new Promise((resolve) => setTimeout(resolve, 1000))
        attempts++
        continue
      }

      result = data
      break
    }

    if (!result) {
      throw new Error("Compilation timed out")
    }

    return NextResponse.json({
      output: atob(result.stdout || ""),
      error: result.stderr ? atob(result.stderr) : null,
      details: {
        status: result.status,
        memory: result.memory,
        time: result.time,
      },
    })
  } catch (error) {
    console.error("Error compiling code:", error)
    return NextResponse.json({ error: "Failed to compile code" }, { status: 500 })
  }
}

