import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return { service: "auth-service", status: "ok", time: new Date().toISOString() };
  }
}
