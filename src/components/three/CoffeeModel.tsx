'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export function CoffeeModel() {
  const cupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (liquidRef.current) {
      // Add animation ON TOP of the base rotation (-Math.PI / 2)
      liquidRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      liquidRef.current.rotation.x = -Math.PI / 2 + Math.cos(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <Float 
      speed={1.5} // Animation speed
      rotationIntensity={0.2} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group ref={cupRef} position={[0, 0, 0]} castShadow>
        {/* Cup Body - Wabi-Sabi asymmetric scale */}
        <mesh position={[0, 0, 0]} scale={[1.05, 1, 0.95]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 0.8, 1.5, 64]} />
          <meshPhysicalMaterial 
            color="#2a2a2a" // Lighter charcoal so lighting is visible
            roughness={0.7} // Slightly more reflective
            metalness={0.2}
            clearcoat={0.3}
            clearcoatRoughness={0.5}
          />
        </mesh>
        
        {/* Cup Inside - To create an illusion of depth if needed */}
        <mesh position={[0, 0.01, 0]} scale={[1.04, 1, 0.94]} receiveShadow>
          <cylinderGeometry args={[1.15, 0.75, 1.5, 64]} />
          <meshBasicMaterial color="#0a0500" />
        </mesh>
        
        {/* Cup Handle - Slightly organic shape */}
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 8]} scale={[1, 1.2, 0.8]} castShadow>
          <torusGeometry args={[0.5, 0.15, 32, 64]} />
          <meshPhysicalMaterial 
            color="#2a2a2a"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        
        {/* Coffee Liquid - Highly reflective */}
        <mesh ref={liquidRef} position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.1, 64]} />
          <meshPhysicalMaterial 
            color="#1a0a00" // Dark brown liquid
            roughness={0.1} // More reflective
            metalness={0.8}
            ior={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            envMapIntensity={3.0} // Strong environment reflection
          />
        </mesh>
      </group>
    </Float>
  );
}
