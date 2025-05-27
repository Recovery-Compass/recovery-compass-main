
import { motion } from 'framer-motion';
import { EnvironmentalVector } from './types';

interface CompassTooltipProps {
  hoveredVector: EnvironmentalVector | null;
}

const CompassTooltip = ({ hoveredVector }: CompassTooltipProps) => {
  if (!hoveredVector) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-navy/90 border border-teal/30 rounded-lg p-3 max-w-xs text-center backdrop-blur-sm"
    >
      <h4 className="text-bronze font-montserrat font-semibold text-sm mb-1">
        {hoveredVector.name}
      </h4>
      <p className="text-moonlight/80 text-xs">
        Score: {hoveredVector.score}/10
      </p>
    </motion.div>
  );
};

export default CompassTooltip;
