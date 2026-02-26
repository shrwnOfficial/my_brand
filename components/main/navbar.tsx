"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl flex flex-col md:flex-row items-center justify-center gap-4 px-4">
      {/* Main Navigation Pill */}
      <nav className="flex items-center gap-1 p-2 rounded-[32px] glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:border-white/[0.15]">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-[24px] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-500 group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <Image
              src="/profile-logo.jpg"
              alt="Profile"
              width={32}
              height={32}
              draggable={false}
              className="relative rounded-full object-cover aspect-square"
            />
          </div>
          <span className="hidden lg:inline font-bold text-gray-100 text-[14px]">
            Shrawan
          </span>
        </Link>

        <div className="h-6 w-[1px] bg-white/10 mx-2 hidden sm:block" />

        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="px-4 py-2 rounded-[22px] text-gray-400 hover:text-white text-[14px] font-semibold transition-all duration-300 hover:bg-white/[0.05]"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>

      {/* Social Links Pill */}
      <div className="flex items-center gap-3 p-2 rounded-[32px] glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:border-white/[0.15]">
        <Link
          href="https://linkedin.com/in/shrawanofficial"
          target="_blank"
          rel="noreferrer noopener"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] text-white transition-all hover:scale-110 shadow-lg"
          title="LinkedIn"
        >
          <FaLinkedin className="text-xl text-[#0077b5]" />
        </Link>
        <Link
          href="mailto:shaan.09042@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] text-white transition-all hover:scale-110 shadow-lg"
          title="Mail"
        >
          <IoMdMail className="text-xl text-blue-400" />
        </Link>
        <Link
          href={LINKS.sourceCode}
          target="_blank"
          rel="noreferrer noopener"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] text-white transition-all hover:scale-110 shadow-lg"
          title="GitHub"
        >
          <FaGithub className="text-xl" />
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-[16px] bg-white/[0.08] hover:bg-white/[0.15] text-white text-2xl transition-all"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu - liquid glass dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 rounded-[24px] glass-panel shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="px-4 py-3 rounded-[16px] bg-white/[0.05] hover:bg-white/[0.12] text-gray-300 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                href={LINKS.sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-3 rounded-[16px] bg-blue-500/20 text-blue-300 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GitHub
              </Link>
              <div className="flex justify-center gap-3 pt-2">
                <Link
                  href="https://linkedin.com/in/shrawanofficial"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 flex items-center justify-center rounded-[16px] bg-white/[0.08] text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaLinkedin className="text-xl" />
                </Link>
                <Link
                  href="mailto:shaan.09042@gmail.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 flex items-center justify-center rounded-[16px] bg-white/[0.08] text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoMdMail className="text-xl" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
