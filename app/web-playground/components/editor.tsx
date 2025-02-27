"use client"

import * as React from "react"
import Editor, { Monaco } from "@monaco-editor/react"
import { ThemeId } from "@/lib/themes"

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  theme: ThemeId
  language?: string
}

export function CodeEditor({ value, onChange, theme, language = "javascript" }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: Monaco) => {
    // Define themes
    monaco.editor.defineTheme('dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272A4' },
        { token: 'string', foreground: 'F1FA8C' },
        { token: 'keyword', foreground: 'FF79C6' },
        { token: 'number', foreground: 'BD93F9' },
        { token: 'operator', foreground: 'FF79C6' },
      ],
      colors: {
        'editor.background': '#282A36',
        'editor.foreground': '#F8F8F2',
        'editor.lineHighlightBackground': '#44475A',
        'editor.selectionBackground': '#44475A',
        'editor.inactiveSelectionBackground': '#44475A70',
      }
    })

    monaco.editor.defineTheme('monokai', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '75715E' },
        { token: 'string', foreground: 'E6DB74' },
        { token: 'keyword', foreground: 'F92672' },
        { token: 'number', foreground: 'AE81FF' },
        { token: 'operator', foreground: 'F92672' },
      ],
      colors: {
        'editor.background': '#272822',
        'editor.foreground': '#F8F8F2',
        'editor.lineHighlightBackground': '#3E3D32',
        'editor.selectionBackground': '#49483E',
      }
    })

    monaco.editor.defineTheme('material-darker', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '546E7A' },
        { token: 'string', foreground: 'C3E88D' },
        { token: 'keyword', foreground: '89DDFF' },
        { token: 'number', foreground: 'F78C6C' },
      ],
      colors: {
        'editor.background': '#212121',
        'editor.foreground': '#EEFFFF',
        'editor.lineHighlightBackground': '#000000',
        'editor.selectionBackground': '#404040',
      }
    })

    monaco.editor.defineTheme('night-owl', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '637777' },
        { token: 'string', foreground: 'ECC48D' },
        { token: 'keyword', foreground: 'C792EA' },
        { token: 'number', foreground: 'F78C6C' },
      ],
      colors: {
        'editor.background': '#011627',
        'editor.foreground': '#D6DEEB',
        'editor.lineHighlightBackground': '#0003',
        'editor.selectionBackground': '#1D3B53',
      }
    })

    monaco.editor.defineTheme('aura', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '636D83' },
        { token: 'string', foreground: 'BBE67E' },
        { token: 'keyword', foreground: 'FF7B72' },
        { token: 'number', foreground: 'D4BFFF' },
      ],
      colors: {
        'editor.background': '#21202E',
        'editor.foreground': '#E1E1E6',
        'editor.lineHighlightBackground': '#2D2C3D',
        'editor.selectionBackground': '#3B334B',
      }
    })

    monaco.editor.defineTheme('solarized-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '657B83' },
        { token: 'string', foreground: '2AA198' },
        { token: 'keyword', foreground: '859900' },
        { token: 'number', foreground: 'D33682' },
      ],
      colors: {
        'editor.background': '#002B36',
        'editor.foreground': '#839496',
        'editor.lineHighlightBackground': '#073642',
        'editor.selectionBackground': '#073642',
      }
    })

    monaco.editor.defineTheme('solarized-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '93A1A1' },
        { token: 'string', foreground: '2AA198' },
        { token: 'keyword', foreground: '859900' },
        { token: 'number', foreground: 'D33682' },
      ],
      colors: {
        'editor.background': '#FDF6E3',
        'editor.foreground': '#657B83',
        'editor.lineHighlightBackground': '#EEE8D5',
        'editor.selectionBackground': '#EEE8D5',
      }
    })

    monaco.editor.defineTheme('quiet-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '998A7D' },
        { token: 'string', foreground: '448C27' },
        { token: 'keyword', foreground: '4B69C6' },
        { token: 'number', foreground: 'AB6526' },
      ],
      colors: {
        'editor.background': '#F5F5F5',
        'editor.foreground': '#333333',
        'editor.lineHighlightBackground': '#E4F6D4',
        'editor.selectionBackground': '#C9D0D9',
      }
    })
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
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
      }}
    />
  )
}
