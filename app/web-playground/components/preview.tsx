"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface PreviewProps {
  files: Record<string, string>
  previewFile: string
  mode: "desktop" | "mobile"
  width?: string
}

export function Preview({ files, previewFile, mode, width = "100%" }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      const htmlContent = files[previewFile]
      const cssContent = files["styles.css"] || ""
      const jsContent = files["script.js"] || ""

      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              /* Reset default styles */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              /* Base styles */
              body {
                min-height: 100vh;
                font-family: system-ui, -apple-system, sans-serif;
              }
              
              /* Inject user CSS */
              ${cssContent}
            </style>
          </head>
          <body>
            ${htmlContent}
            <script>
              // Error handling
              window.onerror = function(msg, url, line, col, error) {
                window.parent.postMessage({
                  type: 'error',
                  message: \`\${msg} (line \${line})\`
                }, '*');
                return false;
              };

              // User JavaScript
              try {
                ${jsContent}
              } catch (error) {
                console.error('Error:', error.message);
              }
            </script>
          </body>
        </html>
      `

      const iframe = iframeRef.current
      iframe.srcdoc = content

      iframe.onload = () => {
        setIsLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }, [files, previewFile])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updatePreview();
    }, 100); // Small delay to ensure template files are loaded

    return () => clearTimeout(timeoutId);
  }, [files, previewFile, updatePreview]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="h-full bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Preview</h3>
        <Button variant="ghost" size="sm" onClick={updatePreview}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div
        className={cn(
          "relative h-[calc(100%-3rem)] overflow-hidden rounded-lg border bg-white",
          mode === "mobile" && "max-w-[375px] mx-auto"
        )}
        style={{ width: mode === "mobile" ? "375px" : width }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <Spinner />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
              {error}
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="h-full w-full"
          sandbox="allow-scripts allow-same-origin"
          title="preview"
        />
      </div>
    </div>
  )
}
