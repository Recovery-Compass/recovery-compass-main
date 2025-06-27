
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import AssessmentQuestion from './assessment/AssessmentQuestion';
import TierSelector from './assessment/TierSelector';
import AssessmentResults from './assessment/AssessmentResults';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  domain: string;
  privacy_level: string;
}

type Tier = 'crisis' | 'struggling' | 'seeking' | 'thriving' | 'limitless';

const EnvironmentalAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'tier-selection' | 'questions' | 'email' | 'results'>('tier-selection');
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load questions when tier is selected
  useEffect(() => {
    if (selectedTier) {
      loadQuestions(selectedTier);
    }
  }, [selectedTier]);

  const loadQuestions = async (tier: Tier) => {
    try {
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('tier', tier)
        .order('question_order');

      if (error) throw error;
      
      // Transform the data to match our Question interface
      const transformedQuestions = (data || []).map(question => ({
        ...question,
        options: Array.isArray(question.options) ? question.options : 
                typeof question.options === 'string' ? JSON.parse(question.options) : []
      }));
      
      setQuestions(transformedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handleTierSelect = (tier: Tier) => {
    setSelectedTier(tier);
    setCurrentStep('questions');
    
    // Track tier selection
    trackEvent('tier_selected', {
      tier,
      timestamp: new Date().toISOString(),
    });
  };

  const handleQuestionResponse = (questionId: string, response: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('email');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentStep('tier-selection');
      setCurrentQuestionIndex(0);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!selectedTier) return;

    setIsSubmitting(true);
    
    try {
      // Generate anonymous user ID
      const userId = crypto.randomUUID();
      
      // Save assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_id: userId,
          email: email || null,
          tier: selectedTier,
          responses: responses
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      setAssessmentId(assessmentData.id);

      // Save email capture if provided
      if (email) {
        const { error: emailError } = await supabase
          .from('email_captures')
          .insert({
            email,
            assessment_id: assessmentData.id,
            tier: selectedTier
          });

        if (emailError) throw emailError;
      }

      // Track completion
      trackEvent('assessment_completed', {
        tier: selectedTier,
        email_provided: !!email,
        timestamp: new Date().toISOString(),
      });

      setCurrentStep('results');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = currentStep === 'questions' 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : currentStep === 'email' ? 100 : 0;

  return (
    <div className="min-h-screen bg-navy px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-black text-moonlight mb-4">
            Environmental Response Design Assessment
          </h1>
          <p className="text-moonlight/80 text-lg max-w-2xl mx-auto">
            Discover your personalized environmental design based on where you are in your recovery journey.
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'tier-selection' && currentStep !== 'results' && (
          <div className="mb-8">
            <div className="w-full bg-navy/50 rounded-full h-2">
              <div 
                className="bg-bronze h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-moonlight/60 text-sm mt-2 text-center">
              {currentStep === 'questions' 
                ? `Question ${currentQuestionIndex + 1} of ${questions.length}`
                : 'Almost done!'
              }
            </p>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 'tier-selection' && (
          <TierSelector onTierSelect={handleTierSelect} />
        )}

        {currentStep === 'questions' && questions.length > 0 && (
          <div className="space-y-6">
            <AssessmentQuestion
              question={questions[currentQuestionIndex]}
              response={responses[questions[currentQuestionIndex].id] || ''}
              onResponse={(response) => handleQuestionResponse(questions[currentQuestionIndex].id, response)}
            />
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                className="border-bronze text-bronze hover:bg-bronze hover:text-navy"
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={!responses[questions[currentQuestionIndex].id]}
                className="bg-bronze text-navy hover:bg-bronze/90"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Continue to Email' : 'Next Question'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'email' && (
          <Card className="bg-navy/50 border-bronze/30 p-8">
            <h2 className="text-2xl font-montserrat font-bold text-moonlight mb-4">
              Get Your Personalized Design
            </h2>
            <p className="text-moonlight/80 mb-6">
              Enter your email to receive your personalized Environmental Response Design report.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-moonlight">
                  Email Address (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-navy/30 border-bronze/30 text-moonlight"
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('questions')}
                  className="border-bronze text-bronze hover:bg-bronze hover:text-navy"
                >
                  Back to Questions
                </Button>
                
                <Button
                  onClick={handleSubmitAssessment}
                  disabled={isSubmitting}
                  className="bg-bronze text-navy hover:bg-bronze/90"
                >
                  {isSubmitting ? 'Creating Your Design...' : 'Get My Design'}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 'results' && selectedTier && (
          <AssessmentResults
            tier={selectedTier}
            responses={responses}
            assessmentId={assessmentId}
            onStartJourney={() => navigate('/pathway-select')}
          />
        )}
      </div>
    </div>
  );
};

export default EnvironmentalAssessment;
