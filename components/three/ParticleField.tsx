"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_INFLUENCE_RADIUS = 8;

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  originalPositions: Float32Array;
}

function createParticleData(count: number): ParticleData {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 20;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;
    velocities[i * 3] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
  }

  return { positions, velocities, originalPositions };
}

function NetworkParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null);

  const particleData = useMemo(() => createParticleData(PARTICLE_COUNT), []);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#2DE2E6"),
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !groupRef.current) return;

    const positions = particleData.positions;
    const velocities = particleData.velocities;
    const originalPositions = particleData.originalPositions;

    // Gentle idle drift + mouse parallax
    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.05,
      0.02
    );

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      // Update position with velocity
      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];

      // Gentle return to original position
      positions[idx] += (originalPositions[idx] - positions[idx]) * 0.002;
      positions[idx + 1] +=
        (originalPositions[idx + 1] - positions[idx + 1]) * 0.002;
      positions[idx + 2] +=
        (originalPositions[idx + 2] - positions[idx + 2]) * 0.002;

      // Mouse repulsion
      const dx = positions[idx] - mouseX;
      const dy = positions[idx + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.1) {
        const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS;
        positions[idx] += (dx / dist) * force * 0.05;
        positions[idx + 1] += (dy / dist) * force * 0.05;
      }

      // Find connections
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const jdx = j * 3;
        const cdx = positions[idx] - positions[jdx];
        const cdy = positions[idx + 1] - positions[jdx + 1];
        const cdz = positions[idx + 2] - positions[jdx + 2];
        const cDist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);

        if (cDist < CONNECTION_DISTANCE) {
          linePositions.push(
            positions[idx],
            positions[idx + 1],
            positions[idx + 2],
            positions[jdx],
            positions[jdx + 1],
            positions[jdx + 2]
          );
          const alpha = 1 - cDist / CONNECTION_DISTANCE;
          lineColors.push(0.17, 0.89, 0.9, alpha * 0.15);
        }
      }
    }

    // Update points
    const geo = pointsRef.current.geometry;
    geo.attributes.position.needsUpdate = true;

    // Update lines
    if (linesRef.current) {
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      linesRef.current.geometry = lineGeometry;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#2DE2E6"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}

export default function ParticleField() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: "radial-gradient(ellipse at center, #0A0E17 0%, #05070A 100%)" }}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          }}
          style={{ background: "transparent" }}
        >
          <NetworkParticles />
        </Canvas>
      )}
    </div>
  );
}
