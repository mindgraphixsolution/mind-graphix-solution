
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "premium" feel
      }}
      className="w-full h-full"
    >
      {children}
    </MotionDiv>
  );
};

export default PageTransition;
