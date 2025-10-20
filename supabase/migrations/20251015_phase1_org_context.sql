-- Phase 1 Database Migration: Add name + org context fields
-- Generated: October 15, 2025
-- Execute via: supabase db push --db-url [your-db-url]

-- Add new columns to adventure_insights table
ALTER TABLE public.adventure_insights 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS org_type TEXT CHECK (org_type IN (
  'treatment-center', 'sober-living', 'outpatient', 'nonprofit', 
  'government', 'healthcare', 'education', 'other'
)),
ADD COLUMN IF NOT EXISTS org_size TEXT CHECK (org_size IN (
  '1-10', '11-50', '51-200', '201-500', '500+'
)),
ADD COLUMN IF NOT EXISTS primary_challenge TEXT CHECK (primary_challenge IN (
  'staff-retention', 'client-engagement', 'relapse-prevention', 
  'program-effectiveness', 'facility-design', 'culture-change', 
  'compliance', 'funding', 'other'
)),
ADD COLUMN IF NOT EXISTS role TEXT;

-- Drop old RLS policy
DROP POLICY IF EXISTS "Allow limited anonymous adventure insight submissions" ON public.adventure_insights;

-- Create updated RLS policy with new field validations
CREATE POLICY "Allow validated anonymous adventure insight submissions with org context" 
ON public.adventure_insights 
FOR INSERT 
WITH CHECK (
  -- Email validation (existing)
  email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  -- AI response validation (existing)
  AND length(ai_response) > 10
  AND length(ai_response) < 10000
  -- Name validation (new - required)
  AND name IS NOT NULL
  AND length(name) > 1
  AND length(name) < 200
  -- Optional fields validation (new - if provided, must be valid)
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
  AND (role IS NULL OR (length(role) >= 1 AND length(role) < 200))
);

-- Add helpful comments
COMMENT ON TABLE public.adventure_insights IS 'Stores submissions from the Adventure Prompt Engine. Phase 1 includes name (required) and optional org context fields.';

COMMENT ON COLUMN public.adventure_insights.name IS 'User name (required)';
COMMENT ON COLUMN public.adventure_insights.org_type IS 'Organization type (optional)';
COMMENT ON COLUMN public.adventure_insights.org_size IS 'Organization size (optional)';
COMMENT ON COLUMN public.adventure_insights.primary_challenge IS 'Primary organizational challenge (optional)';
COMMENT ON COLUMN public.adventure_insights.role IS 'User role in organization (optional)';
