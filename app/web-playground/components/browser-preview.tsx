"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"

interface BrowserPreviewProps {
  files: Record<string, string>
  previewFile: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BrowserPreview({
  files,
  previewFile,
  open,
  onOpenChange,
}: BrowserPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Update preview content when dialog opens or files change while dialog is open
  useEffect(() => {
    if (!open) return;

    // Revoke old URL if it exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    try {
      // Create HTML content with current files
      const htmlContent = files[previewFile];
      const cssContent = files["styles.css"] || "";
      const jsContent = files["script.js"] || "";

      // Check if CSS and JS are linked
      const hasCssLink = /<link[^>]*href=["']styles\.css["'][^>]*>/i.test(htmlContent);
      const hasJsScript = /<script[^>]*src=["']script\.js["'][^>]*>/i.test(htmlContent);

      // Process HTML to remove existing CSS and JS links/scripts
      let processedHtml = htmlContent
        .replace(/<link[^>]*href=["']styles\.css["'][^>]*>/gi, '')
        .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, '');

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
            ${processedHtml}
            <script>
              // Error handling wrapper
              window.onerror = function(msg, url, line, col, error) {
                console.error(\`Error: \${msg} (line \${line})\`);
                return false;
              };

              // Only inject JS if it's linked
              ${hasJsScript ? `
                try {
                  ${jsContent}
                } catch (error) {
                  console.error('Error:', error.message);
                }
              ` : ''}
            </script>
          </body>
        </html>
      `;

      // Create new blob and URL
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setError(null);

      // Update iframe source
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [files, previewFile, open]);

  // Cleanup on unmount or when dialog closes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Browser Preview</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (previewUrl) {
                  window.open(previewUrl, '_blank');
                }
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
          {error && (
            <div className="p-2 text-sm text-red-500 bg-red-50 border rounded mb-2">
              {error}
            </div>
          )}
          <div className="flex-1 rounded-lg border overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin"
              title="browser-preview"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
