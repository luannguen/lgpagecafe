'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export function LightingSystem() {
  const { scrollYProgress } = useScroll();
  const mainLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const scroll = scrollYProgress.get();
    
    if (mainLight.current && fillLight.current) {
      // Craftsmanship section (scroll ~ 0.35 to 0.55) -> Warmer, more intense light
      if (scroll > 0.3 && scroll < 0.6) {
        mainLight.current.color.lerp(new THREE.Color('#ff8c00'), 0.05); // Amber/Orange
        mainLight.current.intensity = THREE.MathUtils.lerp(mainLight.current.intensity, 1.2, 0.05);
      } else {
        mainLight.current.color.lerp(new THREE.Color('#D4AF37'), 0.05); // Gold
        mainLight.current.intensity = THREE.MathUtils.lerp(mainLight.current.intensity, 0.8, 0.05);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight 
        ref={mainLight}
        position={[5, 8, -5]} 
        intensity={0.8} 
        color="#D4AF37" 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight 
        ref={fillLight}
        position={[-5, -5, 5]} 
        intensity={0.4} 
        color="#1a1a1a" 
      />
      {/* Subtle rim light for the cup */}
      <spotLight 
        position={[0, 2, -5]} 
        intensity={0.5} 
        color="#ffffff" 
        angle={0.5} 
        penumbra={1}
      />
    </>
  );
}
