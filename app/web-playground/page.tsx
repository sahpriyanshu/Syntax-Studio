"use client"

import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Share2, Layout, Plus, Download, Smartphone, Monitor, Wand2, Copy, RefreshCw, ExternalLink, Maximize2, Check, Github, Twitter, Link, GripVertical, X, ChevronRight, Menu, FolderPlus, FilePlus, Minimize2 } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { ThemeDropdown } from "@/components/ui/theme-dropdown"
import { ThemeId } from "@/lib/themes"
import { Preview } from "./components/preview"
import { CodeEditor } from "./components/editor"
import { FileExplorer } from "./components/file-explorer"
import { BrowserPreview } from "./components/browser-preview"
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
  DialogClose,
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
import { AIGenerationDialog } from "@/app/components/ai-generation-dialog"

interface Files {
  [key: string]: string;
}

const FILE_EXTENSIONS = [
  { value: "html", label: ".html" },
  { value: "css", label: ".css" },
  { value: "js", label: ".js" },
  { value: "ts", label: ".ts" },
  { value: "jsx", label: ".jsx" },
  { value: "tsx", label: ".tsx" },
  { value: "json", label: ".json" },
  { value: "md", label: ".md" },
  { value: "txt", label: ".txt" }
]

const defaultHtml = `<!DOCTYPE html>
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
</html>`;

const defaultCss = `body {
  font-family: system-ui, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.5;
}

h1 {
  color: #3B4371;
}`;

const defaultJs = `// Your JavaScript code here
console.log("Welcome to Syntax Studio!");`;

const defaultFiles: Files = {
  "index.html": defaultHtml,
  "styles.css": defaultCss,
  "script.js": defaultJs
};

const templatesData = Object.keys(templates).map((name) => ({
  name,
  description: templates[name].description,
  files: templates[name].files,
}))

