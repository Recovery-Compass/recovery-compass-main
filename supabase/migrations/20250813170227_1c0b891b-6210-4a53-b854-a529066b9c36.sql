-- NUCLEAR SECURITY FIX: Complete security overhaul with CASCADE

-- 1. Drop all policies that depend on the dangerous functions
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage crisis resources" ON public.crisis_resources;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.access_logs;

-- 2. Drop the dangerous functions
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_provider_or_admin(uuid) CASCADE;

-- 3. Create secure admin functions with proper search paths
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

-- 4. Create secure policies for profiles (NO MORE "USING (true)")
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert profiles" ON public.profiles
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update profiles" ON public.profiles
FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete profiles" ON public.profiles
FOR DELETE USING (public.is_admin(auth.uid()));

-- 5. Restore secure crisis resources policy
CREATE POLICY "Admins can manage crisis resources" ON public.crisis_resources
FOR ALL USING (public.is_admin(auth.uid()));

-- 6. Restore secure audit logs policy
CREATE POLICY "Admins can view audit logs" ON public.access_logs
FOR SELECT USING (public.is_admin(auth.uid()));

-- 7. Fix CRITICAL: Remove dangerous COALESCE patterns that allow anonymous access
-- Fix actualization_profiles policies
DROP POLICY IF EXISTS "Users can view their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can create their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can update their own actualization profiles" ON public.actualization_profiles;

-- Create strict user-only policies
CREATE POLICY "Users can view their own actualization profiles" ON public.actualization_profiles
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

CREATE POLICY "Users can create their own actualization profiles" ON public.actualization_profiles
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

CREATE POLICY "Users can update their own actualization profiles" ON public.actualization_profiles
FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

-- Fix assessments policies - REMOVE anonymous access completely
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;

CREATE POLICY "Users can view their own assessments" ON public.assessments
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can create assessments" ON public.assessments
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

-- Fix email_captures policies - REMOVE anonymous access completely
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

-- 8. Secure access_logs completely - REMOVE permissive INSERT policy
DROP POLICY IF EXISTS "System can insert audit logs" ON public.access_logs;
-- Only service role can insert via Edge Function now

-- 9. Fix environment assessments security
DROP POLICY IF EXISTS "Providers can view patient assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can view own assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can update own assessments" ON public.environment_assessments;
DROP POLICY IF EXISTS "Users can create own assessments" ON public.environment_assessments;

CREATE POLICY "Users can view own environment assessments" ON public.environment_assessments
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can create own environment assessments" ON public.environment_assessments
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update own environment assessments" ON public.environment_assessments
FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Providers can view patient environment assessments" ON public.environment_assessments
FOR SELECT USING (public.is_provider_or_admin(auth.uid()));