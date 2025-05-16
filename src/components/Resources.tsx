
import { cn } from '@/lib/utils';

interface Resource {
  title: string;
  description: string;
  type: 'guide' | 'tool' | 'practice';
}

const Resources = () => {
  const resources: Resource[] = [
    {
      title: "Environmental Assessment Guide",
      description: "A structured approach to evaluating how your physical surroundings may be helping or hindering your recovery journey.",
      type: "guide"
    },
    {
      title: "Space Redesign Toolkit",
      description: "Practical steps for transforming your living or working environment to better support your recovery goals.",
      type: "tool"
    },
    {
      title: "Digital Wellbeing Framework",
      description: "Strategies for creating digital spaces and habits that nurture rather than disrupt your recovery process.",
      type: "guide"
    },
    {
      title: "Sensory Grounding Practices",
      description: "Techniques that use your physical environment to maintain presence and manage triggering situations.",
      type: "practice"
    },
    {
      title: "Community Space Directory",
      description: "A curated list of physical and virtual communities designed with recovery principles in mind.",
      type: "tool"
    },
    {
      title: "Transitional Environments Guide",
      description: "Support for navigating changes in your environment while maintaining recovery momentum.",
      type: "guide"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-teal/20 text-teal border-teal/30';
      case 'tool': return 'bg-bronze/20 text-bronze border-bronze/30';
      case 'practice': return 'bg-moonlight/20 text-moonlight border-moonlight/30';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="content-container">
      <h2 className="section-heading">Resources</h2>
      <p className="section-subheading">
        Tools and guidance presented in a calm, organized manner
      </p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className="p-6 border border-bronze/30 rounded-lg bg-navy/50 transition-all duration-300 hover:border-bronze/60 hover:bg-navy/70"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-playfair text-bronze">{resource.title}</h3>
              <span className={cn(
                'text-xs px-2 py-1 rounded-full border',
                getTypeColor(resource.type)
              )}>
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </span>
            </div>
            <p className="text-moonlight/80 leading-relaxed">{resource.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-moonlight/60">
          Full resource library coming soon.
          <br />
          For immediate support, please contact us directly.
        </p>
      </div>
    </div>
  );
};

export default Resources;
