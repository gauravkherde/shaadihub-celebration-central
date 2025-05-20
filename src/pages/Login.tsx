
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSignupLoading(true);
      
      // First create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Then create a profile record
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

        if (profileError) {
          console.error('Failed to create profile:', profileError);
          toast.error('Account created but profile setup failed. Please contact support.');
        } else {
          toast.success('Account created successfully! Please sign in.');
          setIsSignUp(false);
          // Clear the sign-up form
          setName('');
        }
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await login(email, password);
        navigate(location.state?.from || '/events/dashboard');
      }
    } catch (error) {
      // Error is already handled in the login function
    }
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90"
            disabled={isLoading || signupLoading}
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
      </div>
    </div>
  );
};

export default Login;
