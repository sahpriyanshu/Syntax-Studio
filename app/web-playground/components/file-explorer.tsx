"use client"

import { File, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileExplorerProps {
  files: Record<string, string>
  activeFile: string
  onFileSelect: (filename: string) => void
  onFileDelete?: (filename: string) => void
}

export function FileExplorer({ files, activeFile, onFileSelect, onFileDelete }: FileExplorerProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium mb-2">Files</h3>
      <div className="space-y-1">
        {Object.keys(files).map((filename) => (
          <div
            key={filename}
            className={cn(
              "group flex items-center justify-between rounded-md px-2 py-1 hover:bg-accent",
              activeFile === filename && "bg-accent",
            )}
          >
            <button
              className="text-sm flex-1 text-left"
              onClick={() => onFileSelect(filename)}
            >
              <File className="h-4 w-4 mr-2" />
              {filename}
            </button>
            {onFileDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onFileDelete(filename)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
