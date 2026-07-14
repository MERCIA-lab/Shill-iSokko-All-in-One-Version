import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { shortCode: "LS-NYC" },
    update: {},
    create: { name: "Load Swift NYC", shortCode: "LS-NYC" }
  });

  const owner = await prisma.user.upsert({
    where: { email: "alex@loadswift.nyc" },
    update: {},
    create: {
      name: "Alex",
      email: "alex@loadswift.nyc",
      passwordHash: "replace-with-real-hash",
      role: "ADMIN",
      companyId: company.id
    }
  });

  const truck = await prisma.truck.create({
    data: {
      plateNumber: "AL-223965406",
      model: "MAN TGX",
      status: "ON_ROUTE",
      capacityKg: 10000,
      currentLoadPct: 86,
      maxLoadKg: 8453,
      companyId: company.id
    }
  });

  const customer = await prisma.customer.create({
    data: {
      name: "Michael Johnson",
      documentId: "1241AA4121BB2351AB",
      country: "Ukraine",
      rating: 4.2,
      companyId: company.id
    }
  });

  const shipment = await prisma.shipment.create({
    data: {
      reference: "SHIP-0001",
      status: "IN_TRANSIT",
      originLabel: "Kyiv",
      destinationLabel: "Rivne",
      parcelType: "Household chemicals",
      parcelValueCents: 52045,
      distanceToArrivalKm: 120,
      etaMinutes: 110,
      routeOptimizationPct: 85,
      routeEfficiencyPct: 96,
      dateOfArrival: new Date("2023-10-28"),
      companyId: company.id,
      customerId: customer.id,
      truckId: truck.id,
      driverId: owner.id,
      waypoints: {
        create: [
          { order: 1, lat: 50.45, lng: 30.52, label: "Warehouse A" },
          { order: 2, lat: 50.6, lng: 30.9, label: "Checkpoint" },
          { order: 3, lat: 50.62, lng: 26.25, label: "Rivne Hub" }
        ]
      }
    }
  });

  await prisma.notification.create({
    data: {
      userId: owner.id,
      type: "GEOFENCE",
      title: "Geofencing alert",
      message: "Truck crossed geofence at Warehouse A. Driver arrival notification sent to staff."
    }
  });

  console.log({ company: company.id, truck: truck.id, shipment: shipment.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
