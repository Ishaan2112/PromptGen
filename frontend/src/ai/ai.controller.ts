import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { AiQueryDto } from './dto/ai-query.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@ApiTags('AI')
@Controller('ai')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('query')
  @ApiOperation({ summary: 'Send a query to AI for response generation' })
  @ApiBody({ type: AiQueryDto })
  @ApiResponse({
    status: 200,
    description: 'AI response generated successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed or AI service error',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - rate limit exceeded',
    type: ApiResponseDto,
  })
  async generateResponse(@Body() aiQueryDto: AiQueryDto): Promise<string> {
    return this.aiService.generateResponse(aiQueryDto);
  }

  @Post('analyze-car')
  @ApiOperation({ summary: 'Analyze car data using AI' })
  @ApiBody({ 
    description: 'Car data to analyze',
    schema: {
      type: 'object',
      properties: {
        brand: { type: 'string', example: 'Toyota' },
        model: { type: 'string', example: 'Camry' },
        year: { type: 'number', example: 2023 },
        price: { type: 'number', example: 25000 },
        mileage: { type: 'number', example: 15000 },
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Car data analyzed successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed or AI service error',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - rate limit exceeded',
    type: ApiResponseDto,
  })
  async analyzeCarData(@Body() carData: any): Promise<string> {
    return this.aiService.analyzeCarData(carData);
  }

  @Get('prompt-suggestions/:category')
  @ApiOperation({ summary: 'Generate prompt suggestions for a specific category' })
  @ApiParam({ 
    name: 'category', 
    description: 'Category for prompt suggestions',
    example: 'creative-writing'
  })
  @ApiResponse({
    status: 200,
    description: 'Prompt suggestions generated successfully',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - AI service error',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - rate limit exceeded',
    type: ApiResponseDto,
  })
  async generatePromptSuggestions(@Param('category') category: string): Promise<string> {
    return this.aiService.generatePromptSuggestions(category);
  }

  @Get('status')
  @ApiOperation({ summary: 'Check AI service status' })
  @ApiResponse({
    status: 200,
    description: 'AI service status',
    type: ApiResponseDto,
  })
  getStatus() {
    return {
      service: 'Google Gemini AI',
      status: 'available',
      model: 'gemini-pro',
      rateLimit: '5 requests per minute',
    };
  }
}
