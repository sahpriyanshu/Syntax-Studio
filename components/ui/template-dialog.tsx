"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Layout } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Template {
  name: string
  description: string
  files: Record<string, string>
  icon?: React.ReactNode
}

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: Template[]
  onSelect: (template: Template) => void
}

export function TemplateDialog({ 
  open, 
  onOpenChange, 
  templates,
  onSelect 
}: TemplateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#2C2C2C] text-white sm:max-w-[425px] p-6" closeButton={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Templates</h2>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-transparent -mr-2"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-zinc-400 text-sm">
            Choose a template to get started quickly
          </p>
        </div>

        <ScrollArea className="h-[400px] mt-4 pr-4 -mr-4">
          <div className="space-y-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(template)
                  onOpenChange(false)
                }}
                className={cn(
                  "w-full text-left p-4 rounded-lg transition-colors",
                  "bg-[#2C2C2C] hover:bg-[#3C3C3C]",
                  "border border-transparent hover:border-white/10",
                  "group"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-md bg-black/30 text-white/80 group-hover:text-white">
                    {template.icon || <Layout className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-white/90 group-hover:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-white/60 group-hover:text-white/80">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
