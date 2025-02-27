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
      variant="default" 
      size="default" 
      onClick={onClick}
      className="bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] px-3 py-1.5 h-8 text-sm font-normal rounded-sm"
    >
      <Share2 className="h-4 w-4 mr-2 opacity-70" />
      Share
    </Button>
  )
}
