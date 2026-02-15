'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Video, 
  BarChart, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Send,
  Cpu,
  FileText,
  UploadCloud,
  Edit3,
  Calendar,
  DollarSign,
  User,
  Building,
  Mail,
  Phone,
  ShieldCheck,
  Layout,
  ShoppingCart,
  Zap,
  Database,
  Globe2,
  Lock,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
// @ts-ignore
import Link from 'next/link';
import { mockDB } from '../../utils/mockDatabase';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';

// --- CONSTANTES & DONNÉES ---
const TRANSLATIONS = {
  fr: {
    accessDenied: {
      title: "Accès réservé aux",
      titleSpan: "Membres",
      desc: "Pour garantir un accompagnement personnalisé et sécurisé, la création d'un devis nécessite d'être membre Mind Graphix.",
      loginBtn: "Se connecter / S'inscrire",
      supportBtn: "Contacter le support",
      security: "Sécurisation des données SSL 256-bit"
    },
    success: {
      title: "Demande Transmise !",
      refLabel: "Référence dossier",
      message: (name: string) => `Merci ${name}. Un chef de projet a été notifié. Votre proposition sera disponible dans votre espace sous 24h.`,
      homeBtn: "Retour à l'accueil"
    },
    header: {
      badge: "Espace Sécurisé",
      title: "Parlez-nous de votre",
      titleSpan: "Projet",
      desc: "Estimation précise et stratégie adaptée basées sur vos besoins réels."
    },
    steps: ["Type & Nature", "Fonctionnalités", "Description", "Budget & Délai", "Coordonnées", "Récapitulatif"],
    form: {
       projectQuestion: "Quel est votre projet ?",
       natureQuestion: "Nature du besoin",
       featuresTitle: "Fonctionnalités",
       detailsTitle: "Détails du projet",
       descLabel: "Description du besoin *",
       descPlaceholder: "Décrivez votre projet en détail...",
       fileLabel: "Cahier des charges (Optionnel)",
       fileDrop: "Glissez un fichier ou cliquez ici",
       budgetTitle: "Budget & Planning",
       budgetLabel: "Estimation Budgétaire *",
       dateLabel: "Date souhaitée",
       contactTitle: "Vos Coordonnées",
       firstName: "Prénom",
       lastName: "Nom",
       email: "Email",
       phone: "Téléphone",
       summaryTitle: "Récapitulatif",
       summaryProject: "Projet",
       summaryClient: "Client",
       next: "Suivant",
       back: "Retour",
       submit: "Envoyer ma demande",
       sending: "Envoi...",
       confirm: "Confirmer"
     }
   },
   en: {
     accessDenied: {
       title: "Access reserved for",
       titleSpan: "Members",
       desc: "To ensure personalized and secure support, creating a quote requires being a Mind Graphix member.",
       loginBtn: "Login / Sign Up",
       supportBtn: "Contact Support",
       security: "SSL 256-bit data security"
     },
     success: {
       title: "Request Sent!",
       refLabel: "Folder reference",
       message: (name: string) => `Thank you ${name}. A project manager has been notified. Your proposal will be available in your space within 24h.`,
       homeBtn: "Back to Home"
     },
     header: {
       badge: "Secure Space",
       title: "Tell us about your",
       titleSpan: "Project",
       desc: "Accurate estimation and adapted strategy based on your actual needs."
     },
     steps: ["Type & Nature", "Features", "Description", "Budget & Timeline", "Contact Info", "Summary"],
     form: {
       projectQuestion: "What is your project?",
       natureQuestion: "Nature of need",
       featuresTitle: "Features",
       detailsTitle: "Project details",
       descLabel: "Description of need *",
       descPlaceholder: "Describe your project in detail...",
       fileLabel: "Specifications (Optional)",
       fileDrop: "Drop a file or click here",
       budgetTitle: "Budget & Planning",
       budgetLabel: "Budget Estimation *",
       dateLabel: "Desired date",
       contactTitle: "Contact Info",
       firstName: "First Name",
       lastName: "Last Name",
       email: "Email",
       phone: "Phone",
       summaryTitle: "Summary",
       summaryProject: "Project",
       summaryClient: "Client",
       next: "Next",
       back: "Back",
       submit: "Send my request",
       sending: "Sending...",
       confirm: "Confirm"
     }
   }
 };

