import { ShipmentTrackMap } from "@/components/dashboard/ShipmentTrackMap";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { ShipmentDetails } from "@/components/dashboard/ShipmentDetails";
import { TruckCapacity } from "@/components/dashboard/TruckCapacity";
import { ShipmentTrends } from "@/components/dashboard/ShipmentTrends";
import { RouteEfficiency } from "@/components/dashboard/RouteEfficiency";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { getDashboardData } from "@/lib/dashboard-data";

/**
 * Main dashboard route — mirrors the "Shipment track" screen from the
 * design reference: map + alerts on top, shipment details + truck
 * capacity in the middle, trends/efficiency/chat along the bottom.
 * ("Recent trips" lives in the sidebar, matching the reference layout.)
 */
export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <ShipmentTrackMap shipment={data.shipment} />
        <AlertsPanel alerts={data.alerts} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <ShipmentDetails shipment={data.shipment} customer={data.customer} />
        <TruckCapacity truck={data.truck} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ShipmentTrends trend={data.trend} />
        <RouteEfficiency efficiencyPct={data.shipment.routeEfficiencyPct} />
        <ChatPanel messages={data.chatMessages} contact={data.customer} />
      </div>
    </div>
  );
}
