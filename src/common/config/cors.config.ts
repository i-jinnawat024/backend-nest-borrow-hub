import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:4200'];

const parseOrigins = (origins?: string): string[] =>
  origins
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const resolveTargetEnv = (): string =>
  (
    process.env.APP_ENV ??
    process.env.VERCEL_ENV ??
    process.env.NODE_ENV ??
    'development'
  ).toLowerCase();

export const buildCorsOptions = (): CorsOptions => {
  const targetEnv = resolveTargetEnv();

  const primaryOrigins =
    targetEnv === 'production'
      ? parseOrigins(process.env.CORS_ORIGIN_PROD)
      : parseOrigins(process.env.CORS_ORIGIN_DEV);

  const fallbackOrigins =
    targetEnv === 'production'
      ? parseOrigins(process.env.CORS_ORIGIN_DEV)
      : parseOrigins(process.env.CORS_ORIGIN_PROD);

  const allowedOrigins = Array.from(
    new Set([
      ...primaryOrigins,
      ...(primaryOrigins.length === 0 ? fallbackOrigins : []),
      ...DEFAULT_ALLOWED_ORIGINS,
    ]),
  );

  return {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
};
