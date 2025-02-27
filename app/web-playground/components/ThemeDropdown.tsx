"use client"

import * as React from "react"
import { Check, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ThemeDropdownProps {
  value: string
  onValueChange: (value: string) => void
}

const themes = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "hc-black", label: "High Contrast" },
]

export function ThemeDropdown({ value, onValueChange }: ThemeDropdownProps) {
  const activeTheme = themes.find((theme) => theme.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          size="default"
          className="bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] px-3 py-1.5 h-8 text-sm font-normal rounded-sm"
        >
          <div className="flex items-center">
            <Monitor className="mr-2 h-4 w-4" />
            {activeTheme?.label || "Theme"}
          </div>
          <span className="ml-2 opacity-70">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-[#1e1e1e] border-0 text-[#ffffff] rounded-sm min-w-[160px] mt-1 p-1"
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => onValueChange(theme.value)}
            className="flex items-center justify-between hover:bg-[#2d2d2d] px-2 py-1 rounded-none text-sm"
          >
            {theme.label}
            {theme.value === value && <Check className="ml-2 h-4 w-4 opacity-70" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
