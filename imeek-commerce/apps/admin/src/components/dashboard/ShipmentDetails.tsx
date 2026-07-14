import { MoreHorizontal, Star } from "lucide-react";

import type { Customer, Shipment } from "@imeek/types";

import { Avatar, Badge, Card } from "@imeek/ui";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB").split("/").join(".");
}

const STATUS_LABEL: Record<Shipment["status"], string> = {
  PENDING: "Pending",
  LOADING: "Loading",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled"
};

/** "Shipment details" — customer, parcels, loading progress, price, status. */
export function ShipmentDetails({
  shipment,
  customer
}: {
  shipment: Shipment;
  customer: Customer;
}) {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Shipment details</h2>
        <button className="text-xs font-medium text-imeek-ink underline underline-offset-2">
          Read more
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={customer.name} src={customer.avatarUrl} size={44} />
          <div>
            <p className="text-sm font-semibold">{customer.name}</p>
            <p className="text-xs text-imeek-muted">
              {customer.documentId} - {customer.country}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-imeek-muted">Rating</span>
          <Badge tone="red" className="gap-1">
            <Star className="h-3 w-3 fill-white" />
            {customer.rating}
          </Badge>
          <MoreHorizontal className="h-4 w-4 text-imeek-muted" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-imeek-line bg-imeek-bg p-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold">Novaposhta parcels</p>
          <p className="mb-4 text-xs text-imeek-red">Have been paid</p>
          <p className="text-xl font-semibold text-imeek-red">
            ${shipment.parcelValue.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold">Parcels Loading</p>
          <div className="mb-1 flex items-center justify-between text-[11px] text-imeek-muted">
            <span>{shipment.originLabel}</span>
            <span>{shipment.destinationLabel}</span>
          </div>
          <div className="mb-4 h-[3px] w-full rounded-pill bg-imeek-line">
            <div className="h-[3px] w-3/5 rounded-pill bg-imeek-ink" />
          </div>
          <p className="text-xs text-imeek-muted">Date of arrival</p>
          <p className="text-lg font-semibold">{formatDate(shipment.dateOfArrival)}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold">Status</p>
          <Badge tone="red" className="mb-4">
            {STATUS_LABEL[shipment.status]}
          </Badge>
          <p className="mb-2 text-xs font-semibold">Type of Parcels</p>
          <Badge tone="outline">{shipment.parcelType}</Badge>
        </div>
      </div>
    </Card>
  );
}
