-- Fix RLS policies for adventure_insights to allow anonymous submissions with validation

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can insert their own adventure insights" ON public.adventure_insights;
DROP POLICY IF EXISTS "Users can view their own adventure insights" ON public.adventure_insights;
DROP POLICY IF EXISTS "Users can update their own adventure insights" ON public.adventure_insights;
DROP POLICY IF EXISTS "Users can delete their own adventure insights" ON public.adventure_insights;

-- Create new policy that allows validated anonymous submissions
CREATE POLICY "Allow validated anonymous adventure insight submissions"
ON public.adventure_insights
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Validate email format (required)
  email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  
  -- Validate ai_response length (required)
  AND length(ai_response) > 10
  AND length(ai_response) < 10000
  
  -- Validate name (required)
  AND name IS NOT NULL
  AND length(name) > 1
  AND length(name) < 200
  
  -- Validate org_type enum (optional field)
  AND (org_type IS NULL OR org_type IN (
    'treatment-center', 'sober-living', 'outpatient', 'nonprofit', 
    'government', 'healthcare', 'education', 'other'
  ))
  
  -- Validate org_size enum (optional field)
  AND (org_size IS NULL OR org_size IN (
    '1-10', '11-50', '51-200', '201-500', '500+'
  ))
  
  -- Validate primary_challenge enum (optional field)
  AND (primary_challenge IS NULL OR primary_challenge IN (
    'staff-retention', 'client-engagement', 'relapse-prevention', 
    'program-effectiveness', 'facility-design', 'culture-change', 
    'compliance', 'funding', 'other'
  ))
  
  -- Validate role length (optional field)
  AND (role IS NULL OR (length(role) >= 1 AND length(role) < 200))
);

-- Create policy for service role to read all submissions (for admin dashboard access)
CREATE POLICY "Service role can read all adventure insights"
ON public.adventure_insights
FOR SELECT
TO service_role
USING (true);

-- Add comment explaining the security model
COMMENT ON TABLE public.adventure_insights IS 'Stores anonymous adventure insight submissions. Edge function uses service role key which bypasses RLS. Direct RLS policy validates anonymous submissions with comprehensive field-level validation.';