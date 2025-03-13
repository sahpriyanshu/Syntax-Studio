import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { NextResponse } from "next/server"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json()

    if (!code?.trim()) {
      return NextResponse.json(
        { error: "No code provided for analysis" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig,
      safetySettings,
    })

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a code review assistant. Analyze code and provide constructive feedback. Focus on best practices, performance, and readability. Keep suggestions concise and actionable." }],
        },
        {
          role: "model",
          parts: [{ text: "I'll analyze code and provide specific, actionable suggestions focusing on best practices, performance, and readability." }],
        },
      ],
    })

    const prompt = `Review this ${language} code and provide 3-4 specific, actionable suggestions for improvement:

${code}

Requirements:
1. Focus on code quality, performance, and best practices
2. Keep each suggestion brief and specific
3. Do not repeat or rephrase the original code
4. Format each suggestion as a bullet point
5. Start each suggestion with an action verb (e.g., "Add", "Replace", "Consider")`

    const result = await chat.sendMessage(prompt)
    const response = result.response.text()

    // Extract bullet points and clean up the response
    const suggestions = response
      .split("\n")
      .filter(line => line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*"))
      .map(line => {
        // Clean up the suggestion text
        let suggestion = line.trim()
          .replace(/^[•\-*]\s*/, "") // Remove bullet point
          .replace(/^["']|["']$/g, "") // Remove quotes
          .trim()
        
        // Ensure suggestion starts with an action verb
        if (!/^[A-Z][a-z]+/.test(suggestion)) {
          suggestion = "Consider " + suggestion
        }
        
        return suggestion
      })
      .filter(suggestion => suggestion.length > 0)

    if (!suggestions.length) {
      return NextResponse.json(
        { error: "Could not generate meaningful suggestions" },
        { status: 422 }
      )
    }

    return NextResponse.json({ suggestions })
  } catch (error: any) {
    console.error("Error analyzing code:", error)
    
    // Handle specific API errors
    if (error.message?.includes("SAFETY")) {
      return NextResponse.json(
        { error: "Could not analyze code due to safety filters" },
        { status: 422 }
      )
    }
    
    if (error.message?.includes("RECITATION")) {
      return NextResponse.json(
        { error: "Could not generate suggestions. Please try rephrasing your code" },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { error: "Failed to analyze code. Please try again." },
      { status: 500 }
    )
  }
}
