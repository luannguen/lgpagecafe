'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, ScrollControls } from '@react-three/drei';
import { CoffeeModel } from './CoffeeModel';
import { FogSystem } from './FogSystem';
import { LightingSystem } from './LightingSystem';
import { CameraRig } from './CameraRig';
import { DynamicEnvironment } from './DynamicEnvironment';
import { KintsugiTable } from './KintsugiTable';
import { CoffeeBeans } from './CoffeeBeans';
import { SceneText3D } from './SceneText3D';
import { BookingForm3D } from './BookingForm3D';

export function CoffeeScene() {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#0a0500']} />
        
        {/* ScrollControls drives the 3D scroll logic. pages=5 creates the virtual height */}
        <ScrollControls pages={5} damping={0.25}>
          
          <FogSystem />
          <LightingSystem />
          <CameraRig />
          
          <Environment preset="city" />
          
          {/* Core Objects */}
          <KintsugiTable />
          <CoffeeBeans />
          <CoffeeModel />
          
          {/* Particles */}
          <DynamicEnvironment />
          
          {/* Pure 3D Text & UI Elements */}
          <SceneText3D />
          <BookingForm3D />
          
        </ScrollControls>

        <ContactShadows 
          position={[0, -0.5, 0]} 
          opacity={0.8} 
          scale={15} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
