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
          className="flex flex-col gap-6 mt-6 text-4xl md:text-7xl font-bold text-white max-w-[900px] w-auto h-auto"
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
