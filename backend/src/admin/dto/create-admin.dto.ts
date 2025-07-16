import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  isMainAdmin: boolean;
}
