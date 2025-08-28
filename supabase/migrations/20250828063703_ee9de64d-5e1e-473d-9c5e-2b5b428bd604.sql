-- Enable Row Level Security on spatial_ref_sys table
-- This table contains spatial reference system definitions and should be publicly readable
-- but not modifiable by regular users

ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all users (this table contains reference data)
CREATE POLICY "Allow read access to spatial reference systems" 
ON public.spatial_ref_sys 
FOR SELECT 
USING (true);

-- Create policy to restrict write access to admins only
CREATE POLICY "Admins can manage spatial reference systems" 
ON public.spatial_ref_sys 
FOR ALL 
USING (is_admin(auth.uid()));