
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { EnvironmentalVector as EnvironmentalVectorType } from './types';

interface EnvironmentalVectorProps {
  vector: EnvironmentalVectorType;
  onHover: (vector: EnvironmentalVectorType | null) => void;
  onClick: (vector: EnvironmentalVectorType) => void;
  isSelected: boolean;
}

const EnvironmentalVector = ({ 
  vector, 
  onHover, 
  onClick, 
  isSelected 
}: EnvironmentalVectorProps) => {
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
      {/* Vector Line using basic mesh */}
      <mesh
        position={[endPosition[0] / 2, 0, endPosition[2] / 2]}
        rotation={[0, -angleRad, Math.PI / 2]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <cylinderGeometry args={[0.02, 0.02, vectorLength, 8]} />
        <meshPhongMaterial color="#D4AF37" />
      </mesh>
      
      {/* End Point Sphere using basic mesh */}
      <mesh
        position={endPosition}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.15]} />
        <meshPhongMaterial 
          color={riskColors[vector.riskLevel]} 
          emissive={riskColors[vector.riskLevel]}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
        />
      </mesh>

      {/* Label Text */}
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

export default EnvironmentalVector;
