
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Activity, Server, Code2, Globe2, Star, Quote, Rocket, MessageCircle, ArrowRight, Palette, Layers, Zap } from 'lucide-react';
import Counter from './ui/Counter';
// @ts-ignore
import { Link } from 'react-router-dom';
import TestimonialModal from './modals/TestimonialModal';
import { useLanguage } from '../context/LanguageContext';
import { mockDB } from '../utils/mockDatabase';
import Magnetic from './ui/Magnetic';

const HomeExtras: React.FC = () => {
  const { t, getData } = useLanguage();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const MotionDiv = motion.div as any;

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    setTestimonials(getData('testimonials'));
  }, [getData]);

  // Dupliquer les témoignages pour l'effet infini (boucle parfaite)
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1035], // Ajuster selon la largeur des cartes + gap
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden bg-[var(--bg-primary)]" ref={containerRef}>
      <TestimonialModal isOpen={isTestimonialModalOpen} onClose={() => setIsTestimonialModalOpen(false)} />

      {/* 1. SECTION STATS (Glass Bar) */}
      <div className="relative z-20 -mt-10 mb-24 container mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border border-[var(--border-subtle)] rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--border-subtle)]"
        >
            {[
              { icon: Activity, val: 99, suffix: "%", label: "Uptime" },
              { icon: Server, val: 150, suffix: "+", label: t('hero.stats_projects') },
              { icon: Code2, val: 12, suffix: "K", label: "Lignes de Code" },
              { icon: Globe2, val: 3, suffix: "", label: "Continents" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 group">
                 <stat.icon className="mx-auto mb-3 text-[var(--text-secondary)] group-hover:text-[var(--primary-color)] transition-colors" size={24} />
                 <div className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-1">
                    <Counter value={stat.val} suffix={stat.suffix} />
                 </div>
                 <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">{stat.label}</div>
              </div>
            ))}
        </motion.div>
      </div>

      {/* 2. TÉMOIGNAGES (Marquee Infini) */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-16 relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-4">
              {t('extras.testimonials_title')}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t('extras.testimonials_sub')}
            </p>
          </div>
          <button 
            onClick={() => setIsTestimonialModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-subtle)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all font-bold text-sm"
          >
            <Star size={16} /> {t('extras.share_experience')}
          </button>
        </div>

        {/* Le Marquee */}
        <div className="relative w-full overflow-hidden py-8">
           {/* Gradient Masks pour fondre les bords */}
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

           <motion.div 
              className="flex gap-8 w-max"
              variants={marqueeVariants}
              animate="animate"
              onHoverStart={() => {}} // Optionnel: Mettre en pause ici si besoin
              onHoverEnd={() => {}}
           >
              {/* On répète la liste plusieurs fois pour assurer la fluidité */}
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`}
                  className="w-[400px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-[var(--primary-color)] transition-all duration-300 flex-shrink-0 cursor-default group"
                >
                   <Quote size={32} className="text-[var(--primary-color)] opacity-20 mb-4 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                   <p className="text-lg text-[var(--text-main)] leading-relaxed italic mb-6 line-clamp-4">
                     "{testimonial.content}"
                   </p>
                   <div className="flex items-center gap-4 border-t border-[var(--border-subtle)] pt-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--bg-primary)]" />
                      <div>
                         <h4 className="font-bold text-[var(--text-main)]">{testimonial.name}</h4>
                         <p className="text-xs text-[var(--text-secondary)]">{testimonial.role}, {testimonial.company}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < testimonial.rating ? 'fill-[var(--accent-color)] text-[var(--accent-color)]' : 'text-gray-300'}`} />
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* 3. CTA FINAL (Design Moderne) */}
      <section className="py-32 relative overflow-hidden">
        {/* Background abstrait */}
        <div className="absolute inset-0 bg-[var(--text-main)] clip-path-slant"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <MotionDiv style={{ y: yParallax }}>
            <h2 className="text-5xl md:text-7xl font-black text-[var(--bg-primary)] mb-8 tracking-tight">
              {t('extras.ready_title')}
            </h2>
            <p className="text-xl text-[var(--bg-primary)]/80 max-w-2xl mx-auto mb-12 font-light">
              {t('extras.ready_sub')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Magnetic strength={50}>
                 <Link to="/devis">
                   <button className="px-10 py-5 bg-[var(--accent-color)] text-[#000000] rounded-full font-black text-xl hover:bg-white hover:text-[var(--accent-color)] transition-all shadow-[0_0_30px_rgba(255,171,0,0.4)] flex items-center gap-3 transform hover:scale-105 duration-300">
                     <Rocket size={24} /> {t('extras.start_project')}
                   </button>
                 </Link>
               </Magnetic>
               <Magnetic strength={30}>
                 <Link to="/contact">
                   <button className="px-10 py-5 bg-transparent border-2 border-[var(--bg-primary)]/30 text-[var(--bg-primary)] rounded-full font-bold text-xl hover:bg-[var(--bg-primary)] hover:text-[var(--text-main)] transition-colors flex items-center gap-3">
                     <MessageCircle size={24} /> {t('extras.contact_us')}
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
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
               >
                  <span className="text-[var(--primary-color)] font-bold uppercase tracking-widest text-sm mb-4 block flex items-center gap-2">
                     <Palette size={16}/> Esthétique Pure
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-6 leading-tight">
                     L'Art du <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)]">Détail</span>.
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                     Nous ne construisons pas seulement des sites web, nous sculptons des expériences visuelles. Chaque pixel est placé avec intention, chaque animation raconte une histoire.
                  </p>
                  <Link to="/portfolio" className="inline-flex items-center gap-2 text-[var(--text-main)] font-bold hover:text-[var(--primary-color)] transition-colors border-b-2 border-current pb-1">
                     Explorer notre galerie <ArrowRight size={18}/>
                  </Link>
               </motion.div>

               {/* Bento Grid Visuals */}
               <div className="grid grid-cols-2 gap-4 h-[500px]">
                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden relative group row-span-2"
                  >
                     <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Minimal Design" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-6 left-6 text-white">
                        <p className="font-bold text-lg">Minimalisme</p>
                        <p className="text-xs opacity-80">Less is more</p>
                     </div>
                  </motion.div>
                  
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                     className="bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden relative group"
                  >
                     <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Abstract 3D" />
                     <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                        <Layers size={16}/>
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6 }}
                     className="bg-[var(--primary-color)] rounded-3xl overflow-hidden relative group flex items-center justify-center p-6 text-center"
                  >
                     <div className="relative z-10">
                        <Zap size={32} className="mx-auto mb-2 text-[var(--accent-color)]" />
                        <p className="text-white font-bold text-xl">Performance</p>
                        <p className="text-white/70 text-xs">60fps Animations</p>
                     </div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomeExtras;
