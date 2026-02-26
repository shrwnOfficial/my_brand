"use client";

import { motion } from "framer-motion";
import { SkillOrbit } from "@/components/sub/skill-orbit";
import { SkillText } from "@/components/sub/skill-text";

import { SKILL_CATEGORIES } from "@/constants";

export const Skills = () => {
  const allSkills = SKILL_CATEGORIES.flatMap((cat) => cat.skills);

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-16 h-full relative overflow-hidden py-24 min-h-[800px]"
    >
      <SkillText />

      {/* Single luxurious circular orbit - all skills rotating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        animate={{
          y: [0, -15, 0],
          rotateZ: [0, 0.5, -0.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" }
        }}
        className="relative"
      >
        <SkillOrbit skills={allSkills} radius={240} duration={55} />
      </motion.div>

      {/* Category labels - subtle row below */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {SKILL_CATEGORIES.map((cat) => (
          <span
            key={cat.title}
            className="px-3 py-1 rounded-full text-xs text-gray-500 bg-white/[0.04] border border-white/[0.06]"
          >
            {cat.title}
          </span>
        ))}
      </motion.div>

      {/* Background video */}
      <div className="w-full h-full absolute inset-0 pointer-events-none">
        <div className="w-full h-full z-[-10] opacity-20 absolute flex items-center justify-center">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
