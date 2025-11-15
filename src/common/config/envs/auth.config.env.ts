import { registerAs } from '@nestjs/config';

export const ENV_AUTH_JWT_SECRET = 'auth.jwt.secret';
export const ENV_AUTH_JWT_EXPIRES_IN = 'auth.jwt.expiresIn';

export default registerAs('auth', () => {
  const parsedExpiresIn = Number(process.env.JWT_EXPIRES_IN);
  const expiresIn = Number.isFinite(parsedExpiresIn) ? parsedExpiresIn : 3600;

  return {
    jwt: {
      secret: process.env.JWT_SECRET ?? 'borrow-hub-secret',
      expiresIn,
    },
  };
});

