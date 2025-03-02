import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30",
        destructive: "bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30",
        outline: "bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30",
        secondary: "bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30",
        ghost: "bg-transparent text-white hover:bg-black/30 hover:border-white/30",
        link: "bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30",
      },
      size: {
        default: "h-[28px] px-3",
        sm: "h-[24px] px-2.5",
        lg: "h-[32px] px-4",
        icon: "h-[28px] w-[28px]",
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
