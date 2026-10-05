# Shill Soko

A multi-store e-commerce platform where merchants run their own online stores and customers shop and track orders on web and mobile.

Built solo as a long-term learning project, one thin slice at a time.

---

## Table of contents

1. [Vision](#vision)
2. [Who it's for](#who-its-for)
3. [Core features](#core-features)
4. [How multi-tenancy works](#how-multi-tenancy-works)
5. [Roles and permissions](#roles-and-permissions)
6. [Architecture](#architecture)
7. [Project structure](#project-structure)
8. [Technology stack](#technology-stack)
9. [Data model](#data-model)
10. [API routes](#api-routes)
11. [Delivery and tracking](#delivery-and-tracking)
12. [Design system](#design-system)
13. [Communications](#communications)
14. [Getting started](#getting-started)
15. [Environment variables](#environment-variables)
16. [Status](#status)
17. [Roadmap](#roadmap)
18. [Security](#security)
19. [Testing](#testing)
20. [Deployment](#deployment)
21. [Working agreement](#working-agreement)
22. [Contributing](#contributing)
23. [License](#license)

---

## Vision

Shill Soko works like Shopify. A merchant signs up, gets their own store, and manages products, stock, orders, and customers from one dashboard. Shoppers visit each store on its own address and check out there. A customer mobile app, like Shopify's Shop app, lets people follow their orders and deliveries from every store in one place.

Shill Soko is **not** a marketplace like AliExpress. Stores are independent. There is no cross-store cart, no shared search, and no commission system. Those can be added later if the product needs them.

## Who it's for

| User | What they want |
|------|----------------|
| **Merchant (store owner)** | Open a store quickly, add products, take payments, see and fulfil orders |
| **Customer** | Browse a store, buy easily, and know where the order is |
| **Platform admin (you)** | See all stores, manage plans, handle problems |

---

## Core features

**For merchants**
- Create and configure a store (name, logo, address, currency)
- Product management: create, edit, categories, images, stock levels
- Inventory tracking
- Order management and status updates
- Customer list and basic analytics
- Payment and shipping settings

**For customers**
- Browse a store's catalog, with search and filters
- Product pages, cart, and checkout
- Order history and live delivery tracking
- Customer mobile app (later phase)

**For the platform admin**
- List, approve, suspend stores
- Plans and billing (later)
- Platform-wide health and usage numbers

---

## How multi-tenancy works

Every store is a **tenant**. All store data is tagged with a `storeId`, and every query is filtered by it, so one merchant can never see another merchant's data.

- **Admin portal:** the logged-in merchant's `storeId` comes from their token.
- **Storefront:** the store is found from the address, e.g. `coffeehouse.shillsoko.com` loads the store whose slug is `coffeehouse`. (The domain is an example; custom domains come later.)
- **Rule:** no service reads or writes store data without a `storeId` filter. This is enforced in one shared place (a NestJS guard plus a repository base class), not repeated by hand.

---

## Roles and permissions

| Role | Can do | Cannot do |
|------|--------|-----------|
| `platform_admin` | See and manage all stores and users | Edit a store's products directly |
| `store_owner` | Everything inside their own store | See any other store |
| `store_staff` (later) | Manage orders and stock in one store | Change store settings or billing |
| `customer` | Browse, buy, view own orders | Access any admin area |

Authentication uses JWTs. The token carries `userId`, `role`, and `storeId` (for store roles).

---

## Architecture

```
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│ Admin portal       │  │ Storefront         │  │ Customer mobile    │
│ React + Vite       │  │ Next.js            │  │ Expo (later)       │
│ :5173              │  │ :3100              │  │                    │
└─────────┬──────────┘  └─────────┬──────────┘  └─────────┬──────────┘
          └───────────────────────┼───────────────────────┘
                                  ↓ HTTP
                  ┌────────────────────────────────┐
                  │ API Gateway (NestJS) :3000     │
                  │ routing, CORS, error handling  │
                  └─┬────────┬────────┬────────┬───┘
                    ↓        ↓        ↓        ↓
              ┌────────┐┌────────┐┌────────┐┌─────────┐
              │ Auth   ││Product ││ Order  ││ Payment │  ...Store, Shipment
              │ :3002  ││ :3001  ││ :3003  ││ :3004   │
              └───┬────┘└───┬────┘└───┬────┘└────┬────┘
                  └─────────┴─────────┴──────────┘
                                  ↓
                      ┌───────────────────────┐
                      │ PostgreSQL 16         │
                      └───────────────────────┘
```

Services are kept small and few. Inventory starts inside the product service and is split out only if needed.

---

## Project structure

```
shill-soko/
├── apps/
│   ├── admin-portal/          # Merchant dashboard (React + Vite)
│   ├── storefront/            # Customer web store (Next.js)
│   ├── mobile/                # Customer app (Expo), later
│   └── api-gateway/           # NestJS reverse proxy
│
├── services/
│   ├── auth-service/          # Login, roles, JWT
│   ├── store-service/         # Store creation and settings
│   ├── product-service/       # Catalog, stock
│   ├── order-service/         # Cart, checkout, order status
│   ├── payment-service/       # One provider to start
│   └── shipment-service/      # Delivery and tracking
│
├── packages/
│   ├── types/                 # Shared TypeScript types
│   ├── api-sdk/               # Typed HTTP client
│   ├── ui/                    # Shared components and design tokens
│   └── config/                # Shared config and env validation
│
├── infrastructure/
│   ├── docker/                # Dockerfiles
│   ├── nginx/                 # Reverse proxy and subdomain routing
│   └── _later/                # Parked until deployed
│       ├── kubernetes/
│       ├── terraform/
│       └── monitoring/
│
├── backlog/
│   └── SERVICES.md            # Parked ideas and what would trigger building them
│
├── docs/
│   ├── ROADMAP.md
│   ├── DECISIONS.md           # Why X over Y
│   ├── DEVELOPMENT_QUICK_START.md
│   ├── phases/
│   ├── architecture/
│   ├── database/
│   └── api/
│
└── docker-compose.yml
```

---

## Technology stack

| Layer | Technology |
|-------|-----------|
| Admin portal | React 19, Vite 5, Tailwind CSS 3.3, Zustand 4.4 |
| Storefront | Next.js (for SEO and per-store subdomains) |
| Mobile | Expo / React Native (later) |
| Gateway and services | NestJS 10.2 |
| ORM | TypeORM 0.3 |
| Database | PostgreSQL 16 |
| Language | TypeScript 5.2 |
| Local infrastructure | Docker, Docker Compose |

**Parked until needed:** Redis caching, Elasticsearch search, BullMQ queues, Socket.IO live updates, S3 file storage, Kubernetes, Terraform, Prometheus and Grafana.

Choices that are still open (record the answer in `docs/DECISIONS.md`): payment provider (a card provider or local mobile money), file storage for product images, and mobile framework (Expo or Flutter).

---

## Data model

Every table below except `users` and `stores` carries a `storeId`.

| Entity | Key fields | Notes |
|--------|-----------|-------|
| `users` | id, email, passwordHash, role | Platform-wide |
| `stores` | id, ownerId, name, slug, currency, status | `slug` is the subdomain |
| `products` | id, storeId, name, price, category, status | Soft delete |
| `inventory` | id, storeId, productId, quantity | Starts in product-service |
| `customers` | id, storeId, userId, address | A person can be a customer of many stores |
| `orders` | id, storeId, customerId, status, total | One store per order |
| `order_items` | id, orderId, productId, quantity, unitPrice | |
| `payments` | id, orderId, provider, status, amount | |
| `shipments` | id, orderId, status, truckId, eta | See delivery section |
| `trucks` | id, storeId or platform, capacityKg, status, location | Only if you run deliveries |

Indexes: `storeId` on every tenant table, plus `status` and `category` on products.

---

## API routes

All routes go through the gateway at `http://localhost:3000/api`.

| Route | Purpose | Status |
|-------|---------|--------|
| `/auth/*` | Register, login, refresh token | Planned |
| `/stores/*` | Create store, settings, list (admin) | Planned |
| `/products/*` | Catalog CRUD, stock, stats | Done |
| `/orders/*` | Cart, checkout, order status | Planned |
| `/payments/*` | Create and confirm payment | Planned |
| `/shipments/*` | Create shipment, assign truck, track | Planned |

---

## Delivery and tracking

Delivery is how orders reach customers, and it powers the "where is my order" feature in the app.

**Flow:** order paid, shipment created, truck assigned, route and ETA updated, customer notified.

```
assign(shipment):
  candidates = trucks where status == AVAILABLE
                        and capacity_left >= shipment.weight

  if candidates is empty:
      queue(shipment)
      alert(dispatcher)
      return

  for truck in candidates:
      truck.score = norm_distance(truck.location, shipment.pickup)
                  + 0.5 * (1 - utilization_after(truck, shipment))

  best = candidate with lowest score
  best.load  += shipment.weight
  best.stops  = order_stops(best.stops + [pickup, dropoff])
  best.eta    = recompute_eta(best.stops)
  notify(shipment.customer, best.eta)
```

- A lower score is better. Distance is normalized to 0 to 1 across candidates. The 0.5 weight is a starting guess to tune with real data.
- Stops are ordered with nearest-neighbor, with one rule: a pickup always comes before its dropoff. Add a 2-opt pass later if routes look wasteful.
- When no truck fits, a person decides instead of the system guessing.
- Keep this as a plain function with no database calls inside, so it can be unit tested with fake trucks.

---

## Design system

One accent color on warm neutral surfaces. Red marks the primary action, the active nav item, and what needs attention.

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#F3F1EA` | Page canvas |
| `card` | `#FFFFFF` | Cards and panels |
| `ink` | `#17171A` | Text |
| `muted` | `#6B6B70` | Secondary text |
| `red` | `#E8483D` | Accent, primary action |
| `ok` | `#2E7D5B` | Delivered |
| `warn` | `#C98A12` | Delayed |
| `info` | `#3566B8` | In transit |

- **Type:** Sora for headings and big numbers, Inter for everything else. Sentence case.
- **Shape:** 20px card radius, 12px control radius, pill badges. Flat cards with a 1px border and no shadow.
- **Rules:** one primary button per view. Status always has a text label, never color alone. Visible keyboard focus. Dark mode supported.
- **Where it lives:** tokens go in `packages/ui` as a Tailwind preset, and every app reads from it.

The full visual reference is in `docs/design-system.html`.

---

## Communications

**Voice:** plain, specific, calm, and useful. Include the order ID, place, and time. No exclamation marks and no apology filler. End with what happens next.

| Event | Audience | Channel | Message |
|-------|----------|---------|---------|
| Order placed | Customer | Email, in-app | We received order #4821. We'll confirm when it ships. |
| Out for delivery | Customer | SMS | #4821 is out for delivery today. Track it: [link] |
| Delivery failed | Customer | SMS, email | We couldn't deliver #4821: nobody was available. Pick a new time: [link] |
| New order | Merchant | In-app | New order #4821 from Aline M. 3 items. |
| Truck over capacity | Dispatcher | In-app | Truck 204 is over capacity by 120 kg. Reassign a parcel. |

| Channel | Use for | Limit |
|---------|---------|-------|
| In-app | Everything, with history | One-line title, one-line detail |
| Push | Time-sensitive events | Under 90 characters |
| SMS | Customer status changes | Under 160 characters, one link |
| Email | Confirmations and receipts | Subject names the order ID |

Empty states say what to do next ("No orders yet. Share your store link to get started"). Errors say what happened and how to fix it.

---

## Getting started

**Requirements:** Node.js 20+, npm, Docker.

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env

# 3. Start the database
docker-compose up -d

# 4. Run (three terminals)
npm run dev:gateway      # http://localhost:3000/api
npm run dev:product      # http://localhost:3001/api
npm run dev:admin        # http://localhost:5173
```

**Other commands**

```bash
npm run build:admin
npm run build:gateway
npm run build:product
npm run lint
npm run format
npm run type-check
```

Docker Compose also lists Redis and Elasticsearch. Nothing uses them yet, so you can comment them out to keep startup light.

---

## Environment variables

Copy `.env.example` to `.env`. Every app reads config through `packages/config`, which validates values at startup.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signs access tokens |
| `JWT_REFRESH_SECRET` | Signs refresh tokens |
| `GATEWAY_URL` | Where apps reach the API |
| `STOREFRONT_BASE_DOMAIN` | Base domain for store subdomains |
| `PAYMENT_PROVIDER_KEY` | Payment provider secret (test mode first) |

Never commit `.env`.

---

## Status

| Area | Status |
|------|--------|
| Admin portal shell, dashboard, 9 modules | Done (UI; only Products uses a real API) |
| Product service (CRUD, stock, stats) | Done |
| API gateway | Done |
| Shared packages (`types`, `api-sdk`, `ui`) | Started |
| Auth with roles | In progress (JWT in services, frontend pending) |
| Store creation and subdomain storefront | Next |
| Orders, payments | Planned |
| Delivery and tracking | Planned |
| Customer mobile app | Planned |

---

## Roadmap

| Milestone | Goal | Done |
|-----------|------|------|
| M0 | Admin portal uses the real Product Service API | [ ] |
| M1 | Auth with roles: platform admin, store owner, customer | [ ] |
| M2 | Store creation: an owner signs up and gets a store | [ ] |
| M3 | Storefront loads the right store by subdomain | [ ] |
| M4 | Cart, checkout, and payment in test mode, per store | [ ] |
| M5 | Order tracking (shipment service) | [ ] |
| M6 | Deploy on one VPS and give it to one real merchant | [ ] |
| M7 | Customer mobile app | [ ] |
| M8+ | Pull from the backlog based on real feedback | [ ] |

**Backlog (not scheduled):** custom domains, themes, discount codes, reviews, cross-store search, staff roles, plans and billing, analytics, notifications service, marketplace features.

---

## Security

- [x] TypeScript strict mode
- [x] Input validation with class-validator
- [x] CORS configuration
- [x] Environment-based config
- [ ] JWT auth with roles (M1)
- [ ] Tenant isolation guard on every store query (M2)
- [ ] Rate limiting on auth routes
- [ ] Password hashing with a modern algorithm (argon2 or bcrypt)
- [ ] Payment secrets only on the server, never in client code
- [ ] Data encryption at rest

---

## Testing

Not set up yet. Add before the order and payment services:

- Unit tests for pure logic (truck assignment, price totals)
- Integration tests per service against a test database
- A tenant-isolation test: a store owner must never read another store's data
- One end-to-end test of the main flow: add product, order, pay

```bash
npm run test
npm run test:e2e
```

---

## Deployment

**Now:** Docker Compose on one cheap server, with nginx routing `*.shillsoko.com` subdomains to the storefront and the API on its own path.

**Later:** Kubernetes, Terraform, and monitoring are parked in `infrastructure/_later/`. Setting them up becomes a deliberate learning milestone once there are real users.

---

## Working agreement

1. Finish the vertical slice before starting any backlog item: merchant creates a store and a product, customer buys, merchant sees the order.
2. A new service needs a written reason in `docs/DECISIONS.md`.
3. No infrastructure work (Kubernetes, Terraform, monitoring) until something is deployed.
4. Get one real merchant using it as early as possible.
5. Update the status table and roadmap whenever a milestone closes.

---

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Follow the code style (TypeScript, ESLint, Prettier)
3. Write clear commit messages
4. Open a pull request

---

## License

Proprietary. All rights reserved.

**Last updated:** October 5, 2026
