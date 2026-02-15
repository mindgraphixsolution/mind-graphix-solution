'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Send, ArrowUp, Mail, Phone, MapPin, Globe, ExternalLink, Sparkles, Home, Info, Cpu, Briefcase, Users, ShieldCheck, Zap, Globe2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const MotionDiv = motion.div as any;

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] text-[var(--text-main)] pt-32 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients & Noise */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-50"></div>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--accent-glow)] rounded-full blur-[120px] pointer-events-none opacity-[0.07]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-noise opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-4 mb-10 group w-fit">
              <div className="relative h-16 w-16 glass border border-[var(--border-color)] rounded-2xl flex items-center justify-center p-3 group-hover:border-[var(--accent-color)] transition-all duration-700 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image 
                  src="/logo_sans_font.png" 
                  alt="MGS" 
                  width={40}
                  height={40}
                  className="object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 z-10" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl tracking-tighter text-[var(--text-main)] uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--accent-color)]">Mind <span>Graphix</span></span>
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[var(--text-muted)] opacity-60 mt-1">Solution Architecture</span>
              </div>
            </Link>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-10 opacity-80 font-medium max-w-md">
              {t('footer.description') || 'Nous concevons des écosystèmes digitaux où l\'esthétique rencontre la performance technologique.'}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://facebook.com/mindgraphix", color: "hover:bg-blue-600" },
                { Icon: Twitter, href: "https://twitter.com/mindgraphix", color: "hover:bg-sky-500" },
                { Icon: Instagram, href: "https://instagram.com/mindgraphix", color: "hover:bg-pink-600" },
                { Icon: Linkedin, href: "https://linkedin.com/company/mindgraphix", color: "hover:bg-blue-700" },
                { Icon: Github, href: "https://github.com/mindgraphix", color: "hover:bg-gray-800" }
              ].map(({ Icon, href, color }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  className={`w-12 h-12 rounded-2xl glass border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-2xl ${color}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[var(--bg-accent)]/30 border border-[var(--border-color)] rounded-[2.5rem] p-8 lg:p-12 glass relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={120} className="text-[var(--accent-color)]" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight mb-4">
                {t('footer.newsletter_title') || 'Prêt pour le futur ?'}
              </h3>
              <p className="text-[var(--text-muted)] mb-10 max-w-sm font-medium">
                Rejoignez notre cercle d'innovation et recevez des insights exclusifs sur le design et la tech.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-color)] transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder={t('footer.newsletter_placeholder') || 'votre@email.com'} 
                    className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-14 py-5 w-full text-sm focus:outline-none focus:border-[var(--accent-color)] transition-all text-[var(--text-main)] font-bold shadow-inner" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-[var(--accent-color)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[var(--accent-color)]/30 flex items-center justify-center gap-3"
                >
                  {status === 'success' ? 'Inscrit !' : 'S\'abonner'}
                  <Send size={16} />
                </button>
              </form>
              <div className="mt-6 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-accent)] bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[var(--accent-color)] to-[var(--text-muted)] opacity-50" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-60">
                  Plus de 500+ leaders nous font confiance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 mb-24 border-y border-[var(--border-color)] py-16">
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-color)]">Navigation</h4>
            <ul className="space-y-4">
              {[
                {href:"/", l:t('nav.home'), icon: Home}, 
                {href:"/about", l:t('nav.about'), icon: Info}, 
                {href:"/services", l:t('nav.services'), icon: Cpu}, 
                {href:"/portfolio", l:t('nav.portfolio'), icon: Briefcase}
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3 group transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] scale-0 group-hover:scale-100 transition-transform" />
                    {link.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-color)]">Studio</h4>
            <ul className="space-y-4">
              {[
                {l: "Notre Équipe", href: "/team"},
                {l: "Carrières", href: "/careers"},
                {l: "Blog", href: "/blog"},
                {l: "Status", href: "/status"}
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3 group transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] scale-0 group-hover:scale-100 transition-transform" />
                    {link.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-color)]">Contact Direct</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="glass border border-[var(--border-color)] rounded-2xl p-6 hover:border-[var(--accent-color)] transition-all group">
                <Mail className="text-[var(--accent-color)] mb-4" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Email</p>
                <a href="mailto:mindgraphixsolution@gmail.com" className="text-sm font-black text-[var(--text-main)]">mindgraphixsolution@gmail.com</a>
              </div>
              <div className="glass border border-[var(--border-color)] rounded-2xl p-6 hover:border-[var(--accent-color)] transition-all group">
                <Phone className="text-[var(--accent-color)] mb-4" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Studio</p>
                <a href="tel:+22601511146" className="text-sm font-black text-[var(--text-main)]">+226 01 51 11 46</a>
              </div>
            </div>
          </div>

          {isAuthenticated && (
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-color)]">Devis</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/devis" className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3 group transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] scale-0 group-hover:scale-100 transition-transform" />
                    {t('nav.quote') || 'Demander un Devis'}
                  </Link>
                </li>
                <li>
                  <Link href="/suivi-devis" className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3 group transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] scale-0 group-hover:scale-100 transition-transform" />
                    {t('widget.track') || 'Suivi de Devis'}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-60">
              &copy; 2026 MGS Architecture. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[var(--bg-accent)] rounded-full border border-[var(--border-color)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Systems Operational</span>
            </div>
          </div>
          
          <div className="flex gap-8">
            {['Privacy', 'Legal', 'Cookies'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors">{item}</Link>
            ))}
          </div>

          <button 
            onClick={scrollToTop} 
            className="group flex items-center gap-4 pl-6 pr-2 py-2 glass border border-[var(--border-color)] hover:border-[var(--accent-color)] rounded-2xl text-[var(--text-main)] transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-[var(--accent-color)] transition-colors">Back to Top</span>
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-accent)] flex items-center justify-center group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all transform group-hover:-translate-y-1">
              <ArrowUp size={20} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