export default function WebPlaygroundPage() {
  const { data: session } = useSession()
  const [files, setFiles] = useState<Files>(defaultFiles)
  const [activeFile, setActiveFile] = useState("index.html")
  const [theme, setTheme] = useState<ThemeId>("vs-dark")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [showTemplates, setShowTemplates] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [isFolder, setIsFolder] = useState(false)
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [fileExtension, setFileExtension] = useState("html")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAiPrompt, setShowAiPrompt] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [previewFile, setPreviewFile] = useState("index.html")
  const [shareTab, setShareTab] = useState<'link' | 'qr' | 'download'>('link')
  const [remainingUses, setRemainingUses] = useState(3)
  const [currentFolder, setCurrentFolder] = useState("")
  const [folders, setFolders] = useState<Record<string, string[]>>({})
  const [allowRootCreation, setAllowRootCreation] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentAction, setCurrentAction] = useState<string | null>(null)
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 640);

  const previewRef = useRef<{ updatePreview: () => void }>(null)

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("web-playground-theme")
    if (savedTheme) {
      setTheme(savedTheme as ThemeId)
    }
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    if (theme) {
      defineTheme(theme).catch(error => {
        console.error('Error applying theme:', error)
        // Fallback to vs-dark on error
        setTheme("vs-dark")
      })
    }
  }, [theme])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Only add listener if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Set initial width
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme)
    localStorage.setItem("web-playground-theme", newTheme)
  }

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

  const handleFileChange = (fileName: string, content: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: content,
    }))
  }

  const handleCreateFile = (fileName: string) => {
    if (files[fileName]) {
      toast({
        title: "Error",
        description: `File ${fileName} already exists`,
        variant: "destructive",
      })
      return
    }

    setFiles((prev) => ({
      ...prev,
      [fileName]: "",
    }))
    setActiveFile(fileName)
  }

  const handleDeleteFile = (fileName: string) => {
    if (fileName === "index.html") {
      toast({
        title: "Error",
        description: "Cannot delete index.html",
        variant: "destructive",
      })
      return
    }

    // Remove file from files state
    const newFiles = { ...files }
    delete newFiles[fileName]
    setFiles(newFiles)

    // Update folders state
    const folderPath = fileName.includes('/') ? fileName.substring(0, fileName.lastIndexOf('/')) : ''
    if (folderPath) {
      setFolders(prev => {
        const newFolders = { ...prev }
        newFolders[folderPath] = newFolders[folderPath].filter(f => f !== fileName.split('/').pop())
        return newFolders
      })
    }

    // Update active file if needed
    if (activeFile === fileName) {
      setActiveFile("index.html")
    }

    toast({
      title: "Success",
      description: `File ${fileName} has been deleted.`,
    })
  }

  const handleDeleteFolder = (folderPath: string) => {
    // Get all subfolders that start with this folder path
    const subFolders = Object.keys(folders).filter(f => f.startsWith(folderPath + '/'))
    
    // Remove all files in this folder and subfolders
    const newFiles = { ...files }
    Object.keys(newFiles).forEach(fileName => {
      if (fileName.startsWith(folderPath + '/')) {
        delete newFiles[fileName]
      }
    })
    setFiles(newFiles)

    // Remove folder and all subfolders from folders state
    setFolders(prev => {
      const newFolders = { ...prev }
      delete newFolders[folderPath]
      subFolders.forEach(subFolder => {
        delete newFolders[subFolder]
      })
      return newFolders
    })

    // Update current folder to parent if needed
    if (currentFolder.startsWith(folderPath)) {
      const parentFolder = folderPath.includes('/') 
        ? folderPath.substring(0, folderPath.lastIndexOf('/'))
        : ""
      setCurrentFolder(parentFolder)
    }

    // Update active file if needed
    if (activeFile.startsWith(folderPath + '/')) {
      setActiveFile("index.html")
    }

    toast({
      title: "Success",
      description: `Folder ${folderPath} and its contents have been deleted.`,
    })
  }

  const handleShare = () => {
    const encoded = btoa(JSON.stringify(files))
    const url = `${window.location.origin}/web-playground?files=${encoded}`
    setShareUrl(url)
    setShareDialogOpen(true)
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

  const handleBrowserPreview = useCallback(() => {
    // Revoke the old URL to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Create HTML content with current files
    const htmlContent = files[previewFile];
    const cssContent = files["styles.css"] || "";
    const jsContent = files["script.js"] || "";

    // Check if CSS and JS are linked
    const hasCssLink = /<link[^>]*href=["']styles\.css["'][^>]*>/i.test(htmlContent);
    const hasJsScript = /<script[^>]*src=["']script\.js["'][^>]*>/i.test(htmlContent);

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              min-height: 100vh;
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
            }
            ${hasCssLink ? cssContent : ''}
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            ${hasJsScript ? jsContent : ''}
          </script>
        </body>
      </html>
    `;

    // Create a new blob and URL
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);

    // Open in new tab
    window.open(url, '_blank');
  }, [files, previewFile]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleOpenInNewTab = () => {
    // Find the preview file (index.html or first HTML file)
    const htmlFiles = Object.entries(files).filter(([name]) => name.endsWith('.html'))
    const previewFile = htmlFiles.find(([name]) => name === 'index.html') || htmlFiles[0]

    if (!previewFile) {
      toast({
        title: "Error",
        description: "No HTML file found to preview",
        variant: "destructive",
      })
      return
    }

    try {
      // Create the preview URL with proper encoding
      const filesData = Object.fromEntries(
        Object.entries(files).map(([name, content]) => [
          name,
          content.toString() // Ensure content is a string
        ])
      )
      const encodedFiles = encodeURIComponent(JSON.stringify(filesData))
      const previewUrl = `${window.location.origin}/web-playground/preview?files=${encodedFiles}`
      
      // Open in new tab
      const newWindow = window.open(previewUrl, '_blank')
      if (newWindow) {
        newWindow.focus()
      } else {
        throw new Error("Popup blocked")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open preview",
        variant: "destructive",
      })
    }
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

  const handleCreateNewItem = () => {
    if (!newItemName) {
      toast({
        title: "Error",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    // Check if trying to create in root when not allowed
    if (!allowRootCreation && !currentFolder) {
      toast({
        title: "Error",
        description: "Please select a folder first. Creation in root directory is disabled.",
        variant: "destructive",
      })
      return
    }

    if (isFolder) {
      // Create folder
      const folderPath = currentFolder ? `${currentFolder}/${newItemName}` : newItemName;
      if (folders[folderPath]) {
        toast({
          title: "Error",
          description: `Folder ${folderPath} already exists`,
          variant: "destructive",
        })
        return
      }
      setFolders(prev => ({
        ...prev,
        [folderPath]: []
      }))
    } else {
      // Create file
      const fileName = `${newItemName}.${fileExtension}`
      const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
      
      if (files[filePath]) {
        toast({
          title: "Error",
          description: `File ${filePath} already exists`,
          variant: "destructive",
        })
        return
      }

      setFiles(prev => ({
        ...prev,
        [filePath]: ""
      }))
      setActiveFile(filePath)

      // Add file to current folder
      if (currentFolder) {
        setFolders(prev => ({
          ...prev,
          [currentFolder]: [...(prev[currentFolder] || []), fileName]
        }))
      }
    }

    setNewItemName("")
    setShowNewFileDialog(false)
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

  const handleAiGenerate = async (mode: 'generate' | 'improve', prompt: string) => {
    try {
      setIsGenerating(true);
      setCurrentAction('generate');

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          prompt,
          currentCode: mode === 'improve' ? files[activeFile] : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const data = await response.json();
      
      if (mode === 'improve') {
        handleFileChange(activeFile, data.files[getFileExtension(files[activeFile])]);
      } else {
        // Add each generated file to the editor
        if (data.files.html) {
          handleFileChange('index.html', data.files.html);
        }
        if (data.files.css) {
          handleFileChange('styles.css', data.files.css);
        }
        if (data.files.js) {
          handleFileChange('script.js', data.files.js);
        }
        // Set active file to index.html if it was generated
        if (data.files.html) {
          setActiveFile('index.html');
        }
      }

      setShowAiDialog(false);
      toast({
        title: "Success",
        description: mode === 'improve' ? "Code improved successfully" : "Code generated successfully",
      });
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setCurrentAction(null);
    }
  };

  const getFileExtension = (code: string): 'html' | 'css' | 'js' => {
    if (code.includes('<!DOCTYPE html>') || code.includes('<html>')) {
      return 'html';
    } else if (code.includes('{') && code.includes('}') && !code.includes('function')) {
      return 'css';
    }
    return 'js';
  };

  const handleLoginRedirect = () => {
    const currentPath = window.location.pathname
    window.location.href = `http://localhost:3000/login?callbackUrl=${encodeURIComponent(currentPath)}`
  }

  const handleSignupRedirect = () => {
    window.location.href = "http://localhost:3000/signup"
  }

  const handleFolderSelect = (folderPath: string) => {
    setCurrentFolder(folderPath)
  }

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const element = document.documentElement
        await element.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle fullscreen mode",
        variant: "destructive",
      })
    }
  }

  const handleShareViaQR = () => {
    setShareDialogOpen(true);
    setShareTab('qr');
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-200",
      isFullscreen ? "bg-zinc-900" : "bg-gradient-to-br from-[#3B4371] to-[#F3904F] p-2 sm:p-6"
    )}>
      <div className={cn(
        "container mx-auto",
        isFullscreen && "h-screen p-0"
      )}>
        <div className={cn(
          "mb-4 text-center",
          isFullscreen && "hidden"
        )}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Syntax Studio Web Playground</h1>
          <p className="text-sm sm:text-base text-white/80 mt-2">
            Experience our interactive web development environment with live preview
          </p>
          {!session && (
            <div className="text-xs sm:text-sm text-white/80 mt-2">
              <p>
                You have {remainingUses} free uses left.{" "}
                <button
                  onClick={handleLoginRedirect}
                  className="underline hover:text-white"
                >
                  Log in
                </button>{" "}
                for unlimited access.
              </p>
            </div>
          )}
        </div>
        <div className={cn(
          "rounded-lg border bg-card/95 backdrop-blur-sm text-card-foreground shadow-sm",
          isFullscreen && "rounded-none h-screen"
        )}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border-b gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-semibold">Web Playground</h2>
              <span className="hidden sm:inline text-sm text-muted-foreground">Build and preview web projects</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="hidden sm:flex items-center gap-2">
                <ThemeDropdown 
                  theme={theme} 
                  onThemeChange={handleThemeChange}
                  variant="default"
                />
                <Button 
                  variant="outline" 
                  size="default" 
                  onClick={() => setShareDialogOpen(true)}
                  className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="default" 
                  onClick={() => setShowTemplates(true)}
                  className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Templates
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowNewFileDialog(true)}
                >
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
                  onClick={() => setShowAiDialog(true)}
                  disabled={currentAction !== null}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  AI Generate
                </Button>
              </div>
              
              {/* Mobile Menu */}
              <div className="sm:hidden flex items-center gap-2 w-full">
                <ThemeDropdown 
                  theme={theme} 
                  onThemeChange={handleThemeChange}
                  variant="minimal"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Menu className="h-4 w-4 mr-2" />
                      Menu
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowTemplates(true)}>
                      <Layout className="mr-2 h-4 w-4" />
                      Templates
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowNewFileDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New File
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowAiDialog(true)}>
                      <Wand2 className="mr-2 h-4 w-4" />
                      AI Generate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <ResizablePanelGroup 
            direction={windowWidth > 640 ? "horizontal" : "vertical"}
            className={cn(
              "min-h-[calc(100vh-16rem)] sm:min-h-[calc(100vh-12rem)]",
              isFullscreen && "h-[calc(100vh-3rem)]"
            )}
          >
            <ResizablePanel 
              defaultSize={15} 
              minSize={windowWidth > 640 ? 10 : 20} 
              maxSize={windowWidth > 640 ? 30 : 40}
              className="min-h-[200px]"
            >
              <div className="h-full border-r sm:border-b-0">
                <FileExplorer
                  files={files}
                  activeFile={activeFile}
                  onFileSelect={setActiveFile}
                  onFileDelete={handleDeleteFile}
                  onDeleteFolder={handleDeleteFolder}
                  folders={folders}
                  onFolderSelect={handleFolderSelect}
                  currentFolder={currentFolder}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle>
              <GripVertical className="h-4 w-4" />
            </ResizableHandle>
            <ResizablePanel 
              defaultSize={windowWidth > 640 ? 85 : 60}
              className="min-h-[300px]"
            >
              <div className="h-full">
                <div className="h-full flex flex-col">
                  <div className="flex-1 p-2 sm:p-4">
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
            <ResizablePanel 
              defaultSize={40}
              className="min-h-[300px]"
            >
              <div className="h-full">
                <div className="flex items-center justify-between p-2 sm:p-3 border-b">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={handleBrowserPreview}
                      className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Browser
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={toggleFullscreen}
                      disabled={currentAction !== null}
                      className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                    >
                      {isFullscreen ? (
                        <>
                          <Minimize2 className="h-4 w-4 mr-2" />
                          Exit Fullscreen
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Fullscreen
                        </>
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline"
                          size="default"
                          className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                        >
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
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        previewRef.current?.updatePreview();
                      }}
                      className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
                <div className="p-2 sm:p-4 h-[calc(100%-4rem)]">
                  <div className="rounded-lg border overflow-hidden h-full bg-background">
                    <Preview
                      files={files}
                      previewFile={previewFile}
                      width="100%"
                      ref={previewRef}
                    />
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
        <DialogContent className="sm:max-w-md">
          <div className="absolute right-4 top-4">
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <DialogHeader>
            <DialogTitle>Create New File or Folder</DialogTitle>
            <DialogDescription>
              {currentFolder ? `Creating in folder: ${currentFolder}` : 'Creating in root'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="allowRoot">Allow Root Creation</Label>
                <Button
                  variant={allowRootCreation ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setAllowRootCreation(!allowRootCreation)}
                  className="relative"
                >
                  {allowRootCreation ? "Enabled" : "Disabled"}
                </Button>
              </div>
              {!allowRootCreation && !currentFolder && (
                <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                  Please select a folder first. Creation in root directory is disabled.
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-1">
              <Button
                variant={!isFolder ? "default" : "ghost"}
                className={cn(
                  "flex-1",
                  !isFolder ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                onClick={() => setIsFolder(false)}
              >
                File
              </Button>
              <Button
                variant={isFolder ? "default" : "ghost"}
                className={cn(
                  "flex-1",
                  isFolder ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                onClick={() => setIsFolder(true)}
              >
                Folder
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">
                {isFolder ? "Enter folder name" : "Enter file name"}
              </Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
                placeholder={isFolder ? "my-folder" : "my-file"}
              />
              {!isFolder && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="extension">Extension</Label>
                  <Select
                    value={fileExtension}
                    onValueChange={setFileExtension}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILE_EXTENSIONS.map(ext => (
                        <SelectItem key={ext.value} value={ext.value}>
                          {ext.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreateNewItem} 
              variant="default" 
              size="default" 
              className="w-full"
              disabled={!allowRootCreation && !currentFolder}
            >
              {isFolder ? (
                <>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Create Folder
                </>
              ) : (
                <>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Create File
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AIGenerationDialog
        isOpen={showAiDialog}
        onClose={() => setShowAiDialog(false)}
        onGenerate={handleAiGenerate}
        currentCode={files[activeFile]}
        isLoading={isGenerating}
      />

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

      <footer className={cn(
        "mt-8 border-t border-white/10 pt-8",
        isFullscreen && "hidden"
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              2025 Syntax Studio. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a className="text-sm text-white/70 hover:text-white" href="/privacy">
                Privacy Policy
              </a>
              <a className="text-sm text-white/70 hover:text-white" href="/terms">
                Terms of Service
              </a>
              <a className="text-sm text-white/70 hover:text-white" href="/contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
