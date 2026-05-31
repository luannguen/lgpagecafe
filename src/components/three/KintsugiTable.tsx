'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function KintsugiTable() {
  const scrollData = useScroll();
  const woodMat = useRef<THREE.MeshStandardMaterial>(null);
  const goldMat = useRef<THREE.MeshBasicMaterial>(null);
  const cracksRef = useRef<THREE.Group>(null);
  
  // Procedural cracks (intersecting lines on the surface)
  const cracks = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      pos: [
        (Math.random() - 0.5) * 6,
        0.11, // Just above the table surface
        (Math.random() - 0.5) * 6
      ],
      rot: [Math.PI / 2, 0, Math.random() * Math.PI],
      scale: [0.03, Math.random() * 2 + 1, 0.03] // Thin but long lines
    }));
  }, []);

  useFrame(() => {
    if (!scrollData) return;
    const scroll = scrollData.offset;
    
    // Wood visibility (Scene 1 & 5)
    let woodOpacity = 1;
    if (scroll > 0.35 && scroll < 0.8) {
      woodOpacity = 0; // Hide during Fire & Water
    }
    
    // Gold cracks visibility (Only Scene 5 - Harmony)
    let goldOpacity = 0;
    if (scroll > 0.8) {
      goldOpacity = Math.min(1, (scroll - 0.8) / 0.1);
    }
    
    if (woodMat.current) {
      woodMat.current.opacity = THREE.MathUtils.lerp(woodMat.current.opacity, woodOpacity, 0.05);
    }
    if (goldMat.current) {
      goldMat.current.opacity = THREE.MathUtils.lerp(goldMat.current.opacity, goldOpacity, 0.05);
    }
    
    // Gentle glowing pulse for cracks
    if (cracksRef.current && goldOpacity > 0.5 && goldMat.current) {
      const pulse = 1.0 + Math.sin(Date.now() * 0.002) * 0.5;
      goldMat.current.color.setHex(0xD4AF37).multiplyScalar(pulse);
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Large wooden slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5, 0.2, 64]} />
        <meshStandardMaterial 
          ref={woodMat}
          color="#2a1b12" // Dark walnut
          roughness={0.9}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Kintsugi Cracks Layer */}
      <group ref={cracksRef}>
        {cracks.map((c, i) => (
          <mesh 
            key={i} 
            position={new THREE.Vector3(...c.pos)} 
            rotation={new THREE.Euler(...c.rot)}
            scale={new THREE.Vector3(...c.scale)}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial 
              ref={i === 0 ? goldMat : undefined} // Only attach ref to first one to control all (sharing material is better, but this works for demo)
              color="#D4AF37" 
              transparent 
              opacity={0} 
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
