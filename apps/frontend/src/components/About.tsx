'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Target, Heart, Globe, Lightbulb, Shield, Zap, Quote, ArrowDown, BrainCircuit, Sparkles, Fingerprint, Palette, TrendingUp, Headset, Star, ArrowRight, Layers, Compass, Rocket, Award, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import NeuralBackground from './ui/NeuralBackground';
import { api } from '../lib/api';
import Magnetic from './ui/Magnetic';

// --- SOUS-COMPOSANTS ---

/**
 * Hero spécifique pour la page À Propos
 * Reprend le style visuel de l'accueil pour une cohérence de marque
 * Titre "À PROPOS" et description de 3 lignes
 */
const AboutHero = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Effets de parallaxe et d'opacité fluides
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
      {/* Arrière-plan avec effets visuels - Style Architecte Premium */}
      <div className="absolute inset-0 z-0">
         <div className="bg-noise opacity-20"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--accent-glow)] opacity-[0.2] rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-color)] opacity-[0.1] rounded-full blur-[120px] pointer-events-none"></div>
         
         {/* Lignes de scan cinématiques pour l'effet "technologique" */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
           {/* Contenu textuel - Alignement strict sur le Hero de l'accueil */}
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
                    MANIFESTE DIGITAL
                  </span>
                </div>
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-[var(--text-main)] mb-10 leading-[0.75] tracking-tighter uppercase">
                À PROPOS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">MIND GRAPHIX</span>
              </h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl text-[var(--text-muted)] max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light space-y-2">
                <p>Nous ne créons pas seulement des sites web, nous forgeons des identités numériques puissantes.</p>
                <p>Une fusion parfaite entre l'architecture de pointe et l'innovation technologique</p>
                <p>pour les visionnaires qui façonnent le monde de demain.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <Magnetic strength={30}>
                  <button 
                    onClick={() => document.getElementById('digital-adn')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-architect text-xl py-5 px-12 flex items-center justify-center gap-4 group"
                  >
                    Découvrir notre ADN 
                    <ArrowDown size={22} className="group-hover:translate-y-2 transition-transform" />
                  </button>
                </Magnetic>
              </div>
           </motion.div>

           {/* Éléments visuels flottants (Cachés sur mobile pour la performance) */}
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
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                      alt="Innovation Digitale" 
                      fill
                      priority
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4s] ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60"></div>
                 </motion.div>
                 
                 {/* Widget interactif flottant */}
                 <motion.div 
                   animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
                   transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                   className="absolute bottom-20 left-[-15%] w-80 glass border border-[var(--border-color)] p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20 backdrop-blur-3xl"
                 >
                    <div className="flex items-center gap-6 mb-8">
                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-glow)] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(var(--accent-rgb),0.4)]">
                        <BrainCircuit size={32} />
                       </div>
                       <div>
                         <div className="text-lg font-black text-[var(--text-main)] uppercase tracking-tight">Innovation</div>
                         <div className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest opacity-60">ADN Digital</div>
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
                         <span>Excellence Technologique</span>
                         <span>A+</span>
                       </div>
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Section ADN Digital transformée en animation élégante et performante
 * Utilise des effets de flottement et des interactions basées sur le scroll
 */
