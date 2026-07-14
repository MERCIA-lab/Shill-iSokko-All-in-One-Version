import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UpdateShipmentStatusDto } from "./dto/update-shipment-status.dto";
import { ShipmentService } from "./shipment.service";

@UseGuards(JwtAuthGuard)
@Controller("shipments")
export class ShipmentController {
  constructor(private readonly shipments: ShipmentService) {}

  @Get()
  findAll(@Query("companyId") companyId: string) {
    return this.shipments.findAll(companyId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.shipments.findOne(id);
  }

  @Post()
  create(@Query("companyId") companyId: string, @Body() dto: CreateShipmentDto) {
    return this.shipments.create(companyId, dto);
  }

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateShipmentStatusDto) {
    return this.shipments.updateStatus(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.shipments.remove(id);
  }
}
