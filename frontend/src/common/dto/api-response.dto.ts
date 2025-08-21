import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Whether the request was successful' })
  success: boolean;

  @ApiProperty({ description: 'Response data', required: false })
  data?: T;

  @ApiProperty({ description: 'Error message if any', required: false })
  error?: string;

  @ApiProperty({ description: 'Timestamp of the response' })
  timestamp: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, data);
  }

  static error<T>(error: string): ApiResponseDto<T> {
    return new ApiResponseDto<T>(false, undefined, error);
  }
}
