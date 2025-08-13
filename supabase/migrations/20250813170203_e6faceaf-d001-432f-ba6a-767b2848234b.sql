-- Final security fix: Address remaining function security issues
-- Fix remaining function search path issues

-- Update any remaining functions to have proper search paths
CREATE OR REPLACE FUNCTION public.update_actualization_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Note: spatial_ref_sys RLS issue is a PostGIS system table false positive
-- Cannot enable RLS on system tables owned by supabase_admin
-- This is expected and safe for PostGIS coordinate reference data