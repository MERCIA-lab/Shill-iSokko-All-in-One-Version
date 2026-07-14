"use client";

import { Download } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";

import type { ShipmentTrendPoint } from "@imeek/types";

import { Badge, Card } from "@imeek/ui";

/** "Shipment trends" lollipop/bar chart, peak day highlighted in red. */
export function ShipmentTrends({ trend }: { trend: ShipmentTrendPoint[] }) {
  const peak = Math.max(...trend.map((t) => t.shipmentCount));

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Shipment trends</h2>
        <button
          aria-label="Export"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-imeek-red text-white"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>

      <Badge tone="red" className="w-fit">
        {trend.length} shipments
      </Badge>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trend} barCategoryGap="30%">
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8A8A82" }}
            />
            <YAxis hide domain={[0, "dataMax + 2"]} />
            <Bar dataKey="shipmentCount" radius={[6, 6, 6, 6]} maxBarSize={6}>
              {trend.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.shipmentCount === peak ? "#E8483D" : "#1B1A17"}
                  fillOpacity={entry.shipmentCount === peak ? 1 : 0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
