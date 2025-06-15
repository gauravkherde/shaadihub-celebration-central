
-- Drop the old check constraint (name may vary based on your DB - adjust if needed)
ALTER TABLE public.announcements DROP CONSTRAINT IF EXISTS announcements_type_check;

-- Add the corrected check constraint
ALTER TABLE public.announcements
  ADD CONSTRAINT announcements_type_check CHECK (type IN ('general', 'urgent', 'info'));
