"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCode } from "@/components/ui/qr-code"
import { X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  onDownload: () => void
}

type Tab = "link" | "qr" | "download"

export function ShareDialog({ open, onOpenChange, url, onDownload }: ShareDialogProps) {
  const [activeTab, setActiveTab] = React.useState<Tab>("link")
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#2C2C2C] text-white sm:max-w-[425px] p-6" closeButton={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Share Code</h2>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-transparent -mr-2"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-zinc-400 text-sm">
            Share your code with others using any of these methods
          </p>
        </div>

        <div className="flex overflow-hidden rounded-md bg-[#2C2C2C] p-1 mt-4">
          {(["link", "qr", "download"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors",
                activeTab === tab
                  ? "bg-black text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "link" && (
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={url}
                className="flex-1 h-9 bg-[#2C2C2C] border-0 text-sm text-zinc-200"
              />
              <Button
                size="sm"
                onClick={handleCopy}
                className="h-9 px-4 bg-white hover:bg-zinc-100 text-black font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}

          {activeTab === "qr" && (
            <div className="flex justify-center">
              <QRCode value={url} size={200} />
            </div>
          )}

          {activeTab === "download" && (
            <Button
              className="w-full h-10 bg-white hover:bg-zinc-100 text-black font-medium"
              onClick={onDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Code
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
