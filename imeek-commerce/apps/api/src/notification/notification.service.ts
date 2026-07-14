import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  findForUser(userId: string) {
    return this.prisma.client.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  markRead(id: string) {
    return this.prisma.client.notification.update({ where: { id }, data: { read: true } });
  }
}
