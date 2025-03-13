import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });
    
    const prompt_template = `Generate a small, focused code example in ${language}.
    Requirements:
    1. Maximum 50 lines of code
    2. Include only essential functionality
    3. Use clear variable names
    4. Add minimal but helpful comments
    5. Make it runnable and complete
    6. Follow modern best practices
    
    User Request: ${prompt}
    
    Return ONLY the code without any markdown formatting or explanations.`;
    
    const chat = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
      history: [],
    });

    const result = await chat.sendMessage(prompt_template);
    const response = await result.response;
    let code = response.text().trim();
    
    // Remove any markdown code blocks if present
    code = code.replace(/\`\`\`[\w]*\n/g, "").replace(/\`\`\`/g, "").trim();

    // Validate code length
    const lines = code.split("\n").length;
    if (lines > 50) {
      throw new Error("Generated code exceeds maximum length of 50 lines. Please try a simpler request.");
    }

    if (!code) {
      throw new Error("No code was generated. Please try rephrasing your request.");
    }

    return NextResponse.json({ code });
  } catch (error: any) {
    console.error("Error generating code:", error);
    let errorMessage = error.message || "Failed to generate code. Please try again with a different request.";
    
    // Provide more helpful error messages
    if (errorMessage.includes("404")) {
      errorMessage = "API configuration error. Please ensure your API key is valid and has access to the Gemini 1.5 Pro model.";
    } else if (errorMessage.includes("429")) {
      errorMessage = "Too many requests. Please try again in a few seconds.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
