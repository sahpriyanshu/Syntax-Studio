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
      variant="default" 
      size="default" 
      onClick={onClick}
      className="bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] px-3 py-1.5 h-8 text-sm font-normal rounded-sm"
    >
      <FileCode className="h-4 w-4 mr-2 opacity-70" />
      Templates
    </Button>
  )
}
