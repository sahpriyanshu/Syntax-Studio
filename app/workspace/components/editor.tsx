"use client"

import * as React from "react"
import Editor from "@monaco-editor/react"
import { ThemeId } from "@/lib/themes"
import { defineTheme } from "@/app/lib/defineTheme"

interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
  language: string
  theme: ThemeId
}

export function CodeEditor({ code, onChange, language, theme }: CodeEditorProps) {
  // Handle theme changes
  React.useEffect(() => {
    if (theme) {
      defineTheme(theme)
    }
  }, [theme])

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "")
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          automaticLayout: true,
        }}
      />
    </div>
  )
}
