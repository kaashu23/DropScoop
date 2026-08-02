import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Scoop3D({ color = '#e5bdba', ...props }) {
  const scoopRef = useRef();

  useFrame((state) => {
    if (scoopRef.current) {
      scoopRef.current.rotation.y += 0.005;
      scoopRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group {...props}>
      {/* The main ice cream scoop */}
      <Sphere ref={scoopRef} args={[1, 64, 64]} scale={[1, 0.9, 1]}>
        {/* Using MeshDistortMaterial to give it a slightly organic, uneven look like real ice cream */}
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.5}
          clearcoat={0.1}
          clearcoatRoughness={0.9}
          metalness={0.1}
          roughness={0.9}
          distort={0.3}
          speed={0.5}
        />
      </Sphere>
      
      {/* The bottom "skirt" or ruffle of the scoop */}
      <Sphere args={[1.05, 32, 16]} position={[0, -0.6, 0]} scale={[1, 0.3, 1]}>
        <MeshDistortMaterial
          color={color}
          roughness={0.9}
          distort={0.4}
          speed={0.5}
        />
      </Sphere>
    </group>
  );
}
