import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@ApiTags('Cars')
@Controller('cars')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({
    status: 201,
    description: 'Car created successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
    type: ApiResponseDto,
  })
  create(@Body() createCarDto: CreateCarDto): Car {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiQuery({ name: 'brand', required: false, description: 'Filter by brand' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price filter' })
  @ApiResponse({
    status: 200,
    description: 'List of cars retrieved successfully',
    type: ApiResponseDto,
  })
  findAll(
    @Query('brand') brand?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Car[] {
    if (brand) {
      return this.carService.findByBrand(brand);
    }
    
    if (minPrice !== undefined && maxPrice !== undefined) {
      return this.carService.findByPriceRange(minPrice, maxPrice);
    }
    
    return this.carService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiResponse({
    status: 200,
    description: 'Car retrieved successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Car not found',
    type: ApiResponseDto,
  })
  findOne(@Param('id') id: string): Car {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiResponse({
    status: 200,
    description: 'Car updated successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Car not found',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
    type: ApiResponseDto,
  })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto): Car {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiResponse({
    status: 200,
    description: 'Car deleted successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Car not found',
    type: ApiResponseDto,
  })
  remove(@Param('id') id: string): void {
    return this.carService.remove(id);
  }
}
