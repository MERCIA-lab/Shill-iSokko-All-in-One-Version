# iMeek Commerce

A monorepo for the iMeek platform: a cargo/fleet operations dashboard (the
"iMeek Cargo System" UI) plus the commerce layer around it — storefront,
mobile app, API, and marketplace-sync microservices.

```
imeek-commerce/
├── apps/
│   ├── web/       Next.js storefront (customer-facing shop)
│   ├── admin/     Next.js admin portal — the cargo/shipment dashboard
│   ├── mobile/    Expo/React Native app (dashboard + shipments on the go)
│   └── api/       NestJS backend (auth, shipments, trucks, customers, notifications)
├── services/      Extraction targets for true microservices later
│   ├── auth-service/
│   ├── catalog-service/
│   ├── order-service/
│   ├── inventory-service/
│   ├── analytics-service/
│   └── marketplace-sync-service/   Amazon/eBay connectors
├── packages/
│   ├── database/  Prisma schema + shared client (@imeek/database)
│   ├── ui/        Shared component library + design tokens (@imeek/ui)
│   ├── types/     Shared DTOs/interfaces (@imeek/types)
│   └── config/    ESLint preset, base tsconfig, zod env schema (@imeek/config)
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## Design match

`apps/admin` reproduces the uploaded "iMeek Cargo System" screen:

- **Colors** live in `packages/ui/tailwind-preset.js` as `imeek.*` tokens —
  warm off-white background (`#F3F1EA`), white cards, near-black text, and
  a single red accent (`#E8483D`) used for the active nav item, primary
  buttons, badges, and the two "hero" red cards (Recent trips, Route
  efficiency).
- **Navigation**: left rail with company switcher, Dashboard / Shipment /
  Costumer / Analysis / History / Notification, the red "Recent trips"
  summary, a quick-icon dock, and "Create new Request" — all present in
  `src/components/layout/Sidebar.tsx` and routed to real pages under
  `src/app/*`.
- **Dashboard grid**: live-map card with tabs + route optimization
  (`ShipmentTrackMap`), alerts panel, shipment details, truck capacity
  illustration, shipment trends chart, route efficiency card, and an
  inline chat — one component per card under
  `src/components/dashboard/`.

Swap the map SVG placeholder for Mapbox/Google Maps and point
`src/lib/dashboard-data.ts` at `apps/api` (the fetch call is already
commented in there) to go from mock data to live data without touching
any component.

## Getting started

```bash
corepack enable
pnpm install

cp .env.example .env
docker compose up -d postgres redis

pnpm db:generate
pnpm db:migrate
pnpm db:seed

pnpm dev:admin   # http://localhost:3001 — the cargo dashboard
pnpm dev:web     # http://localhost:3000 — storefront
pnpm dev:api     # http://localhost:4000/api — NestJS backend
```

Run everything at once with `pnpm dev` (Turborepo fans out to every app).

Mobile: `cd apps/mobile && pnpm start` (requires the Expo Go app or a
simulator).

## What's fully built vs. scaffolded

| Area | Status |
| --- | --- |
| `apps/admin` | Fully built — every card on the dashboard, plus Shipment/Costumer/Analysis/History/Notification pages, all wired to a typed mock data layer that's a one-file swap for real API calls. |
| `packages/ui`, `packages/types`, `packages/config` | Fully built shared foundations. |
| `packages/database` | Full Prisma schema covering both the fleet domain (Truck, Shipment, Waypoint, Notification) and the commerce domain (Product, Order, MarketplaceListing), plus a seed script matching the dashboard's sample data. |
| `apps/api` | Working NestJS service: JWT auth (register/login), and CRUD for shipments/trucks/customers/notifications against Prisma. Add the remaining commerce endpoints (products/orders) following the same module pattern. |
| `apps/web` | Working storefront scaffold: home, product listing, product detail, empty cart. Checkout/payment intentionally left as a follow-up once `order-service` exists. |
| `apps/mobile` | Working Expo scaffold: bottom-tab nav mirroring the sidebar, Dashboard/Shipments/Customers/Notifications screens with the same color tokens. |
| `services/*` | Bootable Nest skeletons (`GET /health` each) with a README pointing at the matching `apps/api` module to extract. Not yet split out — `apps/api` is the working monolith today. |

## Environment variables

See `.env.example` for the full list (database, JWT secrets, Redis, per-app
API URLs, marketplace credentials, object storage). Every app/service reads
through `packages/config/env.ts`, which validates `process.env` with zod at
boot.
