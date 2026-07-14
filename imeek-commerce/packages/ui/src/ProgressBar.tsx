import { cn } from "./utils";

export interface ProgressBarProps {
  value: number;
  className?: string;
  trackClassName?: string;
}

/** Thin horizontal progress bar, e.g. "Traffic and route optimization: 85%" */
export function ProgressBar({ value, className, trackClassName }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-1 w-full rounded-pill bg-imeek-line", trackClassName)}>
      <div
        className={cn("h-1 rounded-pill bg-imeek-red", className)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
