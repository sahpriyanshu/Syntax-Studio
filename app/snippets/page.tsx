"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Snippet {
  id: string
  title: string
  language: string
  createdAt: string
}

export default function SnippetsPage() {
  const { data: session } = useSession()
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets")
        if (!response.ok) {
          throw new Error("Failed to fetch snippets")
        }
        const data = await response.json()
        setSnippets(data)
      } catch (error) {
        console.error("Error fetching snippets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchSnippets()
    }
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your snippets.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Your Snippets</h1>
        {isLoading ? (
          <p className="text-white">Loading snippets...</p>
        ) : snippets.length === 0 ? (
          <p className="text-white">You haven't saved any snippets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <Card key={snippet.id}>
                <CardHeader>
                  <CardTitle>{snippet.title}</CardTitle>
                  <CardDescription>{snippet.language}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Created on {new Date(snippet.createdAt).toLocaleDateString()}</p>
                  <Button asChild className="mt-4">
                    <Link href={`/code-workspace?snippet=${snippet.id}`}>Open Snippet</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
