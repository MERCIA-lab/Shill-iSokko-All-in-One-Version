import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { IsInt, Max, Min } from "class-validator";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

import { TruckService } from "./truck.service";

class UpdateLoadDto {
  @IsInt()
  @Min(0)
  @Max(100)
  currentLoadPct!: number;
}

@UseGuards(JwtAuthGuard)
@Controller("trucks")
export class TruckController {
  constructor(private readonly trucks: TruckService) {}

  @Get()
  findAll(@Query("companyId") companyId: string) {
    return this.trucks.findAll(companyId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.trucks.findOne(id);
  }

  @Patch(":id/load")
  updateLoad(@Param("id") id: string, @Body() dto: UpdateLoadDto) {
    return this.trucks.updateLoad(id, dto.currentLoadPct);
  }
}
