import { ArrowUpRight, TriangleAlert } from "lucide-react";

import type { Alert } from "@imeek/types";

import { Card } from "@imeek/ui";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** "Alerts and Notifications" panel next to the live map. */
export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="flex min-h-[380px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Alerts and Notifications:</h2>
        <button
          aria-label="Open alerts"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-imeek-red text-white"
        >
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-imeek-line bg-imeek-bg p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <TriangleAlert className="h-4 w-4 text-imeek-red" />
                {alert.title}
              </span>
              <span className="text-xs text-imeek-muted">{formatTime(alert.createdAt)}</span>
            </div>
            <p className="text-xs leading-relaxed text-imeek-muted">{alert.message}</p>
          </div>
        ))}

        {alerts.length === 0 && (
          <p className="text-xs text-imeek-muted">No alerts right now — all shipments nominal.</p>
        )}
      </div>
    </Card>
  );
}
