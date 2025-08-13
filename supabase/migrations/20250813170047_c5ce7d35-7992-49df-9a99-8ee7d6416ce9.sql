-- NUCLEAR SECURITY FIX: Drop dependent policies first, then recreate everything securely

-- 1. Drop all policies that depend on the is_admin function
DROP POLICY IF EXISTS "Admins can manage crisis resources" ON public.crisis_resources;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.access_logs;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- 2. Now drop the functions safely
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_provider_or_admin(uuid) CASCADE;

-- 3. Create secure admin functions with proper search path
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_provider_or_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role IN ('admin', 'provider')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Recreate all policies with proper security

-- Secure profiles policies (fix CRITICAL admin bypass)
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage all profiles" ON public.profiles
FOR ALL USING (public.is_admin(auth.uid()));

-- Secure crisis resources policies
CREATE POLICY "Admins can manage crisis resources" ON public.crisis_resources
FOR ALL USING (public.is_admin(auth.uid()));

-- Secure access logs policies (admin view only, no anonymous inserts)
CREATE POLICY "Admins can view audit logs" ON public.access_logs
FOR SELECT USING (public.is_admin(auth.uid()));

-- 5. Fix CRITICAL: Remove dangerous COALESCE patterns that allow anonymous access

-- Fix actualization_profiles policies
DROP POLICY IF EXISTS "Users can view their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can create their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can update their own actualization profiles" ON public.actualization_profiles;

CREATE POLICY "Users can view their own actualization profiles" ON public.actualization_profiles
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own actualization profiles" ON public.actualization_profiles
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own actualization profiles" ON public.actualization_profiles
FOR UPDATE USING (auth.uid()::text = user_id);

-- Fix assessments policies (REMOVE anonymous creation)
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;

CREATE POLICY "Users can view their own assessments" ON public.assessments
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can create assessments" ON public.assessments
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Fix email_captures policies (REMOVE anonymous capture)
DROP POLICY IF EXISTS "Users can view their own email captures" ON public.email_captures;
DROP POLICY IF EXISTS "Anyone can capture emails" ON public.email_captures;

CREATE POLICY "Users can view their own email captures" ON public.email_captures
FOR SELECT USING (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM public.assessments a 
    WHERE a.id = email_captures.assessment_id 
    AND a.user_id = auth.uid()::text
  )
);

CREATE POLICY "Authenticated users can capture emails" ON public.email_captures
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.assessments a 
    WHERE a.id = email_captures.assessment_id 
    AND a.user_id = auth.uid()::text
  )
);

-- 6. Remove permissive access_logs insert policy (CRITICAL)
DROP POLICY IF EXISTS "System can insert audit logs" ON public.access_logs;
-- Only the service role via Edge Function can insert logs now