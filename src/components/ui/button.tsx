"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Magnetic } from "@/components/cursor/magnetic";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-display tracking-[0.18em] uppercase text-[11px] font-medium transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        gold:
          "px-7 py-4 text-[var(--color-base)] bg-[var(--color-gold)] hover:bg-[var(--color-gold-soft)]",
        outline:
          "px-7 py-4 border text-[var(--color-text)] hover:bg-white/5 border-[var(--color-gold)]/40 hover:border-[var(--color-gold)]",
        ghost:
          "px-3 py-2 text-[var(--color-text-dim)] hover:text-[var(--color-gold)]",
        cyber:
          "px-7 py-4 text-white border border-[var(--color-cyber)] hover:bg-[var(--color-cyber)]/10",
        link:
          "p-0 text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "text-[10px] px-4 py-3",
        md: "",
        lg: "text-[12px] px-9 py-5",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, children, ...props }, ref) => {
    const inner = (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
    if (!magnetic || variant === "link" || variant === "ghost") return inner;
    return <Magnetic variant="hover">{inner}</Magnetic>;
  },
);
Button.displayName = "Button";
