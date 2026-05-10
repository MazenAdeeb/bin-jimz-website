"use client";

import "@/lib/three-suppress";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Center, Text3D } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function ShieldMesh() {
  const ref = useRef<THREE.Group>(null!);
  const tRef = useRef(0);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.4);
    s.lineTo(1.05, 1.0);
    s.lineTo(1.05, 0.0);
    s.bezierCurveTo(1.05, -0.8, 0.55, -1.25, 0, -1.45);
    s.bezierCurveTo(-0.55, -1.25, -1.05, -0.8, -1.05, 0.0);
    s.lineTo(-1.05, 1.0);
    s.lineTo(0, 1.4);
    return s;
  }, []);

  const innerShape = useMemo(() => {
    const s = new THREE.Shape();
    const k = 0.82;
    s.moveTo(0, 1.4 * k);
    s.lineTo(1.05 * k, 1.0 * k);
    s.lineTo(1.05 * k, 0.0);
    s.bezierCurveTo(1.05 * k, -0.8 * k, 0.55 * k, -1.25 * k, 0, -1.45 * k);
    s.bezierCurveTo(-0.55 * k, -1.25 * k, -1.05 * k, -0.8 * k, -1.05 * k, 0.0);
    s.lineTo(-1.05 * k, 1.0 * k);
    s.lineTo(0, 1.4 * k);
    return s;
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 32,
    });
    g.center();
    return g;
  }, [shape]);

  const innerGeometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(innerShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      curveSegments: 32,
    });
    g.center();
    return g;
  }, [innerShape]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    tRef.current += delta;
    const t = tRef.current;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref}>
        {/* outer beveled gold shield body */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={"#b89255"}
            metalness={1}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.22}
            envMapIntensity={1.6}
            emissive={"#5a4525"}
            emissiveIntensity={0.18}
          />
        </mesh>

        {/* recessed dark groove — the channel between the outer and inner bevels */}
        <mesh position={[0, 0, 0.092]}>
          <shapeGeometry
            args={[
              (() => {
                const k = 0.88;
                const s = new THREE.Shape();
                s.moveTo(0, 1.4 * k);
                s.lineTo(1.05 * k, 1.0 * k);
                s.lineTo(1.05 * k, 0.0);
                s.bezierCurveTo(1.05 * k, -0.8 * k, 0.55 * k, -1.25 * k, 0, -1.45 * k);
                s.bezierCurveTo(-0.55 * k, -1.25 * k, -1.05 * k, -0.8 * k, -1.05 * k, 0.0);
                s.lineTo(-1.05 * k, 1.0 * k);
                s.lineTo(0, 1.4 * k);
                return s;
              })(),
            ]}
          />
          <meshStandardMaterial color={"#1a120a"} metalness={0.3} roughness={0.9} />
        </mesh>

        {/* inner gold-rimmed inset shield (the second beveled frame) */}
        <mesh geometry={innerGeometry} position={[0, 0, 0.108]}>
          <meshPhysicalMaterial
            color={"#d4af6f"}
            metalness={1}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.18}
            envMapIntensity={1.8}
            emissive={"#6b5331"}
            emissiveIntensity={0.22}
          />
        </mesh>

        {/* dark inner plate where BJ sits — matches brand identity */}
        <mesh position={[0, 0, 0.155]}>
          <shapeGeometry
            args={[
              (() => {
                const k = 0.72;
                const s = new THREE.Shape();
                s.moveTo(0, 1.4 * k);
                s.lineTo(1.05 * k, 1.0 * k);
                s.lineTo(1.05 * k, 0.0);
                s.bezierCurveTo(1.05 * k, -0.8 * k, 0.55 * k, -1.25 * k, 0, -1.45 * k);
                s.bezierCurveTo(-0.55 * k, -1.25 * k, -1.05 * k, -0.8 * k, -1.05 * k, 0.0);
                s.lineTo(-1.05 * k, 1.0 * k);
                s.lineTo(0, 1.4 * k);
                return s;
              })(),
            ]}
          />
          <meshStandardMaterial
            color={"#000000"}
            metalness={0}
            roughness={1}
          />
        </mesh>

        {/* embossed BJ monogram in polished gold */}
        <Center position={[0, -0.05, 0.18]}>
          <Text3D
            font="/fonts/optimer_bold.typeface.json"
            size={0.78}
            height={0.14}
            curveSegments={24}
            bevelEnabled
            bevelSize={0.018}
            bevelThickness={0.018}
            bevelSegments={6}
            letterSpacing={-0.12}
          >
            BJ
            <meshPhysicalMaterial
              color={"#e6cf9c"}
              metalness={1}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.18}
              envMapIntensity={2.0}
              emissive={"#7a5d2c"}
              emissiveIntensity={0.25}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

export function ShieldHero({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} color={"#fce8b6"} />
        <directionalLight position={[3, 4, 5]} intensity={2.0} color={"#fce8b6"} />
        <directionalLight position={[-2.5, 1.5, 2]} intensity={0.9} color={"#e6cf9c"} />
        <directionalLight position={[0, -3, 1]} intensity={0.5} color={"#8c7345"} />
        <pointLight position={[0, 2.5, 3]} intensity={1.4} color={"#fce8b6"} />
        <pointLight position={[-2, -2, 2]} intensity={0.6} color={"#c8a96a"} />
        <Suspense fallback={null}>
          <ShieldMesh />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
