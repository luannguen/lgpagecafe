'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Html } from '@react-three/drei';
import * as THREE from 'three';

export function BookingForm3D() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!scroll) return;
    const offset = scroll.offset;
    if (groupRef.current) {
      // Show only at the very end (Harmony Scene)
      const targetOpacity = offset > 0.85 ? 1 : 0;
      
      // We can't directly animate HTML opacity easily via ref without state, 
      // but we can move it far away or scale it down.
      const targetScale = offset > 0.85 ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 2]} rotation={[-0.1, 0, 0]}>
      {/* A glassmorphism panel in 3D */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3, 4]} />
        <meshPhysicalMaterial 
          color="#000000" 
          transparent 
          opacity={0.5} 
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          ior={1.5}
        />
      </mesh>
      
      {/* The interactive HTML embedded inside 3D space */}
      <Html transform distanceFactor={2} position={[0, 0, 0]}>
        <div className="w-[300px] p-6 text-brand-light flex flex-col gap-4 font-sans pointer-events-auto">
          <h2 className="text-2xl font-serif text-brand-gold text-center mb-2">Reserve</h2>
          <input type="text" placeholder="Name" className="bg-transparent border-b border-brand-light/20 p-2 text-sm outline-none focus:border-brand-gold" />
          <input type="email" placeholder="Email" className="bg-transparent border-b border-brand-light/20 p-2 text-sm outline-none focus:border-brand-gold" />
          <div className="flex gap-2">
            <input type="date" className="bg-transparent border-b border-brand-light/20 p-2 text-sm outline-none w-1/2" />
            <input type="time" className="bg-transparent border-b border-brand-light/20 p-2 text-sm outline-none w-1/2" />
          </div>
          <button className="mt-4 bg-brand-gold text-brand-dark font-bold py-2 hover:bg-white transition-colors uppercase text-sm tracking-wider">
            Request
          </button>
        </div>
      </Html>
    </group>
  );
}
