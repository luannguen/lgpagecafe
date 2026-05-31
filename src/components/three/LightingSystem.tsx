'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export function LightingSystem() {
  const { scrollYProgress } = useScroll();
  
  const mainLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const scroll = scrollYProgress.get();
    
    if (mainLight.current && fillLight.current && ambientLight.current) {
      let targetMainColor = new THREE.Color('#D4AF37'); // Gold (Arrival & Harmony)
      let targetFillColor = new THREE.Color('#2a3b4c'); // Cool dark blue
      let targetAmbientIntensity = 0.15;
      
      if (scroll < 0.2) {
        // Arrival (Cool morning light)
        targetMainColor.setHex(0xb0c4de); // Light steel blue
      } else if (scroll < 0.4) {
        // Earth (Amber / Forest)
        targetMainColor.setHex(0xd2691e); // Chocolate/Amber
        targetFillColor.setHex(0x221100);
      } else if (scroll < 0.6) {
        // Fire (Craftsmanship)
        targetMainColor.setHex(0xff3300); // Intense red/orange
        targetFillColor.setHex(0x550000); // Dark red fill
        targetAmbientIntensity = 0.05; // Very dark ambient
      } else if (scroll < 0.8) {
        // Water (Space)
        targetMainColor.setHex(0x87ceeb); // Sky blue/Cyan
        targetFillColor.setHex(0x001122);
        targetAmbientIntensity = 0.2;
      } else {
        // Harmony
        targetMainColor.setHex(0xD4AF37); // Gold
        targetAmbientIntensity = 0.15;
      }

      // Smoothly interpolate colors
      mainLight.current.color.lerp(targetMainColor, 0.05);
      fillLight.current.color.lerp(targetFillColor, 0.05);
      ambientLight.current.intensity = THREE.MathUtils.lerp(ambientLight.current.intensity, targetAmbientIntensity, 0.05);
      
      // Fire section flicker effect
      if (scroll > 0.4 && scroll < 0.6) {
        mainLight.current.intensity = 1.0 + Math.random() * 0.4; // Flicker
      } else {
        mainLight.current.intensity = THREE.MathUtils.lerp(mainLight.current.intensity, 1.0, 0.05);
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientLight} intensity={0.15} color="#ffffff" />
      <directionalLight 
        ref={mainLight}
        position={[5, 8, -5]} 
        intensity={1.0} 
        color="#b0c4de" 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight 
        ref={fillLight}
        position={[-5, -2, 5]} 
        intensity={0.6} 
        color="#2a3b4c" 
      />
      <spotLight 
        position={[0, 4, 0]} 
        intensity={0.8} 
        color="#ffffff" 
        angle={0.6} 
        penumbra={1}
      />
    </>
  );
}
