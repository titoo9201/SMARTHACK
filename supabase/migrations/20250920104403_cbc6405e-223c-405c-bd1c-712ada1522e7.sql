-- Drop the existing check constraint that only allows 'user' and 'admin'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add a new check constraint that includes all the roles we need
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
CHECK (role = ANY (ARRAY['student'::text, 'alumni'::text, 'admin'::text, 'user'::text]));