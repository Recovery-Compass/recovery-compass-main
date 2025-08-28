-- Create adventure_insights table for the Adventure Prompt Engine
CREATE TABLE public.adventure_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.adventure_insights ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (since this is a public engagement tool)
CREATE POLICY "Allow anonymous inserts to adventure_insights" 
ON public.adventure_insights 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view the insights
CREATE POLICY "Admins can view adventure insights" 
ON public.adventure_insights 
FOR SELECT 
USING (is_admin(auth.uid()));