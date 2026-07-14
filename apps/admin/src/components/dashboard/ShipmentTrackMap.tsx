import type { Shipment } from "@imeek/types";

import { Button, Card, ProgressBar, StatPill } from "@imeek/ui";

const TABS = ["Tracking", "Traffic jams", "POI"] as const;

/**
 * Live map card. The route line + numbered waypoint markers are rendered
 * as SVG here as a placeholder for a real map provider (Mapbox GL /
 * Google Maps) — swap the <RouteBackdrop> for a <Map /> component wired
 * to `shipment.waypoints` and this card's layout/props don't change.
 */
export function ShipmentTrackMap({ shipment }: { shipment: Shipment }) {
  return (
    <Card className="relative min-h-[380px] overflow-hidden !p-0">
      <RouteBackdrop />

      <div className="relative z-10 flex flex-col gap-6 p-6">
        <div className="flex gap-2">
          {TABS.map((tab, i) => (
            <span
              key={tab}
              className={
                i === 0
                  ? "rounded-pill bg-imeek-red px-4 py-1.5 text-xs font-medium text-white"
                  : "rounded-pill border border-imeek-red/40 bg-white/80 px-4 py-1.5 text-xs font-medium text-imeek-red"
              }
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-10">
          <StatPill
            label="Distance to arrival:"
            value={`${shipment.distanceToArrivalKm}km / ${Math.floor(
              shipment.etaMinutes / 60
            )}h.${String(shipment.etaMinutes % 60).padStart(2, "0")}`}
            unit="min."
          />
        </div>

        <div className="max-w-xs rounded-2xl bg-white/85 p-4 backdrop-blur-sm">
          <p className="mb-2 text-xs text-imeek-muted">Traffic and route optimization:</p>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-xl font-semibold text-imeek-red">
              {shipment.routeOptimizationPct}%
            </span>
            <ProgressBar value={shipment.routeOptimizationPct} className="flex-1" />
          </div>
          <div className="flex gap-2">
            <Button size="sm">Optimize</Button>
            <Button size="sm" variant="outline">
              View all
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RouteBackdrop() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="800" height="400" fill="#EFEDE4" />
      <g stroke="#DEDBCC" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
        ))}
      </g>
      <path
        d="M120 340 C 220 340, 260 260, 340 250 C 430 240, 460 190, 560 180 C 650 172, 700 130, 760 110"
        fill="none"
        stroke="#E8483D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[
        { x: 120, y: 340, n: 1 },
        { x: 350, y: 248, n: 2 },
        { x: 660, y: 122, n: 3 }
      ].map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="14" fill="#E8483D" />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="white"
          >
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
