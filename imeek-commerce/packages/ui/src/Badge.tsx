import type { HTMLAttributes } from "react";

import { cn } from "./utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "red" | "outline" | "muted";
}

export function Badge({ tone = "red", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium",
        tone === "red" && "bg-imeek-red text-white",
        tone === "outline" && "border border-imeek-red text-imeek-red",
        tone === "muted" && "bg-imeek-bg text-imeek-muted",
        className
      )}
      {...props}
    />
  );
}
