# @imeek/analytics-service

Standalone extraction target for the "analytics" domain.

**Status:** scaffold — boots as its own Nest process with a `GET /health`
endpoint and shares `@imeek/database` / `@imeek/types` with the rest of
the monorepo. The real domain logic currently lives in `apps/api`; move
the matching module (e.g. `apps/api/src/analytics`) into `src/` here, wire
it into `app.module.ts`, and point `apps/api` at this service (HTTP,
gRPC, or a message broker such as Redis/NATS) once you're ready to split
it out of the monolith.

Run: `pnpm --filter @imeek/analytics-service dev` (set `PORT` in .env to avoid clashing
with the other services / apps/api on 4000).
