
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EnvironmentalVector } from './InteractiveCompass3D';

interface EnvironmentalDetailPanelProps {
  vector: EnvironmentalVector | null;
  onClose: () => void;
}

const EnvironmentalDetailPanel = ({ vector, onClose }: EnvironmentalDetailPanelProps) => {
  if (!vector) return null;

  const riskColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444'
  };

  const riskLabels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed right-0 top-0 h-full w-96 bg-navy/95 border-l border-teal/30 backdrop-blur-md z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-bronze font-montserrat font-black text-xl">
              {vector.name}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-moonlight/70 hover:text-bronze hover:bg-bronze/10"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Score Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-moonlight font-montserrat text-sm">Current Score</span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: `${riskColors[vector.riskLevel]}20`,
                  color: riskColors[vector.riskLevel]
                }}
              >
                {riskLabels[vector.riskLevel]}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(vector.score / 10) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: riskColors[vector.riskLevel] }}
                />
              </div>
              <span className="text-bronze font-montserrat font-bold text-2xl mt-2 block">
                {vector.score}/10
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-moonlight font-montserrat font-semibold text-lg mb-3">
              What This Means
            </h3>
            <p className="text-moonlight/80 leading-relaxed">
              {vector.description}
            </p>
          </div>

          {/* Interventions */}
          <div className="mb-6">
            <h3 className="text-moonlight font-montserrat font-semibold text-lg mb-3">
              Recommended Support
            </h3>
            <ul className="space-y-2">
              {vector.interventions.map((intervention, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                  <span className="text-moonlight/80 text-sm leading-relaxed">
                    {intervention}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-teal hover:bg-teal/80 text-navy font-montserrat font-semibold"
            onClick={() => {
              // Future: Open detailed assessment or action planning
              console.log(`Taking action for ${vector.name}`);
            }}
          >
            Explore Support Options
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnvironmentalDetailPanel;
