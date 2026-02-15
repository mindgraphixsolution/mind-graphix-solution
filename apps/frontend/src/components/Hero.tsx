'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers, Zap } from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Magnetic from './ui/Magnetic';
import NeuralBackground from './ui/NeuralBackground';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Chargement des données (optionnel si on utilise t() pour tout, mais gardé pour la structure)
  const loadHero = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const heroData = await api.getHero();
      setData(heroData);
    } catch (error) {
      console.error('Erreur lors du chargement des données Hero:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHero();
  }, [loadHero]);

  // Effets de parallaxe et d'opacité au scroll
  const yParallax = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.3]);

  // État de chargement (design architecte)
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Arrière-plan avec effets visuels */}
      <div className="absolute inset-0 z-0">
         <div className="bg-noise opacity-20"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-glow)] opacity-[0.1] rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
           {/* Contenu textuel (Gauche) */}
           <motion.div style={{ opacity: opacityHero, y: yParallax }} className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border-color)] shadow-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{t('about.open_to_work')}</span>
                </div>
              </motion.div>
              
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[var(--text-main)] mb-6 lg:mb-8 leading-[0.9] tracking-tighter">
                {t('hero.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)] animate-gradient-xy">{t('hero.title_suffix')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                {t('hero.description')}
              </p>
           </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Magnetic strength={40}>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto btn-architect text-lg py-4 px-10 flex items-center justify-center gap-3 shadow-2xl shadow-[var(--accent-color)]/20">
                      {t('hero.cta_contact')} <ArrowRight size={18} />
                    </button>
                  </Link>
                </Magnetic>
                <Magnetic strength={20}>
                  <Link href="/portfolio" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-4 rounded-xl border border-[var(--border-color)] text-[var(--text-main)] font-semibold glass hover:bg-[var(--bg-accent)] transition-all">
                      {t('hero.cta_portfolio')}
                    </button>
                  </Link>
                </Magnetic>
              </div>

              {/* Statistiques (Design Architecte) */}
              <div className="mt-12 lg:mt-16 flex justify-center lg:justify-start items-center gap-8 border-t border-[var(--border-color)] pt-8">
                 <div className="group">
                    <div className="text-3xl font-black text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">150+</div>
                    <div className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider">{t('hero.stats_projects')}</div>
                 </div>
                 <div className="w-px h-10 bg-[var(--border-color)]"></div>
                 <div className="group">
                    <div className="text-3xl font-black text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">100%</div>
                    <div className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider">{t('hero.stats_satisfaction')}</div>
                 </div>
                 <div className="w-px h-10 bg-[var(--border-color)]"></div>
                 <div className="group">
                    <div className="text-3xl font-black text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">5+</div>
                    <div className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider">{t('hero.stats_experience')}</div>
                 </div>
              </div>
           </motion.div>

           {/* Éléments visuels (Droite) */}
           <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5 relative hidden md:block h-[500px] lg:h-[600px]">
              <div className="relative w-full h-full perspective-1000">
                 {/* Carte Image Flottante */}
                 <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-64 md:w-80 h-80 md:h-96 rounded-[2rem] overflow-hidden border border-[var(--border-color)] shadow-2xl z-10 bg-[var(--bg-secondary)] group">
                    <Image 
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" 
                      alt="Digital Art" 
                      fill
                      priority
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2s]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent"></div>
                 </motion.div>
                 
                 {/* Badge Performance Glassmorphism */}
                 <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 lg:bottom-20 left-0 w-64 md:w-72 glass border border-[var(--border-color)] p-6 rounded-2xl shadow-2xl z-20 backdrop-blur-xl">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-glow)] flex items-center justify-center text-white shadow-lg shadow-[var(--accent-color)]/30"><Zap size={20} fill="currentColor"/></div>
                       <div>
                         <div className="text-sm font-bold text-[var(--text-main)]">{language === 'fr' ? 'Performance' : 'Performance'}</div>
                         <div className="text-xs text-[var(--text-muted)]">{language === 'fr' ? 'Optimisation maximale' : 'Maximum Optimization'}</div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 w-full bg-[var(--bg-accent)] rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-glow)]"></motion.div>
                       </div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-[var(--text-muted)]">
                         <span>{language === 'fr' ? 'Vitesse' : 'Speed'}</span>
                         <span className="text-[var(--accent-color)]">99/100</span>
                       </div>
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Séparateur de section avec lueur et effet glass */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-visible">
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30 shadow-[0_0_20px_var(--accent-color)]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2 glass rounded-full border border-[var(--border-color)] opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;

