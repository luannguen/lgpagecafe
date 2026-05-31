'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export function FogSystem() {
  const fogRef = useRef<THREE.FogExp2>(null);
  const { scrollYProgress } = useScroll();

  useFrame(() => {
    // Optional: Animate fog density slightly based on scroll or time
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#0a0a0a', 0.08]} />
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight position={[5, 5, -5]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1a1a1a" />
    </>
  );
}
