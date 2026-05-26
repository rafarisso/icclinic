import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-ic-pill px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "bg-ic-gold-light/45 text-ic-gold-dark",
        dark: "bg-ic-black text-ic-cream-light",
        muted: "bg-ic-cream-dark text-ic-gray-600",
        success: "bg-ic-success/18 text-ic-success"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
