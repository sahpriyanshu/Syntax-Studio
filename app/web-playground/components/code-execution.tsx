"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"

interface CodeExecutionProps {
  code: string
  language: string
}

export function CodeExecution({ code, language }: CodeExecutionProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState("")

  const executeCode = async () => {
    try {
      setIsLoading(true)
      setOutput("")
      setAiSuggestions("")

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          input,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute code")
      }

      // Format output
      let formattedOutput = ""
      if (data.compile_output) {
        formattedOutput += `Compilation Output:\n${data.compile_output}\n\n`
      }
      if (data.stdout) {
        formattedOutput += `Program Output:\n${data.stdout}\n`
      }
      if (data.stderr) {
        formattedOutput += `Error Output:\n${data.stderr}\n`
      }
      if (data.message) {
        formattedOutput += `Message:\n${data.message}\n`
      }
      if (data.time) {
        formattedOutput += `\nExecution Time: ${data.time}s`
      }
      if (data.memory) {
        formattedOutput += `\nMemory Used: ${data.memory} KB`
      }

      setOutput(formattedOutput.trim())

      // Get AI suggestions if there are errors
      if (data.stderr || data.compile_output) {
        getAiSuggestions(data)
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to execute code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getAiSuggestions = async (executionResult: any) => {
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          error: executionResult.stderr || executionResult.compile_output,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to get suggestions")
      }

      setAiSuggestions(data.suggestions)
    } catch (error) {
      console.error("Failed to get AI suggestions:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Custom Input</h2>
        <Textarea
          placeholder="Enter your input here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-32 font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Output</h2>
          <Button
            onClick={executeCode}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading && <Spinner className="h-4 w-4" />}
            Compile and Run
          </Button>
        </div>
        <Textarea
          readOnly
          value={output}
          placeholder="Output will appear here after compilation."
          className="h-48 font-mono"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">AI Code Suggestions</h2>
        <Textarea
          readOnly
          value={aiSuggestions}
          placeholder="AI suggestions will appear here after analysis."
          className="h-48 font-mono"
        />
      </div>
    </div>
  )
}
