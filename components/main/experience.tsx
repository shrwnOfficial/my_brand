"use client";

import { motion } from "framer-motion";

import { slideInFromTop } from "@/lib/motion";
import { EXPERIENCE } from "@/constants";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[40px] font-medium text-center text-gray-200 mb-16"
      >
        Work{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
          Experience
        </span>
      </motion.div>

      <div className="flex flex-col gap-16 max-w-5xl w-full">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, index % 2 === 0 ? 0.3 : -0.3, index % 2 === 0 ? -0.3 : 0.3, 0],
            }}
            transition={{
              duration: 6 + index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              opacity: { duration: 0.8 },
              x: { duration: 0.8 }
            }}
            className="group relative"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <div className="relative glass-panel hover-3d-pop rounded-[32px] p-8 md:p-12 overflow-hidden hover:border-purple-500/50">

              {/* Animated Bubbly Overlays */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">
                      {exp.role}
                    </h3>
                    <p className="text-xl font-medium text-purple-400/90 leading-none">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-gray-300 font-semibold text-sm backdrop-blur-md">
                      {exp.period}
                    </span>
                    {exp.period.includes("continuing") && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500">Active Role</span>
                      </div>
                    )}

                  </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <ul className="space-y-4">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex items-start gap-4 text-gray-300/90 text-lg leading-relaxed group/item"
                    >
                      <span className="mt-2.5 flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 group-hover/item:scale-150 group-hover/item:bg-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
