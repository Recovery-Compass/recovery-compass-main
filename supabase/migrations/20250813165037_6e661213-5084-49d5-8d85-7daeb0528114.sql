-- Enable RLS on spatial_ref_sys table (PostGIS reference data)
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Allow read access to spatial reference system data for all users
-- This is safe as it's standard PostGIS reference data (coordinate systems)
CREATE POLICY "Allow read access to spatial reference systems"
ON public.spatial_ref_sys
FOR SELECT
USING (true);