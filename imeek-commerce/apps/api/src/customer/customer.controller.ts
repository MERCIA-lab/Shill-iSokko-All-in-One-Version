import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

import { CustomerService } from "./customer.service";

@UseGuards(JwtAuthGuard)
@Controller("customers")
export class CustomerController {
  constructor(private readonly customers: CustomerService) {}

  @Get()
  findAll(@Query("companyId") companyId: string) {
    return this.customers.findAll(companyId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customers.findOne(id);
  }
}
