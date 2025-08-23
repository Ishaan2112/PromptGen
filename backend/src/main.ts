import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3001', 
      'http://localhost:3000',
      'https://your-frontend-domain.vercel.app', // Update this with your actual frontend domain
      'https://your-frontend-domain.netlify.app', // Update this with your actual frontend domain
      process.env.CORS_ORIGIN // Allow environment variable override
    ].filter(Boolean), // Remove undefined values
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
