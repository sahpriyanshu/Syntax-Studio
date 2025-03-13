"use client"

import * as React from "react"
import { Bot, Loader2, Sparkles, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (prompt: string) => void
  isGenerating: boolean
  language: string
}

export function GenerateDialog({
  open,
  onOpenChange,
  onGenerate,
  isGenerating,
  language,
}: GenerateDialogProps) {
  const [prompt, setPrompt] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("write")
  
  const examplePrompts = {
    write: [
      "Create a function to calculate fibonacci sequence",
      "Build a simple REST API endpoint",
      "Implement a binary search algorithm"
    ],
    improve: [
      "Add error handling to the current code",
      "Optimize the performance",
      "Add input validation"
    ],
    fix: [
      "Fix the syntax errors",
      "Debug the infinite loop",
      "Handle edge cases"
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(prompt)
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  React.useEffect(() => {
    if (!open) {
      setPrompt("")
      setActiveTab("write")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            AI Code Generation
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Describe what you want to create. AI will generate a small, focused code example in {language}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-800 border-b border-zinc-700">
            <TabsTrigger value="write" className="data-[state=active]:bg-blue-600">
              <Sparkles className="h-4 w-4 mr-2" />
              Write New Code
            </TabsTrigger>
            <TabsTrigger value="improve" className="data-[state=active]:bg-blue-600">
              <Lightbulb className="h-4 w-4 mr-2" />
              Improve Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-4 mt-4">
            <div className="text-xs text-zinc-400 space-y-1">
              <p className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                Tips for better results:
              </p>
              <ul className="list-disc list-inside space-y-0.5 ml-1">
                <li>Be specific about functionality</li>
                <li>Keep it simple and focused</li>
                <li>Maximum 50 lines of code</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="improve" className="space-y-4 mt-4">
            <div className="text-xs text-zinc-400 space-y-1">
              <p className="flex items-center gap-2">
                <Lightbulb className="h-3.5 w-3.5 text-yellow-500" />
                Common improvements:
              </p>
              <ul className="list-disc list-inside space-y-0.5 ml-1">
                <li>Error handling</li>
                <li>Input validation</li>
                <li>Code optimization</li>
              </ul>
            </div>
          </TabsContent>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Textarea
              placeholder={activeTab === "write" 
                ? `Example: Create a function that:\n- Takes a number as input\n- Calculates its factorial\n- Handles negative numbers`
                : "Describe how you want to improve the current code..."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32 bg-zinc-800 border-zinc-700 text-white focus:ring-blue-600 resize-none"
              disabled={isGenerating}
            />

            <div className="space-y-2">
              <p className="text-xs text-zinc-500">Example prompts:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts[activeTab as keyof typeof examplePrompts].map((example, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExampleClick(example)}
                    className="text-xs px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isGenerating}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white border-none"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating
                    </>
                  ) : (
                    <>
                      {activeTab === "write" ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Improve
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
