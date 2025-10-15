-- Create adventure_insights table for ERD Method organizational submissions
CREATE TABLE IF NOT EXISTS public.adventure_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Required contact fields
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  
  -- Phase 1: Organizational context fields
  org_type TEXT,
  org_size TEXT,
  primary_challenge TEXT,
  role TEXT
);

-- Enable Row Level Security
ALTER TABLE public.adventure_insights ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to insert (used by edge function)
CREATE POLICY "Service role can insert insights"
  ON public.adventure_insights
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow service role to read all insights (for admin dashboard)
CREATE POLICY "Service role can read all insights"
  ON public.adventure_insights
  FOR SELECT
  TO service_role
  USING (true);

-- Add helpful comments
COMMENT ON TABLE public.adventure_insights IS 'Stores organizational adventure insights submissions from ERD Method forms';
COMMENT ON COLUMN public.adventure_insights.email IS 'Contact email address';
COMMENT ON COLUMN public.adventure_insights.name IS 'Organization or contact name';
COMMENT ON COLUMN public.adventure_insights.ai_response IS 'AI-generated analysis response (min 100 chars)';
COMMENT ON COLUMN public.adventure_insights.org_type IS 'Type of organization (e.g., nonprofit, healthcare, education)';
COMMENT ON COLUMN public.adventure_insights.org_size IS 'Organization size (e.g., small, medium, large)';
COMMENT ON COLUMN public.adventure_insights.primary_challenge IS 'Primary challenge facing the organization';
COMMENT ON COLUMN public.adventure_insights.role IS 'Submitter role within organization';

-- Create index on email for faster lookups
CREATE INDEX idx_adventure_insights_email ON public.adventure_insights(email);

-- Create index on created_at for sorting submissions
CREATE INDEX idx_adventure_insights_created_at ON public.adventure_insights(created_at DESC);