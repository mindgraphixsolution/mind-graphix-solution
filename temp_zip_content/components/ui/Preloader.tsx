
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 800); // Wait a bit before unmounting
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] text-white overflow-hidden"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative w-full max-w-md px-6">
        {/* Logo Text */}
        <div className="text-center mb-8 overflow-hidden">
          <motion.h1 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Mind Graphix
          </motion.h1>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-accent absolute left-0 top-0"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Percentage */}
        <div className="flex justify-between mt-2 text-xs font-mono text-gray-400">
          <span>INITIALISATION...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </motion.div>
  );
};

export default Preloader;
