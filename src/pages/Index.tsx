import CompassLogo from '@/components/CompassLogo';
import '../styles/aquarium.css';

const Index = () => {
  return (
    <main className="homepage-container">
      <div className="hero-content">
        <div className="logo-float">
          <CompassLogo 
            size="xl" 
            className="w-40 h-40" 
            priority 
          />
        </div>
        <h1 className="hero-headline">RECOVERY COMPASS</h1>
      </div>
    </main>
  );
};

export default Index;