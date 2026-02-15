'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Check, ArrowRight, HelpCircle, ChevronDown, Plus, Minus, Calculator, 
  Palette, Code, Smartphone, Video, ShoppingCart, BarChart 
} from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { PRICING_PLANS } from '../../constants';
import { api } from '../../lib/api';
import ProjectCalculator from '../ui/ProjectCalculator';
import SectionDivider from '../ui/SectionDivider';
import Breadcrumbs from '../ui/Breadcrumbs';
import NeuralBackground from '../ui/NeuralBackground';

const ICON_MAP: any = {
  Palette,
  Code,
  Smartphone,
  Video,
  ShoppingCart,
  BarChart,
  Layers
};

const StickyServiceSection = ({ services }: { services: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      // Uniquement sur desktop
      if (window.innerWidth >= 1024) {
        const sections = containerRef.current.querySelectorAll('.service-block');
        sections.forEach((sec: any, index) => {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveCard(index);
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--bg-primary)] text-[var(--text-main)]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Côté gauche : Contenu textuel collant (DESKTOP UNIQUEMENT) */}
        <div className="lg:w-1/2 hidden lg:flex flex-col justify-center h-screen sticky top-0 py-20 pl-4 pointer-events-none">
           <div className="relative h-full flex flex-col justify-center pointer-events-auto">
              {services.map((service, index) => (
                 <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -50, display: 'none' }}
                    animate={{ 
                      opacity: activeCard === index ? 1 : 0, 
                      x: activeCard === index ? 0 : -50, 
                      display: activeCard === index ? 'block' : 'none' 
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 w-full"
                 >
                    <span className="text-9xl font-black text-[var(--text-main)] opacity-[0.03] absolute -top-24 -left-10 -z-10 select-none">{`0${index + 1}`}</span>
                    <div className={`inline-flex p-4 rounded-2xl text-white mb-6 bg-gradient-to-br ${service.gradient} shadow-xl`}>
                      {(() => {
                        const Icon = ICON_MAP[service.icon] || Layers;
                        return <Icon size={32} />;
                      })()}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-8 leading-tight tracking-tighter">{service.title}</h2>
                    <p className="text-xl text-[var(--text-muted)] mb-10 leading-relaxed max-w-xl font-light">{service.description}</p>
                    <ul className="space-y-5 mb-12">
                       {(service.features || []).slice(0, 4).map((feat: string, i: number) => (
                          <li key={i} className="flex items-center gap-4">
                             <div className="w-6 h-6 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center shrink-0 border border-[var(--accent-color)]/20"><Check size={14} strokeWidth={3} /></div>
                             <span className="font-medium text-[var(--text-main)]/80">{feat}</span>
                          </li>
                       ))}
                    </ul>
                    <div className="flex items-center gap-8">
                       <Link href="/devis" className="btn-architect px-10 py-5 flex items-center gap-3">
                         Commander <ArrowRight size={20} />
                       </Link>
                       <span className="text-2xl font-black text-[var(--accent-color)]">{service.pricing}</span>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Côté droit : Images défilantes (et texte sur mobile) */}
        <div className="lg:w-1/2 w-full flex flex-col gap-32 py-12 lg:py-[15vh]">
           {services.map((service, index) => (
              <div key={service.id} className="service-block min-h-auto lg:min-h-[60vh] flex flex-col items-center justify-center p-0 lg:p-6">
                 
                 {/* Carte Image */}
                 <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group border border-[var(--border-color)] bg-[var(--bg-surface)] glass hover:border-[var(--accent-color)]/50 transition-all duration-500"
                 >
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]/80"></div>
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* CONTENU MOBILE (Visible uniquement sur lg:hidden) */}
                    <div className="absolute bottom-0 left-0 w-full p-10 z-20 lg:hidden">
                          <div className={`inline-flex p-4 rounded-xl text-white mb-6 bg-gradient-to-br ${service.gradient} shadow-lg`}>
                            {(() => {
                              const Icon = ICON_MAP[service.icon] || Layers;
                              return <Icon size={24} />;
                            })()}
                          </div>
                          <h3 className="text-4xl font-black text-[var(--text-main)] mb-4 leading-tight tracking-tighter">{service.title}</h3>
                       <p className="text-[var(--text-muted)] text-base line-clamp-3 mb-8 leading-relaxed font-light">{service.description}</p>
                       <ul className="space-y-3 mb-8">
                          {(service.features || []).slice(0, 3).map((feat: string, i: number) => (
                             <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-main)]/70">
                                <Check size={14} className="text-[var(--accent-color)]"/> {feat}
                             </li>
                          ))}
                       </ul>
                       <div className="flex items-center justify-between gap-4">
                          <span className="text-xl font-black text-[var(--accent-color)]">{service.pricing}</span>
                          <Link href="/devis" className="btn-architect px-8 py-4 text-sm flex items-center gap-2">
                             Devis <ArrowRight size={18} />
                          </Link>
                       </div>
                    </div>
                 </motion.div>

              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const FAQSection = ({ faqs }: { faqs: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-[var(--bg-primary)] relative overflow-hidden">
       {/* Lueurs ambiantes */}
       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-color)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[var(--accent-color)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>

       <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] glass mb-8">
                <HelpCircle size={18} className="text-[var(--accent-color)]" />
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{t('services.support_tag') || 'Support & Aide'}</span>
             </div>
             <h2 className="text-5xl md:text-6xl font-black text-[var(--text-main)] mb-6 tracking-tighter">{t('services.faq_title') || 'Questions Fréquentes'}</h2>
             <p className="text-[var(--text-muted)] text-xl font-light">{t('services.faq_sub') || 'Tout ce que vous devez savoir avant de démarrer.'}</p>
          </div>

          <div className="grid gap-6">
             {faqs.map((faq: any, index: number) => (
                <motion.div 
                   key={index} 
                   initial={false}
                   animate={{ 
                     backgroundColor: openIndex === index ? 'var(--bg-surface)' : 'transparent',
                     borderColor: openIndex === index ? 'var(--accent-color)' : 'var(--border-color)'
                   }}
                   className={`border rounded-[2rem] overflow-hidden transition-all duration-500 glass shadow-sm`}
                >
                   <button 
                      onClick={() => toggle(index)} 
                      className="w-full flex justify-between items-center p-8 text-left group"
                   >
                      <span className={`font-bold text-xl md:text-2xl transition-colors tracking-tight ${openIndex === index ? 'text-[var(--accent-color)]' : 'text-[var(--text-main)] group-hover:text-[var(--accent-color)]'}`}>
                         {faq.question}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-500 ${openIndex === index ? 'bg-[var(--accent-color)] text-black border-[var(--accent-color)] rotate-180 shadow-lg' : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)]'}`}>
                         {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                      </div>
                   </button>
                   <AnimatePresence>
                      {openIndex === index && (
                         <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                         >
                            <div className="px-8 pb-8 text-lg text-[var(--text-muted)] leading-relaxed font-light border-t border-[var(--border-color)]/50 pt-6">
                               {faq.answer}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );};

const ServicesPage: React.FC = () => {
  const { t, getData } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [servicesData, faqsData] = await Promise.all([
          api.getServices(),
          api.getFAQs()
        ]);
        setServices(servicesData);
        setFaqs(faqsData);
      } catch (error) {
        console.error('Error loading services page data:', error);
        // Fallback to mock data if API fails
        setServices(getData('services'));
        setFaqs(getData('faqs'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [getData]);

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#02040a] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      
      {/* 1. HERO SECTION REDESIGNED */}
      <section className="relative pt-32 pb-24 min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#02040a]">
         <div className="absolute inset-0 z-0">
            <Image 
               src="https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=2000"
               className="object-cover opacity-20 blur-sm scale-105"
               alt="App Background"
               fill
               priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#02040a]/80 to-[#02040a]"></div>
            <NeuralBackground />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[3rem] text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/20 transition-all duration-500"
            >
               {/* Decorative border glows */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
               
               <div className="flex justify-center mb-8">
                  <Breadcrumbs />
               </div>
               
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Expertise Mind Graphix</span>
               </div>

               <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                  NOS <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent animate-gradient-xy">SERVICES</span>
               </h1>
               
               <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
                  {t('services.subtitle')}
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                     href="#calculator" 
                     onClick={handleScrollToCalculator}
                     className="group relative px-8 py-4 bg-white text-black font-black rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
                  >
                     <span className="relative z-10 flex items-center justify-center gap-3">
                        <Calculator size={20} className="text-primary"/> 
                        {t('services.simulator_title')}
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </a>
                  
                  <Link href="/portfolio" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md hover:border-white/30">
                     <Layers size={20} />
                     Voir Réalisations
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 2. STICKY SERVICES */}
      <StickyServiceSection services={services} />

      {/* 3. PRICING */}
      <section className="py-32 relative bg-[#02040a] overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('services.pricing_title')} <span className="text-accent">{t('services.pricing_span')}</span></h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t('services.pricing_sub')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {PRICING_PLANS.map((plan, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.2 }} 
                    whileHover={{ y: -15, borderColor: 'rgba(255,255,255,0.3)' }} 
                    className={`relative rounded-[2.5rem] p-8 border backdrop-blur-xl transition-all duration-500 group flex flex-col ${plan.recommended ? 'bg-gradient-to-b from-[#1e1e2f] to-[#0f0f1a] text-white border-accent shadow-[0_0_40px_rgba(255,171,0,0.3)]' : 'bg-white/5 border-white/10 text-white'}`}
                  >
                     {plan.recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-dark font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg">Populaire</div>}
                     <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <span className="text-4xl font-black">{plan.price}</span>
                        <p className="text-sm mt-4 leading-relaxed text-gray-400">{plan.desc}</p>
                     </div>
                     <ul className="space-y-5 mb-10 flex-1">
                        {plan.features.map((feat, i) => (
                           <li key={i} className="flex items-start gap-4">
                              <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${plan.recommended ? 'bg-accent text-dark' : 'bg-white/10 text-white'}`}>
                                 <Check size={12} strokeWidth={4} />
                              </div>
                              <span className="text-sm font-medium text-gray-300">{feat}</span>
                           </li>
                        ))}
                     </ul>
                     <Link href="/devis" className={`block w-full py-4 text-center rounded-xl font-bold text-sm uppercase tracking-wider transition-all transform group-hover:scale-105 shadow-lg ${plan.recommended ? 'bg-accent text-dark hover:bg-white hover:text-accent' : 'bg-white/10 hover:bg-white hover:text-dark'}`}>
                        Choisir ce pack
                     </Link>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. CALCULATOR */}
      <section id="calculator" className="py-32 bg-[#05070a] relative overflow-hidden">
         <SectionDivider position="top" type="wave" color="text-[#02040a]" flip />
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold mb-4 text-white">{t('services.simulator_title')}</h2>
               <p className="text-gray-500">{t('services.simulator_sub')}</p>
            </div>
            <ProjectCalculator />
         </div>
      </section>

      {/* 5. FAQ */}
      <FAQSection faqs={faqs} />

      {/* 6. CTA */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">{t('extras.ready_title')}</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">{t('extras.ready_sub')}</p>
            <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-primary font-black text-xl rounded-full hover:bg-accent hover:text-dark transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
               {t('extras.start_project')} <ArrowRight size={24} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;

