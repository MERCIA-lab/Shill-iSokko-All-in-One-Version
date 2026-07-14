import type { ButtonHTMLAttributes } from "react";

import { cn } from "./utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors",
        size === "sm" && "px-4 py-1.5 text-xs",
        size === "md" && "px-5 py-2 text-sm",
        variant === "primary" && "bg-imeek-red text-white hover:bg-imeek-red-600",
        variant === "outline" &&
          "border border-imeek-red text-imeek-red hover:bg-imeek-red-50",
        variant === "ghost" && "text-imeek-ink hover:bg-imeek-bg",
        className
      )}
      {...props}
    />
  );
}
