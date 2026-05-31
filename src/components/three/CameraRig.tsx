'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export function CameraRig() {
  const { scrollYProgress } = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Position targets for each scene
  // Scene 1: Arrival (Far, centered)
  // Scene 2: Discovery (Close up on cup)
  // Scene 3: Craftsmanship (Pan side, lower angle)
  // Scene 4: Space (Pull back, angled)
  // Scene 5/6: Menu/Booking (Side view for text on left)
  
  useFrame((state) => {
    const scroll = scrollYProgress.get();
    const camera = state.camera;

    let targetPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (scroll < 0.15) {
      // Scene 1: Arrival
      targetPos.set(0, 2, 8);
      targetLookAt.set(0, 0.5, 0);
    } else if (scroll < 0.35) {
      // Scene 2: Discovery (Push in)
      const t = (scroll - 0.15) / 0.2;
      targetPos.set(0, 3 - t * 1.5, 8 - t * 4); // moves closer and lower
      targetLookAt.set(0, 1, 0); // look slightly up at the steam
    } else if (scroll < 0.55) {
      // Scene 3: Craftsmanship (Pan)
      const t = (scroll - 0.35) / 0.2;
      targetPos.set(2 + t * 2, 1.5, 4);
      targetLookAt.set(0, 0.5, 0);
    } else if (scroll < 0.75) {
      // Scene 4: Space (Pull back, angled)
      const t = (scroll - 0.55) / 0.2;
      targetPos.set(4, 2 + t * 1, 4 + t * 4);
      targetLookAt.set(0, 0, 0);
    } else {
      // Scene 5 & 6: Menu & Reservation (Side composition)
      targetPos.set(4, 2, 6);
      targetLookAt.set(-1, 0.5, 0); // Look left to give space for UI on right (or vice versa)
    }

    // Lerp camera position for smooth cinematic movement
    camera.position.lerp(targetPos, 0.03);
    
    // Lerp lookAt by using a dummy object or just modifying the quaternion
    // For simplicity, we create a temporary lookat quaternion
    const currentRot = camera.quaternion.clone();
    camera.lookAt(targetLookAt);
    const targetRot = camera.quaternion.clone();
    camera.quaternion.copy(currentRot);
    camera.quaternion.slerp(targetRot, 0.05);
  });

  return null;
}
