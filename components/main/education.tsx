"use client";

import { motion } from "framer-motion";

import { slideInFromTop } from "@/lib/motion";
import { EDUCATION } from "@/constants";

export const Education = () => {
  return (
    <section
      id="education"
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[40px] font-medium text-center text-gray-200 mb-16"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
          Education
        </span>
      </motion.div>

      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Central Vertical Connector */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-transparent md:-translate-x-1/2" />

        <div className="flex flex-col gap-16 w-full">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative w-full flex flex-col items-center"
            >
              {/* Timeline Indicator */}
              <div className="absolute left-8 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full bg-[#030014] border-[3px] border-blue-500 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.4)]">
                <span className="text-sm">📍</span>
              </div>

              {/* Hierarchical Content - One below another */}
              <div className="w-full max-w-2xl px-16 md:px-0 mt-2 md:mt-0">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, 0.5, -0.5, 0],
                  }}
                  transition={{
                    duration: 6 + index * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="glass-panel hover-3d-pop rounded-[32px] p-8 md:p-10 hover:border-blue-500/50"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-blue-400 font-black text-sm tracking-[0.2em] uppercase mb-2">
                      {edu.period}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                      {edu.school}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-cyan-400">🎓</span>
                      <span className="text-gray-400 font-medium">{edu.location}</span>
                    </div>
                  </div>

                  {edu.detail && (
                    <div className="mt-8 flex justify-between items-center bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10">
                      <span className="text-gray-300 font-medium">Focus</span>
                      <span className="text-blue-400 font-black text-lg">{edu.detail}</span>
                    </div>
                  )}
                </motion.div>

                {/* Arrow Connector for hierarchy */}
                {index < EDUCATION.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-blue-500/40 text-2xl"
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
