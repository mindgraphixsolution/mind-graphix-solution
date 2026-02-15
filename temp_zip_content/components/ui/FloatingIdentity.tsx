
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FloatingIdentity: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  // Masquer sur le login admin ou dashboard
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed bottom-8 left-8 z-[90] hidden xl:flex flex-col items-start pointer-events-none"
    >
      <div className="relative group pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(94,53,177,0.2)]">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="flex flex-col relative z-10">
          <motion.h1 
            className="text-lg font-black text-white tracking-tight leading-none mb-1"
            animate={{ textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            MIND GRAPHIX <span className="text-primary">SOLUTION</span>
          </motion.h1>
          
          <div className="flex items-center gap-2">
             <div className="h-px w-8 bg-gradient-to-r from-accent to-transparent"></div>
             <motion.p 
               className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em]"
             >
               {t('common.slogan')}
             </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingIdentity;
