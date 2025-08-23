import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  private readonly logger = new Logger(AiController.name);
  
  constructor(private readonly aiService: AiService) {}

  @Post('generate-prompt')
  async generatePrompt(@Body() body: { userInput: string }) {
    this.logger.log(`Received generate-prompt request with input: ${body.userInput}`);
    
    try {
      const generatedPrompt = await this.aiService.generatePrompt(body.userInput);
      this.logger.log(`Generated prompt: ${generatedPrompt}`);
      
      const response = {
        success: true,
        data: {
          prompt: generatedPrompt,
          timestamp: new Date().toISOString()
        }
      };
      
      this.logger.log(`Sending response: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`Error generating prompt: ${error.message}`);
      throw error;
    }
  }

  @Post('analyze-prompt')
  async analyzePrompt(@Body() body: { prompt: string }) {
    this.logger.log(`Received analyze-prompt request with prompt: ${body.prompt}`);
    
    try {
      const analysis = await this.aiService.analyzePrompt(body.prompt);
      this.logger.log(`Analysis completed: ${JSON.stringify(analysis)}`);
      
      const response = {
        success: true,
        data: analysis
      };
      
      this.logger.log(`Sending response: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`Error analyzing prompt: ${error.message}`);
      throw error;
    }
  }

  @Get('health')
  async health() {
    this.logger.log('Health check requested');
    
    const response = {
      success: true,
      message: 'AI service is running',
      timestamp: new Date().toISOString()
    };
    
    this.logger.log(`Health response: ${JSON.stringify(response)}`);
    return response;
  }
}
