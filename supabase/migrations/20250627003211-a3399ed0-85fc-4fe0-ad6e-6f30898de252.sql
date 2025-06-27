
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- Can be auth.uid() or anonymous identifier
  email TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('crisis', 'struggling', 'seeking', 'thriving', 'limitless')),
  responses JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_confirmed BOOLEAN DEFAULT FALSE,
  design_sent BOOLEAN DEFAULT FALSE,
  design_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create email_captures table
CREATE TABLE public.email_captures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('crisis', 'struggling', 'seeking', 'thriving', 'limitless')),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  design_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessment_questions table
CREATE TABLE public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'scale', 'text')),
  options JSONB,
  domain TEXT,
  privacy_level TEXT CHECK (privacy_level IN ('low', 'moderate', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tier, question_order)
);

-- Create indexes
CREATE INDEX idx_assessments_email ON assessments(email);
CREATE INDEX idx_assessments_tier ON assessments(tier);
CREATE INDEX idx_assessments_created_at ON assessments(completed_at DESC);
CREATE INDEX idx_assessment_questions_tier ON assessment_questions(tier);

-- Enable RLS
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessments
CREATE POLICY "Anyone can create assessments" ON assessments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own assessments" ON assessments
  FOR SELECT USING (user_id = COALESCE(auth.uid()::TEXT, user_id));

-- RLS Policies for email_captures
CREATE POLICY "Anyone can capture emails" ON email_captures
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own email captures" ON email_captures
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assessments a
      WHERE a.id = assessment_id 
      AND a.user_id = COALESCE(auth.uid()::TEXT, a.user_id)
    )
  );

-- RLS Policy for questions (public read)
CREATE POLICY "Anyone can read questions" ON assessment_questions
  FOR SELECT USING (true);

-- Insert the assessment questions
INSERT INTO assessment_questions (tier, question_order, question_text, question_type, options, domain, privacy_level) VALUES
-- Crisis tier
('crisis', 1, 'What kind of support feels most needed right now?', 'multiple_choice', 
  '["Someone to talk to who understands", "A safe place to rest and reset", "Help finding immediate resources", "Connection without judgment"]'::jsonb,
  'social', 'high'),
('crisis', 2, 'What would help you feel safer today?', 'multiple_choice',
  '["Knowing I''m not alone", "Having a clear next step", "Feeling heard and validated", "Access to practical support"]'::jsonb,
  'social', 'high'),

-- Struggling tier
('struggling', 1, 'What''s your biggest challenge right now?', 'multiple_choice',
  '["Managing daily stress and overwhelm", "Finding consistent support", "Breaking old patterns", "Building new routines"]'::jsonb,
  'health', 'moderate'),
('struggling', 2, 'What small win would make tomorrow better?', 'multiple_choice',
  '["Better sleep or rest", "One meaningful connection", "Completing something I''ve been avoiding", "A moment of genuine peace"]'::jsonb,
  'time_routine', 'moderate'),

-- Seeking tier
('seeking', 1, 'What area of growth calls to you most?', 'multiple_choice',
  '["Understanding myself more deeply", "Building healthier relationships", "Finding my purpose and direction", "Creating sustainable change"]'::jsonb,
  'social', 'low'),
('seeking', 2, 'What would authentic success look like for you?', 'multiple_choice',
  '["Inner peace and self-acceptance", "Meaningful work and contribution", "Deep, genuine connections", "Freedom to be fully myself"]'::jsonb,
  'health', 'low'),

-- Thriving tier
('thriving', 1, 'What''s emerging in your journey now?', 'multiple_choice',
  '["New levels of self-understanding", "Desire to help others on their path", "Creative expression and innovation", "Deeper spiritual connection"]'::jsonb,
  'nature', 'low'),
('thriving', 2, 'How do you want to expand your impact?', 'multiple_choice',
  '["Mentoring and supporting others", "Creating something meaningful", "Building community and connection", "Exploring new frontiers of growth"]'::jsonb,
  'social', 'low'),

-- Limitless tier
('limitless', 1, 'What impossible dream is becoming possible?', 'multiple_choice',
  '["Transforming entire systems", "Living in complete alignment", "Creating generational change", "Embodying my highest vision"]'::jsonb,
  'nature', 'low'),
('limitless', 2, 'What legacy do you want to create?', 'multiple_choice',
  '["A new paradigm of healing", "Inspiration for future generations", "Systems that honor human dignity", "A world where everyone can thrive"]'::jsonb,
  'time_routine', 'low');
