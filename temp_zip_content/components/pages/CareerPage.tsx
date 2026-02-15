
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
  Globe
} from 'lucide-react';

const ROLES = [
  'Développeur Frontend (React/Vue)',
  'Développeur Backend (Node/Python)',
  'UI/UX Designer',
  'Graphiste Créatif',
  'Motion Designer',
  'Community Manager',
  'Stagiaire (Développement)',
  'Stagiaire (Design)'
];

const BENEFITS = [
  { icon: Zap, title: "Projets Innovants", desc: "Travaillez sur des technologies de pointe et des projets stimulants." },
  { icon: Globe, title: "Remote Friendly", desc: "Flexibilité de travail avec des options de télétravail." },
  { icon: Coffee, title: "Ambiance Cool", desc: "Une équipe jeune, dynamique et passionnée sans prise de tête." },
  { icon: Heart, title: "Impact Réel", desc: "Vos idées comptent et impactent directement nos clients." }
];

const CareerPage: React.FC = () => {
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
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
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
      <div className="min-h-screen bg-slate-50 dark:bg-dark pt-32 pb-20 px-6 flex items-center justify-center">
        <MotionDiv 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-12 rounded-3xl text-center max-w-lg shadow-2xl"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Candidature Envoyée !</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Merci <strong>{formData.firstName}</strong> ! Nous avons bien reçu votre dossier. Notre équipe RH va l'étudier avec attention. Vous recevrez des nouvelles d'ici 3 à 5 jours ouvrés.
          </p>
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-accent hover:text-dark transition-all"
          >
            Retour à l'accueil
          </a>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark text-slate-900 dark:text-white pt-24 pb-20 transition-colors duration-500">
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 border border-primary/10 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md text-primary dark:text-accent text-sm font-semibold uppercase tracking-wider">
            Carrières
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Rejoignez <span className="text-accent">l'Aventure</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Chez Mind Graphix, nous ne cherchons pas seulement des employés, nous cherchons des visionnaires prêts à repousser les limites du digital.
          </p>
        </MotionDiv>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="text-primary dark:text-accent" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.desc}</p>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-accent" />
              Postuler maintenant
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Identity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prénom <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nom <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="jean.dupont@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Téléphone <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+226 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Role & Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Poste visé <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-accent transition-colors appearance-none"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    >
                      <option value="" disabled>Sélectionnez un poste</option>
                      {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                      <option value="other">Candidature Spontanée</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Portfolio / LinkedIn / Github</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="url" 
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="https://..."
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lettre de motivation / Message <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Parlez-nous de vous, de vos expériences et pourquoi vous souhaitez nous rejoindre..."
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                />
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">CV (PDF) <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative cursor-pointer group bg-gray-50/50 dark:bg-white/5">
                  <input 
                    type="file" 
                    accept=".pdf"
                    required={!formData.cv}
                    onChange={handleFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <div className="flex flex-col items-center gap-3">
                    {formData.cv ? (
                      <>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center text-green-600">
                          <FileText size={24} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white block">{formData.cv.name}</span>
                          <span className="text-xs text-green-500">Fichier prêt à l'envoi</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                          <UploadCloud size={24} />
                        </div>
                        <div>
                           <span className="text-gray-500 dark:text-gray-400 font-medium group-hover:text-accent transition-colors">Cliquez pour importer votre CV</span>
                           <span className="text-xs text-gray-400 block mt-1">Format PDF uniquement (Max 5Mo)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'} <Send size={20} />
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