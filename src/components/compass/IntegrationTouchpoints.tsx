
import { motion } from 'framer-motion';
import { ArrowRight, FileText, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IntegrationTouchpoints = () => {
  const navigate = useNavigate();

  const touchpoints = [
    {
      id: 'impact-translator',
      title: 'Impact Translator',
      description: 'Transform insights into funder-ready stories',
      icon: FileText,
      path: '/impact-translator',
      color: 'from-teal/20 to-gold/20',
      borderColor: 'border-teal/30'
    },
    {
      id: 'strategic-dashboard',
      title: 'Strategic Dashboard',
      description: 'Executive metrics and outcome visualization',
      icon: BarChart3,
      path: '/strategic-dashboard',
      color: 'from-gold/20 to-bronze/20',
      borderColor: 'border-gold/30'
    },
    {
      id: 'wfd-suite',
      title: 'WFD Integration',
      description: 'Complete attachment-informed workflow',
      icon: Users,
      path: '/wfd-attachments',
      color: 'from-bronze/20 to-teal/20',
      borderColor: 'border-bronze/30'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-bronze font-montserrat font-semibold text-xl mb-2">
          Integration Ecosystem
        </h3>
        <p className="text-moonlight/70 font-montserrat">
          Connect insights across the Recovery Compass platform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {touchpoints.map((touchpoint, index) => (
          <motion.div
            key={touchpoint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`bg-gradient-to-br ${touchpoint.color} border ${touchpoint.borderColor} 
                       rounded-lg p-6 hover:scale-105 transition-all duration-300 
                       cursor-pointer group backdrop-blur-sm`}
            onClick={() => navigate(touchpoint.path)}
          >
            <div className="flex items-center justify-between mb-4">
              <touchpoint.icon 
                size={24} 
                className="text-bronze group-hover:text-gold transition-colors" 
              />
              <ArrowRight 
                size={16} 
                className="text-moonlight/60 group-hover:text-moonlight group-hover:translate-x-1 transition-all" 
              />
            </div>
            
            <h4 className="text-moonlight font-montserrat font-semibold mb-2">
              {touchpoint.title}
            </h4>
            
            <p className="text-moonlight/80 text-sm font-montserrat leading-relaxed">
              {touchpoint.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Demo Data Note */}
      <div className="text-center mt-8 p-4 bg-navy/40 border border-teal/20 rounded-lg">
        <p className="text-moonlight/60 text-sm font-montserrat">
          💡 <strong>Demo Mode:</strong> Assessment data persists locally for stakeholder presentations
        </p>
      </div>
    </motion.div>
  );
};

export default IntegrationTouchpoints;
