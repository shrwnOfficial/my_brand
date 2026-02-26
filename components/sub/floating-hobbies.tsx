"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const FloatingHobbies = () => {
  // Track scroll position to only show after scrolling down (~2500px near Education)
  const { scrollY } = useScroll();
  const opacityScroll = useTransform(scrollY, [2000, 2600], [0, 1]);

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDodging, setIsDodging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use smooth spring physics for the dodging animation so it snaps nicely
  const springX = useSpring(position.x, { stiffness: 60, damping: 15 });
  const springY = useSpring(position.y, { stiffness: 60, damping: 15 });

  const getRandomPosition = () => {
    if (typeof window !== "undefined") {
      const safeWidth = window.innerWidth - 300;
      const safeHeight = window.innerHeight - 300;
      return {
        x: Math.random() * safeWidth + 50,
        y: Math.random() * safeHeight + 50,
      };
    }
    return { x: 100, y: 100 };
  };

  useEffect(() => {
    const initialPos = getRandomPosition();
    setPosition(initialPos);
    springX.set(initialPos.x);
    springY.set(initialPos.y);

    const interval = setInterval(() => {
      if (!isDodging) {
        const nextPos = getRandomPosition();
        setPosition(nextPos);
        springX.set(nextPos.x);
        springY.set(nextPos.y);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isDodging, springX, springY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Trigger dodge if mouse gets within 200px
      const threshold = 200;
      if (distance < threshold) {
        setIsDodging(true);
        // Push in opposite direction of mouse
        const force = (threshold - distance) * 2;
        const pushX = -(distanceX / distance) * force;
        const pushY = -(distanceY / distance) * force;

        // Keep within window bounds
        let newX = position.x + pushX;
        let newY = position.y + pushY;
        if (typeof window !== "undefined") {
          newX = Math.max(50, Math.min(newX, window.innerWidth - 300));
          newY = Math.max(50, Math.min(newY, window.innerHeight - 300));
        }

        setPosition({ x: newX, y: newY });
        springX.set(newX);
        springY.set(newY);

        // Reset dodging state after a short delay
        setTimeout(() => setIsDodging(false), 500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position, springX, springY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: springX,
        y: springY,
        opacity: opacityScroll, // Only fully visible after 2600px scroll
      }}
      className="fixed z-50 flex flex-col items-center justify-center p-6 w-48 h-48 rounded-full pointer-events-auto cursor-default"
    >
      {/* 3D Orb Background layers */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/10 backdrop-blur-md" />
      <div className="absolute inset-0 rounded-full border border-white/20 shadow-[inset_0_-15px_30px_rgba(112,66,248,0.2),inset_0_15px_30px_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.5)]" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/20 rounded-full blur-[4px] mix-blend-overlay" /> {/* 3D Shine reflection */}

      <span className="relative z-10 text-[10px] text-gray-300 uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
        Hobbies
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      </span>
      
      <div className="relative z-10 flex flex-col gap-2 w-full px-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 shadow-inner w-full justify-center">
          <span className="text-lg">🏸</span>
          <span className="text-gray-100 text-xs font-medium">Badminton</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 shadow-inner w-full justify-center">
          <span className="text-lg">♟️</span>
          <span className="text-gray-100 text-xs font-medium">Chess</span>
        </div>
      </div>
    </motion.div>
  );
};
