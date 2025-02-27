import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
        destructive: "bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
        outline: "bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
        secondary: "bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
        ghost: "bg-transparent text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
        link: "bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] border border-[#333333]",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 rounded-sm px-2.5",
        lg: "h-9 rounded-sm px-4",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
