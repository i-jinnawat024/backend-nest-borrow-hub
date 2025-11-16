import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/shared/interceptors/response-transform.interceptor';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  const env = process.env.NODE_ENV || 'development';
   const rawOrigins =
     env === 'production'
       ? process.env.CORS_ORIGIN_PROD
       : process.env.CORS_ORIGIN_DEV;

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
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
}
