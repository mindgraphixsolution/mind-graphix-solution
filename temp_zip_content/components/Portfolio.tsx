
import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Search, Layout, Layers, ArrowUpRight, ExternalLink, Filter, 
  PenTool, Code, Rocket, Zap, Cpu, Globe, Database, Smartphone, BoxSelect
} from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from './ui/Lightbox';
import AISearch from './ui/AISearch';
import NeuralBackground from './ui/NeuralBackground';
import Breadcrumbs from './ui/Breadcrumbs';

const categories = [
  { id: 'all', labelKey: 'filter_all' },
  { id: 'web', labelKey: 'filter_web' },
  { id: 'design', labelKey: 'filter_design' },
  { id: 'ecommerce', label: 'filter_ecommerce' },
  { id: 'motion', label: 'filter_motion' }
];

const PROCESS_STEPS = [
  { 
    id: 1, 
    title: "Exploration", 
    desc: "Analyse des besoins et définition de la stratégie.", 
    icon: Search,
    color: "bg-blue-500"
  },
  { 
    id: 2, 
    title: "Design UI/UX", 
    desc: "Création de maquettes interactives et prototypage.", 
    icon: PenTool,
    color: "bg-purple-500"
  },
  { 
    id: 3, 
    title: "Développement", 
    desc: "Codage performant et intégration des fonctionnalités.", 
    icon: Code,
    color: "bg-pink-500"
  },
  { 
    id: 4, 
    title: "Lancement", 
    desc: "Tests, optimisation et mise en ligne officielle.", 
    icon: Rocket,
    color: "bg-green-500"
  }
];

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

