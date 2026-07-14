import { IsDateString, IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateShipmentDto {
  @IsString()
  reference!: string;

  @IsString()
  customerId!: string;

  @IsString()
  truckId!: string;

  @IsString()
  driverId!: string;

  @IsString()
  originLabel!: string;

  @IsString()
  destinationLabel!: string;

  @IsString()
  parcelType!: string;

  @IsInt()
  @Min(0)
  parcelValueCents!: number;

  @IsNumber()
  distanceToArrivalKm!: number;

  @IsInt()
  etaMinutes!: number;

  @IsDateString()
  dateOfArrival!: string;
}
