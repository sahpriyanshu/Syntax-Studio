import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"

interface AIPanelProps {
  code: string
  language: string
}

export function AIPanel({ code, language }: AIPanelProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const analyzeCodes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze code")
      }

      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error analyzing code:", error)
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full w-full overflow-auto rounded-md border bg-muted p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">AI Suggestions</h3>
          <Button onClick={analyzeCodes} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Analyzing...
              </>
            ) : (
              "Analyze Code"
            )}
          </Button>
        </div>
        {suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <p className="text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click 'Analyze Code' to get AI-powered suggestions from Gemini.
          </p>
        )}
      </div>
    </div>
  )
}

