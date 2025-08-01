import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';

interface JourneyOption {
  label: string;
  value: string;
  next: string | 'assessment';
  category?: string;
}

interface JourneyNode {
  id: string;
  question: string;
  subtext?: string;
  options: JourneyOption[];
}

const journeyTree: Record<string, JourneyNode> = {
  start: {
    id: 'start',
    question: "What brings you here today?",
    subtext: "Let's find the right starting point for your journey",
    options: [
      {
        label: "I'm struggling with my current situation",
        value: "struggling",
        next: "struggling-branch"
      },
      {
        label: "I want to optimize what's already working",
        value: "optimizing",
        next: "optimize-branch"
      },
      {
        label: "I'm not sure where to begin",
        value: "exploring",
        next: "explore-branch"
      }
    ]
  },
  
  'struggling-branch': {
    id: 'struggling-branch',
    question: "What feels most challenging right now?",
    options: [
      {
        label: "My living space feels chaotic or unsafe",
        value: "living-struggle",
        next: "assessment",
        category: "living-environment"
      },
      {
        label: "I feel isolated or disconnected from others",
        value: "social-struggle",
        next: "assessment",
        category: "social-connections"
      },
      {
        label: "My daily routine is overwhelming",
        value: "routine-struggle",
        next: "time-routine-depth"
      },
      {
        label: "Financial stress is consuming me",
        value: "financial-struggle",
        next: "assessment",
        category: "financial-wellness"
      }
    ]
  },
  
  'optimize-branch': {
    id: 'optimize-branch',
    question: "What area would create the most positive impact?",
    options: [
      {
        label: "Enhance my living environment",
        value: "living-optimize",
        next: "living-optimize-depth"
      },
      {
        label: "Deepen my relationships",
        value: "social-optimize",
        next: "assessment",
        category: "social-connections"
      },
      {
        label: "Align work with my values",
        value: "work-optimize",
        next: "assessment",
        category: "work-life-harmony"
      },
      {
        label: "Accelerate personal growth",
        value: "growth-optimize",
        next: "assessment",
        category: "personal-growth"
      }
    ]
  },
  
  'explore-branch': {
    id: 'explore-branch',
    question: "What resonates with you most?",
    subtext: "Sometimes the best way to start is to follow what feels right",
    options: [
      {
        label: "Creating a space that supports me",
        value: "space-explore",
        next: "assessment",
        category: "living-environment"
      },
      {
        label: "Building meaningful connections",
        value: "connection-explore",
        next: "assessment",
        category: "social-connections"
      },
      {
        label: "Finding balance in my days",
        value: "balance-explore",
        next: "time-routine-depth"
      },
      {
        label: "Exploring my potential",
        value: "potential-explore",
        next: "assessment",
        category: "personal-growth"
      }
    ]
  },
  
  'time-routine-depth': {
    id: 'time-routine-depth',
    question: "Is this more about time or energy?",
    options: [
      {
        label: "I never have enough time",
        value: "time-issue",
        next: "assessment",
        category: "time-management"
      },
      {
        label: "I'm exhausted even when I have time",
        value: "energy-issue",
        next: "assessment",
        category: "physical-health"
      },
      {
        label: "Both - I'm stuck in survival mode",
        value: "both-issue",
        next: "assessment",
        category: "time-management"
      }
    ]
  },
  
  'living-optimize-depth': {
    id: 'living-optimize-depth',
    question: "What would make your space more supportive?",
    options: [
      {
        label: "Better organization and flow",
        value: "organization",
        next: "assessment",
        category: "living-environment"
      },
      {
        label: "A space that energizes my body",
        value: "physical-space",
        next: "assessment",
        category: "physical-health"
      },
      {
        label: "An environment that inspires growth",
        value: "growth-space",
        next: "assessment",
        category: "personal-growth"
      }
    ]
  }
};

const EnvironmentalDesignAdaptive = () => {
  const navigate = useNavigate();
  const [currentNode, setCurrentNode] = useState<string>('start');
  const [journey, setJourney] = useState<string[]>(['start']);
  const [responses, setResponses] = useState<Record<string, string>>({});
  
  const node = journeyTree[currentNode];
  
  const handleChoice = (option: JourneyOption) => {
    const newResponses = {
      ...responses,
      [currentNode]: option.value
    };
    
    setResponses(newResponses);
    
    if (option.next === 'assessment' && option.category) {
      // Store journey context for the assessment
      sessionStorage.setItem('journeyContext', JSON.stringify({
        responses: newResponses,
        category: option.category,
        primaryGoal: newResponses['start'] || 'exploring'
      }));
      
      navigate('/assessment-transition');
    } else {
      // Add to journey path and move to next node
      setJourney([...journey, option.next]);
      setCurrentNode(option.next);
    }
  };
  
  const goBack = () => {
    if (journey.length > 1) {
      const newJourney = journey.slice(0, -1);
      setJourney(newJourney);
      setCurrentNode(newJourney[newJourney.length - 1]);
    } else {
      navigate('/pathway-select');
    }
  };
  
  const getContextualHelp = (): string => {
    if (currentNode === 'start') {
      return "There's no wrong answer here. Choose what feels most true for you right now.";
    }
    
    if (responses['start'] === 'struggling') {
      return "You're taking a brave step. Let's identify where you need support most.";
    }
    
    if (responses['start'] === 'optimizing') {
      return "Building on your strengths is powerful. Let's amplify what's working.";
    }
    
    if (responses['start'] === 'exploring') {
      return "Discovery is a beautiful process. Trust your intuition here.";
    }
    
    return "Your responses are creating a personalized path forward.";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-deep-navy flex flex-col items-center justify-center px-6">
      {/* Progress indicator */}
      <div className="fixed top-24 left-0 right-0 flex justify-center z-10">
        <div className="flex gap-2 bg-navy/80 backdrop-blur-sm px-4 py-2 rounded-full">
          {journey.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === journey.length - 1 
                  ? 'bg-gold w-8' 
                  : 'bg-copper/30'
              }`}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-navy/50 border border-copper/30 p-8 md:p-12 shadow-lg">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-semibold text-gold mb-2"
            >
              {node.question}
            </motion.h2>
            
            {node.subtext && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-moonlight/70 mb-8"
              >
                {node.subtext}
              </motion.p>
            )}
            
            <div className="space-y-4">
              {node.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleChoice(option)}
                  className="w-full text-left p-6 bg-navy/30 hover:bg-navy/50 
                           border border-copper/20 hover:border-gold/50 
                           rounded-lg transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight group-hover:text-gold transition-colors">
                      {option.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-copper group-hover:text-gold 
                                           transform group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              ))}
            </div>
            
            <button
              onClick={goBack}
              className="mt-8 flex items-center gap-2 text-moonlight/50 hover:text-moonlight transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Card>
          
          {/* Context-aware helper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-2xl"
          >
            <Card className="bg-gold/10 border-gold/30 p-4">
              <p className="text-sm text-moonlight/80 text-center">
                {getContextualHelp()}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EnvironmentalDesignAdaptive;