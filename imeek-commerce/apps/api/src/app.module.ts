import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { CustomerModule } from "./customer/customer.module";
import { NotificationModule } from "./notification/notification.module";
import { ShipmentModule } from "./shipment/shipment.module";
import { TruckModule } from "./truck/truck.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ShipmentModule,
    TruckModule,
    CustomerModule,
    NotificationModule
  ]
})
export class AppModule {}
