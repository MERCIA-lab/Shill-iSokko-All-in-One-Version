import type { Alert, Customer, Shipment, ShipmentTrendPoint, Truck } from "@imeek/types";

/**
 * Data-access layer for the dashboard. Every dashboard component reads
 * through here rather than embedding fetch/mock logic directly, so
 * swapping this for real `fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL)`
 * calls against apps/api is a one-file change.
 */

const shipment: Shipment = {
  id: "shp_1",
  reference: "SHIP-0001",
  customerId: "cus_1",
  truckId: "trk_1",
  driverId: "usr_1",
  originLabel: "Kyiv",
  destinationLabel: "Rivne",
  status: "IN_TRANSIT",
  parcelType: "Household chemicals",
  parcelValue: 520.45,
  distanceToArrivalKm: 120,
  etaMinutes: 110,
  routeOptimizationPct: 85,
  routeEfficiencyPct: 96,
  waypoints: [
    { order: 1, lat: 50.45, lng: 30.52, label: "Warehouse A" },
    { order: 2, lat: 50.6, lng: 30.9, label: "Checkpoint" },
    { order: 3, lat: 50.62, lng: 26.25, label: "Rivne Hub" }
  ],
  dateOfArrival: "2023-10-28",
  createdAt: "2023-10-27T09:00:00.000Z",
  updatedAt: "2023-10-28T13:48:00.000Z"
};

const customer: Customer = {
  id: "cus_1",
  name: "Michael Johnson",
  avatarUrl: null,
  documentId: "1241AA4121BB2351AB",
  country: "Ukraine",
  rating: 4.2,
  createdAt: "2022-01-01T00:00:00.000Z"
};

const truck: Truck = {
  id: "trk_1",
  plateNumber: "AL-223965406",
  model: "MAN TGX",
  status: "ON_ROUTE",
  capacityKg: 10000,
  currentLoadPct: 86,
  maxLoadKg: 8453
};

const alerts: Alert[] = [
  {
    id: "alt_1",
    type: "GEOFENCE",
    title: "Geofencing alert",
    message:
      "Truck crossed geofence at Warehouse A. Driver arrival notification sent to staff.",
    createdAt: "2023-10-28T13:48:00.000Z",
    read: false
  }
];

const trend: ShipmentTrendPoint[] = [
  { date: "28.10", shipmentCount: 3 },
  { date: "29.10", shipmentCount: 4 },
  { date: "30.10", shipmentCount: 2 },
  { date: "31.10", shipmentCount: 5 },
  { date: "01.11", shipmentCount: 8 },
  { date: "02.11", shipmentCount: 4 },
  { date: "03.11", shipmentCount: 3 }
];

const chatMessages = [
  { id: "m1", author: "Ivan", body: "Hi!", fromMe: false },
  { id: "m2", author: "Alex", body: "Hi! What is your question?", fromMe: true }
];

const recentTrip = {
  date: "28 Oct",
  durationLabel: "Duration",
  speedLabel: "Speed",
  stopsLabel: "Stops",
  distanceKm: 1246
};

export async function getDashboardData() {
  // In production this becomes:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/dashboard`, { cache: "no-store" });
  // return res.json();
  return { shipment, customer, truck, alerts, trend, chatMessages, recentTrip };
}

export async function getRecentTrip() {
  return recentTrip;
}

const shipmentList: Shipment[] = [
  shipment,
  {
    ...shipment,
    id: "shp_2",
    reference: "SHIP-0002",
    originLabel: "Lviv",
    destinationLabel: "Kharkiv",
    status: "PENDING",
    parcelType: "Electronics",
    distanceToArrivalKm: 640,
    etaMinutes: 540,
    dateOfArrival: "2023-11-02"
  },
  {
    ...shipment,
    id: "shp_3",
    reference: "SHIP-0003",
    originLabel: "Odesa",
    destinationLabel: "Kyiv",
    status: "DELIVERED",
    parcelType: "Furniture",
    distanceToArrivalKm: 0,
    etaMinutes: 0,
    dateOfArrival: "2023-10-20"
  },
  {
    ...shipment,
    id: "shp_4",
    reference: "SHIP-0004",
    originLabel: "Dnipro",
    destinationLabel: "Poltava",
    status: "DELAYED",
    parcelType: "Auto parts",
    distanceToArrivalKm: 45,
    etaMinutes: 70,
    dateOfArrival: "2023-10-30"
  }
];

const customerList: Customer[] = [
  customer,
  {
    id: "cus_2",
    name: "Olena Petrenko",
    avatarUrl: null,
    documentId: "8823AA9021BB4471CD",
    country: "Ukraine",
    rating: 4.8,
    createdAt: "2022-05-11T00:00:00.000Z"
  },
  {
    id: "cus_3",
    name: "David Kim",
    avatarUrl: null,
    documentId: "3391BB1123CC8821EF",
    country: "Poland",
    rating: 4.5,
    createdAt: "2023-02-19T00:00:00.000Z"
  }
];

const notificationFeed = [
  {
    id: "n1",
    type: "GEOFENCE" as const,
    title: "Geofencing alert",
    message: "Truck crossed geofence at Warehouse A.",
    createdAt: "2023-10-28T13:48:00.000Z",
    read: false
  },
  {
    id: "n2",
    type: "DELAY" as const,
    title: "Shipment delayed",
    message: "SHIP-0004 is running 25 minutes behind schedule.",
    createdAt: "2023-10-28T11:20:00.000Z",
    read: false
  },
  {
    id: "n3",
    type: "MAINTENANCE" as const,
    title: "Maintenance due",
    message: "Truck AL-223965406 is due for service in 3 days.",
    createdAt: "2023-10-27T09:05:00.000Z",
    read: true
  }
];

export async function getShipmentList() {
  return shipmentList;
}

export async function getCustomerList() {
  return customerList;
}

export async function getNotificationFeed() {
  return notificationFeed;
}

export async function getCompanyContext() {
  return {
    userName: "Alex",
    companyName: "Load Swift NYC",
    companyShortCode: "LS",
    notificationsCount: 2,
    analysisGrowthPct: 20
  };
}
