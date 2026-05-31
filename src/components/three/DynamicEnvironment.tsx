'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function DynamicEnvironment() {
  const scrollData = useScroll();
  
  // Refs for particle systems
  const sakuraRef = useRef<THREE.InstancedMesh>(null);
  const embersRef = useRef<THREE.InstancedMesh>(null);
  const dropletsRef = useRef<THREE.InstancedMesh>(null);
  const steamRef = useRef<THREE.InstancedMesh>(null);

  // Materials
  const sakuraMat = useRef<THREE.MeshBasicMaterial>(null);
  const emberMat = useRef<THREE.MeshBasicMaterial>(null);
  const dropletMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const steamMat = useRef<THREE.MeshBasicMaterial>(null);

  const count = 200;

  // Initial positions and random data
  const { sakuraData, emberData, dropletData, steamData } = useMemo(() => {
    const sData = [];
    const eData = [];
    const dData = [];
    const stData = [];
    
    for (let i = 0; i < count; i++) {
      // Sakura (Floating widely)
      sData.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 15, Math.random() * 10, (Math.random() - 0.5) * 15),
        rot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        speed: Math.random() * 0.01 + 0.005
      });
      
      // Embers (Swirling tightly around center)
      eData.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 4, (Math.random() - 0.5) * 6),
        speed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 3 + 1
      });
      
      // Droplets (Hanging in mid-air, slight vertical drift)
      dData.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 8, Math.random() * 5, (Math.random() - 0.5) * 8),
        speed: Math.random() * 0.005
      });
      
      // Steam (Thick clouds moving up from cup)
      stData.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 3 + 1, (Math.random() - 0.5) * 2),
        speed: Math.random() * 0.01 + 0.005,
        scale: Math.random() * 1.5 + 0.5
      });
    }
    return { sakuraData: sData, emberData: eData, dropletData: dData, steamData: stData };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!scrollData) return;
    const time = state.clock.elapsedTime;
    const scroll = scrollData.offset;

    // SCENE OPACITY MAPPING
    // Scene 1 & 5 (Sakura): scroll < 0.2 OR scroll > 0.8
    let sakuraTargetOpacity = 0;
    if (scroll < 0.2) sakuraTargetOpacity = 1 - (scroll / 0.2);
    else if (scroll > 0.8) sakuraTargetOpacity = (scroll - 0.8) / 0.2;
    
    // Scene 3 (Embers): 0.35 < scroll < 0.55
    let emberTargetOpacity = 0;
    if (scroll > 0.3 && scroll < 0.6) {
      emberTargetOpacity = scroll < 0.45 ? (scroll - 0.3) / 0.15 : 1 - ((scroll - 0.45) / 0.15);
    }
    
    // Scene 4 (Droplets): 0.55 < scroll < 0.75
    let dropletTargetOpacity = 0;
    if (scroll > 0.5 && scroll < 0.8) {
      dropletTargetOpacity = scroll < 0.65 ? (scroll - 0.5) / 0.15 : 1 - ((scroll - 0.65) / 0.15);
    }

    // Apply opacities
    if (sakuraMat.current) sakuraMat.current.opacity = THREE.MathUtils.lerp(sakuraMat.current.opacity, sakuraTargetOpacity, 0.05);
    if (emberMat.current) emberMat.current.opacity = THREE.MathUtils.lerp(emberMat.current.opacity, emberTargetOpacity, 0.05);
    if (dropletMat.current) dropletMat.current.opacity = THREE.MathUtils.lerp(dropletMat.current.opacity, dropletTargetOpacity, 0.05);
    if (steamMat.current) steamMat.current.opacity = THREE.MathUtils.lerp(steamMat.current.opacity, dropletTargetOpacity * 0.15, 0.05); // Steam is very faint

    // Update instances
    for (let i = 0; i < count; i++) {
      // SAKURA
      const s = sakuraData[i];
      s.pos.y -= s.speed;
      s.pos.x += Math.sin(time * 0.5 + i) * 0.01;
      s.rot.x += 0.01;
      s.rot.y += 0.01;
      if (s.pos.y < -2) s.pos.y = 8;
      
      dummy.position.copy(s.pos);
      dummy.rotation.set(s.rot.x, s.rot.y, s.rot.z);
      dummy.scale.setScalar(0.08); // small petal size
      dummy.updateMatrix();
      sakuraRef.current?.setMatrixAt(i, dummy.matrix);

      // EMBERS
      const e = emberData[i];
      e.angle += e.speed;
      e.pos.y += e.speed;
      if (e.pos.y > 5) {
        e.pos.y = -1;
        e.radius = Math.random() * 3 + 1;
      }
      dummy.position.set(Math.cos(e.angle) * e.radius, e.pos.y, Math.sin(e.angle) * e.radius);
      // add some erratic movement
      dummy.position.x += Math.sin(time * 5 + i) * 0.1;
      dummy.scale.setScalar(Math.random() * 0.15 + 0.05); // Much smaller embers
      dummy.updateMatrix();
      embersRef.current?.setMatrixAt(i, dummy.matrix);

      // DROPLETS
      const d = dropletData[i];
      d.pos.y += Math.sin(time + i) * 0.005;
      dummy.position.copy(d.pos);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      dropletsRef.current?.setMatrixAt(i, dummy.matrix);
      
      // STEAM
      const st = steamData[i];
      st.pos.y += st.speed;
      if (st.pos.y > 6) st.pos.y = 1;
      dummy.position.set(st.pos.x + Math.sin(time * 0.5 + i) * 0.2, st.pos.y, st.pos.z);
      dummy.scale.setScalar(st.scale * (1 + Math.sin(time + i) * 0.2));
      dummy.updateMatrix();
      steamRef.current?.setMatrixAt(i, dummy.matrix);
    }
    
    sakuraRef.current!.instanceMatrix.needsUpdate = true;
    embersRef.current!.instanceMatrix.needsUpdate = true;
    dropletsRef.current!.instanceMatrix.needsUpdate = true;
    steamRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* Sakura Petals */}
      <instancedMesh ref={sakuraRef} args={[undefined, undefined, count]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          ref={sakuraMat} 
          color="#ffb7c5" 
          transparent 
          opacity={1} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Fire Embers */}
      <instancedMesh ref={embersRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial 
          ref={emberMat} 
          color="#ffaa00" 
          transparent 
          opacity={0} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Water Droplets */}
      <instancedMesh ref={dropletsRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial 
          ref={dropletMat} 
          color="#ffffff" 
          transmission={0.9} 
          opacity={0} 
          transparent
          roughness={0} 
          ior={1.33} 
          thickness={0.5}
        />
      </instancedMesh>
      
      {/* Thick Steam */}
      <instancedMesh ref={steamRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          ref={steamMat} 
          color="#e0ffff" 
          transparent 
          opacity={0} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </>
  );
}
