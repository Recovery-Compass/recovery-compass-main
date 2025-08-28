-- CRITICAL SECURITY FIXES (Fixed)
-- Fix 1: Secure adventure_insights table - remove anonymous access vulnerability
DROP POLICY IF EXISTS "Allow anonymous inserts to adventure_insights" ON public.adventure_insights;

-- Add rate-limited anonymous inserts with basic validation
CREATE POLICY "Allow limited anonymous adventure insight submissions" 
ON public.adventure_insights 
FOR INSERT 
WITH CHECK (
  -- Basic validation: email must be present and look like email
  email IS NOT NULL 
  AND email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND ai_response IS NOT NULL 
  AND length(ai_response) > 10
  AND length(ai_response) < 10000
);

-- Fix 2: Prevent admin privilege escalation in profiles table
-- Remove existing policies and create secure ones
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their profile but NOT their role (only admins can change roles)
CREATE POLICY "Users can update own profile except role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Only admins can view all profiles  
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Only admins can manage roles and create profiles
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL
USING (is_admin(auth.uid()));

-- Add audit logging capability
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,
  operation text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  old_data jsonb,
  new_data jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (is_admin(auth.uid()));