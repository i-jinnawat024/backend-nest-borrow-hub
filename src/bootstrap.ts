import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  const env = process.env.NODE_ENV || 'development';
   const rawOrigins =
     env === 'production'
       ? process.env.CORS_ORIGIN_PROD
       : process.env.CORS_ORIGIN_DEV;
   const corsOrigins = (rawOrigins ?? '')
     .split(',')
     .map((o) => o.trim())
     .filter(Boolean);
   app.setGlobalPrefix('api');
   app.enableCors({
     origin: corsOrigins,
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
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
