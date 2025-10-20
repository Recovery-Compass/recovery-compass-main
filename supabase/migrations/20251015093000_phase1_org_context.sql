-- Phase 1: Add organization context fields to adventure_insights table

-- Add new columns
ALTER TABLE public.adventure_insights 
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS org_type TEXT CHECK (org_type IN (
    'treatment-center', 
    'sober-living', 
    'outpatient', 
    'nonprofit', 
    'government', 
    'healthcare', 
    'education', 
    'other'
  )),
  ADD COLUMN IF NOT EXISTS org_size TEXT CHECK (org_size IN (
    '1-10', 
    '11-50', 
    '51-200', 
    '201-500', 
    '500+'
  )),
  ADD COLUMN IF NOT EXISTS primary_challenge TEXT CHECK (primary_challenge IN (
    'staff-retention', 
    'client-engagement', 
    'relapse-prevention', 
    'program-effectiveness', 
    'facility-design', 
    'culture-change', 
    'compliance', 
    'funding', 
    'other'
  )),
  ADD COLUMN IF NOT EXISTS role TEXT;

-- Update RLS policy to validate new fields
DROP POLICY IF EXISTS "Allow limited anonymous adventure insight submissions" ON public.adventure_insights;
DROP POLICY IF EXISTS "Allow validated anonymous adventure insight submissions" ON public.adventure_insights;

CREATE POLICY "Allow validated anonymous adventure insight submissions" 
ON public.adventure_insights 
FOR INSERT 
WITH CHECK (
  -- Email validation
  email IS NOT NULL 
  AND email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  -- AI response validation
  AND ai_response IS NOT NULL 
  AND length(ai_response) >= 100
  AND length(ai_response) <= 10000
  -- Name validation (required)
  AND name IS NOT NULL
  AND length(name) >= 2
  AND length(name) <= 200
  -- Optional fields validation (if provided, must be valid)
  AND (org_type IS NULL OR org_type IN (
    'treatment-center', 'sober-living', 'outpatient', 'nonprofit', 
    'government', 'healthcare', 'education', 'other'
  ))
  AND (org_size IS NULL OR org_size IN (
    '1-10', '11-50', '51-200', '201-500', '500+'
  ))
  AND (primary_challenge IS NULL OR primary_challenge IN (
    'staff-retention', 'client-engagement', 'relapse-prevention', 
    'program-effectiveness', 'facility-design', 'culture-change', 
    'compliance', 'funding', 'other'
  ))
  AND (role IS NULL OR (length(role) >= 1 AND length(role) <= 200))
);

-- Add helpful comment
COMMENT ON TABLE public.adventure_insights IS 'Stores submissions from the Adventure Prompt Engine. Phase 1 includes name (required) and optional org context fields.';
