import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generatePrompt(userInput: string): Promise<string> {
    // This is a simple prompt generation logic
    // In a real implementation, you would integrate with Google Gemini AI here
    const prompts = [
      `Create a compelling ${userInput} that captures attention and drives engagement. Focus on clear value proposition and emotional connection.`,
      `Design a professional ${userInput} that addresses key pain points and provides actionable solutions. Include specific examples and measurable outcomes.`,
      `Develop an innovative ${userInput} that stands out from competitors. Emphasize unique benefits and create urgency for action.`,
      `Craft a persuasive ${userInput} that builds trust and credibility. Use social proof and testimonials to support your message.`,
    ];
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  async analyzePrompt(prompt: string): Promise<any> {
    // Analyze the prompt and return insights
    return {
      wordCount: prompt.split(' ').length,
      tone: this.analyzeTone(prompt),
      suggestions: this.generateSuggestions(prompt),
      timestamp: new Date().toISOString()
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
