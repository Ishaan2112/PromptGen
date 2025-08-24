# PromptGen Tool

A comprehensive prompt generation and management system built with Next.js frontend and NestJS backend, featuring Google Gemini AI integration for intelligent prompt enhancement and generation.

## 🏗️ Project Structure

```
promptgen-tool/
├── frontend/          # Next.js React application
│   ├── app/          # App router components
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles and CSS
├── backend/           # NestJS API server
│   ├── src/          # Source code
│   │   ├── ai/       # AI integration module
│   │   ├── prompt/   # Prompt management module
│   │   ├── health/   # Health check module
│   │   └── common/   # Shared utilities
│   └── test/         # Test files
└── README.md          # This file
```

## 🚀 Features

### Frontend (Next.js)
- **Modern UI**: Built with Next.js 15 and React 19
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive UI components using Radix UI
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized with Next.js App Router

### Backend (NestJS)
- **RESTful API**: Complete CRUD operations for prompts
- **AI Integration**: Google Gemini AI for prompt enhancement
- **Validation**: Request validation with DTOs and class-validator
- **Documentation**: Swagger/OpenAPI 3.0 specification
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Structured logging with Pino
- **Testing**: Comprehensive unit and E2E tests

### Core Functionality
- **Prompt Management**: Create, read, update, delete prompts
- **AI Enhancement**: Use AI to improve existing prompts
- **Smart Search**: Search prompts by content, tags, and categories
- **Categorization**: Organize prompts by difficulty and type
- **Usage Tracking**: Monitor prompt effectiveness and usage

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker and Docker Compose (optional)
- Google Gemini API key

## 🛠️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd promptgen-tool
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
pnpm dev
```

### 3. Backend Setup
```bash
cd backend
pnpm install
pnpm run start:dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 🔧 Configuration

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PromptGen Tool
```

### Backend Environment Variables
```env
NODE_ENV=development
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
THROTTLE_TTL=60
THROTTLE_LIMIT=10
LOG_LEVEL=info
```

## 📚 API Endpoints

### Prompts
- `GET /prompts` - Get all prompts with filters
- `GET /prompts/:id` - Get prompt by ID
- `POST /prompts` - Create new prompt
- `PATCH /prompts/:id` - Update prompt
- `DELETE /prompts/:id` - Delete prompt
- `POST /prompts/:id/use` - Increment usage count

### AI Services
- `POST /ai/query` - Generate AI response
- `POST /ai/analyze-prompt` - Analyze prompt with AI
- `POST /ai/enhance-prompt` - Enhance prompt using AI
- `GET /ai/prompt-suggestions/:category` - Get AI suggestions

### Health Checks
- `GET /health` - Comprehensive health check
- `GET /health/ping` - Simple ping
- `GET /health/ready` - Readiness check

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
pnpm test
pnpm test:watch
```

### Backend Tests
```bash
cd backend
pnpm test              # Unit tests
pnpm test:e2e         # End-to-end tests
pnpm test:cov         # Coverage report
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker-compose up --build
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
pnpm build
# Deploy dist/ folder to your hosting platform
```

### Backend (Any Node.js Host)
```bash
cd backend
pnpm run build
pnpm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api`
- Review the health endpoints at `/health`

## 🔮 Future Enhancements

- **Database Integration**: PostgreSQL with TypeORM/Prisma
- **Authentication**: JWT-based user management
- **Real-time Features**: WebSocket support for collaborative editing
- **Advanced AI**: Multi-model support and fine-tuning
- **Analytics**: Prompt performance metrics and insights
- **Mobile App**: React Native companion application
- **API Gateway**: Rate limiting and caching layer
- **Monitoring**: Prometheus metrics and Grafana dashboards
