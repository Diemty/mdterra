import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Wireframe Architectural Geometry
   ───────────────────────────────────────────── */
function ArchitecturalGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    },
    []
  );

  // Attach global mousemove
  useMemo(() => {
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    // Slow continuous rotation
    mesh.rotation.x += delta * 0.08;
    mesh.rotation.y += delta * 0.12;

    // Mouse-follow tilt
    const targetX = mousePos.current.y * 0.3;
    const targetY = mousePos.current.x * 0.3;
    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.02;
    mesh.rotation.y += (targetY - mesh.rotation.y) * 0.02;

    // Subtle breathing scale
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.03 + 1;
    mesh.scale.setScalar(breathe);
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.35;

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#0E56BC"
        wireframe
        transparent
        opacity={0.4}
        emissive="#0E56BC"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Floating Particles
   ───────────────────────────────────────────── */
function FloatingParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0E56BC"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────────
   Inner Ring Lines
   ───────────────────────────────────────────── */
function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.05;
    ref.current.rotation.x = Math.sin(_state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <mesh ref={ref} scale={1.6}>
      <torusGeometry args={[1, 0.005, 16, 64]} />
      <meshStandardMaterial
        color="#0E56BC"
        transparent
        opacity={0.1}
        emissive="#0E56BC"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Main Hero3D Component
   ───────────────────────────────────────────── */
export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#0E56BC" />

        <ArchitecturalGeometry />
        <FloatingParticles count={400} />
        <InnerRing />
      </Canvas>
    </div>
  );
}
