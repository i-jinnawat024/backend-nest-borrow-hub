import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configureApp } from './bootstrap';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/shared/interceptors/response-transform.interceptor';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';
  const rawOrigins =
    env === 'production'
      ? process.env.CORS_ORIGIN_PROD
      : process.env.CORS_ORIGIN_DEV;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [rawOrigins, 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
