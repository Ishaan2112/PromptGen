import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

describe('CarService', () => {
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarService],
    }).compile();

    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cars', () => {
      const result = service.findAll();
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('brand');
      expect(result[0]).toHaveProperty('model');
    });
  });

  describe('findOne', () => {
    it('should return a car by id', () => {
      const result = service.findOne('1');
      expect(result.id).toBe('1');
      expect(result.brand).toBe('Toyota');
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new car', () => {
      const createCarDto: CreateCarDto = {
        brand: 'Audi',
        model: 'A4',
        year: 2024,
        price: 40000,
        color: 'White',
        mileage: 0,
      };

      const result = service.create(createCarDto);
      expect(result.brand).toBe('Audi');
      expect(result.model).toBe('A4');
      expect(result.id).toBe('6');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('should update an existing car', () => {
      const updateCarDto: UpdateCarDto = {
        price: 26000,
        color: 'Black',
      };

      const result = service.update('1', updateCarDto);
      expect(result.price).toBe(26000);
      expect(result.color).toBe('Black');
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException for non-existent id', () => {
      const updateCarDto: UpdateCarDto = { price: 26000 };
      expect(() => service.update('999', updateCarDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a car', () => {
      const initialCount = service.findAll().length;
      service.remove('1');
      const finalCount = service.findAll().length;
      expect(finalCount).toBe(initialCount - 1);
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });

  describe('findByBrand', () => {
    it('should return cars by brand', () => {
      const result = service.findByBrand('toyota');
      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('Toyota');
    });

    it('should return empty array for non-existent brand', () => {
      const result = service.findByBrand('NonExistentBrand');
      expect(result).toHaveLength(0);
    });
  });

  describe('findByPriceRange', () => {
    it('should return cars within price range', () => {
      const result = service.findByPriceRange(20000, 30000);
      expect(result).toHaveLength(2);
      expect(result.every(car => car.price >= 20000 && car.price <= 30000)).toBe(true);
    });

    it('should return empty array for invalid price range', () => {
      const result = service.findByPriceRange(100000, 200000);
      expect(result).toHaveLength(0);
    });
  });
});
