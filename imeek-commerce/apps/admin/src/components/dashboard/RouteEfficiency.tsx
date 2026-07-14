"use client";

import { Download } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import { Card } from "@imeek/ui";

const SPARKLINE = [
  { v: 10 }, { v: 22 }, { v: 15 }, { v: 40 }, { v: 30 },
  { v: 55 }, { v: 42 }, { v: 70 }, { v: 60 }, { v: 90 }, { v: 78 }
];

/** "Route efficiency" hero red card with % and a light sparkline. */
export function RouteEfficiency({ efficiencyPct }: { efficiencyPct: number }) {
  return (
    <Card tone="red" className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Route efficiency</h2>
        <button
          aria-label="Export"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>

      <div>
        <p className="text-4xl font-semibold leading-none">
          {efficiencyPct}
          <span className="text-2xl">%</span>
        </p>
        <p className="mt-1 text-xs text-white/75">The best road</p>
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={SPARKLINE}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-white/70">Send the best route to the driver&rsquo;s email</p>
    </Card>
  );
}
