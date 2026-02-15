'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Send,
  Coffee,
  Zap,
  Heart,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Traductions locales pour la page Carrières
 */
const TRANSLATIONS = {
  fr: {
    badge: "Carrières",
    title: "Rejoignez",
    titleAccent: "l'Aventure",
    subtitle: "Chez Mind Graphix, nous ne cherchons pas seulement des employés, nous cherchons des visionnaires prêts à repousser les limites du digital.",
    formTitle: "Postuler maintenant",
    success: {
      title: "Candidature Envoyée !",
      desc: "Merci ! Nous avons bien reçu votre dossier. Notre équipe RH va l'étudier avec attention. Vous recevrez des nouvelles d'ici 3 à 5 jours ouvrés.",
      backHome: "Retour à l'accueil"
    },
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      role: "Poste visé",
      rolePlaceholder: "Sélectionnez un poste",
      otherRole: "Candidature Spontanée",
      portfolio: "Portfolio / LinkedIn / Github",
      motivation: "Lettre de motivation / Message",
      motivationPlaceholder: "Parlez-nous de vous, de vos expériences et pourquoi vous souhaitez nous rejoindre...",
      cv: "CV (PDF)",
      cvClick: "Cliquez pour importer votre CV",
      cvReady: "Fichier prêt à l'envoi",
      cvFormat: "Format PDF uniquement (Max 5Mo)",
      submit: "Envoyer ma candidature",
      submitting: "Envoi en cours..."
    },
    roles: [
      'Développeur Frontend (React/Vue)',
      'Développeur Backend (Node/Python)',
      'UI/UX Designer',
      'Graphiste Créatif',
      'Motion Designer',
      'Community Manager',
      'Stagiaire (Développement)',
      'Stagiaire (Design)'
    ],
    benefits: [
      { icon: Zap, title: "Projets Innovants", desc: "Travaillez sur des technologies de pointe et des projets stimulants." },
      { icon: Globe, title: "Remote Friendly", desc: "Flexibilité de travail avec des options de télétravail." },
      { icon: Coffee, title: "Ambiance Cool", desc: "Une équipe jeune, dynamique et passionnée sans prise de tête." },
      { icon: Heart, title: "Impact Réel", desc: "Vos idées comptent et impactent directement nos clients." }
    ]
  },
  en: {
    badge: "Careers",
    title: "Join",
    titleAccent: "the Adventure",
    subtitle: "At Mind Graphix, we are not just looking for employees, we are looking for visionaries ready to push the boundaries of digital.",
    formTitle: "Apply Now",
    success: {
      title: "Application Sent!",
      desc: "Thank you! We have received your file. Our HR team will study it carefully. You will receive news within 3 to 5 business days.",
      backHome: "Back to Home"
    },
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      role: "Target Position",
      rolePlaceholder: "Select a position",
      otherRole: "Spontaneous Application",
      portfolio: "Portfolio / LinkedIn / Github",
      motivation: "Cover Letter / Message",
      motivationPlaceholder: "Tell us about yourself, your experiences and why you want to join us...",
      cv: "CV (PDF)",
      cvClick: "Click to import your CV",
      cvReady: "File ready for upload",
      cvFormat: "PDF format only (Max 5MB)",
      submit: "Send my application",
      submitting: "Sending..."
    },
    roles: [
      'Frontend Developer (React/Vue)',
      'Backend Developer (Node/Python)',
      'UI/UX Designer',
      'Creative Graphic Designer',
      'Motion Designer',
      'Community Manager',
      'Intern (Development)',
      'Intern (Design)'
    ],
    benefits: [
      { icon: Zap, title: "Innovative Projects", desc: "Work on cutting-edge technologies and challenging projects." },
      { icon: Globe, title: "Remote Friendly", desc: "Work flexibility with telecommuting options." },
      { icon: Coffee, title: "Cool Atmosphere", desc: "A young, dynamic and passionate team without the fuss." },
      { icon: Heart, title: "Real Impact", desc: "Your ideas matter and directly impact our clients." }
    ]
  }
};

