
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Check, ArrowRight, HelpCircle, ChevronDown, Plus, Minus, Calculator, Palette } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PRICING_PLANS } from '../../constants';
import ProjectCalculator from '../ui/ProjectCalculator';
import SectionDivider from '../ui/SectionDivider';
import Breadcrumbs from '../ui/Breadcrumbs';
import NeuralBackground from '../ui/NeuralBackground';

const StickyServiceSection = ({ services }: { services: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      // On desktop only
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
    <div ref={containerRef} className="relative w-full bg-[#05070a] text-white">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Sticky Text Content (DESKTOP ONLY) */}
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
                    <span className="text-9xl font-black text-white/5 absolute -top-24 -left-10 -z-10 select-none font-outline-2">{`0${index + 1}`}</span>
                    <div className={`inline-flex p-4 rounded-2xl text-white mb-6 bg-gradient-to-br ${service.gradient} shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
                      <service.icon size={32} />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">{service.title}</h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">{service.description}</p>
                    <ul className="space-y-4 mb-10">
                       {(service.features || []).slice(0, 4).map((feat: string, i: number) => (
                          <li key={i} className="flex items-center gap-3">
                             <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30"><Check size={14} strokeWidth={3} /></div>
                             <span className="font-medium text-gray-200">{feat}</span>
                          </li>
                       ))}
                    </ul>
                    <div className="flex items-center gap-6">
                       <Link to="/devis" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent hover:text-black transition-all flex items-center gap-2 shadow-lg hover:shadow-accent/50 transform hover:scale-105">
                         Commander <ArrowRight size={18} />
                       </Link>
                       <span className="text-xl font-bold text-gray-400">{service.pricing}</span>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Right Side: Scrolling Images (AND Text on Mobile) */}
        <div className="lg:w-1/2 w-full flex flex-col gap-24 py-12 lg:py-[15vh]">
           {services.map((service, index) => (
              <div key={service.id} className="service-block min-h-auto lg:min-h-[60vh] flex flex-col items-center justify-center p-0 lg:p-6">
                 
                 {/* Image Card */}
                 <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/50 transition-colors"
                 >
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* MOBILE CONTENT OVERLAY (Visible only on lg:hidden) */}
                    <div className="absolute bottom-0 left-0 w-full p-8 z-20 lg:hidden">
                       <div className={`inline-flex p-3 rounded-xl text-white mb-4 bg-gradient-to-br ${service.gradient} shadow-lg`}>
                          <service.icon size={24} />
                       </div>
                       <h3 className="text-3xl font-black text-white mb-3 leading-tight">{service.title}</h3>
                       <p className="text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">{service.description}</p>
                       <ul className="space-y-2 mb-6">
                          {(service.features || []).slice(0, 3).map((feat: string, i: number) => (
                             <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                <Check size={12} className="text-primary"/> {feat}
                             </li>
                          ))}
                       </ul>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-accent">{service.pricing}</span>
                          <Link to="/devis" className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-accent transition-colors flex items-center gap-2">
                             Devis <ArrowRight size={16} />
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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden">
       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

       <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                <HelpCircle size={16} className="text-accent" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Support & Aide</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Questions Fréquentes</h2>
             <p className="text-gray-400 text-lg">Tout ce que vous devez savoir avant de démarrer.</p>
          </div>

          <div className="grid gap-4">
             {faqs.map((faq: any, index: number) => (
                <motion.div 
                   key={index} 
                   initial={false}
                   animate={{ backgroundColor: openIndex === index ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)' }}
                   className={`border ${openIndex === index ? 'border-primary/50' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-300`}
                >
                   <button 
                      onClick={() => toggle(index)} 
                      className="w-full flex justify-between items-center p-6 text-left"
                   >
                      <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-primary' : 'text-white'}`}>
                         {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${openIndex === index ? 'bg-primary text-white border-primary rotate-180' : 'bg-transparent text-gray-400 border-white/10'}`}>
                         {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                   </button>
                   <AnimatePresence>
                      {openIndex === index && (
                         <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                         >
                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
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
  );
};

const ServicesPage: React.FC = () => {
  const { t, getData } = useLanguage();
  const services = getData('services');
  const faqs = getData('faqs');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      
      {/* 1. HERO SECTION REDESIGNED */}
      <section className="relative pt-32 pb-24 min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#02040a]">
         <div className="absolute inset-0 z-0">
            <img 
               src="https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=2000"
               className="w-full h-full object-cover opacity-20 blur-sm scale-105"
               alt="App Background"
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
                  
                  <Link to="/portfolio" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md hover:border-white/30">
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
                     <Link to="/devis" className={`block w-full py-4 text-center rounded-xl font-bold text-sm uppercase tracking-wider transition-all transform group-hover:scale-105 shadow-lg ${plan.recommended ? 'bg-accent text-dark hover:bg-white hover:text-accent' : 'bg-white/10 hover:bg-white hover:text-dark'}`}>
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
            <Link to="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-primary font-black text-xl rounded-full hover:bg-accent hover:text-dark transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
               {t('extras.start_project')} <ArrowRight size={24} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;
