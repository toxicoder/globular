import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Globe from './Globe';

function Scene({ cities }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        {/* The main directional light will be handled inside the Globe component to sync with sun position */}

        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />

        <Globe cities={cities} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.1}
        />
      </Suspense>
    </Canvas>
  );
}

export default Scene;
