import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// In-memory storage for snippets (this will reset on server restart)
const snippets: any[] = []

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Filter snippets for the current user
  const userSnippets = snippets.filter((snippet) => snippet.userId === session.user.id)
  return NextResponse.json(userSnippets)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, code, language } = await req.json()
  const newSnippet = {
    id: Date.now().toString(),
    title,
    code,
    language,
    userId: session.user.id,
    createdAt: new Date().toISOString(),
  }

  snippets.push(newSnippet)
  return NextResponse.json(newSnippet)
}

