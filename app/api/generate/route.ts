import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { NextResponse } from "next/server"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
}

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json()

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    })

    const result = await model.generateText(`
      You are an expert programmer. Generate high-quality code based on the following prompt.
      The code should be in ${language} programming language.
      
      Requirements:
      1. The code should be complete, well-structured, and follow best practices
      2. Include clear comments explaining complex parts
      3. Use modern syntax and features where appropriate
      4. Handle edge cases and potential errors
      5. Follow consistent naming conventions and formatting
      
      Prompt: ${prompt}
      
      Return ONLY the code without any additional explanation or markdown formatting.
    `)

    return NextResponse.json({ code: result.text })
  } catch (error) {
    console.error("Error generating code:", error)
    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 }
    )
  }
}
