"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Wand2, Bot, Share2, Play, ChevronLeft, ChevronRight, Lightbulb, X, Download, Maximize2, Minimize2, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "../workspace/components/editor"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { languageOptions } from "../constants/languageOptions"
import LanguagesDropdown from "../components/LanguagesDropdown"
import { ThemeDropdown } from "@/components/ui/theme-dropdown"
import { AIPrompt } from "../workspace/components/ai-prompt"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { defineTheme } from "@/app/lib/defineTheme"
import { ThemeId } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { QRCodeSVG } from 'qrcode.react';
import { ShareDialog } from "@/app/components/share-dialog"
import { GenerateDialog } from "../components/generate-dialog"
import JSZip from "jszip"

interface Language {
  id: number
  name: string
  value: string
  defaultCode: string
  monacoLanguage: string
}

const OutputPanel = ({ output, customInput, onCustomInputChange }: { 
  output: string
  customInput: string
  onCustomInputChange: (value: string) => void
}) => {
  return (
    <div className="h-full flex flex-col space-y-2 bg-zinc-900 p-4">
      <Tabs defaultValue="output" className="h-full">
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="output" className="text-white data-[state=active]:bg-zinc-700">Output</TabsTrigger>
          <TabsTrigger value="input" className="text-white data-[state=active]:bg-zinc-700">Custom Input</TabsTrigger>
        </TabsList>
        <TabsContent value="output" className="h-[calc(100%-40px)]">
          <div className="h-full overflow-auto rounded-md bg-zinc-800 p-4 font-mono">
            {output.split("\n").map((line, i) => (
              <div
                key={i}
                className={cn(
                  "whitespace-pre-wrap break-words",
                  line.includes("Error:") && "text-red-400",
                  line.includes("Success:") && "text-green-400",
                  line.includes("AI Code Analysis Suggestions:") && "text-purple-400 font-semibold",
                  /^\d+\./.test(line) && "text-white mt-2"
                )}
              >
                {line}
              </div>
            ))}
            {!output && (
              <div className="text-zinc-400 italic">
                Run your code or get AI suggestions to see output here...
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="input" className="h-[calc(100%-40px)]">
          <textarea
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            placeholder="Enter custom input here..."
            className="h-full w-full resize-none rounded-md bg-zinc-800 p-4 font-mono text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function WorkspacePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>(languageOptions[0])
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [customInput, setCustomInput] = useState("")
  const [processing, setProcessing] = useState(false)
  const [theme, setTheme] = useState<ThemeId>("vs-dark")
  const [usageCount, setUsageCount] = useState(0)
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [currentAction, setCurrentAction] = useState<"run" | "analyze" | "generate" | "share" | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [history, setHistory] = useState<{ code: string; language: Language }[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const [shareUrl, setShareUrl] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(false)

  useEffect(() => {
    const langParam = searchParams.get("language")
    if (langParam && languageOptions.some(l => l.value === langParam)) {
      setLanguage(languageOptions.find(l => l.value === langParam) || languageOptions[0])
    } else {
      // Default to C if no language is specified
      const defaultLang = languageOptions.find(l => l.value === "c") || languageOptions[0]
      setLanguage(defaultLang)
      const params = new URLSearchParams(searchParams.toString())
      params.set("language", defaultLang.value)
      router.push(`?${params.toString()}`)
    }
    setCode(languageOptions.find(l => l.value === (langParam || "c"))?.defaultCode || languageOptions[0].defaultCode)
  }, [searchParams])

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("code-workspace-theme")
    if (savedTheme) {
      setTheme(savedTheme as ThemeId)
    }
  }, [])

  useEffect(() => {
    if (theme) {
      defineTheme(theme).catch(error => {
        console.error('Error applying theme:', error)
        // Fallback to vs-dark on error
        setTheme("vs-dark")
      })
    }
  }, [theme])

  useEffect(() => {
    if (language) {
      setCode(language.defaultCode)
    }
  }, [language])

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const handleLanguageChange = (selectedLang: Language) => {
    setLanguage(selectedLang)
    setCode(selectedLang.defaultCode)
    const params = new URLSearchParams(searchParams.toString())
    params.set("language", selectedLang.value)
    router.push(`?${params.toString()}`)
  }

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme)
    localStorage.setItem("code-workspace-theme", newTheme)
  }

  const checkUsageLimit = () => {
    if (status !== "authenticated" && usageCount >= 3) {
      toast({
        title: "Usage Limit Reached",
        description: "Please log in to continue using Syntax Studio.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const incrementUsage = () => {
    if (status !== "authenticated") {
      setUsageCount((prev) => prev + 1)
    }
  }

  const handleCompile = async () => {
    if (!checkUsageLimit()) return
    setCurrentAction("run")
    setProcessing(true)
    setOutput("Compiling...")

    // Ensure we have the correct language ID
    const currentLangOption = languageOptions.find(l => l.value === language.value)
    if (!currentLangOption) {
      setOutput("Error: Invalid language selected")
      toast({
        title: "Error",
        description: "Invalid language selected. Please choose a valid language.",
        variant: "destructive",
      })
      setProcessing(false)
      setCurrentAction(null)
      return
    }

    const formData = {
      language_id: currentLangOption.id,
      source_code: code,
      stdin: customInput || "",
      wait: true,
      base64_encoded: false
    }

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Compilation failed")
      }

      const data = await response.json()
      
      // Handle Judge0 response format
      let outputText = ""
      if (data.status) {
        if (data.status.id === 3) { // Accepted
          outputText = data.stdout || "Program executed successfully with no output."
        } else if (data.status.id === 6) { // Compilation Error
          outputText = `Compilation Error:\n${data.compile_output || "No error details available"}`
        } else if (data.status.id >= 7 && data.status.id <= 12) { // Runtime Errors
          outputText = `Runtime Error (${data.status.description}):\n${data.stderr || "No error details available"}`
        } else {
          outputText = `${data.status.description}\n${data.stderr || data.compile_output || data.message || ""}`
        }
      }

      setOutput(outputText)
      
      if (data.status?.id === 3) {
        toast({
          title: "Success",
          description: "Code executed successfully!",
        })
      } else {
        toast({
          title: data.status?.description || "Error",
          description: "Code execution completed with issues.",
          variant: "destructive",
        })
      }
      incrementUsage()
    } catch (error) {
      setOutput("Error executing code. Please try again.")
      toast({
        title: "Error",
        description: "Failed to execute code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
      setCurrentAction(null)
    }
  }

  const handleGetSuggestions = async () => {
    if (!checkUsageLimit()) return
    setCurrentAction("analyze")
    setProcessing(true)
    setOutput("✨ Analyzing your code with Google Gemini AI...\n")

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: language.value,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get suggestions")
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Format suggestions in a visually appealing way
      const formattedOutput = `✨ AI Code Analysis Complete!\n\nSuggestions:\n${data.suggestions
        .map((suggestion: string, index: number) => `${index + 1}. ${suggestion}`)
        .join('\n')}\n\nClick 'Get AI Code' to implement these suggestions.`

      setOutput(formattedOutput)
      
      toast({
        title: "Analysis Complete",
        description: "Check out the AI suggestions in the output panel!",
        duration: 3000,
      })
      
      incrementUsage()
    } catch (error: any) {
      const errorMessage = error.message || "Failed to analyze code. Please try again."
      setOutput(`❌ ${errorMessage}`)
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setProcessing(false)
      setCurrentAction(null)
    }
  }

  const handleGetAICode = async () => {
    setShowGenerateDialog(true)
  }

  const handleGenerateCode = async (prompt: string) => {
    if (!checkUsageLimit()) return
    if (currentAction) return // Only one operation at a time

    setIsGenerating(true)
    setShowGenerateDialog(false)
    setCurrentAction("generate")
    setProcessing(true)
    setOutput("✨ Generating code... This will take a few seconds.")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          language: language.value,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate code")
      }

      const data = await response.json()
      if (!data.code) {
        throw new Error("No code was generated. Please try rephrasing your request.")
      }

      // Save to history before updating code
      const newHistory = [...history, { code: data.code, language }]
      setHistory(newHistory)
      setCurrentHistoryIndex(newHistory.length - 1)

      // Update code state
      setCode(data.code)
      
      // Ensure language is properly set with correct ID for compilation
      const currentLangOption = languageOptions.find(l => l.value === language.value)
      if (currentLangOption && currentLangOption.id !== language.id) {
        setLanguage(currentLangOption)
      }

      setOutput(`✨ Code generated successfully!

Quick Actions:
1. Click 'Run Code' to test it
2. Use history navigation to undo/redo
3. Try the AI suggestions below`)

      toast({
        title: "Code Generated",
        description: "Your code is ready! Click 'Run Code' to test it.",
        duration: 3000,
      })
      incrementUsage()
    } catch (error: any) {
      console.error("Error generating code:", error)
      setOutput(`❌ ${error.message}

Quick Actions:
1. Try simplifying your request
2. Be more specific about functionality
3. Check your API key configuration
4. Click 'Get AI Code' to try again`)

      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate code. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsGenerating(false)
      setProcessing(false)
      setCurrentAction(null)
    }
  }

  const handleCopyLink = async () => {
    setIsSharing(true)
    setCurrentAction("share")
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      toast({
        title: "Success",
        description: "Share link has been copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
      setCurrentAction(null)
    }
  }

  const handleDownloadZip = async () => {
    setIsSharing(true)
    setCurrentAction("share")
    try {
      const zip = new JSZip()
      const extension = getFileExtension(language.value)
      const fileName = `code.${extension}`
      zip.file(fileName, code)
      
      const readme = `# Code Snippet
Language: ${language.name}
Generated with Syntax Studio

## Contents
- ${fileName}: Main code file
`
      zip.file("README.md", readme)
      
      const content = await zip.generateAsync({ type: "blob" })
      const url = window.URL.createObjectURL(content)
      const link = document.createElement("a")
      link.href = url
      link.download = "code-snippet.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: "Success",
        description: "Code has been downloaded as a zip file.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
      setCurrentAction(null)
    }
  }

  const getFileExtension = (langValue: string): string => {
    const extensionMap: { [key: string]: string } = {
      python: "py",
      javascript: "js",
      typescript: "ts",
      java: "java",
      cpp: "cpp",
      c: "c",
      csharp: "cs",
      php: "php",
      ruby: "rb",
      swift: "swift",
      kotlin: "kt",
      go: "go",
      rust: "rs",
      scala: "scala",
    }
    return extensionMap[langValue] || langValue
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value)
  }

  const handleHistoryNavigation = (direction: "back" | "forward") => {
    if (direction === "back" && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1)
      const historyItem = history[currentHistoryIndex - 1]
      setCode(historyItem.code)
      setLanguage(historyItem.language)
    } else if (direction === "forward" && currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1)
      const historyItem = history[currentHistoryIndex + 1]
      setCode(historyItem.code)
      setLanguage(historyItem.language)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className={cn(
      "min-h-screen transition-all duration-200",
      isFullscreen ? "bg-black" : "bg-gradient-to-br from-[#3B4371] to-[#F3904F] p-4 md:p-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-8",
        isFullscreen && "h-screen"
      )}>
        {!isFullscreen && (
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white">Syntax Studio Code Workspace</h1>
            <p className="text-base md:text-xl text-white/80">
              Experience our AI-powered code optimization and compilation environment
            </p>
            {status !== "authenticated" && (
              <p className="text-sm text-white/60">
                You have {3 - usageCount} free uses left.{" "}
                <Link href="/login" className="underline">
                  Log in
                </Link>{" "}
                for unlimited access.
              </p>
            )}
          </motion.div>
        )}
        <Card className={cn(
          "transition-all duration-200 h-full",
          isFullscreen && "rounded-none border-0 shadow-none"
        )}>
          <CardHeader className={cn(
            "border-b bg-zinc-900/50",
            isFullscreen && "border-white/10"
          )}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Code Workspace</h2>
                <p className="text-xs text-white/80">Write, compile, and analyze your code</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-0.5 sm:gap-2">
                  <LanguagesDropdown
                    language={language}
                    onSelectChange={(lang: Language) => handleLanguageChange(lang)}
                  />
                  <Button
                    onClick={() => setShowShareDialog(true)}
                    variant="outline"
                    disabled={currentAction !== null}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors duration-200"
                    title="Share Code"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    <span>Share</span>
                  </Button>
                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors duration-200"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="h-4 w-4" />
                        <span>Exit Fullscreen</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-4 w-4" />
                        <span>Fullscreen</span>
                      </>
                    )}
                  </Button>
                  <ThemeDropdown
                    theme={theme}
                    onThemeChange={handleThemeChange}
                    variant="minimal"
                    className="flex items-center gap-2 h-10 px-4 rounded-md bg-zinc-900 border border-zinc-800 text-white text-sm hover:bg-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors duration-200"
                    caretIcon={<ChevronDown className="ml-2 text-white h-4 w-4" />}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="sm:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-[28px] w-[28px] p-0 bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[240px] bg-zinc-900 border-white/10 p-0">
                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-white">Language</p>
                        <Select
                          value={language.value}
                          onValueChange={(value) => {
                            const lang = languageOptions.find(l => l.value === value);
                            if (lang) handleLanguageChange(lang);
                          }}
                        >
                          <SelectTrigger className="w-full bg-black/20 border-white/20 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {languageOptions.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                <div className="flex items-center gap-2">
                                  <img src={lang.icon} alt={lang.label} className="w-4 h-4" />
                                  <span>{lang.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-white">Theme</p>
                        <Select
                          value={theme}
                          onValueChange={(value) => handleThemeChange(value as ThemeId)}
                        >
                          <SelectTrigger className="w-full bg-black/20 border-white/20 text-white">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            <SelectItem value="vs-dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => setShowShareDialog(true)}
                          variant="outline"
                          disabled={currentAction !== null}
                          className="w-full bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 h-9"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Code
                        </Button>
                        <Button
                          onClick={toggleFullscreen}
                          variant="outline"
                          className="w-full bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 h-9 inline-flex items-center justify-center gap-2"
                        >
                          {isFullscreen ? (
                            <>
                              <Minimize2 className="h-4 w-4" />
                              <span>Exit Fullscreen</span>
                            </>
                          ) : (
                            <>
                              <Maximize2 className="h-4 w-4" />
                              <span>Fullscreen</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ResizablePanelGroup 
              direction="vertical" 
              className={cn(
                "min-h-[600px] rounded-lg border",
                isFullscreen && "rounded-none border-white/10"
              )}
            >
              <ResizablePanel defaultSize={70}>
                <div className="h-full flex flex-col">
                  <div className="flex-grow overflow-hidden">
                    <CodeEditor
                      code={code}
                      onChange={handleCodeChange}
                      language={language.value}
                      theme={theme}
                    />
                  </div>
                  <div className="flex items-center justify-center p-2 sm:p-4 border-t bg-zinc-900">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleCompile}
                        disabled={currentAction !== null}
                        className="bg-green-600 hover:bg-green-700 text-white sm:w-auto w-8 h-8 p-0 sm:p-3 sm:h-9"
                        title="Run Code"
                      >
                        {currentAction === "run" ? (
                          <>
                            <Spinner className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Running...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Run Code</span>
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleGetSuggestions}
                        disabled={currentAction !== null}
                        variant="outline"
                        className="bg-purple-600 hover:bg-purple-700 text-white border-none sm:w-auto w-8 h-8 p-0 sm:p-3 sm:h-9"
                        title="Get AI Suggestions"
                      >
                        {currentAction === "analyze" ? (
                          <>
                            <Spinner className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Get AI Suggestions</span>
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={() => setShowGenerateDialog(true)}
                        disabled={currentAction !== null}
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-none sm:w-auto w-8 h-8 p-0 sm:p-3 sm:h-9"
                        title="Get AI Code"
                      >
                        {currentAction === "generate" ? (
                          <>
                            <Spinner className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Generating...</span>
                          </>
                        ) : (
                          <>
                            <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Get AI Code</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <OutputPanel 
                  output={output} 
                  customInput={customInput}
                  onCustomInputChange={handleCustomInputChange}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </CardContent>
        </Card>

        {/* Share Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="bg-zinc-900 border border-zinc-800 text-white p-0 sm:max-w-md">
            <div className="p-6 border-b border-zinc-800">
              <div className="flex justify-between items-center">
                <DialogTitle className="text-lg font-semibold text-white">Share Code</DialogTitle>
                <Button 
                  variant="ghost" 
                  className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors duration-200" 
                  onClick={() => setShowShareDialog(false)}
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <DialogDescription className="text-sm text-zinc-400 mt-1">
                Share your code with others using any of these methods
              </DialogDescription>
            </div>
            
            <Tabs defaultValue="link" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-black/20 border-b border-white/20 rounded-none h-10 p-0">
                <TabsTrigger 
                  value="link" 
                  className="h-10 rounded-none data-[state=active]:bg-black/20 data-[state=active]:border-b-2 data-[state=active]:border-white text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-white data-[state=active]:text-white"
                >
                  Link
                </TabsTrigger>
                <TabsTrigger 
                  value="qr" 
                  className="h-10 rounded-none data-[state=active]:bg-black/20 data-[state=active]:border-b-2 data-[state=active]:border-white text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-white data-[state=active]:text-white"
                >
                  QR Code
                </TabsTrigger>
                <TabsTrigger 
                  value="download" 
                  className="h-10 rounded-none data-[state=active]:bg-black/20 data-[state=active]:border-b-2 data-[state=active]:border-white text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-white data-[state=active]:text-white"
                >
                  Download
                </TabsTrigger>
              </TabsList>
              <div className="p-4">
                <TabsContent value="link" className="mt-0">
                  <div className="flex gap-2">
                    <Input 
                      value={shareUrl} 
                      readOnly 
                      className="bg-black/20 border-white/20 text-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                      aria-label="Share URL"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        toast({
                          title: "Link copied",
                          description: "Share link has been copied to clipboard",
                          variant: "default",
                        })
                      }}
                      className="shrink-0 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                      aria-label="Copy share link"
                    >
                      Copy
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="qr" className="mt-0 flex justify-center">
                  <div className="bg-white p-4 rounded">
                    <QRCodeSVG 
                      value={shareUrl} 
                      size={200}
                      aria-label="QR code for sharing"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="download" className="mt-0">
                  <Button 
                    onClick={handleDownloadZip}
                    className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                    aria-label="Download code as ZIP"
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Download as ZIP
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Generate Code Dialog */}
        <GenerateDialog
          open={showGenerateDialog}
          onOpenChange={setShowGenerateDialog}
          onGenerate={handleGenerateCode}
          isGenerating={isGenerating}
          language={language.value}
        />

        {/* Workspace-specific footer */}
        <footer className={cn(
          "mt-8 border-t border-white/10 pt-8",
          isFullscreen && "hidden"
        )}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/70">© 2025 Syntax Studio. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-sm text-white/70 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-white/70 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-sm text-white/70 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
