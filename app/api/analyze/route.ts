import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
})

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
}

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json()

    const prompt = `You are an expert code reviewer and programming mentor. Analyze the following ${language} code and provide 4-5 specific, actionable suggestions for improvement. Consider best practices, performance, readability, and potential bugs. Format your response as a bullet-pointed list.

Code to analyze:
${code}`

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })

    const result = await chatSession.sendMessage(prompt)
    const suggestions = result.response
      .text()
      .split("\n")
      .filter((line) => line.trim().startsWith("•") || line.trim().startsWith("-"))
      .map((line) => line.trim().replace(/^[•-]\s*/, ""))

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error analyzing code:", error)
    return NextResponse.json({ error: "Failed to analyze code" }, { status: 500 })
  }
}

