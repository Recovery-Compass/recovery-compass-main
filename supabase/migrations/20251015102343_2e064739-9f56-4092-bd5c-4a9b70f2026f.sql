-- Add Phase 1 organizational context columns to existing adventure_insights table
-- Using IF NOT EXISTS is not supported in ALTER TABLE ADD COLUMN, so we'll use DO block
DO $$ 
BEGIN
  -- Add name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'adventure_insights' AND column_name = 'name') THEN
    ALTER TABLE public.adventure_insights ADD COLUMN name TEXT;
  END IF;

  -- Add org_type column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'adventure_insights' AND column_name = 'org_type') THEN
    ALTER TABLE public.adventure_insights ADD COLUMN org_type TEXT;
  END IF;

  -- Add org_size column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'adventure_insights' AND column_name = 'org_size') THEN
    ALTER TABLE public.adventure_insights ADD COLUMN org_size TEXT;
  END IF;

  -- Add primary_challenge column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'adventure_insights' AND column_name = 'primary_challenge') THEN
    ALTER TABLE public.adventure_insights ADD COLUMN primary_challenge TEXT;
  END IF;

  -- Add role column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'adventure_insights' AND column_name = 'role') THEN
    ALTER TABLE public.adventure_insights ADD COLUMN role TEXT;
  END IF;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN public.adventure_insights.name IS 'Organization or contact name';
COMMENT ON COLUMN public.adventure_insights.org_type IS 'Type of organization (e.g., nonprofit, healthcare, education)';
COMMENT ON COLUMN public.adventure_insights.org_size IS 'Size of organization (e.g., small, medium, large)';
COMMENT ON COLUMN public.adventure_insights.primary_challenge IS 'Primary challenge the organization is facing';
COMMENT ON COLUMN public.adventure_insights.role IS 'User role within the organization';