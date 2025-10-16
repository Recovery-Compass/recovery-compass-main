-- Fix 1: Restrict anonymous SELECT access to adventure_insights
-- Prevents data exposure if authentication is added later or service role is compromised
CREATE POLICY "Anonymous users cannot read submissions"
ON public.adventure_insights
FOR SELECT
TO anon, authenticated
USING (false);

-- Fix 2: Create rate_limits table for edge function abuse prevention
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  endpoint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for efficient rate limit queries
CREATE INDEX idx_rate_limits_identifier_created ON public.rate_limits(identifier, created_at);

-- Auto-cleanup old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE created_at < now() - interval '1 hour';
END;
$$;

-- No RLS needed - edge function uses service role to manage rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role manages rate limits"
ON public.rate_limits
FOR ALL
USING (false);