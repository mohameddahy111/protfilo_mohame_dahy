import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-strong",
        secondary: "bg-card text-foreground border border-border hover:bg-foreground/5",
        ghost: "hover:bg-foreground/10",
        outline: "border border-border bg-transparent hover:bg-foreground/5",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, ...props}, ref) => {
    return (
      <button
        className={cn(buttonVariants({variant, size}), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export {Button, buttonVariants};
