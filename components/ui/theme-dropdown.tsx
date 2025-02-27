"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { editorThemes, ThemeId } from "@/lib/themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ThemeDropdownProps {
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  variant?: "default" | "minimal"
}

export function ThemeDropdown({ theme, onThemeChange, variant = "default" }: ThemeDropdownProps) {
  const allThemes = [...editorThemes.dark, ...editorThemes.light]
  const currentTheme = allThemes.find((t) => t.id === theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-md px-3 text-sm transition-colors",
            variant === "default" 
              ? "bg-white/5 hover:bg-white/10 border border-white/10"
              : "hover:bg-white/5",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          )}
        >
          <span className="text-white/80">{currentTheme?.name}</span>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] bg-[#1C1C1C] border-white/10 text-white"
      >
        <div className="py-2">
          <div className="px-2 pb-2 text-xs font-medium text-white/40 uppercase">
            Dark Themes
          </div>
          {editorThemes.dark.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-white/80 focus:text-white",
                "hover:bg-white/5 focus:bg-white/5",
                theme === item.id && "bg-white/5"
              )}
              onClick={() => onThemeChange(item.id)}
            >
              <Check
                className={cn(
                  "h-4 w-4",
                  theme === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="flex-1">{item.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
        <div className="py-2 border-t border-white/10">
          <div className="px-2 pb-2 text-xs font-medium text-white/40 uppercase">
            Light Themes
          </div>
          {editorThemes.light.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-white/80 focus:text-white",
                "hover:bg-white/5 focus:bg-white/5",
                theme === item.id && "bg-white/5"
              )}
              onClick={() => onThemeChange(item.id)}
            >
              <Check
                className={cn(
                  "h-4 w-4",
                  theme === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="flex-1">{item.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
