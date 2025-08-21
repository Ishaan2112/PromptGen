import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @ApiProperty({ description: 'Unique identifier for the car' })
  id: string;

  @ApiProperty({ description: 'Car brand', example: 'Toyota' })
  brand: string;

  @ApiProperty({ description: 'Car model', example: 'Camry' })
  model: string;

  @ApiProperty({ description: 'Car year', example: 2023 })
  year: number;

  @ApiProperty({ description: 'Car price in USD', example: 25000 })
  price: number;

  @ApiProperty({ description: 'Car color', example: 'Silver' })
  color: string;

  @ApiProperty({ description: 'Car mileage', example: 15000 })
  mileage: number;

  @ApiProperty({ description: 'Date when the car was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the car was last updated' })
  updatedAt: Date;

  constructor(partial: Partial<Car>) {
    Object.assign(this, partial);
  }
}
