'use client';

import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import NeuralBackground from '../ui/NeuralBackground';

/**
 * Traductions locales pour la page 404
 */
const TRANSLATIONS = {
  fr: {
    title: "Perdu dans l'espace ?",
    subtitle: "La page que vous recherchez semble avoir été aspirée par un trou noir ou n'a jamais existé.",
    backHome: "Retour Accueil",
    contact: "Contactez-nous"
  },
  en: {
    title: "Lost in space?",
    subtitle: "The page you are looking for seems to have been sucked into a black hole or never existed.",
    backHome: "Back Home",
    contact: "Contact Us"
  }
};

const NotFound: React.FC = () => {
  const { language } = useLanguage();
  const currentT = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Fond étoilé / Neural */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="text-[150px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-main)]/10 to-transparent leading-none select-none">
          404
        </div>
        
        <div className="mt-[-50px] md:mt-[-80px] mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-4 tracking-tighter">
            {currentT.title}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-lg">
            {currentT.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/" 
            className="btn-architect px-8 py-4 flex items-center justify-center gap-2"
          >
            <Home size={20} /> {currentT.backHome}
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-[var(--bg-surface)]/50 backdrop-blur-md border border-[var(--border-color)] text-[var(--text-main)] font-bold rounded-full flex items-center justify-center gap-2 hover:bg-[var(--bg-surface)] transition-all glass"
          >
            <Compass size={20} /> {currentT.contact}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

