"use client"

import { useState } from "react"
import { QrCode, Share2, Download, Link as LinkIcon, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { QRCodeSVG } from "qrcode.react"
import { Spinner } from "@/components/ui/spinner"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  code: string
  language: {
    name: string
    value: string
  }
  onCopy: () => Promise<void>
  onDownload: () => Promise<void>
  isProcessing: boolean
}

export function ShareDialog({ 
  open, 
  onOpenChange, 
  code, 
  language,
  onCopy,
  onDownload,
  isProcessing 
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = async () => {
    try {
      await onCopy()
      setCopied(true)
      toast({
        title: "Link Copied",
        description: "Share link has been copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Share Code</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Share your code via link, QR code, or download as a zip file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Share Link</h4>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                disabled={isProcessing}
                className="shrink-0 text-white hover:text-black"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">QR Code</h4>
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCodeSVG value={shareUrl} size={200} />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={onDownload}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Spinner className="mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download ZIP
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
