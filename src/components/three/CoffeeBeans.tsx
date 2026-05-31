'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export function CoffeeBeans() {
  const { scrollYProgress } = useScroll();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  const count = 40;
  
  const beansData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * -5 - 2, (Math.random() - 0.5) * 6), // Start below ground
      targetY: Math.random() * 4, // Final floating height
      rot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      speed: Math.random() * 0.02 + 0.01,
      scale: Math.random() * 0.05 + 0.15
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const scroll = scrollYProgress.get();
    const time = state.clock.elapsedTime;
    
    // SCENE LOGIC
    // Scene 2 (Earth): scroll 0.15 to 0.35 -> Beans rise up
    // Scene 3 (Fire): scroll 0.35 to 0.55 -> Beans turn brown
    // Scene 4 (Water): scroll 0.55+ -> Beans fall down
    
    let targetOpacity = 0;
    let colorHex = 0x8b9b7a; // Raw green
    let yOffset = 0;

    if (scroll > 0.15 && scroll < 0.6) {
      targetOpacity = scroll < 0.25 ? (scroll - 0.15) / 0.1 : 1;
      if (scroll > 0.5) {
        targetOpacity = 1 - ((scroll - 0.5) / 0.1);
      }
      yOffset = THREE.MathUtils.lerp(0, 1, Math.min(1, Math.max(0, (scroll - 0.15) / 0.2)));
    }

    if (scroll > 0.35) {
      colorHex = 0x2a1810; // Roasted brown
    }

    // Smoothly interpolate material
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.1);
      materialRef.current.color.lerp(new THREE.Color(colorHex), 0.05);
    }

    // Update instances
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const b = beansData[i];
        
        // Float and rotate
        b.rot.x += b.speed * 0.5;
        b.rot.y += b.speed;
        
        const currentY = THREE.MathUtils.lerp(b.pos.y, b.targetY, yOffset) + Math.sin(time * 2 + i) * 0.1;
        
        dummy.position.set(b.pos.x, currentY, b.pos.z);
        dummy.rotation.set(b.rot.x, b.rot.y, b.rot.z);
        dummy.scale.setScalar(b.scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      {/* A simple bean shape using a squashed sphere */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        ref={materialRef}
        color="#8b9b7a"
        roughness={0.8}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}
