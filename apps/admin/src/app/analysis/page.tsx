import { ShipmentTrends } from "@/components/dashboard/ShipmentTrends";
import { RouteEfficiency } from "@/components/dashboard/RouteEfficiency";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function AnalysisPage() {
  const data = await getDashboardData();

  return (
    <div className="pt-2">
      <h1 className="mb-5 text-2xl font-semibold">Analysis</h1>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ShipmentTrends trend={data.trend} />
        <RouteEfficiency efficiencyPct={data.shipment.routeEfficiencyPct} />
      </div>
    </div>
  );
}
