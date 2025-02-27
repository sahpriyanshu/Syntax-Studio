import { NextResponse } from "next/server"

interface CodeStats {
  lineCount: number
  characterCount: number
  wordCount: number
  functionCount: number
}

function countFunctions(code: string): number {
  const functionRegex = /function\s+\w+\s*\(|const\s+\w+\s*=\s*(\(|\w+)\s*=>\s*{|class\s+\w+/g
  const matches = code.match(functionRegex)
  return matches ? matches.length : 0
}

function analyzeCode(code: string): CodeStats {
  const lines = code.split("\n")
  const lineCount = lines.length
  const characterCount = code.length
  const wordCount = code.trim().split(/\s+/).length
  const functionCount = countFunctions(code)

  return {
    lineCount,
    characterCount,
    wordCount,
    functionCount,
  }
}

export async function POST(req: Request) {
  try {
    const { code } = await req.json()
    const stats = analyzeCode(code)
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze code" }, { status: 500 })
  }
}

