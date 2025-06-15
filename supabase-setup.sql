
-- =============================================================================
-- SUPABASE WEDDING APP SETUP SCRIPT
-- Run this script in your Supabase SQL Editor to set up the complete database
-- =============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. CREATE TABLES
-- =============================================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('host', 'guest')),
    rsvp_status TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp_status IN ('attending', 'not-attending', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Room allocations table
CREATE TABLE IF NOT EXISTS public.room_allocations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    room_number TEXT NOT NULL,
    wifi_username TEXT NOT NULL,
    wifi_password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Guests table (for event-specific guest management)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    rsvp_status TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp_status IN ('attending', 'not-attending', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Channels table (for messaging)
CREATE TABLE IF NOT EXISTS public.channels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'urgent', 'info')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 2. CREATE UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to profiles
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- 3. CREATE PROFILE ON SIGNUP TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'guest')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Hosts can view all profiles" ON public.profiles;
CREATE POLICY "Hosts can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Room allocations policies
DROP POLICY IF EXISTS "Users can view their own room allocation" ON public.room_allocations;
CREATE POLICY "Users can view their own room allocation" ON public.room_allocations
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Hosts can manage room allocations" ON public.room_allocations;
CREATE POLICY "Hosts can manage room allocations" ON public.room_allocations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Events policies
DROP POLICY IF EXISTS "Everyone can view events" ON public.events;
CREATE POLICY "Everyone can view events" ON public.events
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hosts can manage events" ON public.events;
CREATE POLICY "Hosts can manage events" ON public.events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Guests policies
DROP POLICY IF EXISTS "Everyone can view guests" ON public.guests;
CREATE POLICY "Everyone can view guests" ON public.guests
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hosts can manage guests" ON public.guests;
CREATE POLICY "Hosts can manage guests" ON public.guests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Channels policies
DROP POLICY IF EXISTS "Everyone can view channels" ON public.channels;
CREATE POLICY "Everyone can view channels" ON public.channels
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hosts can manage channels" ON public.channels;
CREATE POLICY "Hosts can manage channels" ON public.channels
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Messages policies
DROP POLICY IF EXISTS "Everyone can view messages" ON public.messages;
CREATE POLICY "Everyone can view messages" ON public.messages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create messages" ON public.messages;
CREATE POLICY "Users can create messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
CREATE POLICY "Users can update their own messages" ON public.messages
    FOR UPDATE USING (auth.uid() = user_id);

-- Tasks policies
DROP POLICY IF EXISTS "Everyone can view tasks" ON public.tasks;
CREATE POLICY "Everyone can view tasks" ON public.tasks
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hosts can manage tasks" ON public.tasks;
CREATE POLICY "Hosts can manage tasks" ON public.tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- Announcements policies
DROP POLICY IF EXISTS "Everyone can view announcements" ON public.announcements;
CREATE POLICY "Everyone can view announcements" ON public.announcements
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hosts can manage announcements" ON public.announcements;
CREATE POLICY "Hosts can manage announcements" ON public.announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'host'
        )
    );

-- =============================================================================
-- 5. INSERT SAMPLE DATA
-- =============================================================================

-- Insert sample channels
INSERT INTO public.channels (name, description) VALUES
    ('General', 'General discussion for all guests'),
    ('Wedding Updates', 'Important updates about the wedding'),
    ('Photo Sharing', 'Share your photos from the events')
ON CONFLICT DO NOTHING;

-- Insert sample announcements
INSERT INTO public.announcements (title, message, type) VALUES
    ('Welcome to ShaadiHub!', 'Welcome to our wedding celebration platform. Here you can find all event details, chat with other guests, and stay updated.', 'info'),
    ('Event Schedule Updated', 'The Sangeet ceremony location has been updated. Please check the schedule for details.', 'urgent'),
    ('Photo Gallery Live', 'The photo gallery is now live! Start sharing your beautiful moments.', 'general')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 6. CREATE TEST USER DATA (OPTIONAL - REMOVE IN PRODUCTION)
-- =============================================================================

-- Note: These users will need to be created through the auth system
-- This is just for reference of the test credentials mentioned in the app

-- Test host profile (will be created when host@example.com signs up)
-- Test guest profile (will be created when guest@example.com signs up)

-- Sample room allocation (will be assigned after users sign up)
-- You can run this after the test users are created:
/*
INSERT INTO public.room_allocations (user_id, room_number, wifi_username, wifi_password)
SELECT 
    id,
    'A-' || (ROW_NUMBER() OVER (ORDER BY created_at) + 100),
    'guest_' || SUBSTRING(id::text, 1, 8),
    'shaadi2024'
FROM public.profiles 
WHERE role = 'guest'
ON CONFLICT DO NOTHING;
*/

-- =============================================================================
-- SETUP COMPLETE
-- =============================================================================

-- Verify setup
SELECT 'Setup completed successfully! Tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'room_allocations', 'events', 'guests', 'channels', 'messages', 'tasks', 'announcements');

