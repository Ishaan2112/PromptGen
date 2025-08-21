import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiQueryDto } from './dto/ai-query.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY not found in environment variables');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      this.logger.log('Google Gemini AI initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Google Gemini AI', error);
    }
  }

  async generateResponse(aiQueryDto: AiQueryDto): Promise<string> {
    if (!this.model) {
      throw new BadRequestException('AI service is not available. Please check configuration.');
    }

    try {
      const { query, context, responseType } = aiQueryDto;
      
      // Build the prompt with context and response type
      let prompt = query;
      
      if (context) {
        prompt = `Context: ${context}\n\nQuery: ${query}`;
      }
      
      if (responseType) {
        prompt += `\n\nPlease provide a ${responseType} response.`;
      }

      this.logger.log(`Generating AI response for query: ${query.substring(0, 50)}...`);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      this.logger.log('AI response generated successfully');
      
      return text;
    } catch (error) {
      this.logger.error('Error generating AI response', error);
      
      if (error.message?.includes('API_KEY')) {
        throw new BadRequestException('Invalid API key for AI service');
      }
      
      if (error.message?.includes('quota')) {
        throw new BadRequestException('AI service quota exceeded');
      }
      
      throw new BadRequestException('Failed to generate AI response. Please try again later.');
    }
  }

  async analyzeCarData(carData: any): Promise<string> {
    if (!this.model) {
      throw new BadRequestException('AI service is not available. Please check configuration.');
    }

    try {
      const prompt = `Analyze the following car data and provide insights about the market value, trends, and recommendations:

Car Data: ${JSON.stringify(carData, null, 2)}

Please provide:
1. Market analysis
2. Value assessment
3. Recommendations for buyers/sellers
4. Any notable trends or patterns`;

      this.logger.log('Analyzing car data with AI');

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      this.logger.log('Car data analysis completed successfully');
      
      return text;
    } catch (error) {
      this.logger.error('Error analyzing car data', error);
      throw new BadRequestException('Failed to analyze car data. Please try again later.');
    }
  }

  async generatePromptSuggestions(category: string): Promise<string> {
    if (!this.model) {
      throw new BadRequestException('AI service is not available. Please check configuration.');
    }

    try {
      const prompt = `Generate 5 creative and diverse prompt suggestions for the category: "${category}"

Each suggestion should be:
- Unique and creative
- Specific and actionable
- Suitable for various skill levels
- Include context and examples

Format the response as a numbered list with brief explanations.`;

      this.logger.log(`Generating prompt suggestions for category: ${category}`);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      this.logger.log('Prompt suggestions generated successfully');
      
      return text;
    } catch (error) {
      this.logger.error('Error generating prompt suggestions', error);
      throw new BadRequestException('Failed to generate prompt suggestions. Please try again later.');
    }
  }
}
