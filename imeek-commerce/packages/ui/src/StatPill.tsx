import type { ReactNode } from "react";

export interface StatPillProps {
  label: string;
  value: ReactNode;
  unit?: string;
}

/** Big red number over a small muted label, e.g. "120 km / 1h 50min" */
export function StatPill({ label, value, unit }: StatPillProps) {
  return (
    <div>
      <p className="text-xs text-imeek-muted">{label}</p>
      <p className="text-2xl font-semibold text-imeek-red">
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-imeek-muted">{unit}</span>}
      </p>
    </div>
  );
}
