"use client";

import { motion } from "framer-motion";

import { slideInFromTop } from "@/lib/motion";
import { CERTIFICATIONS, ACHIEVEMENTS } from "@/constants";

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="flex flex-col items-center justify-center py-24 px-4 relative"
    >
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[40px] font-medium text-center text-gray-200 mb-20 relative z-10"
      >
        Certifications &{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          Achievements
        </span>
      </motion.div>

      <div className="flex flex-col gap-16 max-w-6xl w-full relative z-10">
        {/* Certifications Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

          <h4 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-10 tracking-wide">
            Certifications
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [0, 0.3, -0.3, 0],
                }}
                transition={{
                  duration: 5 + index * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  opacity: { duration: 0.5, delay: index * 0.15 },
                  scale: { duration: 0.5, delay: index * 0.15 }
                }}
                className="group p-6 bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-blue-500/50 rounded-tl-[32px] rounded-br-[32px] rounded-tr-[12px] rounded-bl-[12px] flex items-center gap-5 cursor-pointer hover-3d-pop backdrop-blur-md shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)]">
                  📜
                </div>
                <p className="text-gray-200 font-medium text-[16px] flex-1 leading-relaxed group-hover:text-blue-200 transition-colors duration-300">
                  {cert.title}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Achievements Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500/80 to-blue-500/80 shadow-[0_0_15px_rgba(6,182,212,0.6)]" />

          <h4 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-10 tracking-wide">
            Achievements
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [0, -0.3, 0.3, 0],
                }}
                transition={{
                  duration: 5.5 + index * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  opacity: { duration: 0.5, delay: index * 0.15 },
                  scale: { duration: 0.5, delay: index * 0.15 }
                }}
                className="group relative"
              >
                {achievement.link ? (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-5 p-6 bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-cyan-500/50 rounded-tr-[32px] rounded-bl-[32px] rounded-tl-[12px] rounded-br-[12px] cursor-pointer hover-3d-pop backdrop-blur-md shadow-xl transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-[16px] bg-cyan-500/10 rotate-3 group-hover:-rotate-6 flex items-center justify-center text-2xl group-hover:bg-cyan-500/20 transition-all duration-500 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]">
                      🏆
                    </div>
                    <p className="text-gray-200 font-medium text-[16px] flex-1 leading-relaxed group-hover:text-cyan-200 transition-colors duration-300">
                      {achievement.title}
                    </p>
                  </a>
                ) : (
                  <div className="flex items-center gap-5 p-6 bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-blue-500/50 rounded-tr-[32px] rounded-bl-[32px] rounded-tl-[12px] rounded-br-[12px] hover-3d-pop backdrop-blur-md shadow-xl transition-all duration-500">
                    <div className="w-14 h-14 rounded-[16px] bg-blue-500/10 -rotate-3 group-hover:rotate-6 flex items-center justify-center text-2xl group-hover:bg-blue-500/20 transition-all duration-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)]">
                      🚀
                    </div>
                    <p className="text-gray-200 font-medium text-[16px] flex-1 leading-relaxed group-hover:text-blue-200 transition-colors duration-300">
                      {achievement.title}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
