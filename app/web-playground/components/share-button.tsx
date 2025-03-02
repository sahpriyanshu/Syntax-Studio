"use client"

import * as React from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonProps {
  onClick?: () => void
}

export function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <Button 
      variant="outline"
      size="default" 
      onClick={onClick}
      className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  )
}
