import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import '../styles/aquarium.css';

const Index = () => {
  return (
    <div className="aquarium-container">
      {/* Aquarium background layers */}
      <div className="aquarium-bg" aria-hidden="true" />
      <div className="aquarium-particles" aria-hidden="true" />
      
      {/* Main content with proper contrast overlay */}
      <div className="aquarium-content">
        <main className="min-h-screen flex flex-col">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;