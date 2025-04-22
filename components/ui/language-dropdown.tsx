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
  className?: string
  caretIcon?: React.ReactNode
}


export function LanguageDropdown({ 
  language, 
  onLanguageChange, 
  variant = "default", 
  className = "", 
  caretIcon 
}: LanguageDropdownProps & { className?: string, caretIcon?: React.ReactNode }) {
  const currentLanguage = languages.find((l) => l.id === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 h-10 px-4 rounded-md bg-zinc-900 border border-zinc-800 text-white text-sm font-medium hover:bg-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors duration-200",
            className
          )}
          type="button"
        >
          {currentLanguage ? (
            <>
              <span className="text-white/80">
                {currentLanguage.name} ({currentLanguage.version})
              </span>
              {caretIcon}
            </>
          ) : null}
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
