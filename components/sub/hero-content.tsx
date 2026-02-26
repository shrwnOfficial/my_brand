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
   Network Topology
   ───────────────────────────────────────────── */
const LAYER_CONFIG = [
  { name: "Input", count: 16, x: -2.0, spreadY: 2.5, spreadZ: 2.5 },
  { name: "Conv", count: 32, x: -0.8, spreadY: 3.5, spreadZ: 3.5 },
  { name: "Hidden 1", count: 24, x: 0.5, spreadY: 2.8, spreadZ: 2.8 },
  { name: "Hidden 2", count: 16, x: 1.6, spreadY: 2.0, spreadZ: 2.0 },
  { name: "Output", count: 4, x: 2.6, spreadY: 0.8, spreadZ: 0.8 },
];

function buildNetwork() {
  const nodes: { pos: [number, number, number]; layer: number; idx: number }[] = [];
  const edges: { from: [number, number, number]; to: [number, number, number]; layerIdx: number }[] = [];

  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Generate nodes in 3D using pseudo-random distribution
  LAYER_CONFIG.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const r = Math.sqrt(random()) * (layer.spreadY / 2);
      const theta = random() * 2 * Math.PI;
      const py = r * Math.cos(theta);
      const pz = r * Math.sin(theta);
      const pos: [number, number, number] = [layer.x, py, pz];
      nodes.push({ pos, layer: li, idx: nodes.length });
    }
  });

  // Generate edges: simulate local receptive fields to prevent spaghetti lines
  LAYER_CONFIG.forEach((layer, li) => {
    if (li >= LAYER_CONFIG.length - 1) return;

    const currNodes = nodes.filter(n => n.layer === li);
    const nextNodes = nodes.filter(n => n.layer === li + 1);

    currNodes.forEach((curr) => {
      // Connect to the 4 nearest nodes in the next layer to represent tensor flows
      const connections = Math.min(nextNodes.length, 4);
      const targets = [...nextNodes].sort((a, b) => {
        const distA = Math.hypot(a.pos[1] - curr.pos[1], a.pos[2] - curr.pos[2]);
        const distB = Math.hypot(b.pos[1] - curr.pos[1], b.pos[2] - curr.pos[2]);
        return distA - distB;
      }).slice(0, connections);

      targets.forEach(target => {
        edges.push({ from: curr.pos, to: target.pos, layerIdx: li });
      });
    });
  });

  return { nodes, edges };
}

/* ─────────────────────────────────────────────
   Signal Dot with comet trail
   ───────────────────────────────────────────── */
const SignalDot = ({ from, to, offset }: { from: [number, number, number]; to: [number, number, number]; offset: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const trail1 = useRef<THREE.Mesh>(null!);
  const trail2 = useRef<THREE.Mesh>(null!);
  const trail3 = useRef<THREE.Mesh>(null!);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame(({ clock }) => {
    const raw = (clock.getElapsedTime() * 0.15 + offset) % 2;
    const t = raw <= 1 ? raw : 2 - raw;
    const eased = t * t * (3 - 2 * t);

    ref.current.position.lerpVectors(a, b, eased);

    // Trail particles follow with delay
    const t1 = Math.max(0, eased - 0.06);
    const t2 = Math.max(0, eased - 0.12);
    const t3 = Math.max(0, eased - 0.18);
    trail1.current.position.lerpVectors(a, b, t1);
    trail2.current.position.lerpVectors(a, b, t2);
    trail3.current.position.lerpVectors(a, b, t3);
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>
      <mesh ref={trail1}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.5} />
      </mesh>
      <mesh ref={trail2}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.25} />
      </mesh>
      <mesh ref={trail3}>
        <sphereGeometry args={[0.007, 6, 6]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────
   Glowing Network Node with dynamic sizing
   ───────────────────────────────────────────── */
const NetworkNode = ({ pos, active, intensity, onHover, onUnhover }: {
  pos: [number, number, number];
  active: boolean;
  intensity: number;
  onHover: () => void;
  onUnhover: () => void;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    // Organic, complex breathing using combined sine waves
    const t = clock.getElapsedTime();
    const breathe = 1 + (Math.sin(t * 1.5) * 0.03 + Math.sin(t * 2.8) * 0.02);
    // Dynamic sizing: active layer nodes grow, inactive shrink
    const targetScale = active ? 1.4 : hovered ? 1.6 : 0.85;
    const current = ref.current.scale.x;
    const lerped = current + (targetScale * breathe - current) * 0.08;
    ref.current.scale.setScalar(lerped);
  });

  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={() => { setHovered(true); onHover(); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); onUnhover(); document.body.style.cursor = "auto"; }}
    >
      <sphereGeometry args={[0.06, 24, 24]} />
      <meshPhysicalMaterial
        color={hovered ? "#ffffff" : active ? "#e0e7ff" : "#1e1b4b"}
        emissive={hovered ? "#c7d2fe" : active ? "#818cf8" : "#0f0f2a"}
        emissiveIntensity={hovered ? 8.0 : active ? 5.0 * intensity : 0.5}
        metalness={0.9}
        roughness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        transmission={0.4}
        thickness={0.2}
      />
    </mesh>
  );
};



/* ─────────────────────────────────────────────
   Pulse Wave (click shockwave)
   ───────────────────────────────────────────── */
