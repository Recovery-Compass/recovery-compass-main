-- Add missing core columns that the edge function requires
-- The edge function expects 'email' and 'ai_response' but they don't exist yet

ALTER TABLE public.adventure_insights 
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS ai_response TEXT NOT NULL DEFAULT '';

-- Remove the temporary defaults after adding constraints
ALTER TABLE public.adventure_insights 
ALTER COLUMN email DROP DEFAULT,
ALTER COLUMN ai_response DROP DEFAULT;

-- Add comments for documentation
COMMENT ON COLUMN public.adventure_insights.email IS 'Contact email for the submission (required)';
COMMENT ON COLUMN public.adventure_insights.ai_response IS 'AI-generated analysis response (required)';