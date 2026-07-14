import { Badge, Card } from "@imeek/ui";

import { getShipmentList } from "@/lib/dashboard-data";

export default async function HistoryPage() {
  const shipments = await getShipmentList();
  const delivered = shipments.filter((s) => s.status === "DELIVERED");

  return (
    <div className="pt-2">
      <h1 className="mb-5 text-2xl font-semibold">History</h1>
      <Card className="flex flex-col gap-3">
        {delivered.length === 0 && (
          <p className="text-sm text-imeek-muted">No completed shipments yet.</p>
        )}
        {delivered.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-2xl border border-imeek-line bg-imeek-bg px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold">{s.reference}</p>
              <p className="text-xs text-imeek-muted">
                {s.originLabel} → {s.destinationLabel}
              </p>
            </div>
            <Badge tone="red">Delivered</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
