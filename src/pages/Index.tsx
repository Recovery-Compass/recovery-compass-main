import CompassLogo from '@/components/CompassLogo';
import { Button } from '@/components/ui/button';
import '../styles/aquarium.css';

const Index = () => {
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
        <Button 
          variant="cta" 
          size="cta"
          onClick={() => window.location.href = '/adventure'}
          className="cta-btn-gold"
        >
          TRANSFORM YOUR ORGANIZATION
        </Button>
      </div>
    </main>
  );
};

export default Index;