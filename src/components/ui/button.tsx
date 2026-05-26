import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ic-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ic-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ic-black text-ic-white hover:bg-ic-charcoal",
        gold: "bg-ic-gold text-ic-white shadow-ic-card hover:bg-ic-gold-dark",
        outline:
          "border border-ic-gold/45 bg-transparent text-ic-gold hover:bg-ic-gold/10",
        ghost: "bg-transparent text-ic-gold hover:bg-ic-gold/10",
        cream:
          "bg-ic-cream-light text-ic-black hover:bg-ic-cream-dark border border-ic-cream-dark"
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-ic-sm px-3 text-xs",
        lg: "h-12 rounded-ic-md px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
