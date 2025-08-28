-- Fix RLS security issue for spatial_ref_sys table
-- This is a PostGIS system table containing spatial reference system definitions
-- It's a reference table that should be readable by all users

-- Enable Row Level Security on spatial_ref_sys table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to spatial reference data
-- This is reference data and should be accessible for spatial operations
CREATE POLICY "Allow read access to spatial reference systems" 
ON public.spatial_ref_sys 
FOR SELECT 
USING (true);