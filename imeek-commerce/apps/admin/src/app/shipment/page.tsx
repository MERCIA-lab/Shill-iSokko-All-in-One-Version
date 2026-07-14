import { Badge, Card } from "@imeek/ui";

import { getShipmentList } from "@/lib/dashboard-data";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  LOADING: "Loading",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled"
};

export default async function ShipmentPage() {
  const shipments = await getShipmentList();

  return (
    <div className="pt-2">
      <h1 className="mb-5 text-2xl font-semibold">Shipment</h1>
      <Card className="!p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-imeek-line text-xs text-imeek-muted">
              <th className="px-5 py-4 font-medium">Reference</th>
              <th className="px-5 py-4 font-medium">Route</th>
              <th className="px-5 py-4 font-medium">Parcel type</th>
              <th className="px-5 py-4 font-medium">ETA</th>
              <th className="px-5 py-4 font-medium">Arrival date</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="border-b border-imeek-line last:border-0">
                <td className="px-5 py-4 font-medium">{s.reference}</td>
                <td className="px-5 py-4 text-imeek-muted">
                  {s.originLabel} → {s.destinationLabel}
                </td>
                <td className="px-5 py-4">{s.parcelType}</td>
                <td className="px-5 py-4">
                  {s.etaMinutes > 0 ? `${Math.floor(s.etaMinutes / 60)}h ${s.etaMinutes % 60}m` : "-"}
                </td>
                <td className="px-5 py-4">
                  {new Date(s.dateOfArrival).toLocaleDateString("en-GB")}
                </td>
                <td className="px-5 py-4">
                  <Badge tone="red">{STATUS_LABEL[s.status]}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
