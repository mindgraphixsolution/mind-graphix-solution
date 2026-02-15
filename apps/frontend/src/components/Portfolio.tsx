'use client';

import React, { useState, useEffect, useRef } from 'react';
import Section from './ui/Section';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Search, Layout, Layers, ArrowUpRight, ExternalLink, Filter, 
  PenTool, Code, Rocket, Zap, Cpu, Globe, Database, Smartphone, BoxSelect,
  ArrowDown, Sparkles, BrainCircuit
} from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Lightbox from './ui/Lightbox';
import AISearch from './ui/AISearch';
import NeuralBackground from './ui/NeuralBackground';
import Breadcrumbs from './ui/Breadcrumbs';
import Magnetic from './ui/Magnetic';

const categories = [
  { id: 'all', labelKey: 'filter_all' },
  { id: 'web', labelKey: 'filter_web' },
  { id: 'design', labelKey: 'filter_design' },
  { id: 'ecommerce', labelKey: 'filter_ecommerce' },
  { id: 'motion', labelKey: 'filter_motion' }
];

const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  
  const PROCESS_STEPS = [
    { 
      id: 1, 
      title: t('portfolio.step1_title'), 
      desc: t('portfolio.step1_desc'), 
      icon: Search,
      color: "bg-blue-500"
    },
    { 
      id: 2, 
      title: t('portfolio.step2_title'), 
      desc: t('portfolio.step2_desc'), 
      icon: PenTool,
      color: "bg-purple-500"
    },
    { 
      id: 3, 
      title: t('portfolio.step3_title'), 
      desc: t('portfolio.step3_desc'), 
      icon: Code,
      color: "bg-pink-500"
    },
    { 
      id: 4, 
      title: t('portfolio.step4_title'), 
      desc: t('portfolio.step4_desc'), 
      icon: Rocket,
      color: "bg-green-500"
    }
  ];

  const [filter, setFilter] = useState('all');

  const TOOLS = [
    { name: "React", icon: Cpu },
    { name: "Figma", icon: PenTool },
    { name: "Node.js", icon: Database },
    { name: "Next.js", icon: Globe },
    { name: "TypeScript", icon: Code },
    { name: "Three.js", icon: Layers },
    { name: "Mobile", icon: Smartphone },
    { name: "AWS", icon: Zap },
    { name: "Tailwind", icon: Layout },
    { name: "Blender", icon: BoxSelect },
  ];

  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 1000], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.4]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.99]);

  const loadPortfolio = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getPortfolio();
      setPortfolioItems(data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Split items for the Featured Showcase vs the Grid
  const featuredItems = filter === 'all' ? portfolioItems.slice(0, 3) : [];
  const gridItems = filter === 'all' ? portfolioItems.slice(3) : filteredItems;

  const MotionDiv = motion.div as any;

  if (isLoading) {
    return (
      <div className="bg-[var(--bg-primary)] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-main)] transition-colors duration-300">
      <Lightbox image={selectedImage?.url || null} title={selectedImage?.title} onClose={() => setSelectedImage(null)} />
      
      {/* 1. SECTION HERO CINÉMATIQUE */}
      <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
         {/* Arrière-plan avec effets visuels - Style Architecte Premium */}
         <div className="absolute inset-0 z-0">
            <div className="bg-noise opacity-20"></div>
            <NeuralBackground />
            <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--accent-glow)] opacity-[0.2] rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-color)] opacity-[0.1] rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
               {/* Contenu textuel */}
               <motion.div style={{ opacity: opacityHero, y: yParallax, scale: scaleHero }} className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-10 flex justify-center lg:justify-start"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-[var(--border-color)] shadow-2xl">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-color)]"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        {t('portfolio.badge')}
                      </span>
                    </div>
                  </motion.div>
                  
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-[var(--text-main)] mb-10 leading-[0.75] tracking-tighter uppercase">
                     {t('portfolio.title')} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">{t('portfolio.span')}</span>
                  </h1>
                  
                  <div className="text-xl md:text-2xl lg:text-3xl text-[var(--text-muted)] max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light">
                    <p>{t('portfolio.subtitle')}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                    <Magnetic strength={30}>
                      <button onClick={() => document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' })} className="btn-architect text-xl py-5 px-12 flex items-center justify-center gap-4 group">
                        {t('portfolio.cta_explore')} 
                        <ArrowDown size={22} className="group-hover:translate-y-2 transition-transform" />
                      </button>
                    </Magnetic>
                  </div>
               </motion.div>

               {/* Éléments visuels flottants */}
               <motion.div 
                 initial={{ opacity: 0, x: 100 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
                 className="lg:col-span-5 relative hidden lg:block h-[600px] xl:h-[700px]"
               >
                  <div className="relative w-full h-full perspective-2000">
                     <motion.div 
                       animate={{ y: [0, -30, 0], rotateY: [-5, 5, -5] }} 
                       transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
                       className="absolute top-0 right-0 w-80 xl:w-96 h-[500px] xl:h-[600px] rounded-[4rem] overflow-hidden border border-[var(--border-color)] shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-10 bg-[var(--bg-secondary)] group"
                     >
                        <Image 
                          src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200" 
                          alt="Portfolio Showcase" 
                          fill
                          priority
                          className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4s] ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60"></div>
                     </motion.div>
                     
                     <motion.div 
                       animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
                       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                       className="absolute bottom-20 left-[-15%] w-80 glass border border-[var(--border-color)] p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20 backdrop-blur-3xl"
                     >
                        <div className="flex items-center gap-6 mb-8">
                           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-glow)] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(var(--accent-rgb),0.4)]">
                            <Sparkles size={32} />
                           </div>
                           <div>
                             <div className="text-lg font-black text-[var(--text-main)] uppercase tracking-tight">{t('portfolio.quality_label')}</div>
                             <div className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest opacity-60">{t('portfolio.quality_sub')}</div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} 
                               whileInView={{ width: '100%' }} 
                               transition={{ duration: 3, delay: 0.8 }} 
                               className="h-full bg-gradient-to-r from-[var(--accent-color)] to-white"
                             ></motion.div>
                           </div>
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent-color)]">
                             <span>{t('portfolio.quality_bar')}</span>
                             <span>100%</span>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* SEARCH & FILTERS BAR (INTEGRATED) */}
      <div id="portfolio-grid" className="container mx-auto px-6 -mt-10 mb-20 relative z-20">
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-8 glass border-[var(--border-color)] rounded-[2.5rem] shadow-2xl">
            <div className="w-full md:w-auto">
               <AISearch />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
               {categories.map((cat) => (
                  <button
                     key={cat.id}
                     onClick={() => setFilter(cat.id)}
                     className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                        filter === cat.id 
                        ? 'bg-[var(--accent-color)] text-white shadow-[0_10px_25px_rgba(var(--accent-rgb),0.4)]' 
                        : 'glass text-[var(--text-muted)] hover:text-[var(--text-main)] border-[var(--border-color)]'
                     }`}
                  >
                     {cat.labelKey ? t(`portfolio.${cat.labelKey}`) : cat.id}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* 2. VITRINE DES PROJETS À LA UNE */}
      {filter === 'all' && featuredItems.length >= 3 && (
         <section className="py-20 bg-[var(--bg-secondary)] relative z-20 -mt-10 rounded-t-[3rem] border-t border-[var(--border-color)] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-6">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-1 bg-[var(--accent-color)] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[var(--text-main)] uppercase tracking-widest">{t('portfolio.featured_title')}</h2>
               </div>

               <div className="grid lg:grid-cols-12 gap-8 lg:h-[700px]">
                  
                  {/* GAUCHE : GRAND ÉCRAN */}
                  <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                     className="lg:col-span-8 h-[400px] lg:h-full relative group cursor-pointer rounded-[2rem] overflow-hidden border border-[var(--border-color)] shadow-2xl bg-[var(--bg-primary)] hover:border-[var(--accent-color)] transition-all duration-500"
                     onClick={() => setSelectedImage({ url: featuredItems[0].image, title: featuredItems[0].title })}
                  >
                     <Image 
                        src={featuredItems[0].image} 
                        alt={featuredItems[0].title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="mb-4">
                           <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--accent-color)] text-[var(--text-inv)] font-bold text-xs uppercase shadow-lg mb-2 backdrop-blur-sm">
                              {featuredItems[0].category}
                           </span>
                           <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-lg">{featuredItems[0].title}</h3>
                           <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                              <p className="text-gray-200 text-lg leading-relaxed max-w-xl py-4 border-t border-white/10 mt-4">
                                 {featuredItems[0].description}
                              </p>
                              <div className="inline-flex items-center gap-3 text-white font-bold group-hover:text-[var(--accent-color)] transition-colors">
                                 {t('portfolio.view_project')} <ArrowUpRight size={24} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* DROITE : 2 ÉCRANS EMPILES */}
                  <div className="lg:col-span-4 flex flex-col gap-8 h-full">
                     {[featuredItems[1], featuredItems[2]].map((item, idx) => (
                        <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-50px" }}
                           transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                           className="h-[300px] lg:h-auto flex-1 relative group cursor-pointer rounded-[2rem] overflow-hidden border border-[var(--border-color)] shadow-xl bg-[var(--bg-primary)] hover:border-[var(--accent-color)] transition-all duration-500"
                           onClick={() => setSelectedImage({ url: item.image, title: item.title })}
                        >
                           <Image 
                              src={item.image} 
                              alt={item.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity"></div>
                           <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="text-xs font-bold text-[var(--accent-color)] uppercase mb-1 block">{item.category}</span>
                              <h4 className="text-2xl font-bold text-white leading-tight mb-2">{item.title}</h4>
                              <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                                 <p className="text-gray-300 text-sm py-3 border-t border-white/10 mt-2">{item.description}</p>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      )}

      {/* 3. SECTION GRILLE (Projets Restants) */}
      <section id="portfolio-content" className="bg-[var(--bg-secondary)] pt-12 pb-24 relative z-10 px-6">
        <div className="container mx-auto">
           {filter === 'all' && (
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-1 bg-[var(--border-color)] rounded-full"></div>
                 <h2 className="text-2xl font-bold text-[var(--text-main)] uppercase tracking-widest">{t('portfolio.all_projects_title')}</h2>
              </div>
           )}

           <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[350px]">
              <AnimatePresence mode="popLayout">
                {gridItems.map((item, idx) => {
                  const isLarge = (idx % 7 === 0);
                  const isWide = (idx % 7 === 4);
                  let spanClass = "col-span-1 row-span-1";
                  if (isLarge) spanClass = "md:col-span-2 md:row-span-2";
                  else if (isWide) spanClass = "md:col-span-2 row-span-1";
                  
                  return (
                    <MotionDiv
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`${spanClass} relative group cursor-pointer rounded-[2rem] overflow-hidden border border-[var(--border-color)] shadow-xl bg-[var(--bg-primary)] hover:border-[var(--accent-color)] transition-all duration-500`}
                      onClick={() => setSelectedImage({ url: item.image, title: item.title })}
                    >
                      className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-[var(--border-color)] hover:border-[var(--accent-color)] ${spanClass}`}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedImage({ url: item.image, title: item.title })}
                    >
                      <div className="absolute inset-0 bg-[var(--bg-accent)]">
                        <Image 
                           src={item.image} 
                           alt={item.title} 
                           fill
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           className={`object-cover transition-transform duration-700 ease-out ${hoveredId === item.id ? 'scale-110 opacity-60' : 'scale-100 opacity-90'}`} 
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                         <div className={`transform transition-all duration-500 ${hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-100 md:opacity-90'}`}>
                            <div className="flex justify-between items-end">
                               <div className="flex-1 pr-4">
                                  <span className="inline-block px-3 py-1 mb-3 glass border border-white/20 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">{item.category}</span>
                                  <h3 className={`font-bold text-white mb-1 leading-none text-xl md:text-2xl`}>{item.title}</h3>
                                  <p className={`text-gray-300 text-sm line-clamp-2 mt-2 transition-opacity duration-300 ${hoveredId === item.id ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>{item.description}</p>
                               </div>
                               <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-lg shrink-0">
                                   <ArrowRight size={20} />
                               </div>
                            </div>
                         </div>
                      </div>
                    </MotionDiv>
                  );
                })}
              </AnimatePresence>
           </MotionDiv>
        </div>
      </section>

      {/* 4. PROCESSUS & OUTILS */}
      <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-glow)] rounded-full blur-[120px] pointer-events-none opacity-20"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            {/* Étapes du Processus */}
            <div className="mb-24">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-16"
               >
                  <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] mb-4">
                    {t('portfolio.approach_title').split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)]">{t('portfolio.approach_title').split(' ').slice(-1)}</span>
                  </h2>
                  <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{t('portfolio.approach_sub')}</p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROCESS_STEPS.map((step, idx) => (
                     <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        className="glass border-[var(--border-color)] p-8 rounded-2xl relative group hover:border-[var(--accent-color)] transition-all hover:bg-[var(--bg-accent)]"
                     >
                        <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                           <step.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                           <span className="text-[var(--text-muted)] opacity-30 text-sm">0{step.id}.</span> {step.title}
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Défilement des Technologies */}
            <div className="py-12 border-t border-[var(--border-color)] relative">
               <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-12">{t('portfolio.tech_tools_title')}</p>
               
               <div className="flex overflow-hidden relative w-full mask-linear-fade">
                  {/* Masque de Dégradé Gauche */}
                  <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Conteneur de Défilement */}
                  <motion.div 
                    className="flex gap-16 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      ease: "linear", 
                      duration: 40
                    }}
                  >
                     {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors duration-300 group cursor-default">
                           <div className="p-4 rounded-xl glass border-[var(--border-color)] group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-glow)] transition-all">
                              <tool.icon size={32} className="group-hover:scale-110 transition-transform" />
                           </div>
                           <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{tool.name}</span>
                        </div>
                     ))}
                  </motion.div>

                  {/* Masque de Dégradé Droit */}
                  <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden border-t border-[var(--border-color)]">
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-main)] mb-8">{t('portfolio.cta_banner_title')}</h2>
            <Link href="/devis" className="inline-flex items-center gap-3 px-10 py-5 btn-architect text-lg rounded-full transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)]">
               {t('portfolio.cta_banner_btn')} <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Portfolio;

