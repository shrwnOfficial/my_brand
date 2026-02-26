"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export const FloatingHobbies = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // Generate a random position across the screen
  const getRandomPosition = () => {
    if (typeof window !== "undefined") {
      // Keep it within a safe bounding box so it doesn't cause scrollbars
      const safeWidth = window.innerWidth - 250;
      const safeHeight = window.innerHeight - 100;
      
      return {
        x: Math.random() * safeWidth,
        y: Math.random() * safeHeight,
      };
    }
    return { x: 100, y: 100 };
  };

  useEffect(() => {
    // Set initial random position
    setPosition(getRandomPosition());

    // Continuously drift to a new random location every 15 seconds
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none flex flex-col gap-2 items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y
      }}
      transition={{
        opacity: { duration: 2 },
        scale: { duration: 2 },
        // Use a very long linear duration so it perpetually floats slowly like it's in space
        x: { duration: 15, ease: "linear" },
        y: { duration: 15, ease: "linear" },
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Hobbies
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        </span>
      </div>
      
      <div className="flex gap-3 text-sm font-medium">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.05]">
          <span className="text-lg">🏸</span>
          <span className="text-gray-200">Badminton</span>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.05]">
          <span className="text-lg">♟️</span>
          <span className="text-gray-200">Chess</span>
        </div>
      </div>
    </motion.div>
  );
};
