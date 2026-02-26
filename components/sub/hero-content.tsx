"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense, useCallback } from "react";
import * as THREE from "three";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

/* ─────────────────────────────────────────────
   String Theory Simulation Elements
   ───────────────────────────────────────────── */
const StringTheoryLine = ({
  index,
  total,
  mouse
}: {
  index: number;
  total: number;
  mouse: React.MutableRefObject<THREE.Vector3>;
}) => {
  const lineRef = useRef<any>(null);

  // Creates a long curve representing one "string"
  const points = useMemo(() => {
    const pts = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      pts.push(new THREE.Vector3(0, 0, 0));
    }
    return pts;
  }, []);

  const [geometry] = useState(() => new THREE.BufferGeometry().setFromPoints(points));

  // Base offset to make each string unique
  const offset = (index / total) * Math.PI * 2;
  const color = new THREE.Color().setHSL(0.55 + (index / total) * 0.15, 0.8, 0.6); // Cyan to purple gradient

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3;
    const positions = geometry.attributes.position.array as Float32Array;

    const mx = mouse.current.x;
    const my = mouse.current.y;

    for (let i = 0; i <= 100; i++) {
      const p = i / 100; // 0 to 1 along the line

      // X maps from -15 to 15
      const baseLength = 30; // 30 units wide 
      const x = (p - 0.5) * baseLength;

      // Realistic quantum string theory math mapping
      // Strings vibrate with Calabi-Yau inspired multidimensional high-frequency harmonics
      const primaryFreq = 2.5 + offset * 0.5;
      const secondaryFreq = 5.0 - offset * 0.3;
      const chaoticFreq = 12.0;

      // Y-axis vibration (transverse wave)
      const y = Math.sin(x * primaryFreq + t * 3.5) * 1.2
        + Math.cos(x * secondaryFreq - t * 2.0) * 0.8
        + Math.sin(x * chaoticFreq + t * 5.0) * 0.15 * Math.sin(t);

      // Z-axis vibration (depth wave, strings curling around each other)
      const z = Math.cos(x * primaryFreq - t * 3.5) * 1.2
        + Math.sin(x * secondaryFreq + t * 2.0) * 0.8;

      // Distance to mouse for interactive repulsion
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsion = Math.max(0, 3 - dist);

      // Apply interactivity
      const finalY = y + (dy / (dist || 0.1)) * repulsion * 0.5;
      const finalZ = z + repulsion; // Push towards camera slightly

      positions[i * 3] = x;
      positions[i * 3 + 1] = finalY;
      positions[i * 3 + 2] = finalZ;
    }

    geometry.attributes.position.needsUpdate = true;
    if (lineRef.current) {
      lineRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      lineRef.current.rotation.y = Math.cos(t * 0.3) * 0.1;
    }
  });

  return (
    <primitive object={new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        linewidth: 2,
      })
    )} ref={lineRef} />
  );
};

const StringTheorySimulation = () => {
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  useFrame((state) => {
    // Map normalized mouse coordinates to 3D space
    mouseRef.current.x = (state.pointer.x * state.viewport.width) / 2;
    mouseRef.current.y = (state.pointer.y * state.viewport.height) / 2;
  });

  const numStrings = 35; // Number of cosmic strings

  return (
    <group>
      {Array.from({ length: numStrings }).map((_, i) => (
        <StringTheoryLine
          key={i}
          index={i}
          total={numStrings}
          mouse={mouseRef}
        />
      ))}
    </group>
  );
};

/* ─────────────────────────────────────────────
   Hero Content Export
   ───────────────────────────────────────────── */
export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center px-5 md:px-20 mt-32 md:mt-48 w-full z-[20]"
    >
      <div className="w-full flex flex-col items-center justify-center m-auto text-center gap-5">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            AI/ML Engineer &amp; Associate Software Engineer
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="relative flex flex-col gap-6 mt-6 text-4xl md:text-7xl font-bold text-white max-w-[900px] w-auto h-auto items-center"
        >
          {/* 3D Canvas Background fixed directly behind the text */}
          <div className="absolute inset-0 z-[-1] pointer-events-auto h-[300px] w-full mt-[-80px] opacity-70">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true }}>
              <ambientLight intensity={0.5} />
              <Suspense fallback={null}>
                <StringTheorySimulation />
              </Suspense>
            </Canvas>
          </div>

          <span className="z-10 relative">
            Hi, I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Shrawan
            </span>
          </span>
          <div className="h-[60px] md:h-[80px] overflow-hidden z-10 relative">
            <TypeAnimation
              sequence={[
                "AI/ML Engineer",
                2000,
                "Software Engineer",
                2000,
                "Creative Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block min-h-[50px]"
              repeat={Infinity}
            />
          </div>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg md:text-xl text-gray-400 my-5 max-w-[700px] text-center"
        >
          Building AI-first systems with algorithmic precision and founder-level
          ambition.
        </motion.p>

        <motion.a
          href="#projects"
          variants={slideInFromLeft(1)}
          className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg text-lg"
        >
          View my work
        </motion.a>
      </div>

    </motion.div>
  );
};
