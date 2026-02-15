'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxProps {
  image: string | null;
  onClose: () => void;
  title?: string;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose, title }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent close on image click
          >
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="relative w-full h-[80vh]">
              <Image 
                src={image} 
                alt={title || "Lightbox"} 
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
            
            {title && (
              <div className="mt-4 text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {title}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;

