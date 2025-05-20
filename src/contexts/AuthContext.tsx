
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'host' | 'guest';
  roomAllocation?: {
    roomNumber: string;
    wifiUsername: string;
    wifiPassword: string;
  };
  rsvpStatus: 'attending' | 'not-attending' | 'pending';
}

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateUserRsvp: (status: 'attending' | 'not-attending' | 'pending') => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session and set the user
    const getSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change event:', event);
        if (event === 'SIGNED_IN' && session?.user) {
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setSupabaseUser(null);
          setUser(null);
        }
      }
    );

    getSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      if (data) {
        console.log('Profile data:', data);
        // Get room allocation if exists
        const { data: roomData } = await supabase
          .from('room_allocations')
          .select('*')
          .eq('user_id', userId)
          .single();

        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          rsvpStatus: data.rsvp_status || 'pending',
          ...(roomData && {
            roomAllocation: {
              roomNumber: roomData.room_number,
              wifiUsername: roomData.wifi_username,
              wifiPassword: roomData.wifi_password
            }
          })
        });
      } else {
        console.warn('No profile found for user ID:', userId);
        // If no profile exists, we might need to create one with defaults
        toast.error('User profile not found. Please contact support.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error('Login failed', {
          description: error.message
        });
        throw error;
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.id);
        toast.success('Welcome to ShaadiHub!');
        await fetchUserProfile(data.user.id);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRsvp = async (status: 'attending' | 'not-attending' | 'pending') => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ rsvp_status: status })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, rsvpStatus: status });
    } catch (error) {
      console.error('Error updating RSVP status:', error);
      toast.error('Failed to update RSVP status');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseUser,
      login, 
      logout, 
      isAuthenticated: !!user,
      updateUserRsvp,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
