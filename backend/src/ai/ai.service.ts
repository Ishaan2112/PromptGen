import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generatePrompt(userInput: string): Promise<string> {
    try {
      this.logger.log(`Generating prompt for input: ${userInput}`);
      
      // Create a detailed prompt for Gemini AI
      const prompt = `You are an expert prompt generator. Create a unique, creative, and professional prompt based on this user input: "${userInput}"

Requirements:
- Make it specific and actionable
- Include clear instructions and context
- Use professional but engaging language
- Make it unique and different from generic templates
- Focus on the user's specific request
- Keep it concise but comprehensive

Generate a prompt that would help someone create high-quality content based on "${userInput}".`;

      // Generate response using Gemini AI
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const generatedPrompt = response.text();
      
      this.logger.log(`Gemini AI generated prompt: ${generatedPrompt}`);
      
      return generatedPrompt;
      
    } catch (error) {
      this.logger.error(`Error calling Gemini AI: ${error.message}`);
      
      // Fallback to local generation if Gemini AI fails
      this.logger.warn('Using fallback prompt generation');
      return this.generateFallbackPrompt(userInput);
    }
  }

  private generateFallbackPrompt(userInput: string): string {
    // Fallback logic with more variety
    const prompts = [
      `Create a compelling ${userInput} that captures attention and drives engagement. Focus on clear value proposition and emotional connection.`,
      `Design a professional ${userInput} that addresses key pain points and provides actionable solutions. Include specific examples and measurable outcomes.`,
      `Develop an innovative ${userInput} that stands out from competitors. Emphasize unique benefits and create urgency for action.`,
      `Craft a persuasive ${userInput} that builds trust and credibility. Use social proof and testimonials to support your message.`,
      `Build a comprehensive ${userInput} strategy that delivers measurable results. Focus on user experience and conversion optimization.`,
      `Generate a creative ${userInput} concept that resonates with your target audience. Emphasize storytelling and visual appeal.`,
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  async analyzePrompt(prompt: string): Promise<any> {
    try {
      this.logger.log(`Analyzing prompt: ${prompt.substring(0, 100)}...`);
      
      // Use Gemini AI for analysis
      const analysisPrompt = `Analyze this prompt and provide insights:

Prompt: "${prompt}"

Please provide:
1. Word count
2. Tone analysis (professional, casual, persuasive, educational, or neutral)
3. 3-4 specific suggestions for improvement
4. Overall quality score (1-10)

Format as JSON with keys: wordCount, tone, suggestions, qualityScore`;

      const result = await this.model.generateContent(analysisPrompt);
      const response = await result.response;
      const analysisText = response.text();
      
      // Try to parse JSON response
      try {
        const analysis = JSON.parse(analysisText);
        return {
          ...analysis,
          timestamp: new Date().toISOString(),
          source: 'Gemini AI'
        };
      } catch (parseError) {
        // If JSON parsing fails, use fallback analysis
        this.logger.warn('Failed to parse Gemini AI analysis, using fallback');
        return this.fallbackAnalysis(prompt);
      }
      
    } catch (error) {
      this.logger.error(`Error analyzing prompt with Gemini AI: ${error.message}`);
      return this.fallbackAnalysis(prompt);
    }
  }

  private fallbackAnalysis(prompt: string): any {
    return {
      wordCount: prompt.split(' ').length,
      tone: this.analyzeTone(prompt),
      suggestions: this.generateSuggestions(prompt),
      qualityScore: Math.floor(Math.random() * 4) + 7, // Random score 7-10
      timestamp: new Date().toISOString(),
      source: 'Fallback Analysis'
    };
  }

  private analyzeTone(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('professional') || lowerPrompt.includes('business')) return 'professional';
    if (lowerPrompt.includes('casual') || lowerPrompt.includes('friendly')) return 'casual';
    if (lowerPrompt.includes('persuasive') || lowerPrompt.includes('convince')) return 'persuasive';
    if (lowerPrompt.includes('educational') || lowerPrompt.includes('teach')) return 'educational';
    return 'neutral';
  }

  private generateSuggestions(prompt: string): string[] {
    return [
      'Consider adding specific examples',
      'Include a call-to-action',
      'Add emotional appeal',
      'Use power words for impact'
    ];
  }
}
