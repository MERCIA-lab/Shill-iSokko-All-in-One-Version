import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../common/prisma/prisma.service";

import type { CreateShipmentDto } from "./dto/create-shipment.dto";
import type { UpdateShipmentStatusDto } from "./dto/update-shipment-status.dto";

@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.client.shipment.findMany({
      where: { companyId },
      include: { customer: true, truck: true, waypoints: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async findOne(id: string) {
    const shipment = await this.prisma.client.shipment.findUnique({
      where: { id },
      include: { customer: true, truck: true, waypoints: true }
    });
    if (!shipment) throw new NotFoundException("Shipment not found");
    return shipment;
  }

  create(companyId: string, dto: CreateShipmentDto) {
    return this.prisma.client.shipment.create({
      data: { ...dto, companyId, dateOfArrival: new Date(dto.dateOfArrival) }
    });
  }

  async updateStatus(id: string, dto: UpdateShipmentStatusDto) {
    await this.findOne(id);
    return this.prisma.client.shipment.update({
      where: { id },
      data: { status: dto.status }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.client.shipment.delete({ where: { id } });
    return { id, deleted: true };
  }
}