const CareerPage: React.FC = () => {
  const { language } = useLanguage();
  const currentT = TRANSLATIONS[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
    motivation: '',
    cv: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] as File | null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const MotionDiv = motion.div as any;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 flex items-center justify-center">
        <MotionDiv 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-12 rounded-[2.5rem] text-center max-w-lg shadow-2xl glass"
        >
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-500/20">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-[var(--text-main)] mb-4">{currentT.success.title}</h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            {currentT.success.desc.replace('!', `! ${formData.firstName}`)}
          </p>
          <a 
            href="/"
            className="inline-block px-10 py-4 bg-[var(--text-main)] text-[var(--bg-primary)] font-bold rounded-full hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-lg hover:shadow-[var(--accent-color)]/30"
          >
            {currentT.success.backHome}
          </a>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] pt-32 pb-20 transition-colors duration-500">
      
      {/* En-tête Hero */}
      <div className="container mx-auto px-6 text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--accent-color)]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-1.5 mb-8 border border-[var(--accent-color)]/20 rounded-full bg-[var(--bg-surface)]/50 backdrop-blur-md text-[var(--accent-color)] text-xs font-bold uppercase tracking-widest animate-pulse">
            {currentT.badge}
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {currentT.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-blue-400">{currentT.titleAccent}</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {currentT.subtitle}
          </p>
        </MotionDiv>
      </div>

      {/* Grille des Avantages */}
      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentT.benefits.map((benefit, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--bg-surface)] p-8 rounded-[2rem] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 transition-all group glass"
            >
              <div className="w-14 h-14 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner shadow-[var(--accent-color)]/5">
                <benefit.icon className="text-[var(--accent-color)]" size={28} />
              </div>
              <h3 className="font-black text-[var(--text-main)] text-xl mb-3">{benefit.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{benefit.desc}</p>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Formulaire de Candidature */}
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[3rem] p-8 md:p-16 shadow-2xl backdrop-blur-md relative overflow-hidden glass">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-color)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black text-[var(--text-main)] mb-12 flex items-center gap-4">
              <Briefcase className="text-[var(--accent-color)]" size={32} />
              {currentT.formTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Identité */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.firstName} <span className="text-[var(--accent-color)]">*</span></label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-[var(--text-secondary)] opacity-50" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all placeholder-[var(--text-secondary)]/30"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.lastName} <span className="text-[var(--accent-color)]">*</span></label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-[var(--text-secondary)] opacity-50" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all placeholder-[var(--text-secondary)]/30"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.email} <span className="text-[var(--accent-color)]">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-[var(--text-secondary)] opacity-50" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all placeholder-[var(--text-secondary)]/30"
                      placeholder="jean.dupont@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.phone} <span className="text-[var(--accent-color)]">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-[var(--text-secondary)] opacity-50" size={18} />
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all placeholder-[var(--text-secondary)]/30"
                      placeholder="+226 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Poste & Liens */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.role} <span className="text-[var(--accent-color)]">*</span></label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-4 pr-10 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all appearance-none"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    >
                      <option value="" disabled className="bg-[var(--bg-surface)]">{currentT.form.rolePlaceholder}</option>
                      {currentT.roles.map(role => <option key={role} value={role} className="bg-[var(--bg-surface)]">{role}</option>)}
                      <option value="other" className="bg-[var(--bg-surface)]">{currentT.form.otherRole}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)] opacity-50">▼</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.portfolio}</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-4 text-[var(--text-secondary)] opacity-50" size={18} />
                    <input 
                      type="url" 
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all placeholder-[var(--text-secondary)]/30"
                      placeholder="https://..."
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-3">
                <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.motivation} <span className="text-[var(--accent-color)]">*</span></label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] transition-all resize-none placeholder-[var(--text-secondary)]/30"
                  placeholder={currentT.form.motivationPlaceholder}
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                />
              </div>

              {/* Import du CV */}
              <div className="space-y-3">
                <label className="text-sm font-black text-[var(--text-main)] uppercase tracking-wider">{currentT.form.cv} <span className="text-[var(--accent-color)]">*</span></label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-[2rem] p-12 text-center hover:bg-[var(--accent-color)]/5 hover:border-[var(--accent-color)]/30 transition-all relative cursor-pointer group bg-[var(--bg-primary)]/50">
                  <input 
                    type="file" 
                    accept=".pdf"
                    required={!formData.cv}
                    onChange={handleFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                  />
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    {formData.cv ? (
                      <>
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 shadow-inner">
                          <FileText size={32} />
                        </div>
                        <div>
                          <span className="font-black text-[var(--text-main)] text-lg block mb-1">{formData.cv.name}</span>
                          <span className="text-sm text-green-500 font-bold">{currentT.form.cvReady}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-[var(--bg-surface)] rounded-full flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] group-hover:bg-[var(--accent-color)]/10 transition-all shadow-inner border border-[var(--border-color)]">
                          <UploadCloud size={32} />
                        </div>
                        <div>
                           <span className="text-[var(--text-main)] font-black text-lg block mb-1 group-hover:text-[var(--accent-color)] transition-all">{currentT.form.cvClick}</span>
                           <span className="text-sm text-[var(--text-secondary)] opacity-60">{currentT.form.cvFormat}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bouton d'envoi */}
              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-5 bg-[var(--text-main)] text-[var(--bg-primary)] font-black rounded-full shadow-2xl hover:bg-[var(--accent-color)] hover:text-white transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? currentT.form.submitting : currentT.form.submit} 
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
