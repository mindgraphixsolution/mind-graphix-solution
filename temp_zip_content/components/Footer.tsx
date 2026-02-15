
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Github, Briefcase, Send, Check, AlertCircle, ArrowUp } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
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

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <img src="logo_sans_font.png" alt="MGS" className="h-10 w-auto object-contain" />
              <span className="font-bold text-2xl tracking-tight">Mind <span className="text-primary">Graphix</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-80 max-w-xs">{t('footer.description')}</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"><Icon size={18} /></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-white">
              {t('footer.links_title')}<span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {[{to:"/", l:t('nav.home')}, {to:"/about", l:t('nav.about')}, {to:"/services", l:t('nav.services')}, {to:"/portfolio", l:t('nav.portfolio')}, {to:"/team", l:t('nav.team')}].map((link, idx) => (
                <li key={idx}><Link to={link.to} className="flex items-center gap-2 hover:text-white hover:translate-x-2 transition-all"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary"></span>{link.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-white">
              {t('footer.services_title')}<span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {["Design Graphique", "Développement Web", "UI/UX Design", "Motion Design", "E-commerce"].map((s, idx) => (
                <li key={idx}><Link to="/services" className="hover:text-white transition-all">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-white">
              {t('footer.newsletter_title')}<span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed opacity-80">{t('footer.newsletter_desc')}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('footer.newsletter_placeholder')} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 w-full text-sm focus:outline-none focus:border-primary transition-all text-white" />
              <button type="submit" className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">{t('footer.newsletter_placeholder') === 'Email...' ? 'S\'abonner' : 'Subscribe'} <Send size={16} /></button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2025 {t('footer.rights')}</p>
          <div className="flex gap-6"><a href="#" className="hover:text-white transition-colors">Confidentialité</a><a href="#" className="hover:text-white transition-colors">Mentions légales</a></div>
          <button onClick={scrollToTop} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"><ArrowUp size={16} /></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
