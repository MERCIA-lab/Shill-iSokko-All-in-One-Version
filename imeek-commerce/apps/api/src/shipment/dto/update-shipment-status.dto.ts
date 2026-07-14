import { IsIn } from "class-validator";

const STATUSES = ["PENDING", "LOADING", "IN_TRANSIT", "DELIVERED", "DELAYED", "CANCELLED"] as const;

export class UpdateShipmentStatusDto {
  @IsIn(STATUSES)
  status!: (typeof STATUSES)[number];
}
