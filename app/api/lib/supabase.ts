import { createClient } from "@supabase/supabase-js";

const URL: string = process.env.EXPO_PUBLIC_DB_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_API_KEY || '';

export const supabase = createClient(URL, SUPABASE_ANON_KEY);
