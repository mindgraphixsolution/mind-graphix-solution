'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      className="w-full h-full"
    >
      {children}
    </MotionDiv>
  );
};

export default PageTransition;

