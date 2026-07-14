FROM node:20-alpine AS base
WORKDIR /repo
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @imeek/database db:generate
RUN pnpm --filter @imeek/api build
EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]
