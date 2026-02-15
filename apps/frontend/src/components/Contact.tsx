'use client';

import React, { useState, useRef } from 'react';
import Section from './ui/Section';
import { MapPin, Phone, Mail, Send, Check, Globe, Clock, MessageSquare, ArrowDown, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import WorldGlobe from './ui/WorldGlobe';
import NeuralBackground from './ui/NeuralBackground';
import Magnetic from './ui/Magnetic';
import Breadcrumbs from './ui/Breadcrumbs';

const ContactHero = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0.4]);
  const scaleHero = useTransform(scrollY, [0, 600], [1, 0.98]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 z-0">
         <div className="bg-noise opacity-20"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--accent-glow)] opacity-[0.2] rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-color)] opacity-[0.1] rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
         <div className="absolute inset-0 z-10 opacity-10 scale-150 grayscale pointer-events-none"><WorldGlobe /></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
           <motion.div style={{ opacity: opacityHero, y: yParallax, scale: scaleHero }} className="max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-10 flex justify-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-[var(--border-color)] shadow-2xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-color)]"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    DISPONIBLE 24/7
                  </span>
                </div>
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-[var(--text-main)] mb-10 leading-[0.75] tracking-tighter uppercase">
                NOUS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">CONTACTER</span>
              </h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl text-[var(--text-muted)] max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                <p>Prêt à transformer vos idées en réalité ? Discutons de votre prochain projet et construisons ensemble le futur de votre entreprise.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Magnetic strength={30}>
                  <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-architect text-xl py-5 px-12 flex items-center justify-center gap-4 group">
                    Démarrer un projet 
                    <ArrowDown size={22} className="group-hover:translate-y-2 transition-transform" />
                  </button>
                </Magnetic>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Section Contact
 * Redessinée avec une architecture épurée, un design glassmorphism et une lisibilité maximale.
 */
