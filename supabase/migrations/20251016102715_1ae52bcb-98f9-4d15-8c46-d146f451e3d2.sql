-- Add explicit UPDATE and DELETE denial policies for adventure_insights
-- These prevent accidental data modification through regular channels
-- while allowing service role (edge functions) to manage data as needed

CREATE POLICY "Anonymous users cannot update submissions"
ON public.adventure_insights
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Anonymous users cannot delete submissions"
ON public.adventure_insights
FOR DELETE
TO anon, authenticated
USING (false);