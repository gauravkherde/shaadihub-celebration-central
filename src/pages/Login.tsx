
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useDemoAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    toast.success('Welcome to ShaadiHub!');
    navigate(location.state?.from || '/events/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-shaadi-cream to-shaadi-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-shaadi-maroon">Welcome to ShaadiHub</h1>
          <p className="text-muted-foreground mt-2">Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>
          
          <Button type="submit" className="w-full bg-shaadi-red hover:bg-shaadi-maroon">
            Sign In
          </Button>
        </form>

        <div className="space-y-4">
          <Separator />
          <div className="text-center text-sm">
            <p className="font-medium text-muted-foreground mb-2">Demo Credentials</p>
            <div className="space-y-2">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium text-shaadi-maroon">Host Account:</p>
                <p>Email: demo@shaadihub.com</p>
                <p>Password: demo123</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium text-shaadi-maroon">Guest Account:</p>
                <p>Email: guest@shaadihub.com</p>
                <p>Password: guest123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
