-- Create actualization profiles table for rich user visions and achievements
CREATE TABLE public.actualization_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  assessment_id UUID REFERENCES public.assessments(id),
  
  -- Core actualization data
  peak_experiences JSONB DEFAULT '[]'::jsonb,
  future_vision TEXT,
  ideal_environment_description TEXT,
  core_values TEXT[],
  optimization_focus TEXT, -- 'growth', 'performance', 'creativity', 'leadership', etc.
  
  -- Visual assets
  vision_board_url TEXT,
  environment_sketch_url TEXT,
  audio_vision_url TEXT,
  
  -- Achievement tracking
  achievements_unlocked TEXT[] DEFAULT '{}',
  completion_milestones JSONB DEFAULT '{}'::jsonb,
  personalization_score INTEGER DEFAULT 0,
  
  -- Engagement metrics
  session_duration INTEGER,
  interaction_depth TEXT, -- 'surface', 'engaged', 'immersed'
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.actualization_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own actualization profiles" 
ON public.actualization_profiles 
FOR SELECT 
USING (user_id = COALESCE(auth.uid()::text, user_id));

CREATE POLICY "Users can create their own actualization profiles" 
ON public.actualization_profiles 
FOR INSERT 
WITH CHECK (user_id = COALESCE(auth.uid()::text, user_id));

CREATE POLICY "Users can update their own actualization profiles" 
ON public.actualization_profiles 
FOR UPDATE 
USING (user_id = COALESCE(auth.uid()::text, user_id));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_actualization_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_actualization_profiles_updated_at
BEFORE UPDATE ON public.actualization_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_actualization_profiles_updated_at();