
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://larhxmriqwztvgzjszif.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhcmh4bXJpcXd6dHZnempzemlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NjgwODgsImV4cCI6MjAzNTM0NDA4OH0.LOu-5Kp1P67k_zh9Bw3Da5Jrx0-qpBIdYRYqZCBOGug';

// Log for debugging
console.log('Initializing Supabase with:', { supabaseUrl, supabaseAnonKey: 'Key length ' + supabaseAnonKey.length });

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
