import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Scoop3D from './Scoop3D';

export default function Flavor3DViewer({ color, autoRotate = true }) {
  return (
    <div className="w-full h-full min-h-[250px] relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Scoop3D color={color} />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
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
