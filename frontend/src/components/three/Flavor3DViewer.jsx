import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Scoop3D from './Scoop3D';

export default function Flavor3DViewer({ color, autoRotate = true }) {
  return (
    <div className="w-full h-full min-h-[250px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Scoop3D color={color} scale={0.8} position={[0, 1.2, 0]} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.84, 0]} opacity={0.6} scale={6} blur={1.5} far={4} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={autoRotate} 
          autoRotateSpeed={2} 
        />
      </Canvas>
    </div>
  );
}
