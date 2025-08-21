import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiQueryDto } from './dto/ai-query.dto';

// Mock Google Generative AI
const mockGenerateContent = jest.fn();
const mockResponse = {
  text: jest.fn().mockResolvedValue('Mocked AI response'),
};

const mockModel = {
  generateContent: mockGenerateContent,
};

const mockGenAI = {
  getGenerativeModel: jest.fn().mockReturnValue(mockModel),
};

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => mockGenAI),
}));

describe('AiService', () => {
  let service: AiService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should generate AI response successfully', async () => {
      mockGenerateContent.mockResolvedValue(mockResponse);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
        context: 'For high school students',
        responseType: 'creative',
      };

      const result = await service.generateResponse(aiQueryDto);

      expect(result).toBe('Mocked AI response');
      expect(mockGenerateContent).toHaveBeenCalledWith(
        'Context: For high school students\n\nQuery: Generate a creative writing prompt\n\nPlease provide a creative response.'
      );
    });

    it('should generate response without context and responseType', async () => {
      mockGenerateContent.mockResolvedValue(mockResponse);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
      };

      const result = await service.generateResponse(aiQueryDto);

      expect(result).toBe('Mocked AI response');
      expect(mockGenerateContent).toHaveBeenCalledWith('Generate a creative writing prompt');
    });

    it('should throw BadRequestException when AI service is not available', async () => {
      // Create service without API key
      const moduleWithoutKey = await Test.createTestingModule({
        providers: [
          AiService,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn().mockReturnValue(undefined),
            },
          },
        ],
      }).compile();

      const serviceWithoutKey = moduleWithoutKey.get<AiService>(AiService);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
      };

      await expect(serviceWithoutKey.generateResponse(aiQueryDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should handle API key errors', async () => {
      const error = new Error('API_KEY_INVALID');
      mockGenerateContent.mockRejectedValue(error);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
      };

      await expect(service.generateResponse(aiQueryDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should handle quota exceeded errors', async () => {
      const error = new Error('quota exceeded');
      mockGenerateContent.mockRejectedValue(error);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
      };

      await expect(service.generateResponse(aiQueryDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should handle general errors', async () => {
      const error = new Error('General error');
      mockGenerateContent.mockRejectedValue(error);

      const aiQueryDto: AiQueryDto = {
        query: 'Generate a creative writing prompt',
      };

      await expect(service.generateResponse(aiQueryDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('analyzeCarData', () => {
    it('should analyze car data successfully', async () => {
      mockGenerateContent.mockResolvedValue(mockResponse);

      const carData = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 25000,
        mileage: 15000,
      };

      const result = await service.analyzeCarData(carData);

      expect(result).toBe('Mocked AI response');
      expect(mockGenerateContent).toHaveBeenCalledWith(
        expect.stringContaining('Toyota')
      );
    });
  });

  describe('generatePromptSuggestions', () => {
    it('should generate prompt suggestions successfully', async () => {
      mockGenerateContent.mockResolvedValue(mockResponse);

      const category = 'creative-writing';

      const result = await service.generatePromptSuggestions(category);

      expect(result).toBe('Mocked AI response');
      expect(mockGenerateContent).toHaveBeenCalledWith(
        expect.stringContaining('creative-writing')
      );
    });
  });
});
