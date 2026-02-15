
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Target, Heart, Globe, Lightbulb, Shield, Zap, Quote, ArrowDown, BrainCircuit, Sparkles, Fingerprint, Palette, TrendingUp, Headset, Star } from 'lucide-react';
import { PARTNERS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import NeuralBackground from './ui/NeuralBackground';

// --- SUB-COMPONENTS ---

const ScrollProgressLine = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div 
      className="fixed right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary-color)] to-[var(--accent-color)] origin-top z-[100] hidden lg:block"
      style={{ scaleY }}
    />
  );
};

// 1. SECTION HISTOIRE : DESIGN CINÉMATOGRAPHIQUE
const CinematicStory = ({ t }: { t: any }) => {
  const storySteps = [
    {
      year: "2022",
      subtitle: "Le Commencement",
      title: "La Genèse",
      text: "Tout a commencé par une conviction simple : le digital en Afrique manquait d'âme. Dans un petit bureau, nous avons posé la première pierre de Mind Graphix avec une obsession : l'esthétique absolue.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2023",
      subtitle: "La Croissance",
      title: "L'Expansion",
      text: "De 3 à 15 experts passionnés. Nous avons élargi nos horizons, travaillant avec des géants comme Orange et Canal+, imposant notre signature visuelle sur le marché.",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2025",
      subtitle: "Le Futur",
      title: "L'Ère de l'IA",
      text: "Aujourd'hui, nous regardons vers l'IA, le Web3 et les expériences immersives. Notre mission reste inchangée : propulser les entreprises africaines sur la scène mondiale.",
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    }
  ];

  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
       {/* Ambient Light */}
       <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-40">
             {storySteps.map((step, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-0`}>
                   
                   {/* IMAGE BLOCK */}
                   <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.8 }}
                      className="w-full lg:w-3/5 h-[500px] relative group"
                   >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10 pointer-events-none"></div>
                      <div className="w-full h-full overflow-hidden rounded-[2rem] border border-white/5 relative shadow-2xl">
                         <motion.img 
                            src={step.img} 
                            alt={step.title} 
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                         />
                         {/* Noise Overlay */}
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                      </div>
                      
                      {/* Floating Year Badge */}
                      <div className={`absolute -top-6 ${idx % 2 === 0 ? '-left-6' : '-right-6'} text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent z-20 font-mono pointer-events-none select-none`}>
                         {step.year}
                      </div>
                   </motion.div>

                   {/* TEXT BLOCK (OVERLAPPING) */}
                   <motion.div 
                      initial={{ opacity: 0, y: 30, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, y: 0, x: idx % 2 === 0 ? -80 : 80 }} // Overlap effect
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`w-full lg:w-2/5 relative z-30 mt-[-50px] lg:mt-0 ${idx % 2 === 0 ? 'lg:-ml-20' : 'lg:-mr-20 lg:text-right'}`}
                   >
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
                         <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--primary-color)] to-[var(--accent-color)]"></div>
                         
                         <span className="text-[var(--accent-color)] font-mono text-xs uppercase tracking-[0.3em] mb-3 block">{step.subtitle}</span>
                         <h3 className="text-4xl font-bold text-white mb-6 leading-tight">{step.title}</h3>
                         <p className="text-gray-400 leading-relaxed font-light text-lg">
                            {step.text}
                         </p>
                      </div>
                   </motion.div>

                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

// 2. SECTION ADN : GLASS CARDS WITH GLOWING BORDER
const ValuesList = ({ t }: { t: any }) => {
  const values = [
    { id: '01', title: "Innovation", desc: "Nous ne suivons pas les tendances, nous les créons. L'audace est notre moteur.", icon: BrainCircuit },
    { id: '02', title: "Précision", desc: "Le diable est dans les détails. Nous visons la perfection au pixel près.", icon: Target },
    { id: '03', title: "Passion", desc: "Plus qu'un métier, c'est une vocation. L'émotion est au cœur de tout.", icon: Heart },
    { id: '04', title: "Sécurité", desc: "Vos données sont sacrées. Nous bâtissons des forteresses numériques.", icon: Shield },
  ];

  return (
    <section className="py-32 bg-[#05070a] relative">
       {/* Ambient glow behind the section */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
             <h3 className="text-4xl md:text-5xl font-black text-white mb-4">Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">ADN</span></h3>
             <p className="text-gray-400 max-w-xl mx-auto text-lg">Les piliers fondamentaux qui soutiennent chacune de nos créations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {values.map((val, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group relative p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-[var(--primary-color)]/50 hover:shadow-[0_0_40px_-10px_rgba(94,53,177,0.4)]"
                >
                   {/* Internal Glow Effect on Hover */}
                   <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary-color)]/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                   
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500 group-hover:bg-[var(--primary-color)] group-hover:border-transparent group-hover:shadow-lg">
                         <val.icon size={28} />
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                         <span className="text-[10px] font-mono text-gray-500 group-hover:text-[var(--accent-color)] transition-colors">{val.id}</span>
                         <h4 className="text-2xl font-bold text-white">{val.title}</h4>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">{val.desc}</p>
                      
                      <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold text-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                         <span className="uppercase tracking-widest">En savoir plus</span>
                         <ArrowDown size={12} className="-rotate-90" />
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

// 3. SECTION POURQUOI NOUS ? (Remplace les partenaires)
const WhyUsSection = () => {
  const reasons = [
    {
      icon: Palette,
      title: "Design d'Avant-Garde",
      desc: "Nous ne suivons pas la mode, nous la définissons. Une esthétique unique qui marque les esprits et renforce votre image de marque.",
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Performance Absolue",
      desc: "Des sites web ultra-rapides et des applications fluides. Nous optimisons chaque ligne de code pour une expérience utilisateur sans faille.",
      color: "from-blue-400 to-cyan-300"
    },
    {
      icon: TrendingUp,
      title: "Stratégie ROI",
      desc: "Le beau ne suffit pas. Nous concevons des outils digitaux orientés vers la conversion et la croissance de votre chiffre d'affaires.",
      color: "from-green-400 to-emerald-600"
    }
  ];

  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
       {/* Background Noise & Effects */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[var(--primary-color)]/10 blur-[150px] rounded-full pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                <Star size={14} className="text-[var(--accent-color)] fill-[var(--accent-color)]" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">L'Excellence Mind Graphix</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
                Pourquoi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Nous ?</span>
             </h2>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                Dans un océan de conformisme digital, choisissez de naviguer vers l'exceptionnel.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {reasons.map((item, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.2, duration: 0.5 }}
                   className="group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-[var(--primary-color)]/30 transition-all duration-500"
                >
                   <div className="relative h-full bg-[#0a0f1c] rounded-[2.3rem] p-10 flex flex-col items-center text-center overflow-hidden">
                      {/* Hover Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[80px]`}></div>
                      
                      <div className="relative z-10">
                         <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <item.icon size={36} className="text-white" />
                         </div>
                         
                         <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                            {item.title}
                         </h3>
                         
                         <p className="text-gray-400 leading-relaxed text-sm group-hover:text-white/90 transition-colors">
                            {item.desc}
                         </p>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

// 4. SECTION FONDATEUR (INCHANGÉE - STYLE ÉDITORIAL)
const FounderSection = ({ t }: { t: any }) => {
  return (
    <section className="py-32 bg-[#0f1219] overflow-hidden relative">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#151925] to-transparent"></div>
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-color)]/5 rounded-full blur-[150px]"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
             
             {/* IMAGE FRAME - CLASSY STYLE */}
             <div className="lg:col-span-5 relative">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                   {/* Frame */}
                   <div className="absolute -top-4 -left-4 w-full h-full border border-[var(--accent-color)] rounded-sm opacity-30"></div>
                   <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 rounded-sm"></div>
                   
                   {/* Image */}
                   <div className="relative overflow-hidden aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-1000 ease-out shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Badior Ouattara" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
                      
                      {/* Name Badge */}
                      <div className="absolute bottom-0 left-0 bg-white text-black px-6 py-4">
                         <p className="font-bold uppercase tracking-widest text-sm">Badior Ouattara</p>
                         <p className="text-xs font-serif italic text-gray-600">Fondateur & Directeur de Création</p>
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* TEXT CONTENT - EDITORIAL STYLE */}
             <div className="lg:col-span-7">
                <Quote size={80} className="text-[var(--primary-color)] opacity-20 mb-8" />
                
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
                   "Le design n'est pas seulement ce que l'on voit, c'est ce que l'on <span className="text-[var(--accent-color)] italic">ressent</span>."
                </h2>
                
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light font-sans max-w-2xl">
                   <p>
                      <span className="text-white font-bold text-2xl float-left mr-2 mt-[-6px]">D</span>ans un monde saturé de bruit numérique, la clarté devient un super-pouvoir. Mon ambition pour Mind Graphix a toujours été de créer un pont entre la complexité technologique brute et la pureté de l'émotion humaine.
                   </p>
                   <p>
                      Nous ne sommes pas là pour "faire des sites". Nous sommes là pour bâtir des cathédrales numériques. Chaque projet est une toile vierge, chaque interaction une opportunité de marquer les esprits. L'excellence n'est pas un acte, c'est une habitude.
                   </p>
                </div>
                
                <div className="mt-12 flex items-center gap-6">
                   {/* Signature Animation */}
                   <motion.div 
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="w-48 h-20"
                   >
                      {/* SVG Signature Mockup */}
                      <svg viewBox="0 0 200 100" className="w-full h-full stroke-white fill-none stroke-2">
                         <path d="M10,80 Q50,10 80,80 T150,50" />
                         <text x="20" y="80" fontFamily="cursive" fontSize="24" fill="white" stroke="none">Badior O.</text>
                      </svg>
                   </motion.div>
                   
                   <div className="h-px w-20 bg-white/20"></div>
                   <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary-color)]">Mind Graphix CEO</p>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};

