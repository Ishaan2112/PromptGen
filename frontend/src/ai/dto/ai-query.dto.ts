import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

export class AiQueryDto {
  @ApiProperty({ 
    description: 'The query to send to AI', 
    example: 'Generate a creative writing prompt about space exploration',
    minLength: 10,
    maxLength: 1000
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  query: string;

  @ApiProperty({ 
    description: 'Context or additional information for the AI', 
    required: false,
    example: 'The prompt should be suitable for high school students'
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  context?: string;

  @ApiProperty({ 
    description: 'Type of response expected', 
    required: false,
    example: 'creative',
    enum: ['creative', 'technical', 'professional', 'educational']
  })
  @IsString()
  @IsOptional()
  responseType?: string;
}
