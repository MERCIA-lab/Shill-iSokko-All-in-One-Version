import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return { service: "inventory-service", status: "ok", time: new Date().toISOString() };
  }
}
