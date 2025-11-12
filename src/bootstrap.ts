import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:4200'], // frontend origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // ถ้าใช้ cookie/token
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
}
