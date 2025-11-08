import { registerAs } from '@nestjs/config';

export const ENV_DB_CORE_URL = 'db.core.url';

export default registerAs('db.core', () => ({
  url: process.env.DB_URL,
}));
