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
      // Simulate gentle liquid movement
      liquidRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      liquidRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 2) * 0.02;
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
            color="#1a1a1a" // Dark charcoal ceramic
            roughness={0.85} // Matte finish
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.9}
          />
        </mesh>
        
        {/* Cup Handle - Slightly organic shape */}
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 8]} scale={[1, 1.2, 0.8]} castShadow>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshPhysicalMaterial 
            color="#1a1a1a"
            roughness={0.85}
          />
        </mesh>
        
        {/* Coffee Liquid - Highly reflective */}
        <mesh ref={liquidRef} position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.1, 64]} />
          <meshPhysicalMaterial 
            color="#0a0500" // Extremely dark brown/black
            roughness={0.0} // Mirror-like liquid
            metalness={0.1}
            ior={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            envMapIntensity={2.0} // Reflect environment heavily
          />
        </mesh>
      </group>
    </Float>
  );
}
