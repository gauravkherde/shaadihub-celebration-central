
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use demo credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://larhxmriqwztvgzjszif.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhcmh4bXJpcXd6dHZnempzemlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NjgwODgsImV4cCI6MjAzNTM0NDA4OH0.LOu-5Kp1P67k_zh9Bw3Da5Jrx0-qpBIdYRYqZCBOGug';

// Validate configuration
if (!supabaseUrl.includes('supabase.co')) {
  console.error('Invalid Supabase URL. Please check your configuration.');
}

if (supabaseAnonKey.length < 100) {
  console.error('Invalid Supabase anon key. Please check your configuration.');
}

// Log for debugging
console.log('Initializing Supabase with:', { 
  supabaseUrl, 
  supabaseAnonKey: 'Key length: ' + supabaseAnonKey.length,
  isProduction: import.meta.env.PROD 
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully');
  }
});
