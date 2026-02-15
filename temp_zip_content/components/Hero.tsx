
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers, Zap } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockDB } from '../utils/mockDatabase';
import Magnetic from './ui/Magnetic';
import NeuralBackground from './ui/NeuralBackground';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const loadHero = () => setData(mockDB.getHero());

  useEffect(() => {
    loadHero();
    window.addEventListener('mgs_db_update', loadHero);
    return () => window.removeEventListener('mgs_db_update', loadHero);
  }, []);

  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  if (!data) return null;

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#02040a]">
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
           <motion.div style={{ opacity: opacityHero, y: yParallax }} className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-primary/5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{t('about.open_to_work')}</span>
                </div>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black text-white mb-6 lg:mb-8 leading-[0.95] tracking-tighter">
                {data.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-xy">{data.titleSpan}</span><br/>
                <span className="outline-text text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-20">{data.titleSuffix}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                {data.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Magnetic strength={40}>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden group shadow-lg">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {data.ctaPrimary} <ArrowRight size={18} />
                      </span>
                      <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0 ease-out"></div>
                    </button>
                  </Link>
                </Magnetic>
                <Magnetic strength={20}>
                  <Link to="/portfolio" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-semibold bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
                      {data.ctaSecondary}
                    </button>
                  </Link>
                </Magnetic>
              </div>

              <div className="mt-12 lg:mt-16 flex justify-center lg:justify-start items-center gap-8 border-t border-white/10 pt-8">
                 {data.stats?.map((stat: any, i: number) => (
                    <React.Fragment key={i}>
                       <div>
                          <div className="text-3xl font-black text-white">{stat.value}+</div>
                          <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">{stat.label}</div>
                       </div>
                       {i < data.stats.length - 1 && <div className="w-px h-10 bg-white/10"></div>}
                    </React.Fragment>
                 ))}
              </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-5 relative hidden md:block h-[500px] lg:h-[600px]">
              <div className="relative w-full h-full perspective-1000">
                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-64 md:w-80 h-80 md:h-96 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 bg-[#0a0f1c]">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" alt="Abstract Art" className="w-full h-full object-cover opacity-80" />
                 </motion.div>
                 <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 lg:bottom-20 left-0 w-64 md:w-72 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[1.5rem] shadow-2xl z-20">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg"><Zap size={20} fill="currentColor"/></div>
                       <div><div className="text-sm font-bold text-white">Performance</div><div className="text-xs text-gray-400">Optimisation max</div></div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-green-500"></motion.div></div>
                       <div className="flex justify-between text-xs font-bold text-gray-400"><span>Vitesse</span><span>99/100</span></div>
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
