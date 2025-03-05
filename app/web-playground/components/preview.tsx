"use client"

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { RefreshCw } from "lucide-react"

interface PreviewProps {
  files: Record<string, string>
  previewFile: string
  width?: string
}

interface PreviewRef {
  updatePreview: () => void
}

export const Preview = forwardRef<PreviewRef, PreviewProps>(({ files, previewFile, width = "100%" }: PreviewProps, ref) => {
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

      // Check if CSS and JS are linked
      const hasCssLink = /<link[^>]*href=["']styles\.css["'][^>]*>/i.test(htmlContent)
      const hasJsScript = /<script[^>]*src=["']script\.js["'][^>]*>/i.test(htmlContent)

      // Process HTML to remove existing CSS and JS links/scripts
      let processedHtml = htmlContent
        .replace(/<link[^>]*href=["']styles\.css["'][^>]*>/gi, '')
        .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, '')

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
                background: white;
              }
              
              /* Only inject CSS if it's linked */
              ${hasCssLink ? cssContent : ''}
            </style>
          </head>
          <body>
            ${processedHtml}
            <script>
              // Error handling wrapper
              window.onerror = function(msg, url, line, col, error) {
                window.parent.postMessage({
                  type: 'error',
                  message: \`\${msg} (line \${line})\`
                }, '*');
                return false;
              };

              // Only inject JS if it's linked
              ${hasJsScript ? `
                try {
                  ${jsContent}
                } catch (error) {
                  console.error('Error:', error.message);
                  window.parent.postMessage({
                    type: 'error',
                    message: 'JavaScript Error: ' + error.message
                  }, '*');
                }
              ` : ''}
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
    const timeoutId = setTimeout(updatePreview, 100)
    return () => clearTimeout(timeoutId)
  }, [files, previewFile, updatePreview])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'error') {
        setError(event.data.message)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Expose updatePreview to parent through ref
  useImperativeHandle(ref, () => ({
    updatePreview
  }))

  return (
    <div className="h-full flex flex-col">
      {error && (
        <div className="p-2 text-sm text-red-500 bg-red-50 border-b">
          {error}
        </div>
      )}
      <div 
        className="relative h-full overflow-hidden rounded-lg border bg-white"
        style={{ width }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <Spinner className="h-6 w-6" />
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
})

Preview.displayName = "Preview"
