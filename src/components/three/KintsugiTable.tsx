'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import { useFrame } from '@react-three/fiber';

export function KintsugiTable() {
  const { scrollYProgress } = useScroll();
  const kintsugiMat = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame(() => {
    const scroll = scrollYProgress.get();
    
    // Hide table during fire/water scenes, reveal it in arrival/harmony
    let opacityTarget = 1;
    if (scroll > 0.35 && scroll < 0.8) {
      opacityTarget = 0;
    }
    
    if (kintsugiMat.current) {
      kintsugiMat.current.opacity = THREE.MathUtils.lerp(kintsugiMat.current.opacity, opacityTarget, 0.05);
    }
  });

  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      {/* Large wooden slab */}
      <cylinderGeometry args={[5, 5, 0.2, 64]} />
      <meshStandardMaterial 
        ref={kintsugiMat}
        color="#2a1b12" // Dark walnut
        roughness={0.9}
        transparent
        opacity={1}
      />
    </mesh>
  );
}
