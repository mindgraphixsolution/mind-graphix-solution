
import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, dark = false }) => {
  const ref = useRef(null);
  
  // Hooks pour la parallaxe
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transformation Y pour l'effet de parallaxe sur le fond (bouge moins vite que le scroll)
  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  const MotionDiv = motion.div as any;

  return (
    <section 
      id={id} 
      ref={ref}
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        dark 
          ? 'bg-dark text-white' 
          : 'bg-slate-50 text-slate-900 dark:bg-dark dark:text-white'
      } ${className}`}
    >
      {/* Abstract Background Elements for Dark Sections/Dark Mode WITH PARALLAX */}
      <MotionDiv 
        style={{ y: yBg }}
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${dark ? 'opacity-100' : 'opacity-0 dark:opacity-100'}`}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </MotionDiv>
      
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6 relative z-10"
      >
        {children}
      </MotionDiv>
    </section>
  );
};

export default Section;
