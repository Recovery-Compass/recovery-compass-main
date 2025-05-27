
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CompassBase = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.15, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
      <meshPhongMaterial 
        color="#148D8D" 
        transparent 
        opacity={0.8} 
      />
    </mesh>
  );
};

export default CompassBase;
