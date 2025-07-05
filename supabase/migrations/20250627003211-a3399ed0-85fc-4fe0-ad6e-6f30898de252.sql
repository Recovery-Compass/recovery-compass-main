
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- Can be auth.uid() or anonymous identifier
  email TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('struggling', 'seeking', 'thriving', 'limitless')),
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
  tier TEXT NOT NULL CHECK (tier IN ('struggling', 'seeking', 'thriving', 'limitless')),
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
-- Struggling tier
('struggling', 1, 'What environmental factors need the most optimization in your life?', 'multiple_choice',
  '["Physical space organization and flow", "Daily routine and time structure", "Social connections and support systems", "Work and productivity environment"]'::jsonb,
  'environment', 'moderate'),
('struggling', 2, 'What would make your environment more supportive tomorrow?', 'multiple_choice',
  '["Better organization and systems", "Improved lighting and comfort", "Clearer boundaries and structure", "Enhanced focus and calm"]'::jsonb,
  'environment', 'moderate'),

-- Seeking tier
('seeking', 1, 'What environmental design area calls to you most?', 'multiple_choice',
  '["Creating spaces that inspire growth", "Designing systems that support goals", "Building environments for connection", "Optimizing for creativity and flow"]'::jsonb,
  'environment', 'low'),
('seeking', 2, 'What would your ideal environmental design achieve?', 'multiple_choice',
  '["Effortless daily routines", "Inspiring and energizing spaces", "Natural support for your goals", "Perfect balance of structure and freedom"]'::jsonb,
  'environment', 'low'),

-- Thriving tier
('thriving', 1, 'What environmental mastery opportunities excite you most?', 'multiple_choice',
  '["Designing signature spaces that reflect your values", "Creating systems that amplify your strengths", "Building environments that inspire others", "Mastering the integration of all life domains"]'::jsonb,
  'environment', 'low'),
('thriving', 2, 'How do you want to expand your environmental influence?', 'multiple_choice',
  '["Sharing your design principles with others", "Creating environments that transform communities", "Building systems that scale positive impact", "Pioneering new approaches to environmental mastery"]'::jsonb,
  'environment', 'low'),

-- Limitless tier
('limitless', 1, 'What environmental mastery vision is becoming reality?', 'multiple_choice',
  '["Transforming entire spaces and systems", "Living in perfect environmental alignment", "Creating breakthrough design innovations", "Embodying ultimate environmental mastery"]'::jsonb,
  'environment', 'low'),
('limitless', 2, 'What environmental legacy do you want to create?', 'multiple_choice',
  '["Revolutionary approaches to environmental design", "Spaces that inspire generational transformation", "Systems that honor human flourishing", "Environments where everyone can achieve mastery"]'::jsonb,
  'environment', 'low');
