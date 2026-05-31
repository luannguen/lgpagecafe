'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export function CoffeeModel() {
  const cupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  
  // Steam particles
  const steamCount = 30;
  const steamMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const steamParticles = useMemo(() => {
    return Array.from({ length: steamCount }).map(() => ({
      x: (Math.random() - 0.5) * 0.8,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 0.8,
      speed: Math.random() * 0.02 + 0.01,
      factor: Math.random() * 0.5 + 0.5,
      offset: Math.random() * 100,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Slight rotation of the cup
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }

    // Gentle liquid movement
    if (liquidRef.current) {
      liquidRef.current.rotation.x = -Math.PI / 2 + Math.sin(t) * 0.02;
      liquidRef.current.rotation.y = Math.cos(t * 1.2) * 0.02;
    }

    // Steam animation
    if (steamMesh.current) {
      steamParticles.forEach((particle, i) => {
        let { x, y, z, speed, factor, offset } = particle;
        
        // Move up
        y += speed;
        // Wavy motion
        x += Math.sin(t * factor + offset) * 0.005;
        z += Math.cos(t * factor + offset) * 0.005;
        
        // Reset if too high
        if (y > 3) {
          y = 0;
          x = (Math.random() - 0.5) * 0.8;
          z = (Math.random() - 0.5) * 0.8;
        }
        
        // Update state
        particle.y = y;
        particle.x = x;
        particle.z = z;

        dummy.position.set(x, y + 1.2, z);
        
        // Fade out as it goes up by scaling
        const scale = Math.max(0, (1 - y / 3) * factor * 0.3);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        steamMesh.current!.setMatrixAt(i, dummy.matrix);
      });
      steamMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={cupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Cup Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.8, 2, 32]} />
          <meshStandardMaterial 
            color="#0f0f0f" 
            roughness={0.2} 
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>

        {/* Cup Handle */}
        <mesh position={[1.1, 0.5, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshStandardMaterial 
            color="#0f0f0f" 
            roughness={0.2} 
            metalness={0.8}
          />
        </mesh>

        {/* Coffee Liquid */}
        <mesh ref={liquidRef} position={[0, 1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.95, 32]} />
          <meshStandardMaterial 
            color="#2a1205" 
            roughness={0.1} 
            metalness={0.2}
            emissive="#1a0a02"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Steam Instanced Mesh */}
        <instancedMesh ref={steamMesh} args={[undefined, undefined, steamCount]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.15} 
            depthWrite={false}
            roughness={1}
          />
        </instancedMesh>
      </Float>
    </group>
  );
}
