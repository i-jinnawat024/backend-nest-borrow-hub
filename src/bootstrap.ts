import { INestApplication, ValidationPipe } from '@nestjs/common';

import { buildCorsOptions } from './common/config/cors.config';
import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/shared/interceptors/response-transform.interceptor';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.enableCors(buildCorsOptions());

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
