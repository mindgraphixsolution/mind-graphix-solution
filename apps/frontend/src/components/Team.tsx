'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Github, Linkedin, Dribbble, Globe, Briefcase, 
  ExternalLink, Code, Palette, Terminal, Cpu, Sparkles, Layers,
  ArrowRight, ArrowDown, BrainCircuit, Rocket, Heart, Shield,
  Users, Target, Zap, X, Lock
} from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { api } from '../lib/api';
import NeuralBackground from './ui/NeuralBackground';
import Breadcrumbs from './ui/Breadcrumbs';
import Magnetic from './ui/Magnetic';
import Section from './ui/Section';

// Keep icons mapping for dynamic rendering if needed
const ICON_MAP: any = { Terminal, Palette, Code, Cpu, Sparkles, Layers };

/**
 * Carte de Membre de l'Équipe
 * Design architectural avec effet glassmorphism et interactions fluides.
 */
export const TeamCard: React.FC<{ member: any }> = ({ member }) => {
  const MotionDiv = motion.div as any;
  const Icon = ICON_MAP[member.iconName] || Terminal;

  return (
    <MotionDiv 
       className="group relative glass rounded-[2.5rem] overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all duration-500 hover:shadow-[0_0_40px_var(--accent-glow)] h-full"
    >
       <div className="flex flex-col md:flex-row h-full">
          
          {/* Section Image */}
          <div className="w-full md:w-2/5 relative h-72 md:h-auto overflow-hidden">
             <Image 
                src={member.image || "/images/placeholders/team.png"} 
                alt={member.name} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[var(--bg-secondary)] opacity-80"></div>
             
             {/* Icône de Rôle Flottante */}
             <div className="absolute top-4 left-4 w-12 h-12 glass backdrop-blur-md rounded-2xl flex items-center justify-center text-[var(--text-main)] border border-[var(--border-color)] shadow-lg group-hover:bg-[var(--accent-color)] group-hover:text-[var(--text-inv)] group-hover:border-[var(--accent-color)] transition-all">
                <Icon size={24} />
             </div>
          </div>

          {/* Section Contenu */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-between relative">
             {/* Lueur Décorative */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-glow)] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

             <div>
                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--text-main)] group-hover:to-[var(--accent-color)] transition-all">
                   {member.name}
                </h3>
                <p className="text-[var(--accent-color)] text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 border-l-2 border-[var(--border-color)] pl-4">
                   {member.bio || "Expert passionné dédié à la création d'expériences numériques exceptionnelles."}
                </p>

                {/* Tags de Compétences */}
                <div className="mb-6">
                   <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-3 flex items-center gap-2">
                      <Code size={12} /> Expertises
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {(member.skills || ['Innovation', 'Design', 'Code']).map((skill: string) => (
                         <span key={skill} className="px-3 py-1 glass border border-[var(--border-color)] rounded-full text-xs text-[var(--text-muted)] font-medium group-hover:border-[var(--accent-color)] group-hover:text-[var(--text-main)] transition-colors">
                            {skill}
                         </span>
                      ))}
                   </div>
                </div>
             </div>

             {/* Actions en Bas */}
             <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] mt-auto">
                <div className="flex gap-3">
                   {member.linkedin && (
                      <a href={member.linkedin} className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors p-2 hover:bg-[var(--bg-accent)] rounded-full" title="LinkedIn">
                         <Linkedin size={18} />
                      </a>
                   )}
                   {member.github && (
                      <a href={member.github} className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors p-2 hover:bg-[var(--bg-accent)] rounded-full" title="Github">
                         <Github size={18} />
                      </a>
                   )}
                </div>

                <Link 
                   href="/contact" 
                   className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] hover:text-[var(--accent-color)] transition-colors group/btn"
                >
                   Contact <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>
       </div>
    </MotionDiv>
  );
};

const TeamHero = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 1000], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.4]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.99]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 z-0">
         <div className="bg-noise opacity-20"></div>
         <NeuralBackground />
         <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--accent-glow)] opacity-[0.2] rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--accent-color)] opacity-[0.1] rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
           <motion.div style={{ opacity: opacityHero, y: yParallax, scale: scaleHero }} className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-10 flex justify-center lg:justify-start"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-[var(--border-color)] shadow-2xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-color)]"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    L'EXCELLENCE HUMAINE
                  </span>
                </div>
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-[var(--text-main)] mb-10 leading-[0.75] tracking-tighter uppercase">
                L'ÉQUIPE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">MIND GRAPHIX</span>
              </h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl text-[var(--text-muted)] max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light">
                <p>Une équipe multidisciplinaire unie par la volonté de créer l'exceptionnel et de repousser les limites du digital.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <Magnetic strength={30}>
                  <button onClick={() => document.getElementById('team-grid')?.scrollIntoView({ behavior: 'smooth' })} className="btn-architect text-xl py-5 px-12 flex items-center justify-center gap-4 group">
                    Rencontrer les talents 
                    <ArrowDown size={22} className="group-hover:translate-y-2 transition-transform" />
                  </button>
                </Magnetic>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} 
             className="lg:col-span-5 relative hidden lg:block h-[600px] xl:h-[700px]"
           >
              <div className="relative w-full h-full perspective-2000">
                 <motion.div 
                   animate={{ y: [0, -30, 0], rotateY: [-5, 5, -5] }} 
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
                   className="absolute top-0 right-0 w-80 xl:w-96 h-[500px] xl:h-[600px] rounded-[4rem] overflow-hidden border border-[var(--border-color)] shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-10 bg-[var(--bg-secondary)] group"
                 >
                    <Image 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                      alt="L'Équipe Mind Graphix" 
                      fill
                      priority
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4s] ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60"></div>
                 </motion.div>
                 
                 <motion.div 
                   animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
                   transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                   className="absolute bottom-20 left-[-15%] w-80 glass border border-[var(--border-color)] p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20 backdrop-blur-3xl"
                 >
                    <div className="flex items-center gap-6 mb-8">
                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-glow)] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(var(--accent-rgb),0.4)]">
                        <Heart size={32} />
                       </div>
                       <div>
                         <div className="text-lg font-black text-[var(--text-main)] uppercase tracking-tight">Culture</div>
                         <div className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest opacity-60">Esprit d'équipe</div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           whileInView={{ width: '100%' }} 
                           transition={{ duration: 3, delay: 0.8 }} 
                           className="h-full bg-gradient-to-r from-[var(--accent-color)] to-white"
                         ></motion.div>
                       </div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent-color)]">
                         <span>Synergie Créative</span>
                         <span>A++</span>
                       </div>
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Section Équipe
 * Présente les experts de l'agence avec un design épuré et moderne.
 */
