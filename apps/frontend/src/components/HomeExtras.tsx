'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Activity, Server, Code2, Globe2, Star, Quote, Rocket, MessageCircle, ArrowRight, Palette, Layers, Zap } from 'lucide-react';
import Counter from './ui/Counter';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import TestimonialModal from './modals/TestimonialModal';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Magnetic from './ui/Magnetic';

const STAT_ICONS: any = { Activity, Server, Code2, Globe2 };

const HomeExtras: React.FC = () => {
  const { t } = useLanguage();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const MotionDiv = motion.div as any;

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Chargement des données (témoignages et statistiques)
  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const [testimonialsData, statsData] = await Promise.all([
        api.getTestimonials(),
        api.getStats()
      ]);
      setTestimonials(testimonialsData);
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des extras :', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Dupliquer les témoignages pour l'effet infini (boucle parfaite)
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1035], // Ajuster selon la largeur des cartes + gap
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25, // Équilibré pour la lisibilité et la performance
          ease: "linear",
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="py-32 bg-[var(--bg-primary)] flex justify-center items-center">
        {/* Spinner architectural */}
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[var(--bg-primary)]" ref={containerRef}>
      <TestimonialModal isOpen={isTestimonialModalOpen} onClose={() => setIsTestimonialModalOpen(false)} />

      {/* 1. SECTION STATS (Barre de verre architecturale) */}
      <div className="relative z-20 -mt-10 mb-24 container mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass border border-[var(--border-color)] rounded-[2.5rem] shadow-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
            {stats.map((stat, i) => {
              const Icon = STAT_ICONS[stat.iconName] || Activity;
              return (
                <div key={i} className="text-center px-4 group relative">
                   {/* Séparateur subtil pour desktop */}
                   {i < stats.length - 1 && (
                     <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[var(--border-color)] to-transparent opacity-50" />
                   )}
                   
                   <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:border-[var(--accent-color)] transition-all duration-500 shadow-inner">
                      <Icon size={28} />
                   </div>
                   <div className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-2 tracking-tighter">
                      <Counter value={parseInt(stat.value)} suffix={stat.suffix || ""} />
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                     {t(`stats.${stat.label.toLowerCase().replace(/\s+/g, '_')}`) || stat.label}
                   </div>
                </div>
              );
            })}
        </motion.div>
      </div>

      {/* 2. TÉMOIGNAGES (Marquee Infini avec design épuré) */}
      <section className="py-24 relative overflow-hidden">
        {/* Lueur ambiante en arrière-plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-color)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 mb-16 relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs font-bold uppercase tracking-widest mb-4">
              {t('extras.feedback_tag') || 'Retours Clients'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-6 tracking-tighter">
              {t('extras.testimonials_title')}
            </h2>
            <p className="text-xl text-[var(--text-muted)] font-light leading-relaxed">
              {t('extras.testimonials_sub')}
            </p>
          </div>
          <button 
            onClick={() => setIsTestimonialModalOpen(true)}
            className="btn-architect flex items-center gap-3"
          >
            <Star size={18} /> {t('extras.share_experience')}
          </button>
        </div>

        {/* Le Marquee avec masques de fondu */}
        <div className="relative w-full overflow-hidden py-12">
           <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

           <motion.div 
              className="flex gap-10 w-max"
              variants={marqueeVariants}
              animate="animate"
           >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`}
                  className="w-[450px] glass border border-[var(--border-color)] p-10 rounded-[2.5rem] shadow-xl hover:border-[var(--accent-color)]/30 transition-all duration-500 group"
                >
                   <div className="flex justify-between items-start mb-8">
                     <Quote size={40} className="text-[var(--accent-color)] opacity-10 group-hover:opacity-30 transition-opacity" />
                     <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={14} className={`${i < testimonial.rating ? 'fill-[var(--accent-color)] text-[var(--accent-color)]' : 'text-[var(--border-color)]'}`} />
                        ))}
                     </div>
                   </div>
                   
                   <p className="text-xl text-[var(--text-main)] leading-relaxed italic mb-10 font-serif">
                     "{testimonial.content}"
                   </p>
                   
                   <div className="flex items-center gap-5 border-t border-[var(--border-color)] pt-8">
                       <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden border-2 border-[var(--bg-primary)] shadow-lg">
                          <Image 
                            src={testimonial.avatar || "/images/placeholders/avatar.png"} 
                            alt={testimonial.name} 
                            fill
                            className="object-cover" 
                          />
                       </div>
                      <div>
                         <h4 className="font-bold text-[var(--text-main)] text-lg">{testimonial.name}</h4>
                         <p className="text-sm text-[var(--text-muted)] font-medium">{testimonial.role} @ {testimonial.company}</p>
                      </div>
                   </div>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Séparateur de section avec lueur et effet glass */}
        <div className="absolute bottom-0 left-0 w-full h-px overflow-visible">
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30 shadow-[0_0_20px_var(--accent-color)]"></div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2 glass rounded-full border border-[var(--border-color)] opacity-50"></div>
        </div>
      </section>

      {/* 3. CTA FINAL (Impact Maximal & Élégance) */}
      <section className="py-40 relative overflow-hidden transition-colors duration-500">
        {/* Fond contrasté avec bruit et texture */}
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay dark:opacity-20"></div>
           {/* Formes géométriques abstraites en arrière-plan */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-color)] opacity-[0.05] dark:opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/3 rounded-full" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--text-main)] opacity-[0.02] dark:opacity-5 blur-[120px] translate-y-1/2 -translate-x-1/3 rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <MotionDiv style={{ y: yParallax }}>
            <h2 className="text-6xl md:text-8xl font-black text-[var(--text-main)] mb-10 tracking-tighter leading-none">
              {t('extras.ready_title')}
            </h2>
            <p className="text-2xl text-[var(--text-muted)] max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              {t('extras.ready_sub')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
               <Magnetic strength={30}>
                 <Link href="/devis">
                   <button className="group relative px-12 py-6 bg-[var(--accent-color)] text-black rounded-2xl font-black text-2xl hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_rgba(var(--accent-color-rgb),0.3)] flex items-center gap-4 overflow-hidden">
                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                     <Rocket size={28} className="group-hover:rotate-12 transition-transform" /> 
                     {t('extras.start_project')}
                   </button>
                 </Link>
               </Magnetic>
               
               <Magnetic strength={20}>
                 <Link href="/contact">
                   <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white rounded-2xl font-bold text-2xl hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-4">
                     <MessageCircle size={28} /> 
                     {t('extras.contact_us')}
                   </button>
                 </Link>
               </Magnetic>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* 4. DESIGN SHOWCASE (New Section) */}
      <section className="py-32 bg-[var(--bg-primary)] relative">
         <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
                  <span className="text-[var(--accent-color)] font-bold uppercase tracking-widest text-sm mb-4 block flex items-center gap-2">
                     <Palette size={16}/> {t('extras.showcase_tag')}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-6 leading-tight">
                     {t('extras.showcase_title')} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)]">{t('extras.showcase_title_span')}</span>.
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                     {t('extras.showcase_desc')}
                  </p>
                  <Link href="/portfolio" className="inline-flex items-center gap-2 text-[var(--text-main)] font-bold hover:text-[var(--accent-color)] transition-colors border-b-2 border-current pb-1">
                     {t('extras.showcase_explore')} <ArrowRight size={18}/>
                  </Link>
               </motion.div>

               {/* Bento Grid Visuals */}
               <div className="grid grid-cols-2 gap-4 h-[500px]">
                  <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ delay: 0.2, duration: 0.5 }}
                     className="bg-[var(--bg-surface)] rounded-3xl overflow-hidden relative group row-span-2 border border-[var(--border-color)]"
                  >
                     <Image 
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" 
                        alt="Minimal Design" 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-6 left-6 text-white">
                        <p className="font-bold text-lg">{t('extras.showcase_minimalism')}</p>
                        <p className="text-xs opacity-80">{t('extras.showcase_minimalism_sub')}</p>
                     </div>
                  </motion.div>
                  
                  <motion.div 
                     initial={{ opacity: 0, x: 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ delay: 0.4, duration: 0.5 }}
                     className="bg-[var(--bg-surface)] rounded-3xl overflow-hidden relative group border border-[var(--border-color)]"
                  >
                     <Image 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" 
                        alt="Abstract 3D" 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                     <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                        <Layers size={16}/>
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ delay: 0.6, duration: 0.5 }}
                     className="bg-[var(--primary-color)] rounded-3xl overflow-hidden relative group flex items-center justify-center p-6 text-center shadow-lg"
                  >
                     <div className="relative z-10">
                        <Zap size={32} className="mx-auto mb-2 text-[var(--accent-color)]" />
                        <p className="text-white font-bold text-xl">{t('extras.showcase_performance')}</p>
                        <p className="text-white/70 text-xs">{t('extras.showcase_performance_sub')}</p>
                     </div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  </motion.div>
               </div>
            </div>
         </div>

         {/* Séparateur de section avec lueur et effet glass */}
         <div className="absolute bottom-0 left-0 w-full h-px overflow-visible">
           <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30 shadow-[0_0_20px_var(--accent-color)]"></div>
           <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2 glass rounded-full border border-[var(--border-color)] opacity-50"></div>
         </div>
      </section>
    </div>
  );
};

export default HomeExtras;

