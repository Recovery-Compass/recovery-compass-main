import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BreathSync } from './individual/BreathSync';
import { Card } from './ui/card';

const AssessmentTransition = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const context = JSON.parse(sessionStorage.getItem('journeyContext') || '{}');
    if (!context.category) {
      // If no context, redirect to environmental design
      navigate('/environmental-design');
    }
  }, [navigate]);
  
  const getTransitionMessage = () => {
    const context = JSON.parse(sessionStorage.getItem('journeyContext') || '{}');
    
    if (context.primaryGoal === 'struggling') {
      return "Let's take a moment to center yourself before we begin";
    }
    if (context.primaryGoal === 'optimizing') {
      return "Prepare your mind for the insights ahead";
    }
    return "Take a breath as we prepare your personalized assessment";
  };
  
  const handleBreathComplete = () => {
    const context = JSON.parse(sessionStorage.getItem('journeyContext') || '{}');
    
    // Route to specific assessment based on category
    if (context.category === 'living-environment') {
      navigate('/environmental-quiz', { replace: true });
    } else {
      // For other categories, go to the general environmental design page
      navigate('/environmental-quiz', { replace: true });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-deep-navy flex items-center justify-center px-6">
      <Card className="bg-navy/50 border border-copper/30 p-12 max-w-2xl w-full shadow-lg">
        <h2 className="text-2xl font-semibold text-gold mb-6 text-center">
          {getTransitionMessage()}
        </h2>
        
        <p className="text-moonlight/70 text-center mb-8">
          Take a few mindful breaths to prepare for your personalized assessment
        </p>
        
        <BreathSync 
          pattern="4-7-8"
          duration={15}
          onComplete={handleBreathComplete}
        />
      </Card>
    </div>
  );
};

export default AssessmentTransition;