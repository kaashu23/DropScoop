import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cone, Capsule, MeshDistortMaterial, Icosahedron } from '@react-three/drei';

export default function Scoop3D({ color = '#e5bdba', ...props }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.003;
      // Very subtle sway to feel alive but not fake
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Generate realistic curved sprinkles (Capsules)
  const sprinkles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 80; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1) / 2; // top half

      const r = 1.05; // radius matching the rough distorted surface
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      items.push({
        position: [x, y, z],
        // Align sprinkle somewhat along the surface tangent
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        color: ['#ff007f', '#00ffff', '#ffff00', '#ffffff', '#ff9900'][Math.floor(Math.random() * 5)]
      });
    }
    return items;
  }, []);

  // Generate chocolate chips (Irregular Icosahedrons)
  const chocChips = useMemo(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1); 

      const r = 1.02;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      if (y > -0.6) {
        items.push({
          position: [x, y, z],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
          scale: 0.06 + Math.random() * 0.04
        });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.8, 0]} {...props}>
      {/* The main ice cream scoop */}
      <Sphere args={[1, 128, 128]} scale={[1, 0.95, 1]}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.8}
          clearcoat={0.1}
          clearcoatRoughness={0.9}
          metalness={0.0}
          roughness={0.8}
          distort={0.4} // Static, heavy bumps
          speed={0}     // STOP boiling effect, ice cream is frozen!
        />
      </Sphere>
      
      {/* Sprinkles (Realistic Pill shapes) */}
      {sprinkles.map((sprinkle, idx) => (
        <Capsule 
          key={`sprinkle-${idx}`} 
          args={[0.015, 0.08, 4, 8]} 
          position={sprinkle.position} 
          rotation={sprinkle.rotation}
        >
          <meshStandardMaterial color={sprinkle.color} roughness={0.3} metalness={0.1} />
        </Capsule>
      ))}

      {/* Chocolate Chips (Irregular rocks) */}
      {chocChips.map((chip, idx) => (
        <Icosahedron 
          key={`chip-${idx}`}
          args={[1, 0]} // radius 1, detail 0 (sharp edges)
          position={chip.position}
          rotation={chip.rotation}
          scale={chip.scale}
        >
          <meshStandardMaterial color="#2c1503" roughness={0.7} metalness={0.2} />
        </Icosahedron>
      ))}
      
      {/* The bottom "skirt" or ruffle of the scoop */}
      <Sphere args={[1.05, 64, 32]} position={[0, -0.6, 0]} scale={[1, 0.35, 1]}>
        <MeshDistortMaterial
          color={color}
          roughness={0.8}
          distort={0.5}
          speed={0}
        />
      </Sphere>

      {/* Realistic Waffle Cone */}
      <Cone args={[1.02, 2.8, 64]} position={[0, -2.1, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial 
          color="#d0965c" 
          roughness={1} 
          metalness={0} 
        />
      </Cone>
      
      {/* Dense wireframe to simulate tiny waffle grid indents */}
      <Cone args={[1.025, 2.8, 32, 16]} position={[0, -2.1, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial 
          color="#b07038" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </Cone>
    </group>
  );
}
