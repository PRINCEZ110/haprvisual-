"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// Boucle / teddy fabric swivel chair — mirrors scripts/boucle_swivel_chair.py
// (metaball blob layout: seat, backrest, crest, armrests, skirt + black base).

const FABRIC = "#EFE2CF";

function createBoucleTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#888";
  ctx.fillRect(0, 0, size, size);
  const img = ctx.getImageData(0, 0, size, size);
  const data = img.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = 60 + Math.random() * 195;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(7, 7);
  return tex;
}

type Blob = {
  pos: [number, number, number];
  r: number;
  scale: [number, number, number];
};

const CUSHIONS: Blob[] = [
  // seat disc
  { pos: [0, 0.02, 0.42], r: 0.55, scale: [1.15, 1.0, 0.55] },
  // tufted inner seat bump
  { pos: [0, -0.05, 0.5], r: 0.3, scale: [1.0, 0.9, 0.5] },
  // backrest
  { pos: [0, -0.42, 0.97], r: 0.62, scale: [1.05, 0.55, 1.15] },
  // pillow crest
  { pos: [0, -0.4, 1.47], r: 0.38, scale: [1.0, 0.7, 0.55] },
  // front skirt bulge
  { pos: [0, 0.15, 0.14], r: 0.54, scale: [1.05, 0.85, 0.55] },
];

function Cushion({ blob, bumpMap }: { blob: Blob; bumpMap: THREE.Texture }) {
  return (
    <mesh position={blob.pos} scale={blob.scale} castShadow>
      <sphereGeometry args={[blob.r, 48, 32]} />
      <meshPhysicalMaterial
        color={FABRIC}
        roughness={0.92}
        sheen={0.5}
        sheenColor="#FFF6EA"
        bumpMap={bumpMap}
        bumpScale={0.035}
      />
    </mesh>
  );
}

function SwivelChair({ scroll }: { scroll: MutableRefObject<number> }) {
  const assembly = useRef<THREE.Group>(null);
  const swivel = useRef<THREE.Group>(null);
  const bumpMap = useMemo(() => createBoucleTexture(), []);

  useFrame((state, delta) => {
    const g = assembly.current;
    if (!g) return;

    // gentle swivel rotation of the seat stack
    if (swivel.current) swivel.current.rotation.y += delta * 0.2;

    // mouse parallax
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.22;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetY, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.05);

    // scroll-driven motion
    const s = scroll.current;
    g.position.y = THREE.MathUtils.lerp(g.position.y, -s * 0.5, 0.08);
    g.rotation.z = s * 0.1;
  });

  return (
    <group ref={assembly}>
      {/* black swivel pedestal (stays grounded while the seat swivels) */}
      <mesh position={[0, 0.02, 0.06]} castShadow>
        <cylinderGeometry args={[0.341, 0.341, 0.12, 48]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.75} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0.145]} castShadow>
        <cylinderGeometry args={[0.099, 0.099, 0.05, 32]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* seat stack swivels on top */}
      <group ref={swivel}>
        <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.5}>
          {CUSHIONS.map((blob, i) => (
            <Cushion key={i} blob={blob} bumpMap={bumpMap} />
          ))}
          {/* armrests + rounded caps */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <Cushion
                blob={{ pos: [side * 0.588, -0.05, 0.72], r: 0.34, scale: [0.8, 1.05, 1.35] }}
                bumpMap={bumpMap}
              />
              <Cushion
                blob={{ pos: [side * 0.588, -0.05, 1.1], r: 0.21, scale: [0.85, 1.0, 0.6] }}
                bumpMap={bumpMap}
              />
            </group>
          ))}
        </Float>
      </group>
    </group>
  );
}

export default function Hero3D({ scroll }: { scroll: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [2.3, -2.7, 1.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0.4, 0.85)}
      className="cursor-crosshair"
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#FFF2E0" />

      <SwivelChair scroll={scroll} />

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.45}
        scale={7}
        blur={2.6}
        far={3.5}
        color="#3B2F26"
      />
      <Environment preset="city" />
    </Canvas>
  );
}