import { Button } from "@/components/ui/button";
import CompassLogo from "@/components/CompassLogo";

const HeroSection = () => {
  const handleContactClick = () => {
    // Navigate to contact - can be updated to proper contact page/form later
    window.location.href = 'mailto:info@recoverycompass.org';
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Logo with floating animation */}
      <div className="logo-float mb-8">
        <CompassLogo 
          size="xl" 
          className="w-32 h-32" 
          priority 
        />
      </div>

      {/* Heading */}
      <h1 className="aquarium-heading font-heading font-black text-4xl md:text-5xl lg:text-6xl text-moon-glow mb-4 tracking-tight">
        Recovery Compass
      </h1>

      {/* Tagline */}
      <p className="aquarium-text font-body text-lg md:text-xl text-moon-glow/90 mb-12 max-w-2xl leading-relaxed">
        Human-centered systems for lasting recovery.
      </p>

      {/* Single CTA */}
      <Button 
        variant="cta" 
        size="cta"
        onClick={handleContactClick}
        className="font-bold text-lg px-12 py-4 focus-visible:ring-2 focus-visible:ring-compass-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-foundation"
      >
        Contact
      </Button>
    </section>
  );
};

export default HeroSection;