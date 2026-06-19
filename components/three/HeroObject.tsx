"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function HeroObject() {
  const meshRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Idle rotation
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.1;

    // Gentle floating
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

    // Hover scale effect
    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3
    );
  });

  const icosahedronSize = Math.min(viewport.width, viewport.height) * 0.15;

  return (
    <group ref={meshRef}>
      {/* Core icosahedron */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[icosahedronSize, 0]} />
        <meshStandardMaterial
          color="#0A0E17"
          roughness={0.3}
          metalness={0.8}
          emissive="#2DE2E6"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(icosahedronSize, 0)]} />
        <lineBasicMaterial
          color="#2DE2E6"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Outer glow wireframe */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.IcosahedronGeometry(icosahedronSize * 1.15, 0)]}
        />
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Inner nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 12);
        const theta = Math.sqrt(12 * Math.PI) * phi;
        const r = icosahedronSize * 0.6;
        return (
          <mesh
            key={i}
            position={[
              r * Math.cos(theta) * Math.sin(phi),
              r * Math.sin(theta) * Math.sin(phi),
              r * Math.cos(phi),
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color="#2DE2E6"
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#2DE2E6" intensity={0.5} />
      <pointLight position={[-10, -10, -5]} color="#8B5CF6" intensity={0.3} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </group>
  );
}
