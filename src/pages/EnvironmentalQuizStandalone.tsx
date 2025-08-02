import { useNavigate } from 'react-router-dom';
import LivingEnvironmentQuiz from '@/components/LivingEnvironmentQuiz';

export const EnvironmentalQuizStandalone = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/environmental-design');
  };

  return <LivingEnvironmentQuiz onBack={handleBack} />;
};