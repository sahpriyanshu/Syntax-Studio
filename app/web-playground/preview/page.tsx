"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const blobUrlsRef = useRef<string[]>([])

  useEffect(() => {
    // Cleanup function to revoke old blob URLs
    const cleanup = () => {
      blobUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
      blobUrlsRef.current = []
    }

    const updatePreview = () => {
      const filesParam = searchParams.get("files")
      if (!filesParam) {
        setError("No files provided")
        setLoading(false)
        return
      }

      try {
        cleanup() // Clean up old blob URLs
        const files = JSON.parse(decodeURIComponent(filesParam))
        
        // Find main HTML file
        const htmlFiles = Object.entries(files).filter(([name]) => name.endsWith(".html"))
        const mainFile = htmlFiles.find(([name]) => name === "index.html") || htmlFiles[0]
        
        if (!mainFile) {
          setError("No HTML file found")
          setLoading(false)
          return
        }

        const [fileName, htmlContent] = mainFile

        // Create blob URLs for all resources
        const resourceMap = new Map()
        Object.entries(files).forEach(([name, content]) => {
          const type = name.endsWith(".css") ? "text/css" 
                    : name.endsWith(".js") ? "text/javascript"
                    : "text/html"
          const blob = new Blob([content as string], { type })
          const url = URL.createObjectURL(blob)
          blobUrlsRef.current.push(url) // Store for cleanup
          resourceMap.set(name, url)
        })

        // Replace all resource references in HTML
        let modifiedHtml = htmlContent as string
        resourceMap.forEach((url, name) => {
          modifiedHtml = modifiedHtml.replace(
            new RegExp(`(src|href)=["']?${name}["']?`, "g"),
            `$1="${url}"`
          )
        })

        // Update iframe content
        if (iframeRef.current) {
          const iframe = iframeRef.current
          iframe.srcdoc = modifiedHtml
          
          // Wait for iframe to load and initialize scripts
          iframe.onload = () => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (iframeDoc) {
              // Ensure all scripts are executed
              const scripts = iframeDoc.getElementsByTagName('script')
              Array.from(scripts).forEach(script => {
                const newScript = iframeDoc.createElement('script')
                Array.from(script.attributes).forEach(attr => {
                  newScript.setAttribute(attr.name, attr.value)
                })
                newScript.textContent = script.textContent
                script.parentNode?.replaceChild(newScript, script)
              })
            }
          }
        }
      } catch (err) {
        console.error("Error setting up preview:", err)
        setError("Failed to load preview")
      } finally {
        setLoading(false)
      }
    }

    updatePreview()
    return cleanup
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-screen border-0"
      sandbox="allow-scripts allow-same-origin allow-modals"
    />
  )
}
