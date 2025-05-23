
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase, testSupabaseConnection } from '@/lib/supabase';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    checking: boolean;
    connected: boolean;
    message: string;
  }>({ checking: true, connected: false, message: 'Checking connection...' });

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      setConnectionStatus({ checking: true, connected: false, message: 'Checking connection...' });
      
      try {
        const result = await testSupabaseConnection();
        
        if (result.success) {
          setConnectionStatus({ 
            checking: false, 
            connected: true, 
            message: 'Connected to Supabase successfully' 
          });
        } else {
          setConnectionStatus({ 
            checking: false, 
            connected: false, 
            message: result.message || 'Failed to connect to Supabase' 
          });
          console.error('Connection check failed:', result.error);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setConnectionStatus({ 
          checking: false, 
          connected: false, 
          message: 'Error checking connection to Supabase' 
        });
      }
    };
    
    checkConnection();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!connectionStatus.connected) {
      toast.error('Cannot sign up: No connection to Supabase. Please check your internet connection and try again.');
      return;
    }

    try {
      setSignupLoading(true);
      console.log('Starting signup process for:', email);
      
      // First, check if the profiles table exists by trying to select from it
      const { data: testData, error: testError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (testError) {
        console.error('Profiles table check error:', testError);
        
        if (testError.code === '42P01') {
          toast.error('Database not properly configured: "profiles" table not found');
          return;
        }
        
        toast.error(`Database error: ${testError.message}`);
        return;
      }
      
      // Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        
        if (error.message?.includes('Failed to fetch')) {
          toast.error('Network error connecting to authentication service. Please check your internet connection.');
        } else if (error.message?.includes('User already registered')) {
          toast.error('This email is already registered. Please try logging in instead.');
        } else if (error.message?.includes('Invalid email')) {
          toast.error('Please enter a valid email address.');
        } else {
          toast.error(`Sign up failed: ${error.message}`);
        }
        return;
      }

      console.log('Auth signup successful:', data);

      if (data?.user) {
        console.log('Creating profile for user:', data.user.id);
        
        // Then create a profile record (this should now be handled by the database trigger)
        // But we'll try to create it manually as a fallback
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              name, 
              email,
              role: 'guest',
              rsvp_status: 'pending'
            }
          ]);

        if (profileError && profileError.code !== '23505') { // Ignore duplicate key errors
          console.error('Failed to create profile:', profileError);
          
          if (profileError.code === '42501') {
            toast.error('Permission denied creating profile. Database security settings need to be configured.');
          } else {
            toast.error(`Profile creation issue: ${profileError.message}`);
          }
        } else {
          console.log('Profile created successfully or already exists');
          
          if (data.user.email_confirmed_at) {
            toast.success('Account created successfully! You can now sign in.');
          } else {
            toast.success('Account created! Please check your email to confirm your account before signing in.');
          }
          
          setIsSignUp(false);
          // Clear the sign-up form
          setName('');
          setEmail('');
          setPassword('');
        }
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(`Unexpected error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connectionStatus.connected) {
      toast.error('Cannot proceed: No connection to Supabase. Please check your internet connection and try again.');
      return;
    }
    
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await login(email, password);
        navigate(location.state?.from || '/events/dashboard');
      }
    } catch (error: any) {
      // Error is already handled in the login function
      console.error('Login/Signup submission error:', error);
    }
  };

  // Connection status alert
  const renderConnectionStatus = () => {
    if (connectionStatus.checking) {
      return (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <Loader2 className="h-4 w-4 animate-spin text-yellow-600 mr-2" />
          <AlertDescription className="text-yellow-700">
            Checking connection to Supabase...
          </AlertDescription>
        </Alert>
      );
    }
    
    if (!connectionStatus.connected) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {connectionStatus.message}. Some features may not work correctly.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pink-600">Welcome to ShaadiHub</h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'Create a new account' : 'Please sign in to continue'}
          </p>
        </div>
        
        {renderConnectionStatus()}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={isSignUp}
                disabled={!connectionStatus.connected || signupLoading || isLoading}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={!connectionStatus.connected || signupLoading || isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (min 6 characters)"
              required
              minLength={6}
              disabled={!connectionStatus.connected || signupLoading || isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90"
            disabled={!connectionStatus.connected || isLoading || signupLoading}
          >
            {isLoading || signupLoading ? (
              <span className="flex items-center">
                <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-pink-600 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={!connectionStatus.connected || signupLoading || isLoading}
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>

        <div className="space-y-4">
          <Separator />
          <div className="text-center text-sm">
            <p className="font-medium text-muted-foreground mb-2">Test Credentials</p>
            <div className="space-y-2">
              <div className="p-2 rounded bg-pink-50">
                <p className="font-medium text-pink-600">Host Account:</p>
                <p>Email: host@example.com</p>
                <p>Password: password123</p>
              </div>
              <div className="p-2 rounded bg-pink-50">
                <p className="font-medium text-pink-600">Guest Account:</p>
                <p>Email: guest@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </div>
        
        {connectionStatus.connected && (
          <div className="flex items-center justify-center text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Connected to Supabase
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
