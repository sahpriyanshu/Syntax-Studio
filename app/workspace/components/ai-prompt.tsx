"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface AIPromptProps {
  onGenerate: (code: string) => void
  language: string
}

export function AIPrompt({ onGenerate, language }: AIPromptProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

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
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate code")
      }

      const data = await response.json()
      if (!data.code) {
        throw new Error("No code generated")
      }

      onGenerate(data.code)
      setPrompt("")
      setShowDialog(false)
      toast({
        title: "Success",
        description: "Code generated successfully!",
      })
    } catch (error: any) {
      console.error("Error generating code:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        variant="outline"
        className="bg-blue-600 hover:bg-blue-700 text-white border-none"
      >
        {isGenerating ? (
          <>
            <Spinner className="mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-4 w-4" />
            Get AI Code
          </>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Generate Code with AI</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Describe what kind of code you want to generate in {language}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
              placeholder="e.g., Create a function that calculates the factorial of a number"
              className="min-h-[100px] bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500"
            />
            <p className="text-xs text-zinc-400">
              Powered by Google Gemini AI. Be specific about the functionality, inputs, outputs, and any special requirements.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="text-white hover:text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Spinner className="mr-2" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