const PROJECT_TYPES = (language: 'fr' | 'en') => [
  { id: 'web', title: language === 'fr' ? 'Site Web' : 'Website', icon: Globe, desc: language === 'fr' ? 'Vitrine, E-commerce, SaaS, Landing Page' : 'Showcase, E-commerce, SaaS, Landing Page' },
  { id: 'mobile', title: language === 'fr' ? 'Application Mobile' : 'Mobile App', icon: Smartphone, desc: language === 'fr' ? 'iOS, Android, React Native, PWA' : 'iOS, Android, React Native, PWA' },
  { id: 'design', title: language === 'fr' ? 'Design & Branding' : 'Design & Branding', icon: Palette, desc: language === 'fr' ? 'Logo, Charte Graphique, Maquettes UI/UX' : 'Logo, Brand Identity, UI/UX Mockups' },
  { id: 'marketing', title: language === 'fr' ? 'Marketing Digital' : 'Digital Marketing', icon: BarChart, desc: language === 'fr' ? 'SEO, Google Ads, Gestion Réseaux Sociaux' : 'SEO, Google Ads, Social Media Management' },
  { id: 'motion', title: language === 'fr' ? 'Motion Design' : 'Motion Design', icon: Video, desc: language === 'fr' ? 'Animation 2D/3D, Montage Vidéo, Spot Pub' : '2D/3D Animation, Video Editing, Commercials' },
  { id: 'software', title: language === 'fr' ? 'Logiciel Sur Mesure' : 'Custom Software', icon: Cpu, desc: language === 'fr' ? 'CRM, ERP, Intranet, Outils Métier' : 'CRM, ERP, Intranet, Business Tools' },
];

const PROJECT_NATURE = (language: 'fr' | 'en') => [
  { id: 'creation', title: language === 'fr' ? 'Création Complète' : 'Complete Creation', desc: language === 'fr' ? 'Nouveau projet à partir de zéro' : 'New project from scratch' },
  { id: 'redesign', title: language === 'fr' ? 'Refonte / Redesign' : 'Redesign / Overhaul', desc: language === 'fr' ? 'Modernisation d\'un existant' : 'Modernizing an existing one' },
  { id: 'maintenance', title: language === 'fr' ? 'Maintenance / Évol.' : 'Maintenance / Evol.', desc: language === 'fr' ? 'Mises à jour et correctifs' : 'Updates and fixes' },
];

const FEATURES_OPTIONS = (language: 'fr' | 'en') => [
  { id: 'cms', label: language === 'fr' ? 'Administration (CMS)' : 'Administration (CMS)', icon: Layout },
  { id: 'ecommerce', label: language === 'fr' ? 'Paiement en ligne' : 'Online Payment', icon: ShoppingCart },
  { id: 'seo', label: language === 'fr' ? 'SEO Avancé' : 'Advanced SEO', icon: Zap },
  { id: 'api', label: language === 'fr' ? 'Connexion API / CRM' : 'API / CRM Connection', icon: Database },
  { id: 'multi', label: language === 'fr' ? 'Multilingue' : 'Multilingual', icon: Globe2 },
  { id: 'auth', label: language === 'fr' ? 'Espace Membre' : 'Member Space', icon: Lock },
];

const BUDGET_RANGES = (language: 'fr' | 'en') => [
  { id: 'small', label: '< 500.000 FCFA', desc: language === 'fr' ? 'Projets simples' : 'Simple projects' },
  { id: 'medium', label: '500k - 1M FCFA', desc: language === 'fr' ? 'Projets standards' : 'Standard projects' },
  { id: 'large', label: '1M - 3M FCFA', desc: language === 'fr' ? 'Projets avancés' : 'Advanced projects' },
  { id: 'xl', label: '3M - 5M FCFA', desc: language === 'fr' ? 'Envergure' : 'Large scale' },
  { id: 'xxl', label: '> 5M FCFA', desc: language === 'fr' ? 'Grands comptes' : 'Key accounts' },
  { id: 'unknown', label: language === 'fr' ? 'À définir' : 'To be defined', desc: language === 'fr' ? 'Je ne sais pas encore' : 'I don\'t know yet' },
];

