import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import LivingEnvironmentResult from './LivingEnvironmentResult';
import { BreathSync } from './individual/BreathSync';
import { SafetyOutlet } from './SafetyOutlet';
import { ASSESSMENT_QUESTIONS, UNIVERSAL_QUESTIONS } from '@/data/assessmentQuestions';
import type { AssessmentResponse, AssessmentSession, KPIMetrics, ArchetypeData } from '@/types/assessment';

interface LivingEnvironmentQuizProps {
  onBack: () => void;
}

const LivingEnvironmentQuiz = ({ onBack }: LivingEnvironmentQuizProps) => {
  // Enhanced state for IPE-compliant assessment
  const [currentQuestionId, setCurrentQuestionId] = useState('foundation-01');
  const [questionPath, setQuestionPath] = useState<string[]>(['foundation-01']);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [branch, setBranch] = useState<'safety' | 'optimization' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userId] = useState(() => sessionStorage.getItem('userId') || `user_${Date.now()}`);

  // Debug mode: force show BreathSync with ?debug=breathsync
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'breathsync') {
      console.log('🐛 Debug mode: Forcing BreathSync display');
      setIsAnalyzing(true);
    }
  }, []);

  // Track state changes for debugging
  useEffect(() => {
    console.log('🔄 Quiz state - isAnalyzing:', isAnalyzing, 'showResults:', showResults);
  }, [isAnalyzing, showResults]);

  // IPE-compliant adaptive question logic
  const getCurrentQuestion = () => {
    const question = ASSESSMENT_QUESTIONS[currentQuestionId];
    if (!question) {
      // Fallback to universal questions if current ID not found
      const fallbackIndex = Math.min(questionPath.length - 1, UNIVERSAL_QUESTIONS.length - 1);
      return UNIVERSAL_QUESTIONS[fallbackIndex];
    }
    return question;
  };

  const determineNextQuestion = (currentId: string, answerIndex: number) => {
    const currentQuestion = ASSESSMENT_QUESTIONS[currentId];
    if (!currentQuestion?.adaptiveTriggers) return null;

    for (const trigger of currentQuestion.adaptiveTriggers) {
      const matchesPattern = Array.isArray(trigger.responsePattern) 
        ? trigger.responsePattern.includes(answerIndex)
        : trigger.responsePattern === answerIndex;
      
      if (matchesPattern) {
        return trigger.followUpQuestionId;
      }
    }
    return null;
  };

  const calculateKPIMetrics = (responses: AssessmentResponse[]): KPIMetrics => {
    const metrics: KPIMetrics = {};
    
    responses.forEach(response => {
      const category = response.kpiCategory;
      if (!metrics[category]) {
        metrics[category] = {
          score: 0,
          category,
          insights: []
        };
      }
      metrics[category].score += response.answer * 20; // Convert 1-5 to percentage
    });

    // Average scores and generate insights
    Object.keys(metrics).forEach(key => {
      const categoryResponses = responses.filter(r => r.kpiCategory === key);
      metrics[key].score = Math.round(metrics[key].score / categoryResponses.length);
      
      // Generate contextual insights
      if (metrics[key].score >= 80) {
        metrics[key].insights.push(`Strong ${key.replace('-', ' ')} foundation`);
      } else if (metrics[key].score >= 60) {
        metrics[key].insights.push(`Developing ${key.replace('-', ' ')} capacity`);
      } else {
        metrics[key].insights.push(`Growth opportunity in ${key.replace('-', ' ')}`);
      }
    });

    return metrics;
  };

  const generateArchetypeData = (responses: AssessmentResponse[], branch: string): ArchetypeData => {
    const strengthAreas: string[] = [];
    const growthOpportunities: string[] = [];
    
    // Analyze response patterns for archetype classification
    const creativeResponses = responses.filter(r => r.kpiCategory === 'creative-expression');
    const futureResponses = responses.filter(r => r.kpiCategory === 'future-orientation');
    const relationalResponses = responses.filter(r => r.kpiCategory === 'relational-capacity');

    let primaryArchetype = 'Steady Builder';
    if (creativeResponses.some(r => r.answer >= 4)) {
      primaryArchetype = branch === 'safety' ? 'Secure Creator' : 'Visionary Architect';
      strengthAreas.push('Creative Expression', 'Innovation Mindset');
    }
    if (relationalResponses.some(r => r.answer >= 4)) {
      strengthAreas.push('Community Building', 'Emotional Intelligence');
    }
    if (futureResponses.some(r => r.answer >= 4)) {
      strengthAreas.push('Future Planning', 'Growth Orientation');
    }

    // Generate viral sharing elements
    const viralShareData = {
      tagline: `${primaryArchetype}: ${strengthAreas.slice(0, 2).join(' + ')} ✨`,
      visualElements: [`${primaryArchetype} Badge`, 'Strength Map', 'Growth Path'],
      remixPrompts: [
        `How would you adapt this for your space?`,
        `What would you add to make this yours?`,
        `Share your ${primaryArchetype} story`
      ]
    };

    return {
      primaryArchetype,
      strengthAreas,
      growthOpportunities: ['Enhanced Lighting', 'Flow Optimization', 'Personal Sanctuary'],
      recommendedPathways: [`${primaryArchetype} Deep Dive`, 'Community Connection', '72-Hour Design'],
      viralShareData
    };
  };

  // Demo mode handling - simplified for IPE system
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const demoMode = urlParams.get('demo');
    
    if (demoMode === 'safety') {
      setBranch('safety');
      setCurrentQuestionId('safety-deep-01');
      setQuestionPath(['foundation-01', 'safety-deep-01']);
    } else if (demoMode === 'optimize') {
      setBranch('optimization');
      setCurrentQuestionId('optimization-flow-01');
      setQuestionPath(['foundation-01', 'optimization-flow-01']);
    }
    
    setIsVisible(true);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = getCurrentQuestion();
    console.log(`📝 IPE Assessment: ${currentQuestion.id} = ${answerIndex + 1} (${currentQuestion.kpiTag})`);
    
    // Create enhanced response object
    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer: answerIndex + 1,
      kpiCategory: currentQuestion.kpiTag,
      timestamp: new Date(),
      adaptiveContext: {
        triggeredBy: questionPath.length > 1 ? questionPath[questionPath.length - 2] : 'initial',
        branchPath: [...questionPath]
      }
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Determine branch on first question if not set
    if (currentQuestion.id === 'foundation-01' && !branch) {
      const selectedBranch = answerIndex === 0 ? 'safety' : 'optimization';
      console.log(`🔀 IPE Branch selected: ${selectedBranch}`);
      setBranch(selectedBranch);
    }

    // Adaptive branching logic
    const nextQuestionId = determineNextQuestion(currentQuestion.id, answerIndex);
    
    if (nextQuestionId && ASSESSMENT_QUESTIONS[nextQuestionId]) {
      console.log(`🧠 Adaptive routing: ${currentQuestion.id} → ${nextQuestionId}`);
      setCurrentQuestionId(nextQuestionId);
      setQuestionPath([...questionPath, nextQuestionId]);
    } else if (questionPath.length < 5) {
      // Continue with fallback universal questions
      const nextUniversalIndex = Math.min(questionPath.length, UNIVERSAL_QUESTIONS.length - 1);
      console.log(`📚 Using universal question ${nextUniversalIndex + 1}`);
      setCurrentQuestionId(`universal-${String(nextUniversalIndex + 1).padStart(2, '0')}`);
      setQuestionPath([...questionPath, `universal-${String(nextUniversalIndex + 1).padStart(2, '0')}`]);
    } else {
      // Assessment complete - trigger analysis
      console.log('✅ IPE Assessment complete! Generating KPI insights...');
      setIsAnalyzing(true);
    }
  };

  const getProgress = () => (questionPath.length / 5) * 100;

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6">
        <Card className="bg-navy/50 border border-bronze/30 p-12 rounded-lg max-w-2xl w-full">
          <BreathSync 
            pattern="4-7-8" 
            duration={15}
            onComplete={() => {
              setIsAnalyzing(false);
              setShowResults(true);
            }}
            className="w-full"
          />
        </Card>
      </div>
    );
  }

  // IPE-compliant results calculation
  const calculateResults = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const demoMode = urlParams.get('demo');
    
    // Demo mode mock data (preserved for testing)
    if (demoMode === 'safety') {
      return {
        score: 48,
        branch: 'safety' as const,
        topWin: 'Secure Entry',
        topGap: 'Lighting',
        kpiMetrics: {} as KPIMetrics,
        archetypeData: {
          primaryArchetype: 'Secure Creator',
          strengthAreas: ['Safety Foundation', 'Privacy Control'],
          growthOpportunities: ['Enhanced Lighting', 'Flow Optimization'],
          recommendedPathways: ['Safety Deep Dive', '72-Hour Design'],
          viralShareData: {
            tagline: 'Secure Creator: Safety + Innovation ✨',
            visualElements: ['Secure Creator Badge', 'Safety Map'],
            remixPrompts: ['How would you secure your space?']
          }
        }
      };
    } else if (demoMode === 'optimize') {
      return {
        score: 76,
        branch: 'optimization' as const,
        topWin: 'Privacy',
        topGap: 'Evening Light',
        kpiMetrics: {} as KPIMetrics,
        archetypeData: {
          primaryArchetype: 'Visionary Architect',
          strengthAreas: ['Future Planning', 'Creative Expression'],
          growthOpportunities: ['Smart Integration', 'Community Connection'],
          recommendedPathways: ['Optimization Track', 'Community Building'],
          viralShareData: {
            tagline: 'Visionary Architect: Future + Beauty ✨',
            visualElements: ['Visionary Badge', 'Future Map'],
            remixPrompts: ['Share your visionary space ideas']
          }
        }
      };
    }

    // Calculate KPI metrics and archetype data
    const kpiMetrics = calculateKPIMetrics(responses);
    const archetypeData = generateArchetypeData(responses, branch || 'optimization');
    
    // Calculate overall score from KPI metrics
    const kpiScores = Object.values(kpiMetrics).map(m => m.score);
    const averageScore = kpiScores.length > 0 
      ? Math.round(kpiScores.reduce((sum, score) => sum + score, 0) / kpiScores.length)
      : 65;
    
    // Find top strength and growth area
    const strengthCategories = Object.entries(kpiMetrics)
      .sort(([,a], [,b]) => b.score - a.score);
    
    const topWin = strengthCategories.length > 0 
      ? strengthCategories[0][0].replace('-', ' ')
      : 'Environmental Agency';
    
    const topGap = strengthCategories.length > 1
      ? strengthCategories[strengthCategories.length - 1][0].replace('-', ' ')
      : 'Growth Edge';

    return {
      score: averageScore,
      branch: branch!,
      topWin,
      topGap,
      kpiMetrics,
      archetypeData
    };
  };

  // Handle safety outlet display
  if (showSafety) {
    return <SafetyOutlet onBack={() => setShowSafety(false)} />;
  }

  if (showResults) {
    const results = calculateResults();
    return (
      <LivingEnvironmentResult
        score={results.score}
        branch={results.branch}
        topWin={results.topWin}
        topGap={results.topGap}
        kpiMetrics={results.kpiMetrics}
        archetypeData={results.archetypeData}
        onBack={onBack}
      />
    );
  }

  const question = getCurrentQuestion();

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-20">
      <div className={`max-w-2xl w-full transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-moonlight hover:text-bronze hover:bg-bronze/10 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-moonlight/60 font-body font-bold">
            Question {questionPath.length} of 5
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-navy/50 rounded-full h-2 border border-bronze/20">
            <div 
              className="bg-bronze h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-navy/50 border border-bronze/30 p-8 rounded-lg">
          <div className="space-y-8">
            <h2 className="font-heading heading-confident text-2xl md:text-3xl text-bronze text-center leading-tight">
              {question.question}
            </h2>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-6 text-left justify-start border-2 border-bronze/30 bg-navy/30 text-moonlight hover:border-bronze hover:bg-bronze/10 hover:translate-y-[-4px] transition-all duration-300 font-body font-bold uppercase tracking-wide text-lg min-h-[48px]"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Discrete Safety Outlet - IPE Pillar 2 */}
        <div className="mt-8 text-center">
          <SafetyOutlet isFooterMode={true} />
        </div>
      </div>
    </div>
  );
};

export default LivingEnvironmentQuiz;