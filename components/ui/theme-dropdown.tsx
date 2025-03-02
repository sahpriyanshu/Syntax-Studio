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
            "flex h-9 items-center gap-1.5 px-3 text-sm transition-colors",
            variant === "default" 
              ? "bg-black/20 hover:bg-black/30 border border-white/20 hover:border-white/30 text-white"
              : "hover:bg-black/20",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          )}
        >
          <span>{currentTheme?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] max-h-[300px] overflow-y-auto bg-black/20 backdrop-blur-sm border border-white/20 text-white"
      >
        <div className="py-2">
          <div className="px-2 pb-2 text-xs font-medium text-white uppercase">
            Dark Themes
          </div>
          {editorThemes.dark.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-white",
                "hover:bg-black/30 hover:border-white/30",
                theme === item.id && "bg-black/30"
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
        <div className="py-2 border-t border-white/20">
          <div className="px-2 pb-2 text-xs font-medium text-white uppercase">
            Light Themes
          </div>
          {editorThemes.light.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-white",
                "hover:bg-black/30 hover:border-white/30",
                theme === item.id && "bg-black/30"
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
