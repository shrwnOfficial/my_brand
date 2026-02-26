"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Skill = {
  name: string;
  icon: string | null;
};

type SkillCategoryProps = {
  title: string;
  skills: readonly Skill[];
  index: number;
};

export const SkillCategory = ({ title, skills, index }: SkillCategoryProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full max-w-[900px]"
    >
      <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4 items-center">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center gap-2 group hover-3d-pop"
          >
            {skill.icon ? (
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl glass-panel p-3 group-hover:border-purple-500/40 group-hover:bg-white/[0.06] transition-all duration-500 shadow-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.icon}
                  alt={skill.name}
                  width={34}
                  height={34}
                  className="object-contain w-8 h-8 relative z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                />
              </div>
            ) : (
              <div className="px-5 py-3 rounded-2xl glass-panel group-hover:border-purple-500/40 group-hover:bg-white/[0.06] transition-all duration-500 shadow-xl">
                <span className="text-gray-200 text-sm font-bold tracking-tight">
                  {skill.name}
                </span>
              </div>
            )}
            {skill.icon && (
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors text-center max-w-[100px] leading-tight">
                {skill.name}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
