'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function LightingSystem() {
  const scrollData = useScroll();
  
  const mainLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const scroll = scrollData.offset;
    
    if (mainLight.current && fillLight.current && ambientLight.current) {
      let targetMainColor = new THREE.Color('#D4AF37'); // Gold (Arrival & Harmony)
      let targetFillColor = new THREE.Color('#4a5b6c'); // Lighter fill
      let targetAmbientIntensity = 0.5; // Increased base ambient light
      
      if (scroll < 0.2) {
        // Arrival (Cool morning light)
        targetMainColor.setHex(0xc0d4ee); // Light steel blue
      } else if (scroll < 0.4) {
        // Earth (Amber / Forest)
        targetMainColor.setHex(0xe2893e); // Brighter Amber
        targetFillColor.setHex(0x422100);
      } else if (scroll < 0.6) {
        // Fire (Craftsmanship)
        targetMainColor.setHex(0xff5522); // Intense red/orange
        targetFillColor.setHex(0x752020); // Red fill
        targetAmbientIntensity = 0.3; // Darker ambient but not pitch black
      } else if (scroll < 0.8) {
        // Water (Space)
        targetMainColor.setHex(0x97deff); // Sky blue/Cyan
        targetFillColor.setHex(0x102132);
        targetAmbientIntensity = 0.4;
      } else {
        // Harmony
        targetMainColor.setHex(0xD4AF37); // Gold
        targetAmbientIntensity = 0.5;
      }

      // Smoothly interpolate colors
      mainLight.current.color.lerp(targetMainColor, 0.05);
      fillLight.current.color.lerp(targetFillColor, 0.05);
      ambientLight.current.intensity = THREE.MathUtils.lerp(ambientLight.current.intensity, targetAmbientIntensity, 0.05);
      
      // Fire section flicker effect
      if (scroll > 0.4 && scroll < 0.6) {
        mainLight.current.intensity = 1.5 + Math.random() * 0.5; // Brighter Flicker
      } else {
        mainLight.current.intensity = THREE.MathUtils.lerp(mainLight.current.intensity, 1.5, 0.05); // Brighter overall
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientLight} intensity={0.5} color="#ffffff" />
      
      {/* Main Key Light */}
      <directionalLight 
        ref={mainLight}
        position={[8, 10, -5]} 
        intensity={1.5} 
        color="#c0d4ee" 
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Soft Fill Light to reveal dark side of the cup */}
      <pointLight 
        ref={fillLight}
        position={[-8, 2, 8]} 
        intensity={1.2} 
        color="#4a5b6c" 
      />
      
      {/* Rim Light to highlight cup edges */}
      <spotLight 
        position={[0, 5, -8]} 
        intensity={2.0} 
        color="#ffffff" 
        angle={0.8} 
        penumbra={0.5}
      />
    </>
  );
}