const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
       setIsSent(false);
       setFormState({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const MotionDiv = motion.div as any;

  return (
    <div className="bg-[var(--bg-primary)]">
       <ContactHero t={t} />
       
       <div id="contact-form" className="container mx-auto px-6 pb-24 relative z-40 -mt-20">
          <div className="grid lg:grid-cols-12 gap-12">
             
             {/* COLONNE GAUCHE : INFOS & CARTE */}
             <div className="lg:col-span-5 space-y-8">
                <MotionDiv 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="glass p-10 rounded-[3rem] shadow-2xl border border-[var(--border-color)] relative overflow-hidden group"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-glow)] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                   <h3 className="text-2xl font-black text-[var(--text-main)] mb-10 flex items-center gap-4 uppercase tracking-tighter">
                      <Globe size={24} className="text-[var(--accent-color)]"/> {t('contact.info_title')}
                   </h3>
                   <div className="space-y-10">
                      <div className="group/item flex items-start gap-6 transition-all hover:translate-x-2">
                         <div className="w-16 h-16 bg-[var(--accent-glow)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] shrink-0 border border-[var(--border-color)] group-hover/item:bg-[var(--accent-color)] group-hover/item:text-white transition-all duration-500 shadow-lg">
                            <MapPin size={28} />
                         </div>
                         <div>
                            <div className="font-black text-[var(--text-main)] text-xl uppercase tracking-tight mb-1">{t('contact.address_label')}</div>
                            <p className="text-[var(--text-muted)] text-base font-light leading-relaxed">Secteur N°4, Bobo-Dioulasso<br/>Burkina Faso</p>
                         </div>
                      </div>
                      <div className="group/item flex items-start gap-6 transition-all hover:translate-x-2">
                         <div className="w-16 h-16 bg-[var(--accent-glow)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] shrink-0 border border-[var(--border-color)] group-hover/item:bg-[var(--accent-color)] group-hover/item:text-white transition-all duration-500 shadow-lg">
                            <Phone size={28} />
                         </div>
                         <div>
                            <div className="font-black text-[var(--text-main)] text-xl uppercase tracking-tight mb-1">{t('contact.phone_label')}</div>
                            <p className="text-[var(--text-muted)] text-base font-light"><a href="tel:+22601511146" className="hover:text-[var(--accent-color)] transition-colors">+226 01 51 11 46</a></p>
                         </div>
                      </div>
                      <div className="group/item flex items-start gap-6 transition-all hover:translate-x-2">
                         <div className="w-16 h-16 bg-[var(--accent-glow)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] shrink-0 border border-[var(--border-color)] group-hover/item:bg-[var(--accent-color)] group-hover/item:text-white transition-all duration-500 shadow-lg">
                            <Mail size={28} />
                         </div>
                         <div>
                            <div className="font-black text-[var(--text-main)] text-xl uppercase tracking-tight mb-1">{t('contact.email_label')}</div>
                            <p className="text-[var(--text-muted)] text-base font-light break-all"><a href="mailto:mindgraphixsolution@gmail.com" className="hover:text-[var(--accent-color)] transition-colors">mindgraphixsolution@gmail.com</a></p>
                         </div>
                      </div>
                   </div>
                </MotionDiv>

                {/* INTÉGRATION GOOGLE MAP */}
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} 
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ delay: 0.1, duration: 0.5 }}
                   className="rounded-[3rem] overflow-hidden border border-[var(--border-color)] shadow-2xl h-[400px] relative group"
                >
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31184.168798939765!2d-4.32244665!3d11.1777227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe34fbba47225619%3A0x1c36056557672729!2sBobo-Dioulasso%2C%20Burkina%20Faso!5e0!3m2!1sfr!2sfr!4v1709228956422!5m2!1sfr!2sfr" 
                     width="100%" 
                     height="100%" 
                     style={{border:0, filter: 'grayscale(100%) contrast(90%) brightness(80%)'}} 
                     allowFullScreen={true} 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     className="group-hover:filter-none transition-all duration-1000"
                   ></iframe>
                   <div className="absolute inset-0 pointer-events-none border-[12px] border-[var(--bg-primary)] opacity-40 rounded-[3rem]"></div>
                   <div className="absolute bottom-6 left-6 glass px-5 py-2 rounded-full text-sm font-black shadow-2xl flex items-center gap-3 border border-[var(--border-color)]">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                      <span className="uppercase tracking-widest text-[var(--text-main)]">Siège Social</span>
                   </div>
                </motion.div>
             </div>

             {/* COLONNE DROITE : FORMULAIRE */}
             <div className="lg:col-span-7">
                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2, duration: 0.5 }} 
                  className="glass p-10 md:p-16 rounded-[4rem] shadow-2xl border border-[var(--border-color)] relative overflow-hidden h-full group"
                >
                   <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-[120px] pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"></div>
                   
                   <div className="flex justify-between items-center mb-12">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] uppercase tracking-tighter mb-4">{t('contact.form_title')}</h2>
                        <div className="w-20 h-1.5 bg-[var(--accent-color)] rounded-full"></div>
                      </div>
                      <MessageSquare size={48} className="text-[var(--accent-color)] opacity-20 hidden md:block"/>
                   </div>

                   {isSent ? (
                      <div className="bg-[var(--accent-color)]/5 border border-[var(--accent-color)]/20 p-16 rounded-[3rem] flex flex-col items-center text-center animate-fade-in h-full justify-center">
                         <div className="w-32 h-32 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[var(--accent-color)]/40 mb-10"><Check size={64} /></div>
                         <h4 className="font-black text-4xl text-[var(--text-main)] mb-4 uppercase tracking-tight">{t('contact.success_title')}</h4>
                         <p className="text-[var(--text-muted)] max-w-md text-xl font-light">{t('contact.success_desc')}</p>
                      </div>
                   ) : (
                      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                         <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                               <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em] ml-2">{t('contact.form_name')}</label>
                               <input type="text" required className="w-full bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--accent-color)] focus:ring-4 focus:ring-[var(--accent-color)]/10 transition-all text-[var(--text-main)] text-lg font-light" placeholder="Votre nom" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
                            </div>
                            <div className="space-y-3">
                               <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em] ml-2">{t('contact.form_email')}</label>
                               <input type="email" required className="w-full bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--accent-color)] focus:ring-4 focus:ring-[var(--accent-color)]/10 transition-all text-[var(--text-main)] text-lg font-light" placeholder="votre@email.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em] ml-2">{t('contact.form_subject')}</label>
                            <input type="text" required className="w-full bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--accent-color)] focus:ring-4 focus:ring-[var(--accent-color)]/10 transition-all text-[var(--text-main)] text-lg font-light" value={formState.subject} onChange={(e) => setFormState({...formState, subject: e.target.value})} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em] ml-2">{t('contact.form_message')}</label>
                            <textarea rows={6} required className="w-full bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--accent-color)] focus:ring-4 focus:ring-[var(--accent-color)]/10 transition-all resize-none text-[var(--text-main)] text-lg font-light" placeholder="Comment pouvons-nous vous aider ?" value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})}></textarea>
                         </div>
                         <div className="pt-8 flex justify-end">
                            <Magnetic strength={30}>
                               <button type="submit" className="btn-architect text-xl py-5 px-12 flex items-center gap-4 group">
                                  {t('contact.btn_send')} <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                               </button>
                            </Magnetic>
                         </div>
                      </form>
                   )}
                </MotionDiv>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;

