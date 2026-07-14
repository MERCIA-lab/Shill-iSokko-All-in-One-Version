export type ShipmentStatus =
  | "PENDING"
  | "LOADING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "DELAYED"
  | "CANCELLED";

export interface GeoPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface RouteWaypoint extends GeoPoint {
  order: number;
  reachedAt?: string | null;
}

export interface Shipment {
  id: string;
  reference: string;
  customerId: string;
  truckId: string;
  driverId: string;
  originLabel: string;
  destinationLabel: string;
  status: ShipmentStatus;
  parcelType: string;
  parcelValue: number;
  distanceToArrivalKm: number;
  etaMinutes: number;
  routeOptimizationPct: number;
  routeEfficiencyPct: number;
  waypoints: RouteWaypoint[];
  dateOfArrival: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentTrendPoint {
  date: string;
  shipmentCount: number;
}

export interface Alert {
  id: string;
  type: "GEOFENCE" | "DELAY" | "MAINTENANCE" | "DOCUMENT" | "SYSTEM";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}
