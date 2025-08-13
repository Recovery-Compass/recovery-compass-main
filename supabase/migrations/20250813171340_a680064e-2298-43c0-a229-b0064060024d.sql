-- SECURITY FIX: Prevent anonymous access to assessments table with emails
-- The current policies allow 'public' role access, which includes anonymous users

-- Drop existing policies that allow anonymous access
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Authenticated users can create assessments" ON public.assessments;

-- Create secure policies that ONLY allow authenticated users
CREATE POLICY "Authenticated users can view own assessments" ON public.assessments
FOR SELECT USING (
  auth.uid() IS NOT NULL AND 
  auth.uid()::text = user_id
);

CREATE POLICY "Authenticated users can create own assessments" ON public.assessments
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND 
  auth.uid()::text = user_id
);

-- Also secure the email_captures table similarly
DROP POLICY IF EXISTS "Users can view their own email captures" ON public.email_captures;
DROP POLICY IF EXISTS "Authenticated users can capture emails" ON public.email_captures;

CREATE POLICY "Authenticated users can view own email captures" ON public.email_captures
FOR SELECT USING (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM public.assessments a
    WHERE a.id = email_captures.assessment_id 
    AND a.user_id = auth.uid()::text
  )
);

CREATE POLICY "Authenticated users can create email captures" ON public.email_captures  
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM public.assessments a
    WHERE a.id = email_captures.assessment_id 
    AND a.user_id = auth.uid()::text
  )
);