const Portfolio: React.FC = () => {
  const { t, getData } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setPortfolioItems(getData('portfolio'));
  }, [getData]);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Split items for the Featured Showcase vs the Grid
  const featuredItems = filter === 'all' ? portfolioItems.slice(0, 3) : [];
  const gridItems = filter === 'all' ? portfolioItems.slice(3) : filteredItems;

  const MotionDiv = motion.div as any;

  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      <Lightbox image={selectedImage?.url || null} title={selectedImage?.title} onClose={() => setSelectedImage(null)} />
      
      {/* 1. HERO SECTION CINEMATIC */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#02040a]">
         {/* Background Layer */}
         <div className="absolute inset-0 z-0">
            <NeuralBackground />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            {/* Ambient Colors */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] translate-y-1/3 pointer-events-none"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-8">
               <Breadcrumbs />
            </div>

            <div className="text-center max-w-5xl mx-auto mb-16">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
               >
                  <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
                     PROJETS <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent animate-gradient-xy">SÉLECTIONNÉS</span>
                  </h1>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-8 font-light">
                     {t('portfolio.subtitle')}
                  </p>
               </motion.div>

               {/* AI Search Bar */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 max-w-2xl mx-auto"
               >
                  <AISearch />
               </motion.div>
            </div>

            {/* Filters Row */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap justify-center gap-4 relative z-20"
            >
               <div className="p-1.5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                  <button
                     key={cat.id}
                     onClick={() => setFilter(cat.id)}
                     className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        filter === cat.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-105' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                     }`}
                  >
                     {cat.labelKey ? t(`portfolio.${cat.labelKey}`) : cat.id}
                  </button>
                  ))}
               </div>
            </motion.div>
         </div>
      </section>

      {/* 2. FEATURED SHOWCASE (Responsive Grid) */}
      {filter === 'all' && featuredItems.length >= 3 && (
         <section className="py-20 bg-[#05070a] relative z-20 -mt-10 rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto px-6">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-1 bg-accent rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-widest">À la une</h2>
               </div>

               <div className="grid lg:grid-cols-12 gap-8 lg:h-[700px]">
                  
                  {/* LEFT: BIG SCREEN */}
                  <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="lg:col-span-8 h-[400px] lg:h-full relative group cursor-pointer rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black hover:border-primary/50 transition-all duration-500"
                     onClick={() => setSelectedImage({ url: featuredItems[0].image, title: featuredItems[0].title })}
                  >
                     <img 
                        src={featuredItems[0].image} 
                        alt={featuredItems[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="mb-4">
                           <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/90 text-black font-bold text-xs uppercase shadow-lg mb-2 backdrop-blur-sm">
                              {featuredItems[0].category}
                           </span>
                           <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-lg">{featuredItems[0].title}</h3>
                           <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                              <p className="text-gray-200 text-lg leading-relaxed max-w-xl py-4 border-t border-white/10 mt-4">
                                 {featuredItems[0].description}
                              </p>
                              <div className="inline-flex items-center gap-3 text-white font-bold group-hover:text-accent transition-colors">
                                 Voir le projet <ArrowUpRight size={24} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* RIGHT: 2 STACKED SCREENS */}
                  <div className="lg:col-span-4 flex flex-col gap-8 h-full">
                     {[featuredItems[1], featuredItems[2]].map((item, idx) => (
                        <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2 }}
                           className="h-[300px] lg:h-auto flex-1 relative group cursor-pointer rounded-[2rem] overflow-hidden border border-white/10 shadow-xl bg-black hover:border-accent/50 transition-all duration-500"
                           onClick={() => setSelectedImage({ url: item.image, title: item.title })}
                        >
                           <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity"></div>
                           <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="text-xs font-bold text-accent uppercase mb-1 block">{item.category}</span>
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

      {/* 3. GRID SECTION (Remaining Items) */}
      <section id="portfolio-content" className="bg-[#05070a] pt-12 pb-24 relative z-10 px-6">
        <div className="container mx-auto">
           {filter === 'all' && (
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
                 <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Tous les projets</h2>
              </div>
           )}

           <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[350px]">
              <AnimatePresence mode="popLayout">
                {gridItems.map((item, idx) => {
                  const isLarge = (idx % 7 === 0);
                  const isWide = (idx % 7 === 4);
                  // Reset col spans on mobile
                  let spanClass = "col-span-1 row-span-1";
                  if (window.innerWidth >= 768) {
                     if (isLarge) spanClass = "md:col-span-2 md:row-span-2";
                     else if (isWide) spanClass = "md:col-span-2 row-span-1";
                  }
                  
                  return (
                    <MotionDiv
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-white/5 hover:border-primary/50 ${spanClass}`}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedImage({ url: item.image, title: item.title })}
                    >
                      <div className="absolute inset-0 bg-gray-900">
                        <img 
                           src={item.image} 
                           alt={item.title} 
                           className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hoveredId === item.id ? 'scale-110 opacity-60' : 'scale-100 opacity-90'}`} 
                           loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                         <div className={`transform transition-all duration-500 ${hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-100 md:opacity-90'}`}>
                            <div className="flex justify-between items-end">
                               <div className="flex-1 pr-4">
                                  <span className="inline-block px-3 py-1 mb-3 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">{item.category}</span>
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

      {/* 4. PROCESS & TOOLS (FILLER CONTENT - INDEFINITE SCROLL) */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            {/* Process Steps */}
            <div className="mb-24">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
               >
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Approche</span></h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">De l'idée brute au produit fini, chaque étape est maîtrisée.</p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROCESS_STEPS.map((step, idx) => (
                     <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl relative group hover:border-white/20 transition-all hover:bg-white/10"
                     >
                        <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                           <step.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                           <span className="text-white/20 text-sm">0{step.id}.</span> {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Tech Stack Marquee (Indefinite) */}
            <div className="py-12 border-t border-white/5 relative">
               <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-12">Technologies & Outils</p>
               
               <div className="flex overflow-hidden relative w-full mask-linear-fade">
                  {/* Left Gradient Mask */}
                  <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Scrolling Container */}
                  <motion.div 
                    className="flex gap-16 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      ease: "linear", 
                      duration: 40 // Slower for readability
                    }}
                  >
                     {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 group cursor-default">
                           <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                              <tool.icon size={32} className="group-hover:scale-110 transition-transform" />
                           </div>
                           <span className="text-xs font-bold uppercase tracking-widest">{tool.name}</span>
                        </div>
                     ))}
                  </motion.div>

                  {/* Right Gradient Mask */}
                  <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="py-24 bg-black relative overflow-hidden border-t border-white/10">
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('portfolio.cta_banner_title')}</h2>
            <Link to="/devis" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-accent transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
               {t('portfolio.cta_banner_btn')} <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Portfolio;