const generateReferenceID = () => {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MGS-${year}-${randomPart}`;
};

const QuotePage: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const projectTypes = PROJECT_TYPES(language);
  const projectNature = PROJECT_NATURE(language);
  const featuresOptions = FEATURES_OPTIONS(language);
  const budgetRanges = BUDGET_RANGES(language);

  const [step, setStep] = useState(1);
  const [referenceID, setReferenceID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [formData, setFormData] = useState({
    projectType: '',
    projectNature: '',
    features: [] as string[],
    description: '',
    budget: '',
    deadline: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    file: null as File | null
  });

  useEffect(() => {
    setReferenceID(generateReferenceID());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const toggleFeature = (id: string) => {
    setFormData(prev => {
      const exists = prev.features.includes(id);
      return {
        ...prev,
        features: exists ? prev.features.filter(f => f !== id) : [...prev.features, id]
      };
    });
  };

  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.projectType) { newErrors.projectType = language === 'fr' ? "Veuillez sélectionner un type de projet." : "Please select a project type."; isValid = false; }
      if (!formData.projectNature) { newErrors.projectNature = language === 'fr' ? "Veuillez préciser la nature du projet." : "Please specify project nature."; isValid = false; }
    }
    if (currentStep === 3) {
       if (!formData.description.trim() || formData.description.length < 20) {
         newErrors.description = language === 'fr' ? "Veuillez décrire votre projet (min. 20 caractères)." : "Please describe your project (min. 20 chars)."; isValid = false;
       }
    }
    if (currentStep === 4) {
      if (!formData.budget) { newErrors.budget = language === 'fr' ? "Veuillez sélectionner une fourchette budgétaire." : "Please select a budget range."; isValid = false; }
    }
    if (currentStep === 5) {
      if (!formData.firstName) { newErrors.firstName = language === 'fr' ? "Prénom requis." : "First name required."; isValid = false; }
      if (!formData.lastName) { newErrors.lastName = language === 'fr' ? "Nom requis." : "Last name required."; isValid = false; }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = language === 'fr' ? "Email valide requis." : "Valid email required."; isValid = false; }
      if (!formData.phone) { newErrors.phone = language === 'fr' ? "Téléphone requis." : "Phone required."; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => { if (validateStep(step)) setStep(prev => prev + 1); };
  const handleBack = () => { if (step > 1) setStep(prev => prev - 1); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newQuote = {
        subject: `${projectTypes.find(t => t.id === formData.projectType)?.title} - ${formData.company || formData.lastName}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        projectNature: formData.projectNature,
        budget: formData.budget,
        deadline: formData.deadline,
        message: formData.description,
        features: formData.features
    };
    mockDB.addMessage(newQuote);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const MotionDiv = motion.div as any;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Effets d'arrière-plan */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[var(--accent-color)]/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-2xl text-center">
           <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-[var(--border-color)]">
              <Lock size={40} className="text-[var(--accent-color)]" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 tracking-tight">
             {t.accessDenied.title} <span className="text-[var(--accent-color)]">{t.accessDenied.titleSpan}</span>
           </h1>
           <p className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg mx-auto">
             {t.accessDenied.desc}
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin/login" className="btn-architect px-10 py-5 bg-[var(--text-main)] text-[var(--bg-primary)] font-black rounded-full hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
                 <UserCheck size={20} /> {t.accessDenied.loginBtn}
              </Link>
              <Link href="/contact" className="px-10 py-5 glass border border-[var(--border-color)] text-[var(--text-main)] font-bold rounded-full hover:bg-[var(--bg-surface)] transition-all">
                 {t.accessDenied.supportBtn}
              </Link>
           </div>
           
           <p className="mt-12 text-xs text-[var(--text-secondary)] uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldAlert size={14} /> {t.accessDenied.security}
           </p>
        </MotionDiv>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 flex items-center justify-center">
        <MotionDiv initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass border border-[var(--border-color)] p-12 rounded-3xl text-center max-w-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-main)]"></div>
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle2 size={48} className="text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">{t.success.title}</h2>
          <div className="bg-[var(--bg-surface)]/50 p-6 rounded-2xl mb-8 border border-[var(--border-color)]">
            <p className="text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2">{t.success.refLabel}</p>
            <p className="text-3xl font-mono font-bold text-[var(--accent-color)] tracking-widest">{referenceID}</p>
          </div>
          <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
            {t.success.message(formData.firstName)}
          </p>
          <Link href="/" className="btn-architect inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold rounded-full hover:scale-105 transition-all shadow-lg">
            {t.success.homeBtn} <ArrowRight size={20} />
          </Link>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] pt-24 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-6 text-center mb-12">
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--accent-color)]/20">
            <ShieldCheck size={14} /> {t.header.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.header.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-main)]">{t.header.titleSpan}</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{t.header.desc}</p>
        </MotionDiv>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de progression */}
          <div className="hidden lg:block w-64 shrink-0">
             <div className="sticky top-32 space-y-1">
                {t.steps.map((label, n) => (
                  <div key={n} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${step === n+1 ? 'glass shadow-md border border-[var(--border-color)]' : 'opacity-60'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= n+1 ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-[var(--bg-primary)]' : 'border-[var(--border-color)] text-[var(--text-secondary)]'}`}>
                       {step > n+1 ? <CheckCircle2 size={16} /> : n+1}
                    </div>
                    <span className={`font-medium ${step === n+1 ? 'text-[var(--accent-color)]' : 'text-[var(--text-secondary)]'}`}>{label}</span>
                  </div>
                ))}
                <div className="mt-8 p-4 bg-[var(--bg-surface)]/50 rounded-xl border border-[var(--border-color)] text-center">
                   <p className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1">Dossier Réf.</p>
                   <p className="font-mono text-[var(--text-main)] font-bold">{referenceID}</p>
                </div>
             </div>
          </div>

          <div className="flex-1">
             <div className="glass border border-[var(--border-color)] rounded-3xl p-6 md:p-10 shadow-2xl relative min-h-[500px] flex flex-col">
                <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex flex-col">
                   <AnimatePresence mode="wait" custom={step}>
                      {step === 1 && (
                        <MotionDiv key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Globe className="text-[var(--accent-color)]" /> {t.form.projectQuestion}</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                              {projectTypes.map((type) => (
                                 <div key={type.id} onClick={() => updateForm('projectType', type.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex items-start gap-4 ${formData.projectType === type.id ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'border-[var(--border-color)] hover:border-[var(--accent-color)]/30'}`}>
                                    <div className={`p-3 rounded-lg ${formData.projectType === type.id ? 'bg-[var(--accent-color)] text-[var(--bg-primary)]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'}`}><type.icon size={24} /></div>
                                    <div>
                                      <h3 className={`font-bold ${formData.projectType === type.id ? 'text-[var(--accent-color)]' : 'text-[var(--text-main)]'}`}>{type.title}</h3>
                                      <p className="text-xs text-[var(--text-secondary)] mt-1">{type.desc}</p>
                                    </div>
                                    {formData.projectType === type.id && <div className="ml-auto text-[var(--accent-color)]"><CheckCircle2 size={20} /></div>}
                                 </div>
                              ))}
                           </div>
                           <h3 className="text-lg font-bold mb-4">{t.form.natureQuestion}</h3>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {projectNature.map((nat) => (
                                 <button key={nat.id} onClick={() => updateForm('projectNature', nat.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.projectNature === nat.id ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'border-[var(--border-color)] hover:border-[var(--text-secondary)]'}`}>
                                    <div className="font-bold text-[var(--text-main)]">{nat.title}</div>
                                    <div className="text-xs text-[var(--text-secondary)] mt-1">{nat.desc}</div>
                                 </button>
                              ))}
                           </div>
                        </MotionDiv>
                      )}
                      {step === 2 && (
                         <MotionDiv key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Cpu className="text-[var(--accent-color)]" /> {t.form.featuresTitle}</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {featuresOptions.map((feat) => (
                                 <div key={feat.id} onClick={() => toggleFeature(feat.id)} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.features.includes(feat.id) ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'border-[var(--border-color)] hover:border-[var(--text-secondary)]'}`}>
                                    <div className={`p-2 rounded-lg ${formData.features.includes(feat.id) ? 'bg-[var(--accent-color)] text-[var(--bg-primary)]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'}`}><feat.icon size={20} /></div>
                                    <span className="font-bold text-[var(--text-main)]">{feat.label}</span>
                                    {formData.features.includes(feat.id) && <CheckCircle2 size={20} className="ml-auto text-[var(--accent-color)]" />}
                                 </div>
                              ))}
                           </div>
                        </MotionDiv>
                      )}
                      {step === 3 && (
                         <MotionDiv key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FileText className="text-[var(--accent-color)]" /> {t.form.detailsTitle}</h2>
                           <div className="space-y-6">
                              <div>
                                 <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t.form.descLabel}</label>
                                 <textarea 
                                   value={formData.description} 
                                   onChange={(e) => updateForm('description', e.target.value)} 
                                   rows={8} 
                                   className={`w-full bg-[var(--bg-surface)]/50 border rounded-xl p-4 text-[var(--text-main)] focus:ring-2 focus:ring-[var(--accent-color)] outline-none transition-all ${errors.description ? 'border-red-500' : 'border-[var(--border-color)]'}`} 
                                   placeholder={t.form.descPlaceholder}
                                 ></textarea>
                              </div>
                              <div>
                                 <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t.form.fileLabel}</label>
                                 <div className="relative border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[var(--bg-surface)] transition-colors group cursor-pointer">
                                    <input type="file" onChange={(e) => e.target.files && updateForm('file', e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    {formData.file ? (
                                       <>
                                         <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-2"><FileText /></div>
                                         <span className="font-bold text-[var(--text-main)]">{formData.file.name}</span>
                                       </>
                                    ) : (
                                       <>
                                         <UploadCloud size={40} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] mb-2 transition-colors"/>
                                         <span className="text-[var(--text-secondary)] font-medium">{t.form.fileDrop}</span>
                                       </>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                      {step === 4 && (
                        <MotionDiv key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><DollarSign className="text-[var(--accent-color)]" /> {t.form.budgetTitle}</h2>
                           <div className="mb-8">
                              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-3">{t.form.budgetLabel}</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 {budgetRanges.map((range) => (
                                   <div key={range.id} onClick={() => updateForm('budget', range.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.budget === range.id ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'border-[var(--border-color)] hover:border-[var(--text-secondary)]'}`}>
                                      <div className="font-bold text-[var(--text-main)]">{range.label}</div>
                                      <div className="text-xs text-[var(--text-secondary)]">{range.desc}</div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t.form.dateLabel}</label>
                              <div className="relative">
                                 <Calendar className="absolute left-4 top-3.5 text-[var(--text-secondary)]" size={18} />
                                 <input type="date" value={formData.deadline} onChange={(e) => updateForm('deadline', e.target.value)} className="w-full bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-xl pl-12 pr-4 py-3 text-[var(--text-main)] outline-none" />
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                      {step === 5 && (
                         <MotionDiv key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><User className="text-[var(--accent-color)]" /> {t.form.contactTitle}</h2>
                           <div className="grid md:grid-cols-2 gap-6">
                              <input placeholder={t.form.firstName} value={formData.firstName} onChange={(e) => updateForm('firstName', e.target.value)} className="w-full bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-xl p-3 outline-none focus:border-[var(--accent-color)] transition-all text-[var(--text-main)]" />
                              <input placeholder={t.form.lastName} value={formData.lastName} onChange={(e) => updateForm('lastName', e.target.value)} className="w-full bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-xl p-3 outline-none focus:border-[var(--accent-color)] transition-all text-[var(--text-main)]" />
                              <input placeholder={t.form.email} type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="w-full md:col-span-2 bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-xl p-3 outline-none focus:border-[var(--accent-color)] transition-all text-[var(--text-main)]" />
                              <input placeholder={t.form.phone} value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="w-full md:col-span-2 bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-xl p-3 outline-none focus:border-[var(--accent-color)] transition-all text-[var(--text-main)]" />
                           </div>
                        </MotionDiv>
                      )}
                      {step === 6 && (
                         <MotionDiv key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> {t.form.summaryTitle}</h2>
                           <div className="space-y-4">
                              <div className="bg-[var(--bg-surface)]/50 p-5 rounded-2xl border border-[var(--border-color)]">
                                 <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase mb-2">{t.form.summaryProject}</h3>
                                 <p className="font-bold text-lg text-[var(--text-main)]">
                                   {projectTypes.find(t=>t.id===formData.projectType)?.title} - {projectNature.find(n=>n.id===formData.projectNature)?.title}
                                 </p>
                                 <p className="text-sm text-[var(--text-secondary)] mt-2">{formData.description}</p>
                              </div>
                              <div className="bg-[var(--bg-surface)]/50 p-5 rounded-2xl border border-[var(--border-color)]">
                                 <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase mb-2">{t.form.summaryClient}</h3>
                                 <p className="font-bold text-[var(--text-main)]">{formData.firstName} {formData.lastName}</p>
                                 <p className="text-sm text-[var(--text-secondary)]">{formData.email} | {formData.phone}</p>
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                   </AnimatePresence>
                </form>

                <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex justify-between items-center">
                   {step > 1 ? (
                      <button onClick={handleBack} className="px-6 py-3 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] font-bold transition-colors flex items-center gap-2">
                         <ArrowLeft size={20} /> {t.form.back}
                      </button>
                   ) : <div/>}

                   {step < 6 ? (
                      <button onClick={handleNext} className="btn-architect px-8 py-3 bg-[var(--text-main)] text-[var(--bg-primary)] rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                         {t.form.next} <ArrowRight size={20} />
                      </button>
                   ) : (
                      <button onClick={handleSubmit} disabled={isSubmitting} className="btn-architect px-8 py-3 bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-main)] text-[var(--bg-primary)] rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                         {isSubmitting ? t.form.sending : t.form.confirm} <Send size={20} />
                      </button>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;

