import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
		user: env.DATABASE_USERNAME,
		password: env.DATABASE_PASSWORD,
  },
  tablesFilter: ["autolifts_*"],
} satisfies Config;
