'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { CoffeeModel } from './CoffeeModel';
import { FogSystem } from './FogSystem';
import { ParticleSystem } from './ParticleSystem';
import { LightingSystem } from './LightingSystem';
import { CameraRig } from './CameraRig';

export function CoffeeScene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <FogSystem />
        <LightingSystem />
        <CameraRig />
        
        <Environment preset="city" />
        <CoffeeModel />
        <ParticleSystem count={300} />
        
        <ContactShadows 
          position={[0, -0.5, 0]} 
          opacity={0.6} 
          scale={15} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
