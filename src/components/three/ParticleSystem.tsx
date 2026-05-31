'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleSystem({ count = 500 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const factor = Math.random() * 0.5 + 0.5;
      const speed = Math.random() * 0.01 + 0.005;
      temp.push({ x, y, z, factor, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speed } = particle;
      
      // Floating motion
      const t = state.clock.elapsedTime;
      y += Math.sin(t * speed + i) * 0.01 * factor;
      x += Math.cos(t * speed + i) * 0.01 * factor;
      
      dummy.position.set(x, y, z);
      const scale = Math.max(0.1, Math.sin(t * speed * 2 + i) * 0.05);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
    </instancedMesh>
  );
}
