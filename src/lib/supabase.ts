import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// [C-01] PROD TIP: Use Supavisor connection string (Transaction Mode) 
// for serverless functions to prevent connection exhaustion at scale.
// Example: postgres://[user].[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
