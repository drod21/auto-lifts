import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.CONNECTION_STRING,
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
  },
  tablesFilter: ["autolifts_*"],
} satisfies Config;
