import { createClient } from '@supabase/supabase-js';

// Try to get environment variables
let supabaseUrl =  'https://duakxtwqzvsplbczxzyz.supabase.co';
let supabaseAnonKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1YWt4dHdxenZzcGxiY3p4enl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDc5MjEsImV4cCI6MjA2MzMyMzkyMX0.xjvsG3BCIt18Lk9Q3D65gE6xoDvRpfOvgVqub881brc';

// If environment variables are not set, use hardcoded default values
// This is a workaround for development and should be properly set up in production
if (!supabaseUrl) {
  console.warn('VITE_SUPABASE_URL not found in environment variables, using default URL');
  // You should replace this with your actual Supabase URL
  supabaseUrl = 'https://duakxtwqzvsplbczxzyz.supabase.co';
}

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY not found in environment variables, using default key');
  // You should replace this with your actual Supabase anon key
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1YWt4dHdxenZzcGxiY3p4enl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDc5MjEsImV4cCI6MjA2MzMyMzkyMX0.xjvsG3BCIt18Lk9Q3D65gE6xoDvRpfOvgVqub881brc';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
