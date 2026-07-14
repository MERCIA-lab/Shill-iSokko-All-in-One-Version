import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class TruckService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.client.truck.findMany({ where: { companyId } });
  }

  async findOne(id: string) {
    const truck = await this.prisma.client.truck.findUnique({ where: { id } });
    if (!truck) throw new NotFoundException("Truck not found");
    return truck;
  }

  updateLoad(id: string, currentLoadPct: number) {
    return this.prisma.client.truck.update({ where: { id }, data: { currentLoadPct } });
  }
}
