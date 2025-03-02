"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { languages, LanguageId } from "@/lib/languages"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LanguageDropdownProps {
  language: LanguageId
  onLanguageChange: (language: LanguageId) => void
  variant?: "default" | "minimal"
}

export function LanguageDropdown({ 
  language, 
  onLanguageChange, 
  variant = "default" 
}: LanguageDropdownProps) {
  const currentLanguage = languages.find((l) => l.id === language)

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
          <span className="text-white/80">
            {currentLanguage?.name} ({currentLanguage?.version})
          </span>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] max-h-[300px] overflow-y-auto bg-[#1C1C1C] border-white/10 text-white"
      >
        <div className="py-2">
          {languages.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-white/80 focus:text-white",
                "hover:bg-white/5 focus:bg-white/5",
                language === item.id && "bg-white/5"
              )}
              onClick={() => onLanguageChange(item.id)}
            >
              <Check
                className={cn(
                  "h-4 w-4",
                  language === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="flex-1">
                {item.name} ({item.version})
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
