
import React, { useState } from 'react';
import Section from './ui/Section';
import { MapPin, Phone, Mail, Send, Check, Globe, Clock, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import WorldGlobe from './ui/WorldGlobe';

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
    <div className="bg-slate-50 dark:bg-dark min-h-screen pt-20">
       
       {/* HERO SECTION */}
       <section className="relative h-[50vh] bg-[#02040a] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
             {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{ width: Math.random() * 2 + 'px', height: Math.random() * 2 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.5 + 0.1, animationDuration: Math.random() * 3 + 2 + 's' }} />
             ))}
          </div>
          <div className="absolute inset-0 z-10 opacity-70 scale-110"><WorldGlobe /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark via-transparent to-[#02040a]/80 z-20"></div>
          <div className="container mx-auto px-6 relative z-30 text-center mt-10">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-block">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">{t('contact.header_title')}</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">{t('contact.header_sub')}</p>
             </motion.div>
          </div>
       </section>

      <div className="container mx-auto px-6 -mt-20 pb-24 relative z-40">
         <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: INFO & MAP */}
            <div className="lg:col-span-5 space-y-6">
               <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 dark:bg-[#151e32]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-white/5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Globe size={20} className="text-primary"/> {t('contact.info_title')}</h3>
                  <div className="space-y-8">
                     <div className="group flex items-start gap-4 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0"><MapPin size={24} /></div>
                        <div><div className="font-bold text-slate-800 dark:text-white text-lg">{t('contact.address_label')}</div><p className="text-slate-500 dark:text-gray-400 text-sm">Secteur N°4, Bobo-Dioulasso<br/>Burkina Faso</p></div>
                     </div>
                     <div className="group flex items-start gap-4 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0"><Phone size={24} /></div>
                        <div><div className="font-bold text-slate-800 dark:text-white text-lg">{t('contact.phone_label')}</div><p className="text-slate-500 dark:text-gray-400 text-sm"><a href="tel:+22601511146" className="hover:text-primary">+226 01 51 11 46</a></p></div>
                     </div>
                     <div className="group flex items-start gap-4 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 shrink-0"><Mail size={24} /></div>
                        <div><div className="font-bold text-slate-800 dark:text-white text-lg">{t('contact.email_label')}</div><p className="text-slate-500 dark:text-gray-400 text-sm break-all"><a href="mailto:mindgraphixsolution@gmail.com" className="hover:text-primary">mindgraphixsolution@gmail.com</a></p></div>
                     </div>
                  </div>
               </MotionDiv>

               {/* GOOGLE MAP INTEGRATION */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.3 }}
                  className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg h-[300px] relative group"
               >
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31184.168798939765!2d-4.32244665!3d11.1777227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe34fbba47225619%3A0x1c36056557672729!2sBobo-Dioulasso%2C%20Burkina%20Faso!5e0!3m2!1sfr!2sfr!4v1709228956422!5m2!1sfr!2sfr" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(100%) invert(90%) contrast(80%)'}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="group-hover:filter-none transition-all duration-700"
                  ></iframe>
                  {/* Map Overlay for Style */}
                  <div className="absolute inset-0 pointer-events-none border-[6px] border-white/20 rounded-3xl"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     Siège Social
                  </div>
               </motion.div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div className="lg:col-span-7">
               <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-[#151e32] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('contact.form_title')}</h2>
                     <MessageSquare size={32} className="text-primary opacity-20"/>
                  </div>

                  {isSent ? (
                     <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 p-12 rounded-3xl flex flex-col items-center text-center animate-fade-in h-full justify-center">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 mb-6"><Check size={48} /></div>
                        <h4 className="font-bold text-3xl text-slate-900 dark:text-white mb-2">{t('contact.success_title')}</h4>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg">{t('contact.success_desc')}</p>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('contact.form_name')}</label>
                              <input type="text" required className="w-full bg-slate-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all dark:text-white" placeholder="John Doe" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('contact.form_email')}</label>
                              <input type="email" required className="w-full bg-slate-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all dark:text-white" placeholder="john@example.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('contact.form_subject')}</label>
                           <input type="text" required className="w-full bg-slate-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all dark:text-white" value={formState.subject} onChange={(e) => setFormState({...formState, subject: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('contact.form_message')}</label>
                           <textarea rows={6} required className="w-full bg-slate-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all resize-none dark:text-white" value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})}></textarea>
                        </div>
                        <div className="pt-4 flex justify-end">
                           <button type="submit" className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3">{t('contact.btn_send')} <Send size={20} /></button>
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
