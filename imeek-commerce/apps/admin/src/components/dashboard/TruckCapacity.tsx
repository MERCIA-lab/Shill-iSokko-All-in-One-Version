import { Circle } from "lucide-react";

import type { Truck } from "@imeek/types";

import { Card } from "@imeek/ui";

const STATUS_LABEL: Record<Truck["status"], string> = {
  ON_ROUTE: "On-Route",
  IDLE: "Idle",
  MAINTENANCE: "Maintenance",
  OFFLINE: "Offline"
};

/** "Current truck capacity" — plate, load illustration, max load. */
export function TruckCapacity({ truck }: { truck: Truck }) {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Current truck capacity</h2>
        <button className="text-xs font-medium text-imeek-ink underline underline-offset-2">
          Read more
        </button>
      </div>

      <TruckIllustration loadPct={truck.currentLoadPct} />

      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{truck.plateNumber}</span>
        <span className="flex items-center gap-1.5 text-imeek-red">
          <Circle className="h-2 w-2 fill-imeek-red" />
          {STATUS_LABEL[truck.status]}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-imeek-muted">Max Load</span>
        <span className="font-medium">{truck.maxLoadKg.toLocaleString()} KG</span>
      </div>
    </Card>
  );
}

function TruckIllustration({ loadPct }: { loadPct: number }) {
  return (
    <svg viewBox="0 0 320 140" className="w-full" aria-hidden="true">
      <rect x="18" y="30" width="60" height="60" rx="6" fill="#E9E7DD" />
      <rect x="24" y="40" width="24" height="18" rx="2" fill="#FFFFFF" />
      <rect x="78" y="34" width="190" height="56" rx="8" fill="url(#stripes)" />
      <rect x="78" y="34" width="190" height="56" rx="8" fill="#E8483D" fillOpacity="0.08" />
      <defs>
        <pattern id="stripes" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#F6D9D6" />
          <rect width="8" height="16" fill="#F0BAB4" />
        </pattern>
      </defs>
      <rect x="78" y="34" width="190" height="56" rx="8" fill="none" stroke="#E8483D" strokeWidth="2" />
      <text x="173" y="68" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFFFFF" stroke="#E8483D" strokeWidth="0.5">
        {loadPct}%
      </text>
      <circle cx="55" cy="100" r="14" fill="#1B1A17" />
      <circle cx="55" cy="100" r="6" fill="#D9D7CC" />
      <circle cx="130" cy="100" r="14" fill="#1B1A17" />
      <circle cx="130" cy="100" r="6" fill="#D9D7CC" />
      <circle cx="230" cy="100" r="14" fill="#1B1A17" />
      <circle cx="230" cy="100" r="6" fill="#D9D7CC" />
      <line x1="10" y1="100" x2="300" y2="100" stroke="#DEDBCC" strokeWidth="2" />
    </svg>
  );
}
