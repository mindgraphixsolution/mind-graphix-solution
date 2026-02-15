
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, User, Globe, LogIn, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
// @ts-ignore
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import ThemeSwitcher from './ui/ThemeSwitcher';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenClientSpace: () => void;
  notificationCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth, 
  onOpenClientSpace, 
  notificationCount = 0 
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const getTranslatedLabel = (href: string, originalLabel: string) => {
    switch (href) {
      case '/': return t('nav.home');
      case '/about': return t('nav.about');
      case '/services': return t('nav.services');
      case '/portfolio': return t('nav.portfolio');
      case '/team': return t('nav.team');
      case '/contact': return t('nav.contact');
      default: return originalLabel;
    }
  };

  const handleSpaceClick = () => {
    if (isAuthenticated) onOpenClientSpace();
    else onOpenAuth();
  };

  const MotionDiv = motion.div as any;

  return (
    <>
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary z-[1001] origin-left"
        style={{ scaleX }}
      />
      
      <div className="fixed top-0 left-0 w-full z-[1000] pointer-events-none flex justify-center pt-4 lg:pt-6 px-4">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            width: scrolled ? '100%' : '100%',
            maxWidth: scrolled ? 'fit-content' : '1280px'
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`pointer-events-auto transition-all duration-500 rounded-full border flex items-center justify-between px-4 lg:px-6 py-2 lg:py-3 ${
            scrolled 
              ? 'bg-black/60 border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border-transparent lg:bg-white/5 lg:border-white/10 lg:backdrop-blur-md'
          }`}
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group relative z-50 shrink-0" onClick={() => setIsOpen(false)}>
             <div className="relative flex items-center gap-2">
               <img 
                 src="logo_sans_font.png" 
                 onError={(e: any) => {
                   e.currentTarget.style.display = 'none';
                   const fallback = e.currentTarget.parentElement.querySelector('.fallback-logo');
                   if (fallback) fallback.classList.remove('hidden');
                 }}
                 alt="MGS Logo" 
                 className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`} 
               />
               <div className="fallback-logo hidden relative bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg border border-white/20 w-10 h-10">
                  <span className="text-white font-bold">M</span>
               </div>
             </div>
             
             {!scrolled && (
               <div className="flex flex-col justify-center hidden md:flex">
                  <div className="font-bold text-lg leading-none tracking-tight text-white">
                    Mind Graphix
                  </div>
               </div>
             )}
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              const translatedLabel = getTranslatedLabel(item.href, item.label);
               return (
                 <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                 >
                   {isActive && (
                     <motion.div
                       layoutId="nav-pill"
                       className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(94,53,177,0.5)]"
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                   )}
                   {translatedLabel}
                 </Link>
               )
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 pl-2 lg:pl-4">
              <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-white border border-white/5"
              >
                {language.toUpperCase()}
              </button>

              <div className="hidden lg:block">
                <ThemeSwitcher />
              </div>

              {/* Mon Espace Button */}
              <button
                onClick={handleSpaceClick}
                className={`hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent hover:scale-105 transition-all shadow-lg ${scrolled ? 'h-8 px-4' : 'h-10'}`}
              >
                {isAuthenticated ? <LayoutDashboard size={16} /> : <LogIn size={16} />}
                <span>{isAuthenticated ? t('nav.clientSpace') : t('nav.clientSpace')}</span>
              </button>

              <button 
                className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white border border-white/5"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={20} />
              </button>
          </div>
        </motion.header>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1005]"
              />
              
              <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#0a0e17]/95 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[1010] flex flex-col backdrop-blur-xl"
              >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                     <span className="text-sm font-bold uppercase tracking-widest text-primary">{t('nav.menu')}</span>
                     <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
                  </div>

                  {/* Links */}
                  <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                      {NAV_ITEMS.map((item) => {
                          const isActive = location.pathname === item.href;
                          return (
                              <Link 
                                key={item.label} 
                                to={item.href} 
                                onClick={() => setIsOpen(false)} 
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                                  isActive 
                                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(94,53,177,0.2)]' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                              >
                                  <item.icon size={20} className={isActive ? "text-primary" : "text-gray-500"} />
                                  <span className="font-bold text-lg">{getTranslatedLabel(item.href, item.label)}</span>
                              </Link>
                          );
                      })}
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="p-6 border-t border-white/10 space-y-4">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">{t('nav.theme')}</span>
                        <ThemeSwitcher />
                     </div>

                     <button 
                        onClick={() => { setIsOpen(false); handleSpaceClick(); }}
                        className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:opacity-90 transition-all w-full"
                     >
                        {isAuthenticated ? <LayoutDashboard size={20} /> : <LogIn size={20} />}
                        <span>{isAuthenticated ? t('nav.clientSpace') : t('nav.clientSpace')}</span>
                     </button>
                  </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </>
  );
};

export default Navbar;
