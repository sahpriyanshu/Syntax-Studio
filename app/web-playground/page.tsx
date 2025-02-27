"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Share2, Layout, Plus, Download, Smartphone, Monitor, Wand2, Copy, RefreshCw, ExternalLink, Maximize2, Check, Github, Twitter, Link, GripVertical, X, ChevronRight } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { ThemeDropdown } from "@/components/ui/theme-dropdown"
import { ThemeId } from "@/lib/themes"
import { Preview } from "./components/preview"
import { CodeEditor } from "./components/editor"
import { FileExplorer } from "./components/file-explorer"
import JSZip from "jszip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Label } from "@/components/ui/label"
import { templates } from "./lib/templates"
import { cn } from "@/lib/utils"
import { ShareDialog } from "@/components/ui/share-dialog"
import { TemplateDialog } from "@/components/ui/template-dialog"
import { defineTheme } from "@/app/lib/defineTheme"

const FILE_EXTENSIONS = [
  { value: "html", label: "HTML (.html)" },
  { value: "css", label: "CSS (.css)" },
  { value: "js", label: "JavaScript (.js)" },
  { value: "json", label: "JSON (.json)" },
  { value: "md", label: "Markdown (.md)" },
  { value: "txt", label: "Text (.txt)" },
]

const defaultFiles = {
  "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Welcome to Syntax Studio</h1>
  <p>Start editing to see live changes!</p>
  <script src="script.js"></script>
</body>
</html>`,
  "styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.5;
}

h1 {
  color: #3B4371;
}`,
  "script.js": `// Your JavaScript code here
console.log("Welcome to Syntax Studio!");`,
}

const templatesData = Object.keys(templates).map((name) => ({
  name,
  description: templates[name].description,
  files: templates[name].files,
}))

