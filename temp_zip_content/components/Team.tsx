
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Dribbble, Globe, Briefcase, 
  ExternalLink, Code, Palette, Terminal, Cpu, Sparkles, Layers,
  ArrowRight
} from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import NeuralBackground from './ui/NeuralBackground';
import Breadcrumbs from './ui/Breadcrumbs';

// Données enrichies (Initial values if mocked DB is empty)
const TEAM_MEMBERS_EXPANDED = [
  {
    id: 1,
    name: 'Badior OUATTARA',
    role: 'Lead Developer & Founder',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800',
    bio: "Architecte de solutions numériques complexes. Obsédé par la performance et l'esthétique du code.",
    skills: ["React / Next.js", "Node.js Architecture", "Three.js", "System Design"],
    portfolio: "https://github.com/badior",
    socials: { linkedin: "#", github: "#" },
    icon: Terminal
  },
  // ... (others)
];

export const TeamCard: React.FC<{ member: any }> = ({ member }) => {
  const MotionDiv = motion.div as any;
  const Icon = member.icon || Terminal;

  return (
    <MotionDiv 
       className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(94,53,177,0.2)] h-full"
    >
       <div className="flex flex-col md:flex-row h-full">
          
          {/* Image Section */}
          <div className="w-full md:w-2/5 relative h-72 md:h-auto overflow-hidden">
             <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#05070a]/90"></div>
             
             {/* Role Icon Floating */}
             <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:bg-primary group-hover:border-primary transition-all">
                <Icon size={24} />
             </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-between relative">
             {/* Decorative Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

             <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all">
                   {member.name}
                </h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                   {member.bio}
                </p>

                {/* Skills Tags */}
                <div className="mb-6">
                   <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
                      <Code size={12} /> Expertises
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {member.skills?.map((skill: string) => (
                         <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium group-hover:border-primary/30 group-hover:text-white transition-colors">
                            {skill}
                         </span>
                      ))}
                   </div>
                </div>
             </div>

             {/* Bottom Actions */}
             <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                <div className="flex gap-3">
                   {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="LinkedIn">
                         <Linkedin size={18} />
                      </a>
                   )}
                   {member.socials?.github && (
                      <a href={member.socials.github} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="Github">
                         <Github size={18} />
                      </a>
                   )}
                   {member.socials?.dribbble && (
                      <a href={member.socials.dribbble} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="Dribbble">
                         <Dribbble size={18} />
                      </a>
                   )}
                </div>

                <a 
                   href={member.portfolio} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors group/btn"
                >
                   Portfolio <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
             </div>
          </div>
       </div>
    </MotionDiv>
  );
}

const Team: React.FC = () => {
  const { getData } = useLanguage();
  // Fallback to local data if DB is empty for demo, otherwise use getData
  const members = getData('team') || TEAM_MEMBERS_EXPANDED;
  const MotionDiv = motion.div as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      
      {/* 1. HERO SECTION CINEMATIC */}
      <section className="relative pt-40 pb-20 overflow-hidden">
         {/* Background Layer */}
         <div className="absolute inset-0 z-0">
            <NeuralBackground />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            {/* Ambient Colors */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-8"><Breadcrumbs /></div>
            
            <div className="text-center max-w-4xl mx-auto mt-12 mb-16">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                     <Sparkles size={12} /> Les Cerveaux
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                     NOTRE <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 animate-gradient-xy">SQUAD</span>
                  </h1>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                     Une convergence de talents techniques et créatifs unis par une seule mission : repousser les limites du digital.
                  </p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 2. TEAM GRID (Luminous Style) */}
      <section className="py-24 bg-[#05070a] relative z-20 -mt-10 rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
               {members.map((member: any, idx: number) => (
                  <motion.div 
                     key={member.id}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <TeamCard member={member} />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. JOIN US CTA */}
      <section className="py-32 bg-[#02040a] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Votre place est <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">ici</span>.</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg">
               Nous cherchons toujours des esprits brillants pour compléter notre mosaïque de talents.
            </p>
            <Link to="/careers" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-emerald-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
               Voir les offres <Briefcase size={20} />
            </Link>
         </div>
      </section>

    </div>
  );
};

export default Team;
