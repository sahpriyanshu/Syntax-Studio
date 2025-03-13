"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ThemeDropdownProps {
  theme: string
  onThemeChange: (theme: string) => void
  variant?: "default" | "minimal"
}

export function ThemeDropdown({ theme, onThemeChange, variant = "default" }: ThemeDropdownProps) {
  const themes = [
    { value: "vs-dark", label: "Dark", icon: Moon },
    { value: "light", label: "Light", icon: Sun },
  ]

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const Icon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`bg-zinc-800 hover:bg-zinc-700 text-white border-none ${
            variant === "minimal" ? "sm:w-auto w-8 h-8 p-0 sm:p-3 sm:h-9" : ""
          }`}
          title="Theme"
        >
          <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${variant === "default" ? "sm:mr-2" : ""}`} />
          {variant === "default" && <span>Theme</span>}
          {variant === "minimal" && <span className="hidden sm:inline">Theme</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-800 text-white border-zinc-700">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => onThemeChange(item.value)}
            className={`flex items-center gap-2 ${
              theme === item.value ? "bg-zinc-700" : ""
            } hover:bg-zinc-700`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
