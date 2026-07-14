import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { prisma } from "@imeek/database";

/**
 * Thin Nest wrapper around the shared @imeek/database prisma singleton so
 * modules can inject `PrismaService` the idiomatic Nest way while still
 * sharing one connection pool with anything else importing @imeek/database
 * directly (scripts, other services in this monorepo, etc).
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  client = prisma;

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
