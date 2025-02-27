import { NextResponse } from "next/server"
import JSZip from "jszip"

export async function POST(req: Request) {
  try {
    const { code, language, fileName } = await req.json()
    const zip = new JSZip()

    // Add the code file
    const extension = getFileExtension(language)
    zip.file(`${fileName}.${extension}`, code)

    // Add README
    const readme = generateReadme(fileName, language)
    zip.file("README.md", readme)

    // Generate zip
    const content = await zip.generateAsync({ type: "uint8array" })

    return new Response(content, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}.zip"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to export code" }, { status: 500 })
  }
}

function getFileExtension(language: string): string {
  const extensions: { [key: string]: string } = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    cpp: "cpp",
    ruby: "rb",
    go: "go",
    rust: "rs",
    php: "php",
  }
  return extensions[language] || "txt"
}

function generateReadme(fileName: string, language: string): string {
  return `# ${fileName}

This code was exported from Syntax Studio.

## Language
${language}

## Usage
1. Extract the files from the zip archive
2. Open the code file in your preferred IDE
3. Follow the language-specific instructions to run the code

## Generated
${new Date().toISOString()}
`
}