// --- MAIN COMPONENT ---

const About: React.FC = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-[var(--bg-primary)] overflow-hidden">
      <ScrollProgressLine />
      
      {/* 1. HERO MANIFESTO (INCHANGÉ) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#02040a]">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] z-10"></div>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="Universe" />
            <NeuralBackground />
         </div>

         <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="container mx-auto px-6 relative z-20 text-center"
         >
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
                  <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Depuis 2022</span>
               </div>
               
               <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-8 mix-blend-overlay opacity-90">
                  DIGITAL<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">ARCHITECTS</span>
               </h1>
               
               <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                  Mind Graphix Solution n'est pas qu'une agence.<br/>
                  C'est le point de rencontre entre <span className="text-white font-medium">l'art visuel</span> et <span className="text-white font-medium">l'ingénierie</span>.
               </p>
            </motion.div>
         </motion.div>

         <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
         >
            <ArrowDown size={32} />
         </motion.div>
      </section>

      {/* 2. THE STORY (STYLE CINÉMATOGRAPHIQUE) */}
      <CinematicStory t={t} />

      {/* 3. THE DNA (STYLE GLASSMOPRHISM AVEC BORDURE LUMINEUSE) */}
      <ValuesList t={t} />

      {/* 4. THE FOUNDER (INCHANGÉ - STYLE ÉDITORIAL) */}
      <FounderSection t={t} />

      {/* 5. POURQUOI NOUS (REMPLACE PARTENAIRES) */}
      <WhyUsSection />

    </div>
  );
};

export default About;
