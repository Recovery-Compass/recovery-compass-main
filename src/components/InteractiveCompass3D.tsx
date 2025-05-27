
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Cylinder, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface EnvironmentalVector {
  name: string;
  score: number;
  angle: number;
  description: string;
  interventions: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface InteractiveCompass3DProps {
  onVectorClick: (vector: EnvironmentalVector) => void;
  selectedVector: EnvironmentalVector | null;
}

const environmentalData: EnvironmentalVector[] = [
  {
    name: 'Physical Safety',
    score: 7.2,
    angle: 0,
    description: 'Your sense of physical security in your environment',
    interventions: ['Safety planning', 'Environmental modifications', 'Support network activation'],
    riskLevel: 'medium'
  },
  {
    name: 'Social Support',
    score: 8.5,
    angle: 45,
    description: 'Quality and availability of supportive relationships',
    interventions: ['Peer support groups', 'Family therapy', 'Community connections'],
    riskLevel: 'low'
  },
  {
    name: 'Resource Access',
    score: 6.1,
    angle: 90,
    description: 'Availability of essential resources and services',
    interventions: ['Resource mapping', 'Advocacy services', 'Navigation support'],
    riskLevel: 'high'
  },
  {
    name: 'Trigger Proximity',
    score: 4.3,
    angle: 135,
    description: 'Distance from known environmental triggers',
    interventions: ['Trigger identification', 'Environmental changes', 'Coping strategies'],
    riskLevel: 'high'
  },
  {
    name: 'Community Connection',
    score: 7.8,
    angle: 180,
    description: 'Sense of belonging and community engagement',
    interventions: ['Community activities', 'Volunteer opportunities', 'Cultural connections'],
    riskLevel: 'low'
  },
  {
    name: 'Healthcare Access',
    score: 5.9,
    angle: 225,
    description: 'Availability and quality of healthcare services',
    interventions: ['Care coordination', 'Insurance navigation', 'Provider connections'],
    riskLevel: 'medium'
  },
  {
    name: 'Economic Stability',
    score: 5.2,
    angle: 270,
    description: 'Financial security and economic resources',
    interventions: ['Financial planning', 'Employment support', 'Benefits assistance'],
    riskLevel: 'high'
  },
  {
    name: 'Recovery Capital',
    score: 8.1,
    angle: 315,
    description: 'Internal and external resources supporting recovery',
    interventions: ['Strength identification', 'Skill building', 'Asset development'],
    riskLevel: 'low'
  }
];

const CompassBase = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Cylinder
      ref={meshRef}
      args={[1.5, 1.5, 0.3, 32]}
      position={[0, -0.15, 0]}
    >
      <meshPhongMaterial 
        color="#148D8D" 
        transparent 
        opacity={0.8} 
      />
    </Cylinder>
  );
};

const EnvironmentalVector = ({ 
  vector, 
  onHover, 
  onClick, 
  isSelected 
}: { 
  vector: EnvironmentalVector;
  onHover: (vector: EnvironmentalVector | null) => void;
  onClick: (vector: EnvironmentalVector) => void;
  isSelected: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const angleRad = (vector.angle * Math.PI) / 180;
  const vectorLength = (vector.score / 10) * 3;
  
  const endPosition = useMemo(() => [
    Math.cos(angleRad) * vectorLength,
    0,
    Math.sin(angleRad) * vectorLength
  ] as [number, number, number], [angleRad, vectorLength]);

  const riskColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444'
  };

  useFrame(() => {
    if (groupRef.current && (hovered || isSelected)) {
      groupRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.1);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    onHover(vector);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    onHover(null);
  };

  const handleClick = () => {
    onClick(vector);
  };

  return (
    <group ref={groupRef}>
      <mesh
        position={[endPosition[0] / 2, 0, endPosition[2] / 2]}
        rotation={[0, -angleRad, 0]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <cylinderGeometry args={[0.02, 0.02, vectorLength, 8]} />
        <meshPhongMaterial color="#D4AF37" />
      </mesh>
      
      <Sphere
        args={[0.15]}
        position={endPosition}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <meshPhongMaterial 
          color={riskColors[vector.riskLevel]} 
          emissive={riskColors[vector.riskLevel]}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
        />
      </Sphere>

      <Text
        position={[endPosition[0] * 1.2, 0.3, endPosition[2] * 1.2]}
        fontSize={0.2}
        color="#C69C6D"
        anchorX="center"
        anchorY="middle"
      >
        {vector.name}
      </Text>
    </group>
  );
};

const CompassNeedle = ({ strongestVector }: { strongestVector: EnvironmentalVector }) => {
  const needleRef = useRef<THREE.Group>(null);
  const targetAngle = (strongestVector.angle * Math.PI) / 180;
  
  useFrame(() => {
    if (needleRef.current) {
      const currentRotation = needleRef.current.rotation.y;
      const diff = targetAngle - currentRotation;
      needleRef.current.rotation.y += diff * 0.02;
    }
  });

  return (
    <group ref={needleRef}>
      <mesh position={[0, 0.2, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.8, 8]} />
        <meshPhongMaterial 
          color="#D4AF37" 
          emissive="#D4AF37" 
          emissiveIntensity={0.2} 
        />
      </mesh>
    </group>
  );
};

const InteractiveCompass3D = ({ onVectorClick, selectedVector }: InteractiveCompass3DProps) => {
  const [hoveredVector, setHoveredVector] = useState<EnvironmentalVector | null>(null);
  
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
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <CompassBase />
        <CompassNeedle strongestVector={strongestVector} />
        
        {environmentalData.map((vector, index) => (
          <EnvironmentalVector
            key={`vector-${index}-${vector.name}`}
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
      
      {hoveredVector && (
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
      )}
    </div>
  );
};

export default InteractiveCompass3D;
export { environmentalData };
export type { EnvironmentalVector };
