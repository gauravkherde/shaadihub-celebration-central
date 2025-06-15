
-- First, disable RLS temporarily to avoid permission issues during cleanup
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_allocations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Hosts can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own room allocation" ON public.room_allocations;
DROP POLICY IF EXISTS "Hosts can manage room allocations" ON public.room_allocations;
DROP POLICY IF EXISTS "Everyone can view events" ON public.events;
DROP POLICY IF EXISTS "Hosts can manage events" ON public.events;
DROP POLICY IF EXISTS "Everyone can view guests" ON public.guests;
DROP POLICY IF EXISTS "Hosts can manage guests" ON public.guests;
DROP POLICY IF EXISTS "Everyone can view channels" ON public.channels;
DROP POLICY IF EXISTS "Hosts can manage channels" ON public.channels;
DROP POLICY IF EXISTS "Everyone can view messages" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
DROP POLICY IF EXISTS "Everyone can view tasks" ON public.tasks;
DROP POLICY IF EXISTS "Hosts can manage tasks" ON public.tasks;
DROP POLICY IF EXISTS "Everyone can view announcements" ON public.announcements;
DROP POLICY IF EXISTS "Hosts can manage announcements" ON public.announcements;

-- Delete all data from tables (in correct order to respect foreign keys)
DELETE FROM public.messages;
DELETE FROM public.tasks;
DELETE FROM public.guests;
DELETE FROM public.room_allocations;
DELETE FROM public.events;
DELETE FROM public.channels;
DELETE FROM public.announcements;
DELETE FROM public.profiles;

-- Drop and recreate trigger function if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Reset sequences/auto-increment if needed
-- (UUIDs don't need sequence reset, but just in case there are any)