const Team: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [members, setMembers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showJobForm, setShowJobForm] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setIsLoading(true);
        const data = await api.getTeam();
        setMembers(data);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'équipe:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTeam();
  }, []);

  const handleJobFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowJobForm(false);
      setFormSubmitted(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)]">
      <TeamHero t={t} />
      
      <Section id="team-grid" className="bg-[var(--bg-primary)] transition-colors duration-300 relative overflow-hidden pt-0">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-5"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Impact/Chiffres */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] mb-4 uppercase">
                {t('team.stats_title')}
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{t('team.stats_subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Projets', value: '150+', icon: Rocket },
                { label: 'Clients', value: '85', icon: Users },
                { label: 'Cafés', value: '12k', icon: Zap },
                { label: 'Uptime', value: '99.9%', icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="glass p-8 rounded-3xl text-center border border-[var(--border-color)] group hover:border-[var(--accent-color)] transition-all">
                  <stat.icon className="mx-auto mb-4 text-[var(--accent-color)] group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-3xl font-black text-[var(--text-main)] mb-1">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            {members.map((member, idx) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Section Valeurs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-32 p-12 glass border border-[var(--border-color)] rounded-[3rem] relative overflow-hidden"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] mb-4 uppercase">
                {t('team.values_title')}
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{t('team.values_subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'Excellence', desc: 'Nous ne visons rien de moins que la perfection dans chaque pixel et chaque ligne de code.', icon: Target },
                { title: 'Innovation', desc: 'Explorer de nouvelles frontières technologiques est dans notre ADN.', icon: BrainCircuit },
                { title: 'Transparence', desc: 'Une communication honnête et directe pour bâtir des relations durables.', icon: Globe },
              ].map((value, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-[var(--accent-color)] mx-auto mb-6 border border-[var(--border-color)]">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 uppercase tracking-tight">{value.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mt-32 p-12 glass border-[var(--border-color)] rounded-[3rem] text-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)]/5 via-transparent to-[var(--accent-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 uppercase tracking-tighter">
                {t('team.join_us_title')}
             </h2>
             <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-12 font-light">
                {t('team.description')}
             </p>
             <div className="flex justify-center">
                <Magnetic strength={30}>
                   <button 
                    onClick={() => setShowJobForm(true)}
                    className="btn-architect text-lg py-4 px-10"
                   >
                      {t('team.join_us_btn')}
                   </button>
                </Magnetic>
             </div>
          </motion.div>
        </div>
      </Section>

      {/* Modal Formulaire d'emploi */}
      {showJobForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass border border-[var(--border-color)] rounded-[2.5rem] p-10 relative"
          >
            <button 
              onClick={() => setShowJobForm(false)}
              className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <X size={24} />
            </button>

            {!isAuthenticated ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-[var(--accent-color)] mx-auto mb-8 border border-[var(--border-color)]">
                  <Lock size={40} />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-main)] mb-4 uppercase tracking-tight">
                  Accès Restreint
                </h3>
                <p className="text-[var(--text-muted)] mb-10">
                  {t('team.form_login_required')}
                </p>
                <Link 
                  href="/admin/login" 
                  className="btn-architect py-4 px-10 inline-block"
                >
                  Se connecter
                </Link>
              </div>
            ) : formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-green-500 mx-auto mb-8 border border-green-500/30">
                  <Rocket size={40} />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-main)] mb-4 uppercase tracking-tight">
                  {t('team.form_success')}
                </h3>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-[var(--text-main)] mb-8 uppercase tracking-tighter">
                  {t('team.form_title')}
                </h2>
                <form onSubmit={handleJobFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                        {t('team.form_name')}
                      </label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                        {t('team.form_email')}
                      </label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                      {t('team.form_position')}
                    </label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                      {t('team.form_message')}
                    </label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-color)] transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-architect py-5 text-lg">
                    {t('team.form_submit')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Team;
