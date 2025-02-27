"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeDropdown } from "@/components/ui/theme-dropdown"
import { CodeEditor } from "./components/editor"
import { ThemeId } from "@/lib/themes"

export default function WorkspacePage() {
  const router = useRouter()
  const [theme, setTheme] = useState<ThemeId>("vs-dark")
  const [code, setCode] = useState("")

  const handleSave = () => {
    // Add save functionality here
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Code Workspace</h2>
          <span className="text-sm text-muted-foreground">Edit and analyze code</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeDropdown 
            theme={theme} 
            onThemeChange={setTheme}
            variant="default"
          />
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <CodeEditor
          value={code}
          onChange={setCode}
          theme={theme}
        />
      </div>
    </div>
  )
}
