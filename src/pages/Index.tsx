import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CompassLogo from '@/components/CompassLogo';
import '../styles/aquarium.css';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <main className="homepage-container">
      <div className="hero-content">
        <div className="logo-float">
          <CompassLogo 
            size="xl" 
            className="w-90 h-90" 
            priority 
          />
        </div>
        <h1 className="hero-headline">RECOVERY COMPASS</h1>
        
        <div className="flex flex-col gap-4">
          <Button 
            variant="cta" 
            size="cta"
            onClick={() => window.location.href = '/adventure'}
            className="cta-btn-gold"
          >
            TRANSFORM YOUR ORGANIZATION
          </Button>
          
          {!user && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-background/10 text-primary border-primary hover:bg-primary hover:text-background"
            >
              Sign In / Create Account
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;