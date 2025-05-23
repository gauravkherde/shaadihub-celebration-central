
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use demo credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://larhxmriqwztvgzjszif.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhcmh4bXJpcXd6dHZnempzemlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NjgwODgsImV4cCI6MjAzNTM0NDA4OH0.LOu-5Kp1P67k_zh9Bw3Da5Jrx0-qpBIdYRYqZCBOGug';

// Add debug information
console.log('Supabase configuration:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0,
  isDevelopment: import.meta.env.DEV
});

// Create client with fetch options for better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args: Parameters<typeof fetch>) => {
      return fetch(...args).catch(err => {
        console.error('Supabase fetch error:', err);
        throw err;
      });
    }
  }
});

// Test the connection and provide detailed error information
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error.message, error);
    // Check common error causes
    if (error.message?.includes('fetch')) {
      console.error('Network connectivity issue detected. Please check your internet connection or firewall settings.');
    }
    if (error.message?.includes('invalid') && error.message?.includes('key')) {
      console.error('API key validation failed. Please check your Supabase project settings.');
    }
  } else {
    console.log('Supabase connected successfully', data.session ? 'with active session' : 'no active session');
  }
}).catch(err => {
  console.error('Unexpected error testing Supabase connection:', err);
});

// Add a helper to check if the connection is valid
export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      if (error.code === '42P01') {
        return { success: false, message: 'Table "profiles" not found. Please create required tables.', error };
      }
      return { success: false, message: `Database error: ${error.message}`, error };
    }
    
    return { success: true, message: 'Connected to Supabase successfully' };
  } catch (err) {
    console.error('Connection test error:', err);
    return { success: false, message: 'Failed to connect to Supabase', error: err };
  }
};
