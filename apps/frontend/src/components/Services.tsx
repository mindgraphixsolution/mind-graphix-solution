'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Section from './ui/Section';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, ArrowRight, Star, Clock, Palette, Code, Smartphone, Video, ShoppingCart, BarChart, ArrowDown, Sparkles, Layers, Compass, Rocket, Award, ShieldCheck, Users, BrainCircuit, Layout, Monitor, Share2, Search, Mail, Megaphone, Terminal, HelpCircle, Zap, Shield, Globe } from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import { DATA_BY_LANG } from '../lib/constants';
import NeuralBackground from './ui/NeuralBackground';
import Magnetic from './ui/Magnetic';
import ProjectCalculator from './ui/ProjectCalculator';

const Icons: any = { Palette, Code, Smartphone, Video, ShoppingCart, BarChart, Globe, Search, Terminal, Rocket, Layers, Zap, Shield, Sparkles };

const PRICING_PLANS = [
  {
    name: "Starter Pack",
    price: "250.000 FCFA",
    desc: "Idéal pour les petites entreprises et indépendants.",
    features: ["Site Vitrine (1-5 pages)", "Design Responsive", "Formulaire de contact", "SEO de base", "Hébergement 1 an offert"],
    delay: 0.1
  },
  {
    name: "Pro Pack",
    price: "550.000 FCFA",
    desc: "Pour les entreprises en pleine croissance.",
    recommended: true,
    features: ["Site Dynamique", "Panel d'administration (CMS)", "Design Premium sur mesure", "SEO Avancé", "Support technique 3 mois"],
    delay: 0.2
  },
  {
    name: "E-Commerce",
    price: "850.000 FCFA",
    desc: "Vendez vos produits partout dans le monde.",
    features: ["Boutique complète", "Paiements sécurisés (Orange/Moov)", "Gestion des stocks", "Tableau de bord analytics", "Formation à l'utilisation"],
    delay: 0.3
  }
];

const PROCESS_STEPS = [
  {
    title: "1. Audit & Stratégie",
    desc: "Immersion totale dans votre écosystème pour définir vos objectifs et KPIs.",
    icon: Search
  },
  {
    title: "2. UI/UX Design",
    desc: "Création de maquettes interactives et validation de l'expérience utilisateur.",
    icon: Palette
  },
  {
    title: "3. Développement",
    desc: "Codage par sprints avec livraisons intermédiaires régulières (Méthode Agile).",
    icon: Terminal
  },
  {
    title: "4. Q/A & Lancement",
    desc: "Tests rigoureux, optimisation SEO finale et mise en production sécurisée.",
    icon: Rocket
  }
];

const FAQS_FR = [
  { 
    question: "Combien coûte un site internet ?", 
    answer: "Le coût dépend de la complexité. Un site vitrine commence autour de 250.000 FCFA, tandis qu'un e-commerce complet nécessite un budget plus conséquent. Utilisez notre simulateur ci-dessous pour une estimation précise." 
  },
  { 
    question: "Quels sont vos délais ?", 
    answer: "En moyenne, un site vitrine prend 2 semaines. Des projets plus complexes comme des applications sur mesure peuvent prendre 4 à 8 semaines selon les fonctionnalités." 
  },
  { 
    question: "Offrez-vous un service de maintenance ?", 
    answer: "Oui ! Nous proposons des forfaits de maintenance mensuels pour assurer la sécurité, les mises à jour techniques et les sauvegardes régulières de votre site." 
  },
  { 
    question: "Le site sera-t-il optimisé pour Google (SEO) ?", 
    answer: "Absolument. Tous nos sites sont conçus avec les meilleures pratiques SEO techniques : vitesse de chargement, structure sémantique, balises meta et responsive design total." 
  },
  { 
    question: "Puis-je mettre à jour le site moi-même ?", 
    answer: "Oui, nous intégrons un panneau d'administration (CMS) intuitif qui vous permet de modifier vos textes, images et produits sans aucune connaissance technique." 
  },
  { 
    question: "Acceptez-vous les paiements en plusieurs fois ?", 
    answer: "Oui, nous demandons généralement un acompte de 40% au démarrage, 30% à la validation du design, et le solde à la livraison finale du projet." 
  },
  {
    question: "Quels types de supports graphiques réalisez-vous ?",
    answer: "Nous couvrons tout le spectre du design : logos, chartes graphiques complètes, flyers, affiches, cartes de visite, et visuels pour les réseaux sociaux."
  },
  {
    question: "Mon site sera-t-il compatible avec les smartphones ?",
    answer: "Oui, 100% de nos créations sont 'Mobile First' et s'adaptent parfaitement à tous les écrans (smartphones, tablettes, ordinateurs)."
  }
];

/**
 * Hero spécifique pour la page Services
 */
