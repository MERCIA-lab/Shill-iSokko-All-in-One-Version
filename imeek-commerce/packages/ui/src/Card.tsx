import type { HTMLAttributes } from "react";

import { cn } from "./utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "surface" | "red";
}

/** Base white (or red hero) card used across the dashboard grid. */
export function Card({ tone = "surface", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card p-5 shadow-card",
        tone === "surface" && "bg-imeek-surface text-imeek-ink",
        tone === "red" && "bg-imeek-red text-white",
        className
      )}
      {...props}
    />
  );
}
