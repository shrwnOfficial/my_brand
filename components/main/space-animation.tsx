"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/lib/motion";

const InterstellarCore = () => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    });

    return (
        <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
            <group ref={meshRef}>
                {/* Thin Atmospheric Glow (Outer Layer) */}
                <mesh>
                    <sphereGeometry args={[2.08, 128, 128]} />
                    <meshPhysicalMaterial
                        color="#171717" // Very dark gray atmosphere
                        emissive="#262626"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.15}
                        roughness={0.1}
                        transmission={0.9} // Glass-like atmosphere
                        ior={1.2}
                        thickness={2.0}
                        clearcoat={1.0}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Dense Cloud Layer */}
                <mesh>
                    <sphereGeometry args={[2.04, 128, 128]} />
                    <meshStandardMaterial
                        color="#0a0a0a" // Almost black clouds
                        transparent
                        opacity={0.5}
                        roughness={0.9}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* Water / Oceanic Surface Layer */}
                <mesh>
                    <sphereGeometry args={[2.01, 128, 128]} />
                    <meshStandardMaterial
                        color="#000000" // Pitch black ocean
                        roughness={0.05}
                        metalness={0.8}
                        envMapIntensity={1.5}
                    />
                </mesh>

                {/* Solid Terrestrial Crust (Mountains & Landmass) */}
                <mesh>
                    <icosahedronGeometry args={[2, 16]} />
                    <meshStandardMaterial
                        color="#1c1917" // Dark charcoal stone
                        roughness={0.9}
                        metalness={0.1}
                        bumpScale={0.05}
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Procedural Asteroid Belt
const AsteroidBelt = () => {
    const count = 300;
    const meshRef = useRef<THREE.InstancedMesh>(null!);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const radius = 4 + Math.random() * 6;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 2;
            const scale = 0.05 + Math.random() * 0.1;
            temp.push({ x, y, z, scale, angle, radius, speed: 0.1 + Math.random() * 0.2 });
        }
        return temp;
    }, [count]);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        particles.forEach((particle, i) => {
            const currentAngle = particle.angle + time * particle.speed;
            dummy.position.set(
                Math.cos(currentAngle) * particle.radius,
                particle.y + Math.sin(time * 0.5 + i) * 0.2,
                Math.sin(currentAngle) * particle.radius
            );
            dummy.rotation.x = time * particle.speed * 2;
            dummy.rotation.y = time * particle.speed * 2;
            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
        meshRef.current.rotation.z = Math.cos(time * 0.1) * 0.2;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#3f3f46" roughness={1.0} metalness={0.1} />
        </instancedMesh>
    );
};

export const SpaceAnimation = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[800px] flex flex-col items-center justify-center overflow-hidden py-20 px-4">
            {/* Decorative Text */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromBottom(0.5)}
                className="absolute bottom-10 z-10 text-center pointer-events-none"
            >
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-500 tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    explore the unknown
                </h2>
            </motion.div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
                    <ambientLight intensity={0.15} color="#e0f2fe" />

                    {/* Primary Sun / Star Light */}
                    <directionalLight
                        position={[10, 5, 10]}
                        intensity={4.5}
                        color="#fffbeb"
                        castShadow
                    />

                    {/* Soft Backlight / Starlight reflection */}
                    <directionalLight
                        position={[-10, -5, -10]}
                        intensity={0.5}
                        color="#38bdf8"
                    />

                    {/* Subtle core fill light */}
                    <pointLight position={[0, 0, 0]} intensity={1.5} color="#3b82f6" distance={15} />

                    <InterstellarCore />
                    <AsteroidBelt />

                    <Stars
                        radius={50}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={1}
                        fade
                        speed={2}
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                </Canvas>
            </div>

            {/* Top/Bottom Gradient Fades to blend with page */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030014] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030014] to-transparent z-10 pointer-events-none" />
        </section>
    );
};
