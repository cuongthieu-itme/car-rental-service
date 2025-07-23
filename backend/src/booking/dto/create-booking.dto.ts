import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  vehicleId: string;

  @IsDateString()
  pickupDate: string;

  @IsDateString()
  dropoffDate: string;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  options?: any; // insurance, extra driver, etc.

  @IsString()
  @IsNotEmpty()
  userId: string;
}
