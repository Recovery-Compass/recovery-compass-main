-- NUCLEAR SECURITY FIX: Fix all critical and high-risk security issues

-- 1. Fix CRITICAL: Admin Profile Bypass Issue
-- Remove the dangerous "true" policy on profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create proper admin functions with secure search path
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_provider_or_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role IN ('admin', 'provider')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create secure admin policies for profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage all profiles" ON public.profiles
FOR ALL USING (public.is_admin(auth.uid()));

-- 2. Fix CRITICAL: RLS on spatial_ref_sys (PostGIS system table)
-- Enable RLS on the spatial reference system table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Allow read access to coordinate reference systems for authenticated users only
CREATE POLICY "Authenticated users can read spatial reference systems" 
ON public.spatial_ref_sys 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 3. Fix CRITICAL: Dangerous COALESCE patterns in RLS policies
-- These allow anonymous access when they shouldn't

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

-- Fix assessments policies
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;

CREATE POLICY "Users can view their own assessments" ON public.assessments
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can create assessments" ON public.assessments
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Fix email_captures policies  
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

-- 4. Secure the access_logs table (remove permissive INSERT policy)
DROP POLICY IF EXISTS "System can insert audit logs" ON public.access_logs;
-- Only service role can insert via Edge Function - no client inserts allowed

-- 5. Fix dangerous environment assessment policies
DROP POLICY IF EXISTS "Providers can view patient assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can view own assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can update own assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can create own assessments" ON public.environment_assessments;

CREATE POLICY "Users can view own assessments" ON public.environment_assessments
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assessments" ON public.environment_assessments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments" ON public.environment_assessments
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Providers can view patient assessments" ON public.environment_assessments
FOR SELECT USING (public.is_provider_or_admin(auth.uid()));

-- 6. Update function search paths for security
CREATE OR REPLACE FUNCTION public.update_actualization_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;