
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Option {
  title: string;
  description: string;
  comingSoon?: boolean;
}

const OptionsNotPrograms = () => {
  const options: Option[] = [
    {
      title: "Environmental Assessment",
      description: "A self-directed process to evaluate how your physical surroundings, digital spaces, and social contexts are influencing your wellbeing and choices."
    },
    {
      title: "Space Redesign Guide",
      description: "Practical approaches to transforming your living environment to better support your authentic self and desired life direction."
    },
    {
      title: "Digital Environment Audit",
      description: "Tools to evaluate and optimize your relationship with technology, media consumption, and online interactions.",
      comingSoon: true
    },
    {
      title: "Connection Mapping",
      description: "A framework for identifying and cultivating relationships that foster belonging without requiring conformity.",
      comingSoon: true
    },
    {
      title: "Sensory Integration Tools",
      description: "Approaches to working with light, sound, texture, scent and other environmental elements to support regulation and presence.",
      comingSoon: true
    },
    {
      title: "Transition Navigation",
      description: "Support for maintaining environmental consistency during life transitions like moving, career changes, or relationship shifts.",
      comingSoon: true
    }
  ];

  return (
    <div className="content-container">
      <h2 className="section-heading">Options, Not Programs</h2>
      <p className="section-subheading">
        Self-directed pathways to transformation
      </p>
      
      <div className="mt-8 mb-12 text-center max-w-2xl mx-auto">
        <p className="text-moonlight/90 leading-relaxed">
          Recovery Compass rejects the one-size-fits-all approach of traditional programs. 
          Instead, we offer options that honor your autonomy and unique context. Each resource 
          can be used independently or in combination based on your specific needs and preferences.
        </p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <div 
            key={index}
            className="relative p-6 border border-bronze/30 rounded-lg bg-navy/50 transition-all duration-300 hover:border-bronze/60 hover:bg-navy/70"
          >
            {option.comingSoon && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-bronze/20 text-bronze text-xs rounded-full border border-bronze/30">
                Coming Soon
              </div>
            )}
            
            <h3 className="text-xl font-playfair text-bronze mb-3">{option.title}</h3>
            <p className="text-moonlight/80 leading-relaxed">{option.description}</p>
            
            {!option.comingSoon && (
              <div className="mt-4">
                <Button variant="outline" className="text-moonlight/70 hover:text-moonlight hover:bg-navy/80">
                  Learn More
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-moonlight/80 mb-6">
          All options are designed to be used flexibly, without requiring identification 
          with labels or adherence to standardized protocols.
        </p>
        
        <Button className="bg-bronze/20 border border-bronze/50 text-bronze hover:bg-bronze/30 transition-colors duration-300">
          Explore All Options
        </Button>
      </div>
    </div>
  );
};

export default OptionsNotPrograms;
