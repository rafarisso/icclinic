import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends HTMLMotionProps<"button"> {
  variant?: "solid" | "outline" | "ghost";
}

const variantClasses = {
  solid:
    "gold-sheen text-ic-white shadow-ic-card hover:brightness-[0.98]",
  outline:
    "border border-ic-gold/55 bg-transparent text-ic-gold hover:bg-ic-gold/10",
  ghost: "bg-transparent text-ic-gold hover:bg-ic-gold/10"
};

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = "solid", type = "button", ...props }, ref) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-ic-md px-5 text-sm font-semibold transition-colors disabled:opacity-60",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
GoldButton.displayName = "GoldButton";
