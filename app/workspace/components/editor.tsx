"use client"

import * as React from "react"
import Editor, { Monaco } from "@monaco-editor/react"
import { ThemeId } from "@/lib/themes"
import { defineTheme } from "@/app/lib/defineTheme"

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  theme: ThemeId
}

export function CodeEditor({ value, onChange, theme }: CodeEditorProps) {
  // Detect language from content
  const detectLanguage = React.useCallback((code: string) => {
    if (code.includes('def ') || code.includes('print(') || code.startsWith('#')) {
      return 'python'
    }
    return 'javascript'
  }, [])

  const language = React.useMemo(() => detectLanguage(value), [value, detectLanguage])

  const handleEditorWillMount = (monaco: Monaco) => {
    // Configure Python language
    monaco.languages.register({ id: 'python' })
    monaco.languages.setMonarchTokensProvider('python', {
      tokenizer: {
        root: [
          [/#.*/, 'comment'],
          [/"""[\s\S]*?"""|'''[\s\S]*?'''/, 'comment'],  // Multi-line strings/comments
          [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'string'],
          [/[0-9]+(\.[0-9]+)?/, 'number'],
          [/\b(def|class|if|else|elif|for|while|try|except|import|from|as|return|break|continue|pass|raise|with|in|is|not|and|or|True|False|None)\b/, 'keyword'],
          [/[a-zA-Z_]\w*(?=\s*\()/, 'function'],
        ]
      }
    })
  }

  // Handle theme changes
  React.useEffect(() => {
    if (theme) {
      defineTheme(theme)
    }
  }, [theme])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="70vh"
        width="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        beforeMount={handleEditorWillMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          wrappingStrategy: "advanced",
        }}
      />
    </div>
  )
}
