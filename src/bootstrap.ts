import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/shared/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/shared/interceptors/response-transform.interceptor';

const DEV_BRANCH_NAME = 'dev';
const DEV_BRANCH_FALLBACK_ORIGIN = 'https://dev-borrow-hub.ijinhub.com';
const DEFAULT_LOCAL_ORIGINS = ['http://localhost:4200'];

const normalizeOrigin = (value: string) =>
  value.endsWith('/') ? value.slice(0, -1) : value;

const addOriginIfPresent = (target: Set<string>, value?: string | null) => {
  if (value) {
    target.add(normalizeOrigin(value));
  }
};

export const resolveCorsOrigins = (): string[] => {
  const env = process.env.NODE_ENV ?? 'development';
  const vercelEnv = process.env.VERCEL_ENV ?? '';
  const branch = (process.env.VERCEL_GIT_COMMIT_REF ?? '').toLowerCase();
  const isProdEnv = env === 'production' && vercelEnv !== 'preview';
  const isDevBranchDeploy = branch === DEV_BRANCH_NAME;

  const origins = new Set<string>();
  DEFAULT_LOCAL_ORIGINS.forEach((origin) => origins.add(origin));

  const devOrigin = process.env.CORS_ORIGIN_DEV ?? DEV_BRANCH_FALLBACK_ORIGIN;
  const prodOrigin = process.env.CORS_ORIGIN_PROD;

  if (isDevBranchDeploy) {
    addOriginIfPresent(origins, devOrigin);
    addOriginIfPresent(origins, DEV_BRANCH_FALLBACK_ORIGIN);
  } else if (isProdEnv) {
    addOriginIfPresent(origins, prodOrigin);
  } else {
    addOriginIfPresent(origins, devOrigin);
  }

  return Array.from(origins);
};

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: resolveCorsOrigins(),
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
