import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'Car brand', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Car model', example: 'Camry' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Car year', example: 2023 })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({ description: 'Car price in USD', example: 25000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Car color', example: 'Silver', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Car mileage', example: 15000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  mileage?: number;
}