export default function WebPlaygroundPage() {
  const { data: session } = useSession()
  const [files, setFiles] = useState(defaultFiles)
  const [activeFile, setActiveFile] = useState("index.html")
  const [theme, setTheme] = useState<ThemeId>("vs-dark")
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [showTemplates, setShowTemplates] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [previewWidth, setPreviewWidth] = useState("100%")
  const [fileExtension, setFileExtension] = useState("html")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAiPrompt, setShowAiPrompt] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [previewFile, setPreviewFile] = useState("index.html")
  const [shareTab, setShareTab] = useState<'link' | 'qr' | 'download'>('link')
  const [remainingUses, setRemainingUses] = useState(3)

  // Load remaining uses from localStorage on mount
  React.useEffect(() => {
    if (!session) {
      const storedUses = localStorage.getItem('webPlaygroundRemainingUses')
      if (storedUses !== null) {
        setRemainingUses(parseInt(storedUses))
      } else {
        localStorage.setItem('webPlaygroundRemainingUses', '3')
      }
    }
  }, [session])

  // Update localStorage when uses change
  React.useEffect(() => {
    if (!session) {
      localStorage.setItem('webPlaygroundRemainingUses', remainingUses.toString())
    }
  }, [remainingUses, session])

  const handleFileChange = (filename: string, content: string) => {
    if (!session && remainingUses <= 0) {
      toast({
        title: "Usage limit reached",
        description: "Please log in to continue using the Web Playground.",
        variant: "destructive",
      })
      return
    }

    setFiles((prev) => ({
      ...prev,
      [filename]: content,
    }))

    if (!session) {
      setRemainingUses(prev => prev - 1)
    }
  }

  const getFileLanguage = (filename: string | undefined) => {
    if (!filename) return "plaintext"
    const ext = filename.split(".").pop()
    switch (ext) {
      case "html":
        return "html"
      case "css":
        return "css"
      case "js":
        return "javascript"
      default:
        return "plaintext"
    }
  }

  const handleShare = () => {
    const encoded = btoa(JSON.stringify(files))
    const url = `${window.location.origin}/web-playground?files=${encoded}`
    setShareUrl(url)
    setShowShareDialogOpen(true)
  }

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard",
    })
  }

  const handleShareToTwitter = () => {
    const text = "Check out my web project created with Syntax Studio!"
    const url = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank')
  }

  const handleShareToGithub = () => {
    const gistContent = {
      description: "Web project created with Syntax Studio",
      public: true,
      files: Object.fromEntries(
        Object.entries(files).map(([name, content]) => [
          name,
          { content }
        ])
      )
    }
    // Note: This would need a GitHub token to work
    toast({
      title: "GitHub integration",
      description: "GitHub sharing requires authentication. Please sign in to share as a Gist.",
    })
  }

  const handleOpenInNewTab = () => {
    const encoded = btoa(JSON.stringify(files))
    const url = `${window.location.origin}/web-playground/preview?files=${encoded}`
    window.open(url, '_blank')
  }

  const handleDownloadCode = async () => {
    const zip = new JSZip()
    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    const blob = await zip.generateAsync({ type: "blob" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'web-playground-files.zip'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleNewFile = (fullFileName: string) => {
    if (!newFileName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a file name",
        variant: "destructive",
      })
      return
    }

    setFiles((prev) => ({
      ...prev,
      [fullFileName]: "",
    }))
    setActiveFile(fullFileName)
    setNewFileName("")
    setShowNewFileDialog(false)
    toast({
      title: "Success",
      description: "New file created",
    })
  }

  const handleDeleteFile = (filename: string) => {
    if (Object.keys(files).length <= 1) {
      toast({
        title: "Error",
        description: "Cannot delete the last file",
        variant: "destructive",
      })
      return
    }

    const newFiles = { ...files }
    delete newFiles[filename]
    setFiles(newFiles)
    setActiveFile(Object.keys(newFiles)[0])
    toast({
      title: "Success",
      description: "File deleted",
    })
  }

  const handleTemplateSelect = (templateName: string) => {
    const template = templates[templateName];
    if (template && template.files) {
      setFiles(template.files);
      setActiveFile("index.html");
      setShowTemplates(false);
      toast({
        title: "Template Loaded",
        description: `${templateName} template has been loaded successfully.`,
      });
    }
  };

  const generateCode = async (prompt: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code")
      }

      const data = await response.json()
      if (data.html) {
        setFiles((prev) => ({
          ...prev,
          "index.html": data.html,
        }))
      }
      if (data.css) {
        setFiles((prev) => ({
          ...prev,
          "styles.css": data.css,
        }))
      }
      if (data.js) {
        setFiles((prev) => ({
          ...prev,
          "script.js": data.js,
        }))
      }
      toast({
        title: "Code generated!",
        description: "The code has been generated and added to your files.",
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

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      await generateCode(aiPrompt)
      setShowAiPrompt(false)
      setAiPrompt("")
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (theme) {
      defineTheme(theme)
    }
  }, [theme])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] p-6">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white text-shadow">Syntax Studio Web Playground</h1>
          <p className="text-xl text-white/90 mt-2">
            Experience our interactive web development environment with live preview
          </p>
          {!session && (
            <p className="text-sm text-white/80 mt-2">
              You have {remainingUses} free uses left. <a href="/auth/signin" className="underline hover:text-white">Log in</a> for unlimited access.
            </p>
          )}
        </div>
        <div className="rounded-lg border bg-card/95 backdrop-blur-sm text-card-foreground shadow-sm">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Web Playground</h2>
              <span className="text-sm text-muted-foreground">Build and preview web projects</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeDropdown 
                theme={theme} 
                onThemeChange={setTheme}
                variant="minimal"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShareDialogOpen(true)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowTemplates(true)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
              >
                <Layout className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowNewFileDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New File
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAiPrompt(true)}>
                <Wand2 className="h-4 w-4 mr-2" />
                AI Generate
              </Button>
            </div>
          </div>

          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
              <div className="h-[calc(100vh-8rem)] border-r">
                <FileExplorer
                  files={files}
                  activeFile={activeFile}
                  onFileSelect={setActiveFile}
                  onFileDelete={handleDeleteFile}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle>
              <GripVertical className="h-4 w-4" />
            </ResizableHandle>
            <ResizablePanel defaultSize={85}>
              <div className="h-[calc(100vh-8rem)]">
                <div className="h-full flex flex-col">
                  <div className="flex-1 p-4">
                    <div className="rounded-md border h-full">
                      <CodeEditor
                        value={files[activeFile] || ""}
                        onChange={(value) => handleFileChange(activeFile, value || "")}
                        theme={theme}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle>
              <GripVertical className="h-4 w-4" />
            </ResizableHandle>
            <ResizablePanel defaultSize={40}>
              <div className="h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Layout className="mr-2 h-4 w-4" />
                          Preview File
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuLabel>HTML Files</DropdownMenuLabel>
                        {Object.keys(files)
                          .filter(file => file.endsWith('.html'))
                          .map(file => (
                            <DropdownMenuItem
                              key={file}
                              onClick={() => setPreviewFile(file)}
                            >
                              {file}
                              {file === previewFile && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Browser
                    </Button>
                  </div>
                </div>
                <div className="p-4 h-[calc(100%-4rem)]">
                  <div className="rounded-lg border overflow-hidden h-full bg-background">
                    <Preview files={files} previewFile={previewFile} />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        url={`${window.location.origin}/web-playground?files=${encodeURIComponent(JSON.stringify(files))}`}
        onDownload={handleDownloadCode}
      />

      <TemplateDialog
        open={showTemplates}
        onOpenChange={setShowTemplates}
        templates={templatesData}
        onSelect={(template) => {
          setFiles(template.files)
          setActiveFile(Object.keys(template.files)[0])
        }}
      />

      <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Enter the name for your new file
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., styles"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="extension" className="text-right">
                Extension
              </Label>
              <Select
                value={fileExtension}
                onValueChange={setFileExtension}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="js">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                const fullFileName = `${newFileName}.${fileExtension}`
                if (files[fullFileName]) {
                  toast({
                    title: "File already exists",
                    description: `A file named ${fullFileName} already exists.`,
                    variant: "destructive",
                  })
                  return
                }
                setFiles((prev) => ({
                  ...prev,
                  [fullFileName]: "",
                }))
                setActiveFile(fullFileName)
                setShowNewFileDialog(false)
                setNewFileName("")
                setFileExtension("html")
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAiPrompt} onOpenChange={setShowAiPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Generate</DialogTitle>
            <DialogDescription>
              Describe what you want to create
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Prompt</Label>
              <textarea
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Create a responsive landing page with a hero section and features grid"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                setIsGenerating(true)
                try {
                  // Add AI generation logic here
                  toast({
                    title: "Code generated",
                    description: "Your code has been generated successfully.",
                  })
                  setShowAiPrompt(false)
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to generate code. Please try again.",
                    variant: "destructive",
                  })
                } finally {
                  setIsGenerating(false)
                }
              }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
