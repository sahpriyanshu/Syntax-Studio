"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Share2, Wand2, Download, X } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "../workspace/components/editor"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { languageOptions } from "../constants/languageOptions"
import LanguagesDropdown from "../components/LanguagesDropdown"
import { ThemeDropdown } from "@/components/ui/theme-dropdown"; 
import { AIPrompt } from "../workspace/components/ai-prompt"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GlowMenu, GlowMenuItem } from "../components/glow-menu"
import { defineTheme } from "@/app/lib/defineTheme"
import { ThemeId } from "@/lib/themes"

export default function WorkspacePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState(languageOptions[0])
  const [code, setCode] = useState(language.defaultCode)
  const [output, setOutput] = useState("")
  const [customInput, setCustomInput] = useState("")
  const [processing, setProcessing] = useState(false)
  const [theme, setTheme] = useState<ThemeId>("vs-dark")
  const [usageCount, setUsageCount] = useState(0)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    const langParam = searchParams.get("language")
    if (langParam) {
      const selectedLang = languageOptions.find((lang) => lang.value === langParam)
      if (selectedLang) {
        setLanguage(selectedLang)
        setCode(selectedLang.defaultCode)
      }
    }
  }, [searchParams])

  useEffect(() => {
    // Update shareUrl whenever code or language changes
    const encodedCode = encodeURIComponent(code)
    setShareUrl(`${window.location.origin}/code-workspace?language=${language.value}&code=${encodedCode}`)
  }, [code, language])

  useEffect(() => {
    if (theme) {
      defineTheme(theme)
    }
  }, [theme])

  const handleLanguageChange = (selectedLang: typeof language) => {
    setLanguage(selectedLang)
    setCode(selectedLang.defaultCode)
  }

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme)
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

    setProcessing(true)
    setOutput("Compiling...")

    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
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
      setProcessing(false)
      setOutput(data.output)
      toast({
        title: "Success",
        description: "Code compiled successfully!",
      })
      incrementUsage()
    } catch (error) {
      setProcessing(false)
      setOutput("Error compiling code. Please try again.")
      toast({
        title: "Error",
        description: "Failed to compile code. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGetSuggestions = async () => {
    if (!checkUsageLimit()) return

    setProcessing(true)
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
      setOutput(data.suggestions.join("\n\n"))
      toast({
        title: "Success",
        description: "AI suggestions generated successfully!",
      })
      incrementUsage()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `code.${language.value}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
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

          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Interactive Workspace</h1>
                    <p className="text-white/80">Edit the code, compile it, or get AI suggestions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LanguagesDropdown 
                      language={language}
                      onSelectChange={handleLanguageChange}
                    />
                    <ThemeDropdown 
                      theme={theme}
                      onThemeChange={handleThemeChange}
                      variant="default"
                    />
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                  <div className="h-[600px] p-4 space-y-4">
                    <CodeEditor value={code} onChange={setCode} language={language.value} theme={theme} />
                    <AIPrompt onGenerate={(generatedCode) => setCode(generatedCode)} language={language.value} />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold mb-2">Custom Input</h3>
                      <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter your input here..."
                        className="w-full h-32 p-3 bg-[#1e1e1e] text-white rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Output</h3>
                          <Button
                            onClick={handleCompile}
                            className="bg-white text-black hover:bg-white/90"
                            disabled={processing}
                          >
                            {processing ? (
                              <>
                                <Spinner className="mr-2" />
                                Compiling...
                              </>
                            ) : (
                              "Compile and Run"
                            )}
                          </Button>
                        </div>
                        <div className="h-48 overflow-auto rounded-md bg-[#1e1e1e] p-4 font-mono text-xs md:text-sm text-white">
                          {output || "Output will appear here after compilation."}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">AI Code Suggestions</h3>
                          <Button
                            onClick={handleGetSuggestions}
                            className="bg-[#3B4371] hover:bg-[#3B4371]/90"
                            disabled={processing}
                          >
                            {processing ? (
                              <>
                                <Spinner className="mr-2" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Get Suggestions
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="h-48 overflow-auto rounded-md bg-[#1e1e1e] p-4 font-mono text-xs md:text-sm text-white">
                          {output || "AI suggestions will appear here after analysis."}
                        </div>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
            <div className="flex items-center space-x-4 p-4">
            </div>
          </Card>

          {/* Share Dialog */}
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="sm:max-w-md" closeButton={false}>
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-xl">Share Code</DialogTitle>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setShowShareDialog(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogDescription className="text-sm text-gray-500">
                Share your code with others using any of these methods
              </DialogDescription>
              <Tabs defaultValue="link" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="link">Link</TabsTrigger>
                  <TabsTrigger value="qr">Qr</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                </TabsList>
                <TabsContent value="link" className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={shareUrl} readOnly />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        toast({
                          title: "Link copied!",
                          description: "The link has been copied to your clipboard.",
                        })
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="qr" className="flex justify-center p-4">
                  <QRCodeSVG value={shareUrl} size={200} />
                </TabsContent>
                <TabsContent value="download" className="space-y-4">
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Code
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Workspace-specific footer */}
          <footer className="mt-8 border-t border-white/10 pt-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-white/70"> 2025 Syntax Studio. All rights reserved.</p>
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
    </>
  )
}
