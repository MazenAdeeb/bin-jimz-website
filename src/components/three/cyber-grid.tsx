"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Grid() {
  const ref = useRef<THREE.LineSegments>(null!);

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(28, 18, 56, 32);
    return new THREE.WireframeGeometry(g);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = -Math.PI / 2.4;
    ref.current.position.y = -3 + Math.sin(t * 0.5) * 0.05;
    ref.current.position.z = -2 + Math.cos(t * 0.3) * 0.1;
  });

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color={"#1b9cfc"} transparent opacity={0.18} />
    </lineSegments>
  );
}

export function CyberGrid({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true }}
      >
        <Grid />
      </Canvas>
    </div>
  );
}
