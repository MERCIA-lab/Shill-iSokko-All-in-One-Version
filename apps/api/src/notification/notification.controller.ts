import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

import { NotificationService } from "./notification.service";

@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}

  @Get()
  findForUser(@Query("userId") userId: string) {
    return this.notifications.findForUser(userId);
  }

  @Patch(":id/read")
  markRead(@Param("id") id: string) {
    return this.notifications.markRead(id);
  }
}
