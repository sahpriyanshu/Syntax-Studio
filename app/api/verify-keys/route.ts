import { NextResponse } from "next/server"

async function verifyGoogleAuth() {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "client_credentials",
      }),
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function verifyGithubAuth() {
  try {
    const response = await fetch("https://api.github.com/", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_CLIENT_SECRET}`,
      },
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function verifyDatabase() {
  try {
    const { PrismaClient } = require("@prisma/client")
    const prisma = new PrismaClient()
    await prisma.$connect()
    await prisma.$disconnect()
    return true
  } catch (error) {
    return false
  }
}

async function verifyGemini() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }],
      }),
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function verifyOpenAI() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello" }],
      }),
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function verifyJudge0() {
  try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/about", {
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST!,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      },
    })
    return response.ok
  } catch (error) {
    return false
  }
}

export async function GET() {
  const results = {
    google: await verifyGoogleAuth(),
    github: await verifyGithubAuth(),
    database: await verifyDatabase(),
    gemini: await verifyGemini(),
    openai: await verifyOpenAI(),
    judge0: await verifyJudge0(),
  }

  return NextResponse.json(results)
}
