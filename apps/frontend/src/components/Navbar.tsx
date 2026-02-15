'use client';

import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, LogIn, LayoutDashboard, Home, Info, Briefcase, Cpu, Users, Mail, Sparkles, Bell, User } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import ThemeSwitcher from './ui/ThemeSwitcher';

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenClientSpace?: () => void;
  notificationCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth = () => {},
  onOpenClientSpace = () => {},
  notificationCount = 0
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Barre de progression de lecture (Design Architecte)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  // Détection du scroll pour adapter le design de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du scroll du corps lors de l'ouverture du menu mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  /**
   * Récupère le libellé traduit pour les éléments de navigation
   */
  const getTranslatedLabel = (href: string, originalLabel: string) => {
    const keyMap: { [key: string]: string } = {
      '/': 'home',
      '/about': 'about',
      '/services': 'services',
      '/portfolio': 'portfolio',
      '/team': 'team',
      '/contact': 'contact'
    };
    
    const key = keyMap[href];
    return key ? t(`nav.${key}`) : originalLabel;
  };

  const getIcon = (href: string) => {
    switch (href) {
      case '/': return Home;
      case '/about': return Info;
      case '/services': return Cpu;
      case '/portfolio': return Briefcase;
      case '/team': return Users;
      case '/contact': return Mail;
      default: return Sparkles;
    }
  };

  const handleSpaceClick = () => {
    if (isAuthenticated) onOpenClientSpace();
    else onOpenAuth();
  };

  const MotionDiv = motion.div as any;

  return (
    <>
      {/* Barre de progression supérieure */}
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--accent-color)] z-[1001] origin-left shadow-[0_0_15px_var(--accent-glow)]"
        style={{ scaleX }}
      />
      
      {/* Conteneur principal de la Navbar */}
      <div className="fixed top-0 left-0 w-full z-[1000] pointer-events-none flex justify-center pt-4 lg:pt-6 px-4">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            maxWidth: scrolled ? 'fit-content' : '1280px'
          }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
          className={`pointer-events-auto transition-all duration-500 rounded-full border flex items-center justify-between px-4 lg:px-6 py-2 lg:py-3 ${
            scrolled 
              ? 'glass shadow-2xl border-[var(--border-color)]' 
              : 'bg-transparent border-transparent lg:glass'
          }`}
        >
          {/* LOGO (Mind Graphix Solution) */}
          <Link href="/" className="flex items-center gap-3 group relative z-50 shrink-0" onClick={() => setIsOpen(false)}>
            <div className="relative flex items-center gap-2">
              <div className={`relative w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`} style={{ aspectRatio: '1/1' }}>
                <Image 
                  src="/logo_sans_font.png" 
                  alt="MGS Logo"
                  fill
                  className="object-contain filter drop-shadow-lg"
                  priority
                />
              </div>
            </div>
            
            {!scrolled && (
              <div className="flex flex-col justify-center hidden md:flex">
                <div className="font-black text-lg leading-none tracking-tighter text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                  Mind Graphix
                </div>
              </div>
            )}
          </Link>

          {/* NAVIGATION DESKTOP (Menu principal) */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const translatedLabel = getTranslatedLabel(item.href, item.label);
              const Icon = getIcon(item.href);
               return (
                 <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 group ${
                    isActive 
                      ? 'text-[var(--text-main)]' 
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                 >
                   {isActive && (
                     <motion.div
                       layoutId="nav-pill"
                       className="absolute inset-0 bg-[var(--bg-accent)] rounded-full -z-10 border border-[var(--border-color)] shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.15)]"
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                   )}
                   <Icon size={14} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)]'}`} />
                   <span className="relative">
                     {translatedLabel}
                     {isActive && (
                       <motion.span 
                         layoutId="nav-dot"
                         className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent-color)] rounded-full shadow-[0_0_8px_var(--accent-color)]"
                       />
                     )}
                   </span>
                 </Link>
               )
            })}
          </nav>

          {/* ACTIONS (Langue, Thème, Espace Client) */}
          <div className="flex items-center gap-2 pl-2 lg:pl-4">
              {/* Bouton Notifications */}
              <button 
                onClick={onOpenClientSpace}
                className="relative w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-[var(--bg-accent)] transition-all border border-[var(--border-color)] hover:border-[var(--accent-color)] shadow-sm group"
              >
                <Bell size={18} className="text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors" />
                {notificationCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-color)] rounded-full shadow-[0_0_8px_var(--accent-color)] animate-pulse"></span>
                )}
              </button>

              {/* Sélecteur de Langue */}
              <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-[var(--bg-accent)] transition-all text-xs font-black text-[var(--text-main)] border border-[var(--border-color)] hover:border-[var(--accent-color)] shadow-sm"
              >
                {language.toUpperCase()}
              </button>

              {/* Sélecteur de Thème (Desktop uniquement) */}
              <div className="hidden lg:block">
                <ThemeSwitcher />
              </div>

              {/* Bouton Espace Client / Connexion (Icône uniquement pour design futuriste) */}
              <button
                onClick={handleSpaceClick}
                className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[var(--accent-color)] text-white shadow-lg shadow-[var(--accent-color)]/20 hover:scale-105 active:scale-95 transition-all group"
              >
                {isAuthenticated ? <LayoutDashboard size={20} /> : <User size={20} />}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent-color)] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                  initial={false}
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </button>

              {/* Bouton Menu Mobile (Hamburger) */}
              <button 
                className="lg:hidden p-2 rounded-full glass hover:bg-[var(--bg-accent)] transition-colors text-[var(--text-main)] border border-[var(--border-color)]"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={20} />
              </button>
          </div>
        </motion.header>
      </div>

      {/* MENU MOBILE (DRAWER) */}
      <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay d'arrière-plan */}
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1005]"
              />
              
              {/* Contenu du Drawer */}
              <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[var(--bg-primary)] border-l border-[var(--border-color)] shadow-2xl z-[1010] flex flex-col backdrop-blur-2xl transition-colors duration-300"
              >
                  {/* En-tête du Menu Mobile */}
                  <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-color)]">{t('nav.menu')}</span>
                     <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-accent)] rounded-full transition-colors border border-transparent hover:border-[var(--border-color)]"><X size={24} /></button>
                  </div>

                  {/* Liens de Navigation Mobile */}
                  <nav className="flex-grow py-6 px-4 space-y-2 overflow-y-auto">
                      {NAV_ITEMS.map((item) => {
                          const isActive = pathname === item.href;
                          const translatedLabel = getTranslatedLabel(item.href, item.label);
                          const Icon = getIcon(item.href);
                          return (
                              <Link 
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-tighter transition-all group ${
                                      isActive 
                                          ? 'bg-[var(--bg-accent)] text-[var(--text-main)] border border-[var(--border-color)] shadow-[0_0_15px_rgba(var(--accent-color-rgb),0.1)]' 
                                          : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-accent)]'
                                  }`}
                              >
                                  <div className="flex items-center gap-4">
                                      <Icon size={20} className={isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)]'} />
                                      <span>{translatedLabel}</span>
                                  </div>
                                  <motion.div
                                      initial={false}
                                      animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                                  >
                                      <Sparkles size={18} className="text-[var(--accent-color)]" />
                                  </motion.div>
                              </Link>
                          );
                      })}
                  </nav>

                  {/* Pied de Menu Mobile (Thème et Actions) */}
                  <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
                      <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Thème</span>
                          <ThemeSwitcher />
                      </div>
                      
                      <button 
                          onClick={handleSpaceClick}
                          className="w-full py-4 bg-[var(--accent-color)] text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[var(--accent-color)]/20"
                      >
                          {isAuthenticated ? <LayoutDashboard size={18} /> : <User size={18} />}
                          <span>{isAuthenticated ? t('nav.clientSpace') : t('widget.login')}</span>
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
