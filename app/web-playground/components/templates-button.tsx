"use client"

import * as React from "react"
import { FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TemplatesButtonProps {
  onClick?: () => void
}

export function TemplatesButton({ onClick }: TemplatesButtonProps) {
  return (
    <Button 
      variant="outline"
      size="default" 
      onClick={onClick}
      className="bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-none"
    >
      <FileCode className="h-4 w-4 mr-2" />
      Templates
    </Button>
  )
}
