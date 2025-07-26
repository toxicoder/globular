import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from './Globe';

function Scene({ cities }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}
    >
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <Globe cities={cities} />
      </Suspense>
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  );
}

export default Scene;