const DigitalADN = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const adnValues = [
    { icon: Fingerprint, title: "Unicité", desc: "Chaque projet est une pièce unique, sculptée selon vos besoins spécifiques.", color: "from-blue-500 to-indigo-600", delay: 0.1 },
    { icon: Zap, title: "Performance", desc: "La rapidité n'est pas une option, c'est notre standard de base.", color: "from-amber-400 to-orange-600", delay: 0.2 },
    { icon: Layers, title: "Profondeur", desc: "Une architecture robuste pensée pour évoluer avec votre croissance.", color: "from-emerald-400 to-teal-600", delay: 0.3 },
    { icon: Compass, title: "Vision", desc: "Nous anticipons les tendances pour vous garder en tête de peloton.", color: "from-rose-500 to-purple-600", delay: 0.4 }
  ];

  return (
    <section id="digital-adn" ref={containerRef} className="py-24 md:py-48 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Éléments de fond subtils pour la profondeur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent-glow)] opacity-10 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--accent-color)] opacity-5 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-[var(--accent-color)]"></div>
                <span className="text-[var(--accent-color)] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                  Notre Essence
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] mb-10 leading-[0.85] tracking-tighter">
                NOTRE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">ADN DIGITAL</span>
              </h2>
              <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light leading-relaxed mb-16 max-w-xl">
                Au-delà du code, nous injectons une âme technologique dans chaque interface. Notre approche fusionne l'art visuel et l'ingénierie de pointe.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {adnValues.map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: val.delay, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                >
                  <Magnetic strength={20}>
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white mb-6 md:mb-10 shadow-2xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                      <val.icon className="w-8 h-8 md:w-10 md:h-10" />
                      {/* Effet de lueur au survol */}
                      <div className="absolute inset-0 rounded-2xl bg-inherit blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                  </Magnetic>
                  <h4 className="font-black text-[var(--text-main)] text-xl md:text-3xl mb-3 md:mb-6 group-hover:text-[var(--accent-color)] transition-colors tracking-tight uppercase">{val.title}</h4>
                  <p className="text-sm md:text-xl text-[var(--text-muted)] leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">{val.desc}</p>
                  
                  {/* Soulignement décoratif dynamique */}
                  <div className="mt-6 md:mt-10 h-[1px] md:h-[2px] w-8 bg-[var(--border-color)] group-hover:w-full group-hover:bg-[var(--accent-color)] transition-all duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-20 lg:mt-0">
            <div className="relative w-full aspect-square max-w-xl mx-auto flex items-center justify-center">
              {/* Orbite ADN Complexe */}
              <div className="absolute inset-0 z-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      rotate: i % 2 === 0 ? 360 : -360,
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                      rotate: { duration: 20 + i * 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 border-[1px] border-[var(--accent-color)]/30 rounded-full"
                    style={{ padding: `${i * 12}%` }}
                  />
                ))}
              </div>

              {/* Noyau central flottant */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 glass border border-[var(--border-color)] rounded-[4rem] flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/20 via-transparent to-[var(--accent-glow)]/10"></div>
                  <div className="bg-noise opacity-10 absolute inset-0"></div>
                  
                  {/* Scanner line animation */}
                  <motion.div 
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent z-10"
                  />

                  <BrainCircuit size={100} className="text-[var(--accent-color)] md:w-40 md:h-40 filter drop-shadow-[0_0_20px_var(--accent-color)]" />
                </div>

                {/* Satellite elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40px] z-30 pointer-events-none"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-6 h-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-color)] flex items-center justify-center shadow-[0_0_15px_var(--accent-color)]"
                      style={{ 
                        top: '50%', 
                        left: '-12px',
                        transform: `rotate(${i * 120}deg)`
                      }}
                    >
                      <Sparkles size={12} className="text-[var(--accent-color)]" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Section Pourquoi Nous transformée en grille interactive haut de gamme
 * Utilise des cartes avec effets de profondeur et statistiques animées
 */
const WhyChooseUs = ({ t }: { t: any }) => {
  const reasons = [
    { 
      icon: Rocket, 
      title: "Vitesse de Déploiement", 
      desc: "Nous optimisons chaque étape de notre workflow pour passer de l'idée au déploiement live en un temps record, sans compromis.", 
      value: "2x", 
      label: "Plus Rapide", 
      color: "text-blue-500",
      bg: "from-blue-500/10 to-transparent"
    },
    { 
      icon: Award, 
      title: "Qualité Premium", 
      desc: "L'excellence est inscrite dans notre code. Aucun compromis n'est fait sur le design, l'accessibilité ou la robustesse.", 
      value: "99%", 
      label: "Satisfaction", 
      color: "text-[var(--accent-color)]",
      bg: "from-[var(--accent-color)]/10 to-transparent"
    },
    { 
      icon: Headset, 
      title: "Support Dédié", 
      desc: "Une équipe d'experts à votre écoute 24/7 pour assurer la pérennité et l'évolution constante de vos outils digitaux.", 
      value: "24h", 
      label: "Réactivité", 
      color: "text-emerald-500",
      bg: "from-emerald-500/10 to-transparent"
    }
  ];

  return (
    <section className="py-24 md:py-48 bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[grid-white_1px] [mask-image:radial-gradient(white,transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] mb-10 tracking-tighter uppercase leading-[0.85]">
              Pourquoi <span className="text-[var(--accent-color)]">Mind Graphix ?</span>
            </h2>
            <div className="w-24 h-1 bg-[var(--accent-color)] mx-auto mb-10"></div>
            <p className="text-xl md:text-3xl text-[var(--text-muted)] font-light leading-relaxed">
              L'excellence n'est pas un but, c'est notre point de départ. Nous repoussons chaque jour les limites du possible pour nos clients.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="relative h-full glass p-10 md:p-14 rounded-[4rem] border border-[var(--border-color)] group-hover:border-[var(--accent-color)]/30 transition-all duration-700 flex flex-col overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
                
                {/* Hover Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                {/* Icon Section */}
                <div className="mb-12 relative">
                  <div className="w-20 h-20 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500 shadow-2xl relative z-10">
                    <reason.icon size={40} />
                  </div>
                  {/* Floating abstract element */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-12 h-12 border border-[var(--accent-color)]/20 rounded-full border-dashed"
                  />
                </div>
                
                {/* Content Section */}
                <div className="flex-grow">
                  <h3 className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-8 leading-tight tracking-tight uppercase">{reason.title}</h3>
                  <p className="text-[var(--text-muted)] text-lg md:text-xl font-light leading-relaxed mb-12 opacity-80 group-hover:opacity-100 transition-opacity">{reason.desc}</p>
                </div>
                
                {/* Stats Footer */}
                <div className="pt-10 border-t border-[var(--border-color)]/50 flex items-end justify-between">
                  <div>
                    <motion.div 
                      whileInView={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, delay: idx * 0.3 }}
                      className={`text-5xl md:text-7xl font-black ${reason.color} tracking-tighter`}
                    >
                      {reason.value}
                    </motion.div>
                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mt-2">{reason.label}</div>
                  </div>
                  
                  <Magnetic strength={20}>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:border-[var(--accent-color)] transition-all duration-500 shadow-xl"
                    >
                      <ArrowRight size={24} className="md:w-8 md:h-8" />
                    </motion.div>
                  </Magnetic>
                </div>

                {/* Decorative background number */}
                <div className="absolute top-10 right-10 text-9xl font-black text-white/[0.02] pointer-events-none select-none">
                  0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Section Impact Mondial - Remplace "Ils nous font confiance"
 * Donne vie à l'entreprise à l'échelle globale avec une visualisation immersive
 */
const GlobalImpact = ({ t }: { t: any }) => {
  const impacts = [
    { label: "Projets Livrés", value: "150+", color: "from-blue-400 to-indigo-500" },
    { label: "Pays Atteints", value: "12", color: "from-purple-400 to-rose-500" },
    { label: "Utilisateurs", value: "2.5M", color: "from-emerald-400 to-teal-500" },
    { label: "Satisfaction", value: "99%", color: "from-amber-400 to-orange-500" }
  ];

  return (
    <section className="py-24 md:py-48 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Texture de fond immersive et adaptée aux thèmes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,var(--accent-glow),transparent_50%)] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,var(--accent-color),transparent_50%)] opacity-[0.05]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]"></span>
              </span>
              <span className="text-[var(--text-main)] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-80">
                Notre Rayonnement
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[9rem] font-black mb-10 leading-[0.8] tracking-tighter uppercase text-[var(--text-main)]">
              CONCRÉTISER <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-main)]">L'IMPACT</span> <br/>
              MONDIAL.
            </h2>
            <p className="text-lg md:text-3xl text-[var(--text-muted)] font-light leading-relaxed mb-16 max-w-2xl">
              De l'Afrique de l'Ouest à l'Europe, MGS déploie des solutions qui transcendent les frontières. Notre vision est universelle, notre ingénierie est sans limites.
            </p>
            
            <div className="grid grid-cols-2 gap-10 md:gap-20">
              {impacts.map((impact, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`text-5xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r ${impact.color} mb-3 group-hover:scale-105 transition-transform origin-left duration-500`}>
                    {impact.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors opacity-60">
                    {impact.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative mt-20 lg:mt-0">
            {/* Visualisation "World Data" Immersive */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square glass border border-[var(--border-color)] rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] overflow-hidden shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/20 via-transparent to-[var(--bg-primary)]/40 z-10"></div>
              <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                alt="Global Connection" 
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[10s] ease-out"
              />
              
              {/* Overlay de scanline/grille cinématique */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(var(--accent-rgb),0.03),transparent,rgba(var(--accent-rgb),0.03))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-40"></div>

              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="text-center p-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: 360
                    }}
                    transition={{ 
                      scale: { duration: 4, repeat: Infinity },
                      rotate: { duration: 60, repeat: Infinity, ease: "linear" }
                    }}
                    className="relative mb-12"
                  >
                    <Globe size={120} className="text-[var(--accent-color)] md:w-48 md:h-48 lg:w-64 lg:h-64 filter drop-shadow-[0_0_30px_var(--accent-color)]" />
                    <div className="absolute inset-0 border-2 border-dashed border-[var(--accent-color)]/20 rounded-full scale-[1.4] md:scale-[1.6]"></div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.4em] text-[var(--text-main)] mb-4">Digital Hub</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-[var(--accent-color)] opacity-80">Connecté au Futur</div>
                  </motion.div>
                </div>
              </div>
              
              {/* Points de données flottants animés */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 5 + i, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  className="absolute w-2 h-2 md:w-4 md:h-4 rounded-full bg-[var(--accent-color)] shadow-[0_0_20px_var(--accent-color)] z-30"
                  style={{ 
                    top: `${10 + i * 8}%`, 
                    left: `${5 + i * 10}%` 
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPOSANT PRINCIPAL ---

const About: React.FC = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <main className="bg-[var(--bg-primary)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 1. HERO SECTION */}
          <AboutHero t={t} />

          {/* 2. ADN DIGITAL SECTION */}
          <DigitalADN t={t} />

          {/* 3. POURQUOI NOUS SECTION */}
          <WhyChooseUs t={t} />

          {/* 4. IMPACT MONDIAL SECTION */}
          <GlobalImpact t={t} />

          {/* 5. SECTION HISTOIRE (CINÉMATOGRAPHIQUE - OPTIMISÉE) */}
          <section className="py-24 md:py-48 bg-[var(--bg-primary)] relative overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="mb-20 md:mb-40 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="h-[1px] w-12 bg-[var(--accent-color)]"></div>
                  <span className="text-[var(--accent-color)] font-black uppercase tracking-[0.4em] text-xs">Notre Evolution</span>
                </div>
                <h2 className="text-5xl md:text-[8rem] font-black text-[var(--text-main)] mb-8 tracking-tighter uppercase leading-[0.8]">
                  NOTRE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-[var(--accent-color)]">PARCOURS</span>
                </h2>
              </div>
              
              <div className="space-y-32 md:space-y-64">
                {[
                  { year: "2022", title: "La Fondation", desc: "Naissance d'une vision : fusionner l'architecture physique et digitale. Mind Graphix Solution voit le jour avec l'ambition de redéfinir les standards du design.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" },
                  { year: "2024", title: "L'Expansion", desc: "Ouverture sur les marchés internationaux et diversification technologique. Nous exportons notre savoir-faire au-delà des frontières.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200" },
                  { year: "2026", title: "L'Ère IA", desc: "Intégration de l'intelligence artificielle au cœur de nos processus créatifs pour offrir des expériences encore plus immersives et intelligentes.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200" }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-32`}
                  >
                    <div className="w-full lg:w-3/5 relative group">
                      <div className="absolute -top-10 -left-10 text-[8rem] md:text-[15rem] font-black text-[var(--accent-color)]/5 select-none z-0 pointer-events-none group-hover:text-[var(--accent-color)]/10 transition-colors duration-700"></div>
                      <div className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-[var(--border-color)] aspect-[16/9] shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700">
                        <div className="absolute top-8 left-8 z-20 bg-[var(--accent-color)] text-white px-6 py-2 rounded-full text-xl font-black shadow-xl">{step.year}</div>
                        <Image src={step.img} alt={step.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Overlay interactif */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[var(--accent-color)]/10 backdrop-blur-sm">
                           <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[var(--accent-color)]">
                             <Sparkles size={32} />
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-2/5 text-center lg:text-left">
                      <div className="inline-block px-6 py-2 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-8">{step.year}</div>
                      <h3 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-8 uppercase tracking-tighter">{step.title}</h3>
                      <p className="text-lg md:text-2xl text-[var(--text-muted)] font-light leading-relaxed mb-10 opacity-80">{step.desc}</p>
                      
                      <button className="flex items-center gap-4 text-[var(--accent-color)] font-black uppercase tracking-widest text-xs group/btn mx-auto lg:mx-0">
                        <span>Explorer ce chapitre</span>
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default About;
