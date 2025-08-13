-- NUCLEAR SECURITY FIX: Fix all critical security issues immediately

-- 1. Drop existing functions with wrong signatures
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_provider_or_admin(uuid);

-- 2. Fix CRITICAL: Admin Profile Bypass Issue
-- Remove the dangerous "true" policy on profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create proper admin functions with secure search path and correct signatures
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

-- Create secure admin policies for profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage all profiles" ON public.profiles
FOR ALL USING (public.is_admin(auth.uid()));

-- 3. Fix CRITICAL: RLS on spatial_ref_sys (PostGIS system table)
-- We cannot modify system tables, but this is expected and safe
-- This resolves to a false positive for PostGIS system tables

-- 4. Fix CRITICAL: Dangerous COALESCE patterns in RLS policies
-- Remove policies that allow anonymous access

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

-- Fix assessments policies - REMOVE anonymous access
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;

CREATE POLICY "Users can view their own assessments" ON public.assessments
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can create assessments" ON public.assessments
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Fix email_captures policies - REMOVE anonymous access
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