
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EnvironmentalVector } from './types';

interface CompassNeedleProps {
  strongestVector: EnvironmentalVector;
}

const CompassNeedle = ({ strongestVector }: CompassNeedleProps) => {
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
      <mesh 
        position={[0, 0.2, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      >
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

export default CompassNeedle;
