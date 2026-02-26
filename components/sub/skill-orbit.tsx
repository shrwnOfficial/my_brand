"use client";

import { motion } from "framer-motion";

type Skill = { name: string; icon: string | null };

type SkillOrbitProps = {
  skills: readonly Skill[];
  radius?: number;
  duration?: number;
};

export const SkillOrbit = ({
  skills,
  radius = 200,
  duration = 40,
}: SkillOrbitProps) => {
  const count = skills.length;
  const size = radius * 2 + 120;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/15 to-cyan-500/10 blur-3xl" />
      </div>

      {/* Rotating orbit - luxurious smooth spin */}
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          left: "50%",
          top: "50%",
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {skills.map((skill, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius + size / 2 - 28;
          const y = Math.sin(angle) * radius + size / 2 - 28;

          return (
            <motion.div
              key={`${skill.name}-${i}`}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                x,
                y,
                width: 56,
                height: 56,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              whileHover={{ scale: 1.25, zIndex: 50 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center p-2 shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:border-purple-500/50 hover:bg-white/[0.12] hover:shadow-[0_8px_32px_rgba(112,66,248,0.15)] transition-all duration-300 group cursor-default">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-[9px] font-medium text-gray-400 group-hover:text-white text-center leading-tight px-1">
                    {skill.name}
                  </span>
                )}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-black/60 px-2 py-1 rounded">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
