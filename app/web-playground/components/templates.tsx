import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

// Template definitions moved to a separate file for better organization
import { templates } from "../lib/templates"

interface TemplatesProps {
  onSelect: (template: Record<string, string>) => void
}

export function Templates({ onSelect }: TemplatesProps) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(templates).map(([name, template]) => (
          <Card key={name} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image src={template.preview || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-full bg-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <Button onClick={() => onSelect(template.files)} className="w-full">
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
