
import { createClient } from '@supabase/supabase-js';

// Try to get environment variables
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If environment variables are not set, use hardcoded default values
// This is a workaround for development and should be properly set up in production
if (!supabaseUrl) {
  console.warn('VITE_SUPABASE_URL not found in environment variables, using default URL');
  // You should replace this with your actual Supabase URL
  supabaseUrl = 'https://your-project-url.supabase.co';
}

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY not found in environment variables, using default key');
  // You should replace this with your actual Supabase anon key
  supabaseAnonKey = 'your-supabase-anon-key';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
