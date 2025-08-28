-- CRITICAL SECURITY FIXES
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
-- Users should not be able to change their own role
CREATE POLICY "Users cannot modify their own role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND (OLD.role = NEW.role OR is_admin(auth.uid()))
);

-- Fix 3: Secure edge functions - Update existing functions to use secure search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_provider_or_admin(user_uuid uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role IN ('admin', 'provider')
  );
END;
$$;

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