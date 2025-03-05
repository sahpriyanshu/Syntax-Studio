"use client"

import { FolderIcon, ChevronRight, ChevronDown, FileIcon, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface FileExplorerProps {
  files: Record<string, string>
  folders: Record<string, string[]>
  activeFile: string
  currentFolder: string
  onFileSelect: (filename: string) => void
  onFolderSelect: (folderPath: string) => void
  onFileDelete: (filename: string) => void
  onDeleteFolder: (folderPath: string) => void
}

export function FileExplorer({
  files,
  folders,
  activeFile,
  currentFolder,
  onFileSelect,
  onFolderSelect,
  onFileDelete,
  onDeleteFolder,
}: FileExplorerProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: 'file' | 'folder', path: string } | null>(null)

  const handleFileClick = (fileName: string) => {
    onFileSelect(fileName)
  }

  const handleFolderClick = (folderPath: string) => {
    onFolderSelect(folderPath)
  }

  const handleDeleteClick = (type: 'file' | 'folder', path: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Check if it's index.html by looking at the file name, not the full path
    const fileName = path.split('/').pop() || ''
    if (type === 'file' && fileName === 'index.html') {
      toast({
        title: "Cannot Delete File",
        description: "The index.html file cannot be deleted as it is required for the application.",
        variant: "destructive",
      })
      return
    }
    
    setItemToDelete({ type, path })
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'file') {
        onFileDelete(itemToDelete.path)
      } else if (itemToDelete.type === 'folder') {
        onDeleteFolder(itemToDelete.path)
      }
    }
    setDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  const renderDeleteButton = (type: 'file' | 'folder', path: string) => {
    const fileName = path.split('/').pop() || ''
    const isIndexHtml = type === 'file' && fileName === 'index.html'
    
    return (
      <button
        type="button"
        className={cn(
          "flex items-center justify-center ml-2 p-1 rounded",
          isIndexHtml 
            ? "cursor-not-allowed opacity-50" 
            : "text-red-400 hover:text-red-500 hover:bg-red-500/20"
        )}
        onClick={(e) => {
          e.stopPropagation()
          if (!isIndexHtml) {
            handleDeleteClick(type, path, e)
          }
        }}
        disabled={isIndexHtml}
        title={isIndexHtml ? "Cannot delete index.html" : `Delete ${type}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    )
  }

  const renderFolder = (folderPath: string, level = 0) => {
    const isOpen = currentFolder.startsWith(folderPath)
    const folderFiles = folders[folderPath] || []
    const subFolders = Object.keys(folders).filter(f => f.startsWith(`${folderPath}/`) && f.split('/').length === folderPath.split('/').length + 1)

    return (
      <div key={folderPath} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-accent/50",
            currentFolder === folderPath && "bg-accent text-accent-foreground"
          )}
          onClick={() => handleFolderClick(folderPath)}
          style={{ paddingLeft: `${(level + 1) * 12}px` }}
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <FolderIcon className="h-4 w-4" />
          <span className="flex-1 truncate">{folderPath.split('/').pop()}</span>
          {folderPath !== "" && onDeleteFolder && renderDeleteButton('folder', folderPath)}
        </div>
        {isOpen && (
          <div className="ml-2">
            {subFolders.map(subFolder => renderFolder(subFolder, level + 1))}
            {folderFiles.map(fileName => {
              const fullPath = `${folderPath}/${fileName}`
              return (
                <div
                  key={fullPath}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-accent/50",
                    activeFile === fullPath && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleFileClick(fullPath)}
                  style={{ paddingLeft: `${(level + 2) * 12}px` }}
                >
                  <FileIcon className="h-4 w-4" />
                  <span className="flex-1 truncate">{fileName}</span>
                  {onFileDelete && renderDeleteButton('file', fullPath)}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Get root level files and folders
  const rootFiles = Object.keys(files).filter(f => !f.includes('/'))
  const rootFolders = Object.keys(folders).filter(f => !f.includes('/'))

  return (
    <div className="h-full border-r bg-background p-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium">Files</h2>
      </div>
      <div className="space-y-1">
        {/* Root files */}
        {rootFiles.map(fileName => (
          <div
            key={fileName}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-accent/50",
              activeFile === fileName && "bg-accent text-accent-foreground"
            )}
            onClick={() => handleFileClick(fileName)}
          >
            <FileIcon className="h-4 w-4" />
            <span className="flex-1 truncate">{fileName}</span>
            {onFileDelete && renderDeleteButton('file', fileName)}
          </div>
        ))}
        {/* Root folders and their contents */}
        {rootFolders.map(folder => renderFolder(folder))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {itemToDelete?.type === 'folder' ? 'Folder' : 'File'}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {itemToDelete?.type === 'folder' ? 'folder' : 'file'} "{itemToDelete?.path}"?
              {itemToDelete?.type === 'folder' && " This will also delete all files inside the folder."}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
