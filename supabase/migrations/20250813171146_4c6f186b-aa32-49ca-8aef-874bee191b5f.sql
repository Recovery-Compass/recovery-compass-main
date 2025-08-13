-- Continue NUCLEAR SECURITY FIX: Handle existing policies properly

-- Drop the existing problematic policy first
DROP POLICY IF EXISTS "Authenticated users can create assessments" ON public.assessments;

-- Now create the secure version
CREATE POLICY "Authenticated users can create assessments" ON public.assessments
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid()::text = user_id);

-- Verify we have secure user profile access policies
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles  
FOR UPDATE USING (auth.uid() = id);

-- Secure environmental factors completely
DROP POLICY IF EXISTS "Users can manage own environmental factors" ON public.environmental_factors;
DROP POLICY IF EXISTS "Users can view own environmental factors" ON public.environmental_factors;

CREATE POLICY "Users can view own environmental factors" ON public.environmental_factors
FOR SELECT USING (
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.environment_assessments ea 
    WHERE ea.id = environmental_factors.assessment_id 
    AND ea.user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage own environmental factors" ON public.environmental_factors
FOR ALL USING (
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.environment_assessments ea 
    WHERE ea.id = environmental_factors.assessment_id 
    AND ea.user_id = auth.uid()
  )
);

-- Update the trigger function with secure search path
CREATE OR REPLACE FUNCTION public.update_actualization_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;