const ServicesHero = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 z-0">
         <div className="bg-noise opacity-20"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--accent-glow)] opacity-[0.2] rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-color)] opacity-[0.1] rounded-full blur-[120px] pointer-events-none"></div>
         
         {/* Lignes de scan cinématiques pour l'effet "technologique" */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(var(--accent-rgb),0.06),rgba(var(--accent-rgb),0.02),rgba(var(--accent-rgb),0.06))] z-[1] pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
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
                    {t('hero.badge')}
                  </span>
                </div>
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-[var(--text-main)] mb-10 leading-[0.75] tracking-tighter uppercase">
                {t('services.title').split(' ')[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">
                  {t('services.title').split(' ').slice(1).join(' ')}
                </span>
              </h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl text-[var(--text-main)] max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light space-y-2">
                <p className="text-[var(--text-main)] drop-shadow-sm">{t('services.subtitle')}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <Magnetic strength={30}>
                  <button onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })} className="btn-architect text-xl py-5 px-12 flex items-center justify-center gap-4 group">
                    {t('hero.discover')} 
                    <ArrowDown size={22} className="group-hover:translate-y-2 transition-transform" />
                  </button>
                </Magnetic>
              </div>
           </motion.div>

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
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                      alt="Services Digitaux" 
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
                        <Rocket size={32} />
                       </div>
                       <div>
                         <div className="text-lg font-black text-[var(--text-main)] uppercase tracking-tight">Propulsion</div>
                         <div className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest opacity-60">Croissance Business</div>
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
                         <span>Impact Digital</span>
                         <span>99%</span>
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
 * Composant de Carte de Service Individuelle
 */
