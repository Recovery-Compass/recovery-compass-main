-- Drop the overly permissive policy that allows reading all records
DROP POLICY IF EXISTS "Service role can read all adventure insights" ON public.adventure_insights;

-- Create a proper policy: authenticated users can only read their own submissions
-- (Service role automatically bypasses RLS, so no explicit policy needed for it)
CREATE POLICY "Users can view their own submissions"
ON public.adventure_insights
FOR SELECT
TO authenticated
USING (user_id = auth.uid());