"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

type ProjectCardProps = {
  src?: string;
  title: string;
  description: string;
  link: string;
  logo?: string;
  index: number;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  logo,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -12, 0],
        rotateZ: [0, 1, -1, 0],
      }}
      transition={{
        duration: 8 + index * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        opacity: { duration: 0.8, delay: index * 0.2 },
        y: { duration: 0.8, delay: index * 0.2 }
      }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative block hover-3d-pop rounded-[32px] w-full"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-[32px] blur opacity-0 group-hover:opacity-60 transition duration-1000" />

        <div className="relative overflow-hidden rounded-[32px] glass-panel border border-white/[0.08] transition-all duration-700 hover:border-purple-500/50">
          <div className="relative w-full aspect-video overflow-hidden">
            {src && (
              <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-[#030014]/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm z-10">
              <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col items-center gap-3">
                {logo === "whatsapp" && (
                  <div className="w-16 h-16 rounded-full border border-green-400/50 flex items-center justify-center bg-green-400/20 shadow-[0_0_20px_rgba(74,222,128,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                )}
                {logo === "camera" && (
                  <div className="w-16 h-16 rounded-full border border-pink-400/50 flex items-center justify-center bg-pink-400/20 shadow-[0_0_20px_rgba(244,114,182,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
                {logo === "water" && (
                  <div className="w-16 h-16 rounded-full border border-blue-400/50 flex items-center justify-center bg-blue-400/20 shadow-[0_0_20px_rgba(96,165,250,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.5c1.1-1.1 2.9-1.1 4 0 1.1 1.1 2.9 1.1 4 0 1.1-1.1 2.9-1.1 4 0 1.1 1.1 2.9 1.1 4 0v4.5A2.5 2.5 0 0116.5 20.5a2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0A2.5 2.5 0 014 18v-4.5zm0-5c1.1-1.1 2.9-1.1 4 0 1.1 1.1 2.9 1.1 4 0 1.1-1.1 2.9-1.1 4 0 1.1 1.1 2.9 1.1 4 0" />
                    </svg>
                  </div>
                )}
                {!["whatsapp", "camera", "water"].includes(logo ?? "") && (
                  <div className="w-14 h-14 rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-cyan-400 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                <span className={
                  logo === "whatsapp" ? "text-green-300 font-bold tracking-[0.2em] uppercase text-xs drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" :
                    logo === "camera" ? "text-pink-300 font-bold tracking-[0.2em] uppercase text-xs drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" :
                      logo === "water" ? "text-blue-300 font-bold tracking-[0.2em] uppercase text-xs drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" :
                        "text-cyan-300 font-bold tracking-[0.2em] uppercase text-xs drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                }>
                  View Source
                </span>
              </div>
            </div>
          </div>

          <div className="relative p-8 bg-white/[0.01]">
            <h1 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-purple-200 transition-colors">
              {title}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {description}
            </p>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