export const ServiceCard: React.FC<{ service: any; index?: number }> = ({ service, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct); y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  
  // Gestion de l'icône : peut être un composant ou un nom de chaîne
  const IconComponent = typeof service.icon === 'string' 
    ? (Icons[service.icon] || Palette) 
    : (service.icon || Icons[service.iconName] || Palette);

  return (
    <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative grid lg:grid-cols-2 gap-12 items-center rounded-[2.5rem] p-10 glass border-[var(--border-color)] shadow-2xl hover:border-[var(--accent-color)] transition-all cursor-pointer group ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
    >
      <div className={`relative h-[450px] ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-blue-500 to-indigo-600'} rounded-[2rem] transform rotate-2 group-hover:rotate-4 transition-transform duration-700 opacity-10`}></div>
        <div className="relative h-full glass p-3 rounded-[2rem] shadow-2xl border-[var(--border-color)] overflow-hidden">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill
            className="object-cover rounded-[1.5rem] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
          />
        </div>
        <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${service.gradient || 'from-blue-500 to-indigo-600'} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 z-20`}>
           <IconComponent className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="relative z-10 px-4">
        <h3 className="text-4xl font-black text-[var(--text-main)] mb-3 tracking-tight">{service.title}</h3>
        <p className={`text-xl font-bold bg-gradient-to-r ${service.gradient || 'from-blue-400 to-indigo-400'} bg-clip-text text-transparent mb-6`}>{service.subtitle}</p>
        <p className="text-[var(--text-muted)] leading-relaxed text-lg mb-8 font-light">{service.description}</p>
        
        {/* Features List */}
        <div className="flex flex-wrap gap-3 mb-8">
          {service.features?.map((feature: string, i: number) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <Check size={12} className="text-[var(--accent-color)]" />
              {feature}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-8 pt-8 border-t border-[var(--border-color)]">
           <div className="flex items-center gap-3 font-bold text-[var(--text-main)]"><Star className="text-[var(--accent-color)]" size={22}/> {service.pricing}</div>
           <div className="flex items-center gap-3 text-[var(--text-muted)] font-medium"><Clock size={22}/> {service.duration}</div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { t, language, getData } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        // On essaie de récupérer via l'API (qui a un fallback mocké)
        const data = await api.getServices();
        
        // Si les données de l'API sont vides ou ne correspondent pas à la langue,
        // on utilise les constantes locales qui sont plus riches en contenu zip
        const localServices = DATA_BY_LANG[language as keyof typeof DATA_BY_LANG]?.services || [];
        
        // On fusionne ou on privilégie les données locales si elles sont plus complètes
        setServices(localServices.length > 0 ? localServices : data);
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
        setServices(DATA_BY_LANG[language as keyof typeof DATA_BY_LANG]?.services || []);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [language]);

  if (isLoading) {
    return (
      <Section id="services" className="bg-[var(--bg-secondary)] flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </Section>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)]">
      <ServicesHero t={t} />
      
      {/* Introduction Contextuelle */}
      <section className="py-24 md:py-48 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-center">
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-12 bg-[var(--accent-color)]"></div>
                  <span className="text-[var(--accent-color)] font-black uppercase tracking-[0.4em] text-xs">{t('about.subtitle')}</span>
                </div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] mb-10 leading-[0.85] tracking-tighter uppercase">
                  {t('about.title')} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">
                    {t('about.title_span')}
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light leading-relaxed mb-12 max-w-xl">
                  {t('about.description')}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-black text-[var(--text-main)] mb-2">100%</div>
                    <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-color)]">Sur-Mesure</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[var(--text-main)] mb-2">24/7</div>
                    <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-color)]">Innovation</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square glass border border-[var(--border-color)] rounded-[4rem] overflow-hidden group">
                <Image 
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200"
                  alt="Vision Digitale"
                  fill
                  className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <Section id="services-list" className="bg-[var(--bg-secondary)] relative overflow-hidden py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-[var(--border-color)] mb-10">
              <Layers size={16} className="text-[var(--accent-color)]" />
              <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{t('services.title')}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-8 uppercase tracking-tighter">
              {t('services.subtitle')}
            </h2>
          </div>

          <div className="grid gap-20">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <section className="py-32 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] uppercase tracking-tighter mb-4">
               {t('services.process_title')}
             </h2>
             <p className="text-[var(--text-muted)] text-xl font-light">{t('services.process_sub')}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                className="glass p-10 rounded-[2rem] border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-color)] mb-8 group-hover:scale-110 transition-transform">
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-main)] mb-4 uppercase tracking-tight">
                  {t(`common.step_${i+1}_title`)}
                </h3>
                <p className="text-[var(--text-muted)] font-light leading-relaxed">
                  {t(`common.step_${i+1}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] uppercase tracking-tighter mb-4">
                {t('services.pricing_title')} <span className="text-[var(--accent-color)]">{t('services.pricing_span')}</span>
              </h2>
              <p className="text-[var(--text-muted)] text-xl font-light">{t('services.pricing_sub')}</p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
             {PRICING_PLANS.map((plan, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: plan.delay || i * 0.1, duration: 0.4, ease: "easeOut" }}
                 className={`relative glass p-12 rounded-[3rem] border-[var(--border-color)] flex flex-col ${plan.recommended ? 'border-[var(--accent-color)] shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]' : ''}`}
               >
                 {plan.recommended && (
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-[var(--accent-color)] text-white text-xs font-black uppercase tracking-widest shadow-xl">
                     Recommandé
                   </div>
                 )}
                 <div className="mb-10">
                   <h3 className="text-2xl font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">{plan.name}</h3>
                   <p className="text-[var(--text-muted)] font-light">{plan.desc}</p>
                 </div>
                 <div className="text-5xl font-black text-[var(--text-main)] mb-10 tracking-tighter">{plan.price}</div>
                 <div className="space-y-4 mb-12 flex-grow">
                   {plan.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-4 text-[var(--text-muted)] font-medium">
                       <div className="w-6 h-6 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center text-[var(--accent-color)]">
                         <Check size={14} />
                       </div>
                       {feature}
                     </div>
                   ))}
                 </div>
                <Magnetic strength={20}>
                  <Link href="/devis" className="w-full">
                    <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${plan.recommended ? 'bg-[var(--accent-color)] text-white hover:shadow-[0_10px_30px_rgba(var(--accent-rgb),0.4)]' : 'bg-[var(--bg-secondary)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-[var(--accent-color)]'}`}>
                      {t('services.final_cta_btn')}
                    </button>
                  </Link>
                </Magnetic>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Budget Simulator */}
      <section className="py-32 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
           <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] uppercase tracking-tighter mb-4">
                {t('services.simulator_title')}
              </h2>
              <p className="text-[var(--text-muted)] text-xl font-light">{t('services.simulator_sub')}</p>
           </div>
           <ProjectCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] uppercase tracking-tighter mb-20 text-center">
              {t('services.faq_title')}
            </h2>
            <div className="space-y-6">
              {(getData('faqs') || FAQS_FR).map((faq: any, i: number) => (
                <motion.details 
                  key={i}
                  className="group glass rounded-[2rem] border border-[var(--border-color)] overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] pr-8">{faq.question}</h3>
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-color)] group-open:rotate-180 transition-transform">
                      <ArrowDown size={20} />
                    </div>
                  </summary>
                  <div className="p-8 pt-0 text-[var(--text-muted)] text-lg leading-relaxed font-light border-t border-[var(--border-color)]/30">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-color)] opacity-[0.05] rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-9xl font-black text-[var(--text-main)] mb-8 leading-none tracking-tighter uppercase">
              {t('extras.ready_title')}
            </h2>
            <p className="text-2xl text-[var(--text-muted)] mb-16 font-light max-w-2xl mx-auto">
              {t('extras.ready_sub')}
            </p>
            <Link href="/contact">
              <Magnetic strength={30}>
                <button className="btn-architect text-2xl py-8 px-20">
                  {t('extras.start_project')}
                </button>
              </Magnetic>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
