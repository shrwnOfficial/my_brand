"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct the mailto link
        const targetEmail = "shaan.09042@gmail.com";
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

        // Reset form after a brief delay
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
        }, 1000);
    };

    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center py-20 px-4 w-full"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromLeft(0.5)}
                className="text-[40px] font-medium text-center text-gray-200 mb-10"
            >
                Message{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Me
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, 0.5, -0.5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    opacity: { duration: 0.5, delay: 0.5 },
                    x: { duration: 0.5, delay: 0.5 }
                }}
                className="w-full max-w-2xl glass-panel hover-3d-pop rounded-[32px] p-8 overflow-hidden group"
            >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-[32px] blur opacity-0 group-hover:opacity-40 transition duration-1000" />

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm font-bold tracking-widest uppercase ml-1">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-black/20 backdrop-blur-md border border-white/[0.08] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm font-bold tracking-widest uppercase ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-black/20 backdrop-blur-md border border-white/[0.08] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm font-bold tracking-widest uppercase ml-1">Message</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-black/20 backdrop-blur-md border border-white/[0.08] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all resize-none"
                            placeholder="How can I help you?"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-900/10"
                    >
                        Send Message
                    </button>
                </form>
            </motion.div>
        </section>
    );
};
