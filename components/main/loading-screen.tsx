"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1.5 seconds cinematic load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#030014]"
                >
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            className="w-24 h-24 border-t-2 border-r-2 border-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-xl font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        >
                            System Initializing
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
