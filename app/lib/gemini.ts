import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateCode(prompt: string, language: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const systemPrompt = `Generate a small, concise code example in ${language}. 
    Keep it simple and focused. Only return the code, no explanations.
    The code should be complete and runnable.
    Maximum length: 50 lines.`;
    
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate code");
  }
}
