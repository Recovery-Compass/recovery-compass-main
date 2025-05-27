
import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CompassBase from './compass/CompassBase';
import CompassNeedle from './compass/CompassNeedle';
import EnvironmentalVector from './compass/EnvironmentalVector';
import CompassTooltip from './compass/CompassTooltip';
import { environmentalData } from './compass/environmentalData';
import { EnvironmentalVector as EnvironmentalVectorType, InteractiveCompass3DProps } from './compass/types';

const InteractiveCompass3D = ({ onVectorClick, selectedVector }: InteractiveCompass3DProps) => {
  const [hoveredVector, setHoveredVector] = useState<EnvironmentalVectorType | null>(null);
  
  const strongestVector = useMemo(() => 
    environmentalData.reduce((prev, current) => 
      prev.score > current.score ? prev : current
    ), []);

  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 8, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
        }}
        fallback={<div>Loading compass...</div>}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <CompassBase />
        <CompassNeedle strongestVector={strongestVector} />
        
        {environmentalData.map((vector, index) => (
          <EnvironmentalVector
            key={`${vector.name}-${index}`}
            vector={vector}
            onHover={setHoveredVector}
            onClick={onVectorClick}
            isSelected={selectedVector?.name === vector.name}
          />
        ))}
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <CompassTooltip hoveredVector={hoveredVector} />
    </div>
  );
};

export default InteractiveCompass3D;
export { environmentalData };
export type { EnvironmentalVector } from './compass/types';
