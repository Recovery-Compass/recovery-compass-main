-- Drop existing table if it exists (cascade to remove dependent objects)
DROP TABLE IF EXISTS public.adventure_insights CASCADE;

-- Create adventure_insights table with Phase 1 organizational context columns
CREATE TABLE public.adventure_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID,
  
  -- Phase 1: Organizational context columns
  name TEXT,
  org_type TEXT,
  org_size TEXT,
  primary_challenge TEXT,
  role TEXT,
  
  -- Additional insights data
  insights JSONB,
  status TEXT DEFAULT 'draft'
);

-- Add index for better query performance
CREATE INDEX idx_adventure_insights_user_id ON public.adventure_insights(user_id);

-- Enable Row Level Security
ALTER TABLE public.adventure_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own adventure insights"
  ON public.adventure_insights
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own adventure insights"
  ON public.adventure_insights
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own adventure insights"
  ON public.adventure_insights
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own adventure insights"
  ON public.adventure_insights
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.adventure_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();