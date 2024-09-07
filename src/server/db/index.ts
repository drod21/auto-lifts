import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { type Database } from './types';

import { env } from "@/env.mjs";
import * as schema from "./schema";

const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY);

export const db = drizzle(supabase, { schema });
