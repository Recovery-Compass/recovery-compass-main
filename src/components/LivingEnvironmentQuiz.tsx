import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface LivingEnvironmentQuizProps {
  onBack: () => void;
}

const LivingEnvironmentQuiz = ({ onBack }: LivingEnvironmentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [branch, setBranch] = useState<'safety' | 'optimization' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Question data
  const initialQuestion = {
    text: "How would you describe your current living space?",
    options: ["Challenging", "Needs Work", "Adequate", "Comfortable", "Thriving"]
  };

  const safetyQuestions = [
    "Do you feel physically safe in your living environment?",
    "Are your basic needs (shelter, warmth, security) consistently met?",
    "How often do you worry about housing stability or safety?",
    "Does your living space provide adequate privacy and personal boundaries?"
  ];

  const optimizationQuestions = [
    "How well does your space support your daily routines and productivity?",
    "Does your environment promote relaxation and stress relief?",
    "How satisfied are you with the lighting and air quality in your space?",
    "Does your living area inspire and energize you?"
  ];

  // Demo mode handling
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const demoMode = urlParams.get('demo');
    
    if (demoMode === 'safety') {
      setResponses([2]);
      setBranch('safety');
      setCurrentQuestion(1);
    } else if (demoMode === 'optimize') {
      setResponses([4]);
      setBranch('optimization');
      setCurrentQuestion(1);
    }
    
    setIsVisible(true);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const newResponses = [...responses, answerIndex + 1];
    setResponses(newResponses);

    if (currentQuestion === 0) {
      // First question determines branch
      const selectedBranch = answerIndex <= 1 ? 'safety' : 'optimization';
      setBranch(selectedBranch);
    }

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const getCurrentQuestion = () => {
    if (currentQuestion === 0) {
      return initialQuestion;
    }

    const questions = branch === 'safety' ? safetyQuestions : optimizationQuestions;
    return {
      text: questions[currentQuestion - 1],
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    };
  };

  const getProgress = () => ((currentQuestion + 1) / 5) * 100;

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6">
        <Card className="bg-navy/50 border border-bronze/30 p-12 rounded-lg text-center max-w-md">
          <div className="space-y-6">
            <div className="w-16 h-16 border-4 border-bronze/30 border-t-bronze rounded-full animate-spin mx-auto"></div>
            <h2 className="font-montserrat font-black text-2xl text-bronze">
              Analyzing your responses...
            </h2>
            <p className="text-moonlight/70 font-montserrat">
              Generating your personalized insights
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <Card className="bg-navy/50 border border-bronze/30 p-12 rounded-lg text-center">
            <div className="space-y-8">
              <h2 className="font-montserrat font-black text-3xl text-bronze mb-6">
                Your Environmental Assessment
              </h2>
              <p className="text-moonlight text-lg font-montserrat leading-relaxed">
                Your environmental assessment reveals strong foundations with targeted opportunities in lighting optimization and acoustic comfort to enhance your daily restoration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  onClick={onBack}
                  className="border-2 border-bronze text-bronze hover:bg-bronze hover:text-navy font-montserrat font-bold uppercase tracking-wide px-8 py-3"
                >
                  Explore Other Areas
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
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
          <div className="text-moonlight/60 font-montserrat font-medium">
            Question {currentQuestion + 1} of 5
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
            <h2 className="font-montserrat font-black text-2xl md:text-3xl text-bronze text-center leading-tight">
              {question.text}
            </h2>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-6 text-left justify-start border-2 border-bronze/30 bg-navy/30 text-moonlight hover:border-bronze hover:bg-bronze/10 hover:translate-y-[-4px] transition-all duration-300 font-montserrat font-bold uppercase tracking-wide text-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LivingEnvironmentQuiz;