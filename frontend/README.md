# PromptGen Backend

A production-ready NestJS backend application with Google Gemini AI integration, featuring comprehensive API endpoints, validation, testing, and Docker deployment.

## 🚀 Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **Google Gemini AI Integration**: Intelligent responses and car data analysis
- **RESTful API**: Complete CRUD operations for car data
- **Request Validation**: DTOs with class-validator and class-transformer
- **Swagger Documentation**: OpenAPI 3.0 specification
- **Environment Configuration**: Secure configuration management
- **Structured Logging**: NestJS Pino integration
- **CORS Support**: Frontend integration ready
- **Rate Limiting**: AI endpoints protection
- **Health Checks**: Application monitoring endpoints
- **Comprehensive Testing**: Unit and E2E tests with Jest
- **Docker Support**: Production and development containers
- **Error Handling**: Structured error responses
- **Security**: Helmet, compression, and best practices

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker and Docker Compose (for containerized deployment)
- Google Gemini API key

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd promptgen-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   pnpm run start:dev
   ```

### Docker Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Docker Production

```bash
# Start production environment
docker-compose up --build

# Stop production environment
docker-compose down
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Application environment | `development` | No |
| `PORT` | Server port | `3001` | No |
| `GEMINI_API_KEY` | Google Gemini API key | - | Yes |
| `CORS_ORIGIN` | CORS origin | `http://localhost:3000` | No |
| `THROTTLE_TTL` | Rate limit time window (seconds) | `60` | No |
| `THROTTLE_LIMIT` | Rate limit requests per window | `10` | No |
| `LOG_LEVEL` | Logging level | `info` | No |

### Google Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## 📚 API Documentation

### Swagger UI

Once the application is running, visit:
- **Development**: http://localhost:3001/api
- **Production**: http://localhost:3001/api

### API Endpoints

#### Health Checks
- `GET /health` - Comprehensive health check
- `GET /health/ping` - Simple ping endpoint
- `GET /health/ready` - Readiness check

#### Cars
- `GET /cars` - Get all cars (with optional filters)
- `GET /cars/:id` - Get car by ID
- `POST /cars` - Create new car
- `PATCH /cars/:id` - Update car
- `DELETE /cars/:id` - Delete car

#### AI Services
- `POST /ai/query` - Generate AI response
- `POST /ai/analyze-car` - Analyze car data with AI
- `GET /ai/prompt-suggestions/:category` - Generate prompt suggestions
- `GET /ai/status` - Check AI service status

### Response Format

All API responses follow a consistent structure:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:cov
```

### End-to-End Tests
```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in watch mode
pnpm test:e2e:watch
```

### Test Coverage

The project includes comprehensive test coverage for:
- Service methods
- Controller endpoints
- DTO validation
- Error handling
- AI service integration (mocked)

## 🐳 Docker

### Development Container

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Features:
- Hot reload enabled
- Source code mounted
- Development dependencies
- Debug logging

### Production Container

```bash
docker-compose up --build
```

Features:
- Multi-stage build
- Optimized for production
- Non-root user
- Health checks
- Minimal image size

## 📁 Project Structure

```
src/
├── common/                 # Shared utilities
│   ├── dto/               # Common DTOs
│   ├── filters/           # Exception filters
│   └── interceptors/      # Response interceptors
├── health/                # Health check module
├── car/                   # Car management module
│   ├── dto/               # Car DTOs
│   ├── entities/          # Car entities
│   ├── car.controller.ts  # Car endpoints
│   ├── car.service.ts     # Car business logic
│   └── car.module.ts      # Car module
├── ai/                    # AI integration module
│   ├── dto/               # AI DTOs
│   ├── ai.controller.ts   # AI endpoints
│   ├── ai.service.ts      # AI business logic
│   └── ai.module.ts       # AI module
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: AI endpoint protection
- **Input Validation**: DTO validation
- **Error Handling**: Secure error responses
- **Environment Variables**: Secure configuration

## 📊 Monitoring

### Health Checks

The application provides comprehensive health monitoring:

- **Application Health**: Overall system status
- **Memory Usage**: Heap and RSS monitoring
- **Disk Space**: Storage threshold monitoring
- **External Dependencies**: API connectivity checks

### Logging

Structured logging with Pino:
- Request/response logging
- Error tracking
- Performance monitoring
- Environment-specific log levels

## 🚀 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   pnpm run build
   ```

2. **Set environment variables**
   ```bash
   cp env.example .env
   # Configure production values
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose up -d
   ```

### Environment-Specific Configurations

- **Development**: Hot reload, debug logging
- **Production**: Optimized builds, production logging
- **Testing**: Mocked services, test databases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api`
- Review the health endpoints at `/health`

## 🔮 Future Enhancements

- Database integration (TypeORM/Prisma)
- Redis caching
- Authentication & authorization
- WebSocket support
- GraphQL API
- Microservices architecture
- Kubernetes deployment
- CI/CD pipeline
- Performance monitoring
- API analytics
