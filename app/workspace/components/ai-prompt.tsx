"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"

interface AIPromptProps {
  onGenerate: (code: string) => void
  language: string
}

export function AIPrompt({ onGenerate, language }: AIPromptProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please provide instructions for code generation.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          language,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code")
      }

      const data = await response.json()
      onGenerate(data.code)
      setPrompt("")
      toast({
        title: "Success",
        description: "Code generated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-[#1e1e1e] rounded-lg border border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AI PROMPT:</h3>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-neutral-800 hover:bg-neutral-700 text-white"
        >
          {isGenerating ? (
            <>
              <Spinner className="mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Provide instructions to generate code.."
        className="min-h-[100px] bg-[#1e1e1e] border-gray-800 text-white placeholder:text-gray-400"
      />
    </div>
  )
}