const PulseWave = ({ active }: { active: boolean }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    if (active) {
      ref.current.scale.x += (5 - ref.current.scale.x) * 0.04;
      ref.current.scale.y += (5 - ref.current.scale.y) * 0.04;
      ref.current.scale.z += (5 - ref.current.scale.z) * 0.04;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, mat.opacity - 0.008);
    } else {
      ref.current.scale.setScalar(0.5);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15;
    }
  });

  return (
    <mesh ref={ref} scale={0.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.15} side={THREE.FrontSide} />
    </mesh>
  );
};

/* ─────────────────────────────────────────────
   Gradient Connection Line
   ───────────────────────────────────────────── */
const GradientLine = ({ from, to, isActive, intensity }: {
  from: [number, number, number];
  to: [number, number, number];
  isActive: boolean;
  intensity: number;
}) => {
  return (
    <Line
      points={[from, to]}
      vertexColors={[
        isActive ? new THREE.Color("#818cf8") : new THREE.Color("#1e1b4b"),
        isActive ? new THREE.Color("#38bdf8") : new THREE.Color("#0f172a"),
      ]}
      lineWidth={isActive ? 1.0 : 0.3}
      transparent
      opacity={isActive ? 0.5 * intensity : 0.08}
    />
  );
};

/* ─────────────────────────────────────────────
   Main Simulation Component
   ───────────────────────────────────────────── */
const DeepLearningSimulation = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const { nodes, edges } = useMemo(() => buildNetwork(), []);
  const [activeLayer, setActiveLayer] = useState(0);
  const [intensity, setIntensity] = useState(1.0);
  const [pulseActive, setPulseActive] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const PHASES = ["Forward: Input → Conv", "Forward: Conv → Hidden", "Forward: Hidden → Output", "Loss Calculation", "Backpropagation"];

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    const cycleLayer = Math.floor(t * 0.25) % 4;
    if (cycleLayer !== activeLayer) setActiveLayer(cycleLayer);

    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.2 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-mouse.y * 0.1 - groupRef.current.rotation.x) * 0.03;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }

    if (intensity > 1.0) setIntensity(p => Math.max(1.0, p - 0.01));
    if (intensity <= 1.05 && pulseActive) setPulseActive(false);
  });

  const handleClick = useCallback(() => {
    setIntensity(4.0);
    setPulseActive(true);
  }, []);

  return (
    <group ref={groupRef} onClick={handleClick} scale={0.8}>
      {/* Gradient Connection Lines */}
      {edges.map((edge, i) => {
        const isActive = edge.layerIdx === activeLayer || edge.layerIdx === activeLayer - 1
          || edge.layerIdx === hoveredLayer;
        return (
          <group key={`e-${i}`}>
            <GradientLine from={edge.from} to={edge.to} isActive={isActive} intensity={intensity} />
            {isActive && (
              <SignalDot from={edge.from} to={edge.to} offset={i * 0.037} />
            )}
          </group>
        );
      })}

      {/* Nodes with hover & dynamic sizing */}
      {nodes.map((node, i) => (
        <NetworkNode
          key={`n-${i}`}
          pos={node.pos}
          active={node.layer === activeLayer || node.layer === hoveredLayer}
          intensity={intensity}
          onHover={() => setHoveredLayer(node.layer)}
          onUnhover={() => setHoveredLayer(null)}
        />
      ))}

      {/* Layer Labels */}
      {LAYER_CONFIG.map((layer, i) => (
        <Html
          key={`label-${i}`}
          position={[layer.x, layer.spreadY / 2 + 0.2, 0]}
          center
          distanceFactor={12}
          style={{ pointerEvents: "none" }}
        >
          <div style={{
            color: i === activeLayer || i === hoveredLayer ? "#7dd3fc" : "#38bdf8",
            fontSize: "3.5px",
            fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase" as const,
            textShadow: i === activeLayer || i === hoveredLayer ? "0 0 5px rgba(125,211,252,0.5)" : "none",
            whiteSpace: "nowrap",
            transition: "all 0.4s ease",
          }}>
            {layer.name}
          </div>
        </Html>
      ))}

      {/* Phase Status */}
      <Html position={[0, 2.8, 0]} center distanceFactor={14} style={{ pointerEvents: "none" }}>
        <div style={{
          color: "#7dd3fc",
          fontSize: "3.5px",
          fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase" as const,
          textShadow: "0 0 6px rgba(125,211,252,0.4)",
          whiteSpace: "nowrap",
          padding: "1.5px 6px",
          border: "1px solid rgba(125, 211, 252, 0.12)",
          borderRadius: "2px",
          background: "rgba(5, 5, 20, 0.4)",
          backdropFilter: "blur(4px)",
        }}>
          ◆ {PHASES[activeLayer] || "Neural Network"}
        </div>
      </Html>


      <PulseWave active={pulseActive} />
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
      className="flex flex-col lg:flex-row items-center justify-center px-5 md:px-20 mt-32 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
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
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[800px] w-auto h-auto"
        >
          <span>
            Hi, I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Shrawan
            </span>
          </span>
          <div className="h-[60px] md:h-auto overflow-hidden">
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
              className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block min-h-[50px]"
              repeat={Infinity}
            />
          </div>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Building AI-first systems with algorithmic precision and founder-level
          ambition.
        </motion.p>

        <motion.a
          href="#projects"
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          View my work
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-[400px] lg:h-[650px] flex justify-center items-center cursor-grab active:cursor-grabbing mt-10 lg:mt-0"
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#6366f1" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
          <Suspense fallback={null}>
            <DeepLearningSimulation />
          </Suspense>
        </Canvas>
      </motion.div>
    </motion.div>
  );
};
