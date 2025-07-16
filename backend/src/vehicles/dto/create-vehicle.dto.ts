import { FuelType, VehicleCategory } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVehicleDto {
  @IsEnum(VehicleCategory)
  category: VehicleCategory;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  pricePerDay: number;

  @IsNumber()
  pricePerHour: number;

  @IsString()
  location: string;

  @IsString()
  transmission: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
