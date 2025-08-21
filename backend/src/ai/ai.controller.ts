import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-prompt')
  async generatePrompt(@Body() body: { userInput: string }) {
    const generatedPrompt = await this.aiService.generatePrompt(body.userInput);
    return {
      success: true,
      data: {
        prompt: generatedPrompt,
        timestamp: new Date().toISOString()
      }
    };
  }

  @Post('analyze-prompt')
  async analyzePrompt(@Body() body: { prompt: string }) {
    const analysis = await this.aiService.analyzePrompt(body.prompt);
    return {
      success: true,
      data: analysis
    };
  }

  @Get('health')
  async health() {
    return {
      success: true,
      message: 'AI service is running',
      timestamp: new Date().toISOString()
    };
  }
}
