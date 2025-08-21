import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  private cars: Car[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 25000,
      color: 'Silver',
      mileage: 15000,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      year: 2022,
      price: 22000,
      color: 'Blue',
      mileage: 25000,
      createdAt: new Date('2022-06-01'),
      updatedAt: new Date('2022-06-01'),
    },
    {
      id: '3',
      brand: 'Ford',
      model: 'Mustang',
      year: 2023,
      price: 35000,
      color: 'Red',
      mileage: 5000,
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-03-01'),
    },
    {
      id: '4',
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      price: 55000,
      color: 'Black',
      mileage: 18000,
      createdAt: new Date('2022-09-01'),
      updatedAt: new Date('2022-09-01'),
    },
    {
      id: '5',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2023,
      price: 45000,
      color: 'White',
      mileage: 8000,
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01'),
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string): Car {
    const car = this.cars.find(car => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const newCar = new Car({
      id: (this.cars.length + 1).toString(),
      ...createCarDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    this.cars[carIndex] = {
      ...this.cars[carIndex],
      ...updateCarDto,
      updatedAt: new Date(),
    };

    return this.cars[carIndex];
  }

  remove(id: string): void {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    this.cars.splice(carIndex, 1);
  }

  findByBrand(brand: string): Car[] {
    return this.cars.filter(car => 
      car.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }

  findByPriceRange(minPrice: number, maxPrice: number): Car[] {
    return this.cars.filter(car => 
      car.price >= minPrice && car.price <= maxPrice
    );
  }
}
