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
  signup: (email: string, password: string, name: string, role: 'host' | 'guest') => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateUserRsvp: (status: 'attending' | 'not-attending' | 'pending') => Promise<void>;
  isLoading: boolean;
  connectionError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    // Check active session and set the user
    const getSession = async () => {
      setIsLoading(true);
      try {
        console.log('Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (error.message?.includes('fetch')) {
            setConnectionError('Network connectivity issue. Please check your internet connection.');
          } else {
            setConnectionError(error.message);
          }
          return;
        }
        
        setConnectionError(null);
        console.log('Session data:', session ? 'Session found' : 'No session');
        
        if (session?.user) {
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error: any) {
        console.error('Error getting session:', error);
        setConnectionError(error?.message || 'Failed to connect to authentication service');
      } finally {
        setIsLoading(false);
      }
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
      
      // First check if profiles table exists
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        if (error.code === '42P01') {
          console.error('Profiles table does not exist');
          toast.error('Database not properly configured. Please contact support.');
          return;
        }
        
        if (error.code === 'PGRST116') {
          console.warn('No profile found for user ID:', userId);
          
          // Try to create a profile if it doesn't exist
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData && userData.user) {
            const { error: createError } = await supabase
              .from('profiles')
              .insert([{
                id: userData.user.id,
                email: userData.user.email,
                name: userData.user.user_metadata?.name || 'New User',
                role: 'guest',
                rsvp_status: 'pending'
              }]);
              
            if (createError) {
              console.error('Failed to create missing profile:', createError);
              toast.error('Failed to create user profile. Please contact support.');
            } else {
              // Try fetching the profile again
              const { data: newData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
                
              if (newData) {
                setUserData(newData);
                return;
              }
            }
          }
          
          toast.error('User profile not found. Please contact support.');
          return;
        }
        
        throw error;
      }
      
      if (data) {
        setUserData(data);
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      toast.error(`Profile error: ${error.message || 'Unknown error'}`);
    }
  };
  
  const setUserData = async (profileData: any) => {
    console.log('Profile data:', profileData);
    
    try {
      // Get room allocation if exists
      const { data: roomData, error: roomError } = await supabase
        .from('room_allocations')
        .select('*')
        .eq('user_id', profileData.id)
        .single();
        
      if (roomError && roomError.code !== 'PGRST116') {
        console.error('Error fetching room allocation:', roomError);
      }

      setUser({
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
        role: profileData.role || 'guest',
        rsvpStatus: profileData.rsvp_status || 'pending',
        ...(roomData && {
          roomAllocation: {
            roomNumber: roomData.room_number,
            wifiUsername: roomData.wifi_username,
            wifiPassword: roomData.wifi_password
          }
        })
      });
    } catch (error) {
      console.error('Error setting user data:', error);
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
        
        if (error.message.includes('Failed to fetch')) {
          toast.error('Network error connecting to authentication service. Please check your internet connection.');
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email before signing in');
        } else {
          toast.error('Login failed: ' + error.message);
        }
        throw error;
      }

      setConnectionError(null);
      
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
      if (error) {
        if (error.message?.includes('fetch')) {
          toast.error('Network error while logging out. You may still be logged in on this device.');
        } else {
          toast.error('Failed to log out: ' + error.message);
        }
        throw error;
      }
      
      setUser(null);
      toast.success('You have been logged out');
    } catch (error: any) {
      console.error('Error logging out:', error);
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

      if (error) {
        if (error.message?.includes('fetch')) {
          toast.error('Network error while updating RSVP status. Please try again when your connection improves.');
        } else {
          toast.error('Failed to update RSVP status: ' + error.message);
        }
        throw error;
      }

      setUser({ ...user, rsvpStatus: status });
      toast.success(`Your RSVP status has been updated to ${status}`);
    } catch (error: any) {
      console.error('Error updating RSVP status:', error);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'host' | 'guest') => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error('Signup failed', { description: error.message });
        throw error;
      }
      if (data.user) {
        // Insert into profiles table
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            email,
            name,
            role,
            rsvp_status: 'pending',
          },
        ]);
        if (profileError) {
          toast.error('Profile creation failed', { description: profileError.message });
          throw profileError;
        }
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseUser,
      login, 
      signup,
      logout, 
      isAuthenticated: !!user,
      updateUserRsvp,
      isLoading,
      connectionError
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
