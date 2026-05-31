'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';

export function SceneText3D() {
  const scroll = useScroll();
  
  const heroTextRef = useRef<THREE.Group>(null);
  const storyTextRef = useRef<THREE.Group>(null);
  const craftTextRef = useRef<THREE.Group>(null);
  
  // Custom materials for text
  const heroMat = useRef<THREE.MeshStandardMaterial>(null);
  const storyMat = useRef<THREE.MeshStandardMaterial>(null);
  const craftMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const offset = scroll.offset;
    
    // Fade Logic based on Scroll Offset
    if (heroMat.current) heroMat.current.opacity = THREE.MathUtils.lerp(heroMat.current.opacity, offset < 0.15 ? 1 : 0, 0.1);
    if (storyMat.current) storyMat.current.opacity = THREE.MathUtils.lerp(storyMat.current.opacity, offset > 0.15 && offset < 0.35 ? 1 : 0, 0.1);
    if (craftMat.current) craftMat.current.opacity = THREE.MathUtils.lerp(craftMat.current.opacity, offset > 0.35 && offset < 0.55 ? 1 : 0, 0.1);
    
    // Optional: add slight floating animation
    if (heroTextRef.current) heroTextRef.current.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.1;
  });

  return (
    <>
      {/* Hero Text (Scene 1) */}
      <group ref={heroTextRef} position={[0, 2, 0]}>
        <Text
          fontSize={1.5}
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
          characters="KŪRO"
          position={[0, 0, 0]}
        >
          KŪRO
          <meshStandardMaterial ref={heroMat} color="#D4AF37" transparent opacity={0} roughness={0.2} metalness={0.8} />
        </Text>
        <Text
          fontSize={0.2}
          position={[0, -0.8, 0]}
          letterSpacing={0.2}
        >
          THE ART OF SHADOW
          <meshStandardMaterial color="#ffffff" transparent opacity={heroMat.current?.opacity || 0} />
        </Text>
      </group>
      
      {/* Story Text (Scene 2) */}
      <group ref={storyTextRef} position={[2, 1, 1]} rotation={[0, -0.2, 0]}>
        <Text fontSize={0.5} position={[0, 0, 0]}>
          Rooted in Tradition
          <meshStandardMaterial ref={storyMat} color="#8b9b7a" transparent opacity={0} />
        </Text>
        <Text fontSize={0.15} position={[0, -0.4, 0]} maxWidth={2}>
          Born from the earth, cultivated with precision. Every bean tells a story of generations.
          <meshStandardMaterial color="#cccccc" transparent opacity={storyMat.current?.opacity || 0} />
        </Text>
      </group>
      
      {/* Craft Text (Scene 3) */}
      <group ref={craftTextRef} position={[-2, 1, -1]} rotation={[0, 0.2, 0]}>
        <Text fontSize={0.5} position={[0, 0, 0]}>
          The Pursuit of Perfection
          <meshStandardMaterial ref={craftMat} color="#ff4500" emissive="#ff4500" emissiveIntensity={0.5} transparent opacity={0} />
        </Text>
        <Text fontSize={0.15} position={[0, -0.4, 0]} maxWidth={2}>
          Forged in fire. The precise art of roasting to extract the soul of the bean.
          <meshStandardMaterial color="#ffaa00" transparent opacity={craftMat.current?.opacity || 0} />
        </Text>
      </group>
    </>
  );
}
