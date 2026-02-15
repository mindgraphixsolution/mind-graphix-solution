
import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  // Tech & Dev
  Atom, Server, Cloud, Terminal, Database, Cpu, Globe, Code, Smartphone, Layers, Box, Wifi,
  // Design & Creative
  PenTool, Figma, Palette, Video, Image, Scissors, Monitor, Layout,
  // Business & Social
  Linkedin, Instagram, Facebook, Github, Mail, Phone, MessageCircle, MapPin, 
  // Values & Abstract
  Zap, ShieldCheck, Target, Coffee, Heart, Star, Award, TrendingUp, Users, Clock, Sun, Moon,
  Briefcase, GraduationCap, Plane, Music, Smile, Search, FileText, ArrowRight, CheckCircle2, Rocket
} from 'lucide-react';
// @ts-ignore
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Custom X Logo Component
const XLogo = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- SUB-COMPONENT: AGILE WORKFLOW ---
const AgileWorkflow = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Search, title: t('common.step_1_title'), desc: t('common.step_1_desc') },
    { icon: PenTool, title: t('common.step_2_title'), desc: t('common.step_2_desc') },
    { icon: Code, title: t('common.step_3_title'), desc: t('common.step_3_desc') },
    { icon: Rocket, title: t('common.step_4_title'), desc: t('common.step_4_desc') }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0f172a] overflow-hidden relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
         <div className="mb-20 text-center md:text-left">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">{t('common.workflow')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">{t('common.methodology')} <span className="text-primary">{t('common.agile')}</span></h2>
            <p className="text-gray-500 mt-4 max-w-2xl">{t('common.agile_desc')}</p>
         </div>

         <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
               ></motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
               {steps.map((step, idx) => {
                 const isActive = activeStep === idx;
                 return (
                   <div 
                      key={idx}
                      className="relative group lg:px-4 cursor-pointer"
                      onClick={() => setActiveStep(idx)}
                   >
                      {/* Icon Circle */}
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                          borderColor: isActive ? 'var(--primary-color)' : 'transparent'
                        }}
                        className={`w-24 h-24 mx-auto lg:mx-0 bg-white dark:bg-[#151e32] border-4 rounded-full flex items-center justify-center relative z-10 shadow-xl transition-all duration-500 ${isActive ? 'border-primary' : 'border-gray-100 dark:border-[#1e293b]'}`}
                      >
                         <AnimatePresence>
                           {isActive && (
                             <motion.div 
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               className="absolute inset-0 bg-primary/10 rounded-full"
                             />
                           )}
                         </AnimatePresence>
                         <step.icon size={32} className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                         
                         {/* Step Number Badge */}
                         <div className={`absolute top-0 right-0 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-accent text-dark border-white' : 'bg-gray-200 text-gray-500 border-white dark:border-[#151e32] dark:bg-white/10'}`}>
                            {idx + 1}
                         </div>
                      </motion.div>

                      {/* Content Card */}
                      <motion.div 
                        animate={{ 
                          y: isActive ? -10 : 0,
                          opacity: isActive ? 1 : 0.7
                        }}
                        className={`mt-8 p-6 rounded-2xl border transition-all text-center lg:text-left relative ${isActive ? 'bg-white dark:bg-white/10 border-primary/50 shadow-lg' : 'bg-slate-50 dark:bg-white/5 border-gray-100 dark:border-white/5 grayscale'}`}
                      >
                         {/* Connector Line (Mobile) */}
                         {idx < 3 && (
                            <div className="lg:hidden absolute bottom-[-32px] left-1/2 w-0.5 h-8 bg-gray-200 dark:bg-white/10 -translate-x-1/2"></div>
                         )}
                         <h3 className={`text-xl font-bold mb-3 ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{step.title.split('. ')[1]}</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                      </motion.div>
                   </div>
                 );
               })}
            </div>
         </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const CommonSections: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const path = location.pathname;
  const MotionDiv = motion.div as any;

  // --- ANIMATION VARIANTS ---
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const iconPop: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
  };

  const SOCIAL_NETWORKS = [
    { name: "LinkedIn", sub: "Pro Network", icon: Linkedin, href: "#", color: "#0077b5", shadow: "rgba(0,119,181,0.3)" },
    { name: "X (Twitter)", sub: "Tech News", icon: XLogo, href: "#", color: "#888888", shadow: "rgba(136,136,136,0.2)" }, // Gray in Light mode
    { name: "Instagram", sub: "Behind Scenes", icon: Instagram, href: "#", color: "#E1306C", shadow: "rgba(225,48,108,0.3)" },
    { name: "Facebook", sub: "Community", icon: Facebook, href: "#", color: "#1877F2", shadow: "rgba(24,119,242,0.3)" }
  ];

  // ==========================================
  // PAGE: SERVICES
  // ==========================================
  const ServicesSections = () => (
    <>
      <section className="py-24 bg-slate-900 dark:bg-[#0a0e17] text-white relative overflow-hidden transition-colors duration-500">
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t('common.tech_dna')}</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('common.tech_desc')}</p>
          </MotionDiv>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: Atom, label: "React", col: "text-cyan-400" }, { icon: Server, label: "Node.js", col: "text-green-500" },
              { icon: Cloud, label: "AWS", col: "text-orange-400" }, { icon: Database, label: "PostgreSQL", col: "text-blue-400" },
              { icon: Smartphone, label: "React Native", col: "text-purple-400" }, { icon: Terminal, label: "TypeScript", col: "text-blue-600" },
              { icon: Box, label: "Docker", col: "text-blue-500" }, { icon: Globe, label: "Next.js", col: "text-white" },
              { icon: Layers, label: "GraphQL", col: "text-pink-500" }, { icon: Cpu, label: "AI/ML", col: "text-emerald-400" },
              { icon: ShieldCheck, label: "CyberSec", col: "text-red-500" }, { icon: Wifi, label: "IoT", col: "text-yellow-400" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={iconPop} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all cursor-default group">
                <item.icon size={32} className={`${item.col} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <AgileWorkflow />
      <section className="py-24 bg-slate-100 dark:bg-[#0b1120] transition-colors duration-500">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-12 uppercase tracking-widest">{t('common.expertise')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {["FinTech", "E-Commerce", "Santé", "Immobilier", "Éducation", "Logistique", "AgriTech"].map((tag, i) => (
                  <span key={i} className="px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 font-bold hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default shadow-sm">
                     #{tag}
                  </span>
               ))}
            </div>
         </div>
      </section>
    </>
  );

  const PortfolioSections = () => (
    <>
      <section className="py-24 bg-slate-900 dark:bg-[#1a1a2e] text-white overflow-hidden transition-colors duration-500">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv {...fadeInUp}>
               <h2 className="text-4xl font-black mb-6">{t('common.creative_studio')}</h2>
               <p className="text-gray-400 text-lg mb-8">{t('common.creative_desc')}</p>
               <div className="flex flex-wrap gap-4">
                  {[
                     { n: "Figma", i: Figma, c: "text-purple-400" }, { n: "Adobe CC", i: Image, c: "text-red-500" },
                     { n: "Blender", i: Box, c: "text-orange-400" }, { n: "After Effects", i: Video, c: "text-indigo-400" }
                  ].map((tool, idx) => (
                     <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <tool.i size={18} className={tool.c} /> <span className="font-bold text-sm">{tool.n}</span>
                     </div>
                  ))}
               </div>
            </MotionDiv>
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-[100px] opacity-20"></div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/10 transform translate-y-8 animate-pulse"></div>
                  <div className="h-40 bg-white/10 rounded-2xl border border-white/20"></div>
                  <div className="h-40 bg-white/10 rounded-2xl border border-white/20"></div>
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/10 transform -translate-y-8 animate-pulse"></div>
               </div>
            </div>
         </div>
      </section>
      <section className="py-20 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
               {[
                  { icon: TrendingUp, val: "+150%", label: "Conversion Moyenne", c: "text-green-500" },
                  { icon: Clock, val: "-40%", label: "Temps de Chargement", c: "text-blue-500" },
                  { icon: Users, val: "2.5M+", label: "Utilisateurs Touchés", c: "text-purple-500" }
               ].map((stat, idx) => (
                  <MotionDiv key={idx} whileHover={{ scale: 1.05 }} className="p-8 rounded-3xl bg-slate-50 dark:bg-[#151e32] shadow-xl border border-gray-100 dark:border-white/5">
                     <stat.icon size={40} className={`mx-auto mb-4 ${stat.c}`} />
                     <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.val}</div>
                     <p className="text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                  </MotionDiv>
               ))}
            </div>
         </div>
      </section>
      <section className="py-24 bg-[#050505] dark:bg-[#0a0f1c] relative overflow-hidden transition-colors duration-500">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <MotionDiv {...fadeInUp}>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('common.awards_title')}</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                     {t('common.awards_desc')}
                  </p>
               </MotionDiv>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { title: "Site of the Day", org: "Awwwards", date: "2024", icon: Award },
                  { title: "Best UI Design", org: "CSS Design Awards", date: "2023", icon: Palette },
                  { title: "Featured", org: "Behance", date: "2023", icon: Star },
                  { title: "Top Agency", org: "Clutch", date: "2022", icon: TrendingUp }
               ].map((award, idx) => (
                  <motion.div key={idx} whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-black mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        <award.icon size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                     <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">{award.org}</p>
                     <div className="mt-auto pt-4 border-t border-white/5 w-full">
                        <span className="text-gray-500 text-sm font-mono">{award.date}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
    </>
  );

  const TeamSections = () => (
    <>
      <section className="py-24 bg-slate-50 dark:bg-[#0b1120] transition-colors duration-500">
         <div className="container mx-auto px-6 text-center">
            <MotionDiv {...fadeInUp} className="mb-12">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('common.tools_title')}</h2>
               <p className="text-gray-500">{t('common.tools_desc')}</p>
            </MotionDiv>
            <div className="flex flex-wrap justify-center gap-8">
               {[
                  { n: "Slack", i: MessageCircle, c: "bg-[#4A154B]" }, { n: "Jira", i: Target, c: "bg-[#0052CC]" },
                  { n: "Github", i: Github, c: "bg-[#333]" }, { n: "Notion", i: FileText, c: "bg-black" },
                  { n: "Zoom", i: Video, c: "bg-[#2D8CFF]" }
               ].map((tool, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center gap-3">
                     <div className={`w-16 h-16 ${tool.c} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                        <tool.i size={30} />
                     </div>
                     <span className="font-bold text-slate-700 dark:text-gray-300">{tool.n}</span>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               { icon: Coffee, title: "Ambiance Cool", desc: "Café à volonté et hiérarchie plate." },
               { icon: GraduationCap, title: "Formation", desc: "Budget illimité pour les livres & cours." },
               { icon: Plane, title: "Retraites", desc: "Voyages d'équipe annuels." },
               { icon: Heart, title: "Santé", desc: "Mutuelle premium pour tous." }
            ].map((perk, idx) => (
               <MotionDiv key={idx} className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <perk.icon size={32} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{perk.title}</h3>
                  <p className="text-sm text-gray-500">{perk.desc}</p>
               </MotionDiv>
            ))}
         </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white text-center">
         <div className="container mx-auto px-6">
            <Globe size={64} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-black mb-6">{t('common.global_vision')}</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
               {t('common.global_desc')}
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-accent hover:text-dark transition-all">
               {t('common.join_movement')} <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </>
  );

  // ==========================================
  // PAGE: CONTACT
  // ==========================================
  const ContactSections = () => (
    <>
      {/* 1. SOCIAL GRID (NEW DESIGN SYSTEM) */}
      <section className="py-24 bg-slate-900 dark:bg-[#050505] text-white transition-colors duration-500">
         <div className="container mx-auto px-6">
            <MotionDiv {...fadeInUp} className="text-center mb-16">
               <h2 className="text-4xl font-black mb-4">{t('common.follow_us')}</h2>
               <p className="text-gray-400">{t('common.dont_miss')}</p>
            </MotionDiv>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {SOCIAL_NETWORKS.map((social, idx) => (
                  <motion.a 
                     key={idx}
                     href={social.href}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     whileHover={{ 
                        scale: 1.02,
                        borderColor: `${social.color}80`,
                        boxShadow: `0 0 30px ${social.shadow}`
                     }}
                     style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                     className="group relative bg-white/5 backdrop-blur-xl border p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden"
                  >
                     {/* Top Line Gradient */}
                     <div 
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: social.color }}
                     ></div>

                     {/* Icon Container */}
                     <div 
                        className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg"
                        style={{ color: social.color }}
                     >
                        <social.icon size={32} className="group-hover:rotate-12 transition-transform duration-500" />
                     </div>
                     
                     {/* Text */}
                     <div className="text-center relative z-10">
                        <span className="block font-black text-xl text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-gray-400 transition-all">
                           {social.name}
                        </span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                           {social.sub}
                        </span>
                     </div>

                     {/* Ambient Background Glow */}
                     <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at center, ${social.color}, transparent 70%)` }}
                     ></div>
                  </motion.a>
               ))}
            </div>
         </div>
      </section>

      {/* 2. DIRECT LINES */}
      <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center shrink-0">
                     <MessageCircle size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">{t('common.support_chat')}</h3>
                     <p className="text-gray-500 mb-2">{t('common.instant_reply')}</p>
                     <button onClick={() => document.getElementById('chatbot-trigger')?.click()} className="text-green-600 font-bold hover:underline">{t('common.open_chat')}</button>
                  </div>
               </div>
               
               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                     <Mail size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">Email</h3>
                     <p className="text-gray-500 mb-2">{t('common.email_contact')}</p>
                     <a href="mailto:contact@mindgraphix.com" className="text-blue-600 font-bold hover:underline">{t('common.write_us')}</a>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                     <Phone size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">Téléphone</h3>
                     <p className="text-gray-500 mb-2">{t('common.phone_contact')}</p>
                     <a href="tel:+22600000000" className="text-purple-600 font-bold hover:underline">+226 01 51 11 46</a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. REPLACED: GLOBAL HUBS SECTION (Luminous) */}
      <section className="py-24 bg-slate-900 dark:bg-[#02040a] relative overflow-hidden transition-colors duration-500">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         {/* Ambient Glows */}
         <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('common.hub_strategic')}</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">{t('common.hub_desc')}</p>
            </div>

            <div className="flex justify-center">
               {/* BOBO HUB */}
               <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(94,53,177,0.3)] w-full max-w-md"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Bobo-Dioulasso</h3>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest">{t('common.headquarters')}</p>
                     </div>
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
                        <Sun size={24} className="group-hover:animate-spin-slow" />
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-white transition-colors">
                        <Clock size={16} className="text-primary"/> 
                        <span>{t('common.open_hours')}</span>
                     </div>
                     <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-white transition-colors">
                        <MapPin size={16} className="text-primary"/> 
                        <span>Secteur 4, Rue 9.15</span>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end items-center">
                     <ArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
    </>
  );

  // ROUTER
  if (path === '/services') return <ServicesSections />;
  if (path === '/portfolio') return <PortfolioSections />;
  if (path === '/team') return <TeamSections />;
  if (path === '/contact') return <ContactSections />;
  
  return null;
};

export default CommonSections;
