import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.CONNECTION_STRING!,
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASSWORD!

  },
} satisfies Config;
