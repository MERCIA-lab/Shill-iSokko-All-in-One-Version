export type TruckStatus = "ON_ROUTE" | "IDLE" | "MAINTENANCE" | "OFFLINE";

export interface Truck {
  id: string;
  plateNumber: string;
  model: string;
  status: TruckStatus;
  capacityKg: number;
  currentLoadPct: number;
  maxLoadKg: number;
  driverId?: string | null;
  lastLocation?: { lat: number; lng: number } | null;
}
