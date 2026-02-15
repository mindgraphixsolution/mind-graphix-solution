import React, { useState } from 'react';
import Section from './ui/Section';
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
  UploadCloud,
  FileText,
  Layout,
  Globe2,
  ShoppingCart,
  Database,
  Shield,
  Zap,
  AlertCircle,
  Edit3
} from 'lucide-react';
import { QuoteRequest } from '../types';

// Types de projets
const PROJECT_TYPES = [
  { id: 'web', title: 'Site Web', icon: Globe, desc: 'Vitrine, E-commerce, SaaS' },
  { id: 'mobile', title: 'App Mobile', icon: Smartphone, desc: 'iOS, Android, PWA' },
  { id: 'design', title: 'Branding', icon: Palette, desc: 'Logo, Charte, UI/UX' },
  { id: 'marketing', title: 'Marketing', icon: BarChart, desc: 'SEO, Ads, Social' },
  { id: 'motion', title: 'Motion', icon: Video, desc: 'Vidéo, Animation' },
  { id: 'software', title: 'Logiciel', icon: Cpu, desc: 'CRM, ERP, Outils' },
];

// Nature du projet
const PROJECT_NATURE = [
  { id: 'creation', title: 'Création Complète', desc: 'Partir de zéro' },
  { id: 'redesign', title: 'Refonte / Redesign', desc: 'Améliorer l\'existant' },
  { id: 'maintenance', title: 'Maintenance', desc: 'Mises à jour & correctifs' },
];

// Fonctionnalités additionnelles
const FEATURES = [
  { id: 'cms', label: 'Gestion de contenu (CMS)', icon: Layout },
  { id: 'ecommerce', label: 'Paiement en ligne', icon: ShoppingCart },
  { id: 'multilang', label: 'Multilingue', icon: Globe2 },
  { id: 'seo', label: 'Optimisation SEO avancée', icon: Zap },
  { id: 'auth', label: 'Espace Membre / Auth', icon: Shield },
  { id: 'api', label: 'Intégration API / CRM', icon: Database },
];

const BUDGET_RANGES = [
  '< 500.000 FCFA',
  '500k - 1M FCFA',
  '1M - 3M FCFA',
  '3M - 5M FCFA',
  '> 5M FCFA',
  'À définir'
];

interface QuoteProps {
  onQuoteSubmit?: (quote: QuoteRequest) => void;
}

const Quote: React.FC<QuoteProps> = ({ onQuoteSubmit }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState({
    projectType: '',
    projectNature: '',
    features: [] as string[],
    description: '',
    budget: '',
    deadline: '',
    file: null as File | null,
    name: '',
    company: '',
    email: '',
    phone: '',
    contactMethod: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation par étape
  const validateStep = (currentStep: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.projectType) { newErrors.projectType = "Veuillez sélectionner un type de projet."; isValid = false; }
      if (!formData.projectNature) { newErrors.projectNature = "Veuillez sélectionner la nature du projet."; isValid = false; }
    }
    
    if (currentStep === 3) {
      if (!formData.description.trim()) { newErrors.description = "La description est obligatoire pour comprendre votre besoin."; isValid = false; }
      else if (formData.description.length < 20) { newErrors.description = "Veuillez détailler un peu plus (min 20 caractères)."; isValid = false; }
    }

    if (currentStep === 4) {
      if (!formData.budget) { newErrors.budget = "Veuillez sélectionner une fourchette de budget."; isValid = false; }
    }

    if (currentStep === 5) {
      if (!formData.name.trim()) { newErrors.name = "Le nom est obligatoire."; isValid = false; }
      if (!formData.email.trim()) { newErrors.email = "L'email est obligatoire."; isValid = false; }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Email invalide."; isValid = false; }
      if (!formData.phone.trim()) { newErrors.phone = "Le téléphone est obligatoire."; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 6) setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (s: number) => setStep(s);

  // Gestion des champs
  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const toggleFeature = (featureId: string) => {
    setFormData(prev => {
      const features = prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId];
      return { ...prev, features };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Construction de l'objet QuoteRequest
    const newQuote: QuoteRequest = {
      id: Math.random().toString(36).substr(2, 9),
      projectType: PROJECT_TYPES.find(t => t.id === formData.projectType)?.title || formData.projectType,
      projectNature: PROJECT_NATURE.find(n => n.id === formData.projectNature)?.title || formData.projectNature,
      features: formData.features,
      description: formData.description,
      budget: formData.budget,
      deadline: formData.deadline,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      contactMethod: formData.contactMethod,
      timestamp: new Date()
    };

    // Notification parent
    if (onQuoteSubmit) {
      onQuoteSubmit(newQuote);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Animations
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const MotionDiv = motion.div as any;

  // Écran de succès
  if (isSuccess) {
    return (
      <Section id="devis" className="bg-slate-50 dark:bg-dark">
        <MotionDiv 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-12 rounded-3xl text-center max-w-lg mx-auto shadow-2xl"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Demande Envoyée !</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Merci <strong>{formData.name}</strong>. Votre dossier a été transmis à notre équipe. Une notification a été envoyée aux chefs de projet. Vous recevrez une réponse sous 24h.
          </p>
          <button 
            onClick={() => { setIsSuccess(false); setStep(1); setFormData({ ...formData, projectType: '', features: [], file: null, description: '', name: '', email: '', phone: '' }); }}
            className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-accent hover:text-dark transition-all"
          >
            Nouvelle demande
          </button>
        </MotionDiv>
      </Section>
    );
  }

  return (
    <Section id="devis" className="bg-slate-50 dark:bg-dark">
      <div className="text-center mb-10">
        <MotionDiv initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Configurez votre <span className="text-accent">Projet</span>
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Un formulaire complet en 6 étapes pour définir votre besoin. Tous les champs marqués d'une étoile (*) sont obligatoires.
          </p>
        </MotionDiv>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-10 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></div>

          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className={`flex flex-col items-center gap-2 ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= s ? 'bg-accent text-dark scale-110 shadow-lg' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'
              }`}>
                {s === 6 ? <CheckCircle2 size={16} /> : s}
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden sm:block text-gray-600 dark:text-gray-400">
                {s === 1 ? 'Projet' : s === 2 ? 'Options' : s === 3 ? 'Détails' : s === 4 ? 'Budget' : s === 5 ? 'Infos' : 'Récap'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-sm min-h-[500px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
            <AnimatePresence mode="wait" custom={step}>
              
              {/* STEP 1: NATURE DU PROJET */}
              {step === 1 && (
                <MotionDiv key="step1" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Type de projet <span className="text-red-500">*</span></h3>
                  
                  {errors.projectType && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2 justify-center">
                      <AlertCircle size={18} /> {errors.projectType}
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {PROJECT_TYPES.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => updateForm('projectType', type.id)}
                        className={`cursor-pointer rounded-2xl p-4 md:p-6 border-2 transition-all duration-300 flex flex-col items-center text-center gap-3 hover:shadow-lg ${
                          formData.projectType === type.id 
                            ? 'border-accent bg-accent/5 dark:bg-accent/10' 
                            : 'border-transparent bg-gray-50 dark:bg-white/5 hover:border-primary/30 dark:hover:border-white/20'
                        }`}
                      >
                        <type.icon size={28} className={formData.projectType === type.id ? 'text-accent' : 'text-primary dark:text-gray-400'} />
                        <div>
                          <h4 className={`font-bold text-sm md:text-base ${formData.projectType === type.id ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>{type.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">Nature de la demande <span className="text-red-500">*</span></h3>
                   {errors.projectNature && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2 justify-center">
                      <AlertCircle size={18} /> {errors.projectNature}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PROJECT_NATURE.map((nat) => (
                      <div
                        key={nat.id}
                        onClick={() => updateForm('projectNature', nat.id)}
                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                          formData.projectNature === nat.id
                            ? 'border-accent bg-accent/5 dark:bg-accent/10'
                            : 'border-transparent bg-gray-50 dark:bg-white/5 hover:border-gray-300'
                        }`}
                      >
                        <h4 className={`font-bold ${formData.projectNature === nat.id ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>{nat.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{nat.desc}</p>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* STEP 2: FONCTIONNALITÉS */}
              {step === 2 && (
                <MotionDiv key="step2" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Fonctionnalités (Optionnel)</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">Sélectionnez les éléments techniques dont vous avez besoin.</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {FEATURES.map((feat) => (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.features.includes(feat.id)
                            ? 'border-accent bg-accent/5 dark:bg-accent/10'
                            : 'border-transparent bg-gray-50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.features.includes(feat.id) ? 'bg-accent text-dark' : 'bg-gray-200 dark:bg-white/10 text-gray-500'}`}>
                          {formData.features.includes(feat.id) ? <CheckCircle2 size={20} /> : <feat.icon size={20} />}
                        </div>
                        <span className={`font-semibold ${formData.features.includes(feat.id) ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {feat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* STEP 3: DÉTAILS */}
              {step === 3 && (
                <MotionDiv key="step3" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Détails du projet <span className="text-red-500">*</span></h3>
                  
                   {errors.description && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
                      <AlertCircle size={18} /> {errors.description}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Description détaillée <span className="text-red-500">*</span></label>
                      <textarea 
                        rows={6}
                        placeholder="Objectifs, cibles, style graphique souhaité, références de sites que vous aimez... (Min 20 caractères)"
                        className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none text-gray-900 dark:text-white placeholder:text-gray-400 ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
                        value={formData.description}
                        onChange={(e) => updateForm('description', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Pièce jointe (Optionnel)</label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative cursor-pointer group">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-2">
                          {formData.file ? (
                            <>
                              <FileText size={40} className="text-accent" />
                              <span className="font-semibold text-gray-900 dark:text-white">{formData.file.name}</span>
                              <span className="text-xs text-green-500">Fichier prêt à l'envoi</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud size={40} className="text-gray-400 group-hover:text-accent transition-colors" />
                              <span className="text-gray-500 dark:text-gray-400">Glissez un fichier ou cliquez pour parcourir</span>
                              <span className="text-xs text-gray-400">PDF, JPG, PNG, DOCX (Max 10Mo)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* STEP 4: BUDGET */}
              {step === 4 && (
                <MotionDiv key="step4" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                  <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Budget & Planification <span className="text-red-500">*</span></h3>
                  
                   {errors.budget && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
                      <AlertCircle size={18} /> {errors.budget}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Estimation du Budget <span className="text-red-500">*</span></label>
                      <div className="space-y-3">
                        {BUDGET_RANGES.map((range) => (
                          <div 
                            key={range}
                            onClick={() => updateForm('budget', range)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.budget === range 
                                ? 'border-accent bg-accent/5 dark:bg-accent/10 text-accent font-semibold' 
                                : 'border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            {range}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Date limite souhaitée</label>
                         <input 
                           type="date" 
                           className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-gray-900 dark:text-white"
                           value={formData.deadline}
                           onChange={(e) => updateForm('deadline', e.target.value)}
                         />
                         <p className="text-xs text-gray-500 mt-2">Laissez vide si flexible.</p>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* STEP 5: INFO */}
              {step === 5 && (
                <MotionDiv key="step5" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                  <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Vos Coordonnées <span className="text-red-500">*</span></h3>
                  
                   <div className="mb-6 grid grid-cols-1 gap-2">
                    {Object.values(errors).map((err, i) => (
                      <div key={i} className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm flex items-center gap-2"><AlertCircle size={14}/> {err}</div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Nom complet <span className="text-red-500">*</span></label>
                      <input type="text" className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-gray-900 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`} placeholder="Votre nom" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Entreprise</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-gray-900 dark:text-white" placeholder="Nom de votre société" value={formData.company} onChange={(e) => updateForm('company', e.target.value)} />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email <span className="text-red-500">*</span></label>
                      <input type="email" className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-gray-900 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`} placeholder="email@exemple.com" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Téléphone <span className="text-red-500">*</span></label>
                      <input type="tel" className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-gray-900 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`} placeholder="+226 XX XX XX XX" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-4 justify-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Préférence de contact :</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="contactMethod" checked={formData.contactMethod === 'email'} onChange={() => updateForm('contactMethod', 'email')} className="accent-accent" />
                      <span className="text-sm text-gray-900 dark:text-white">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="contactMethod" checked={formData.contactMethod === 'phone'} onChange={() => updateForm('contactMethod', 'phone')} className="accent-accent" />
                      <span className="text-sm text-gray-900 dark:text-white">Téléphone</span>
                    </label>
                  </div>
                </MotionDiv>
              )}

              {/* STEP 6: RÉCAPITULATIF */}
              {step === 6 && (
                <MotionDiv key="step6" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.3 }} className="flex-grow">
                   <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Récapitulatif de votre demande</h3>
                   <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 text-sm md:text-base">
                      <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                         <div>
                            <h4 className="font-bold text-primary dark:text-accent mb-2 flex items-center gap-2"><Globe size={16}/> Projet</h4>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Type:</span> {PROJECT_TYPES.find(t => t.id === formData.projectType)?.title}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Nature:</span> {PROJECT_NATURE.find(n => n.id === formData.projectNature)?.title}</p>
                            <button type="button" onClick={() => goToStep(1)} className="text-xs text-gray-500 underline mt-1 flex items-center gap-1"><Edit3 size={10}/> Modifier</button>
                         </div>
                         
                         <div>
                            <h4 className="font-bold text-primary dark:text-accent mb-2 flex items-center gap-2"><Cpu size={16}/> Options</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                              {formData.features.length > 0 ? formData.features.map(f => FEATURES.find(feat => feat.id === f)?.label).join(', ') : "Aucune option"}
                            </p>
                             <button type="button" onClick={() => goToStep(2)} className="text-xs text-gray-500 underline mt-1 flex items-center gap-1"><Edit3 size={10}/> Modifier</button>
                         </div>

                         <div className="md:col-span-2">
                             <h4 className="font-bold text-primary dark:text-accent mb-2 flex items-center gap-2"><FileText size={16}/> Description</h4>
                             <p className="text-gray-700 dark:text-gray-300 italic">"{formData.description}"</p>
                             {formData.file && <p className="text-xs text-green-500 mt-1">📎 {formData.file.name}</p>}
                              <button type="button" onClick={() => goToStep(3)} className="text-xs text-gray-500 underline mt-1 flex items-center gap-1"><Edit3 size={10}/> Modifier</button>
                         </div>

                         <div>
                            <h4 className="font-bold text-primary dark:text-accent mb-2 flex items-center gap-2"><BarChart size={16}/> Budget & Délai</h4>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Budget:</span> {formData.budget}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Délai:</span> {formData.deadline || "Flexible"}</p>
                             <button type="button" onClick={() => goToStep(4)} className="text-xs text-gray-500 underline mt-1 flex items-center gap-1"><Edit3 size={10}/> Modifier</button>
                         </div>

                         <div>
                            <h4 className="font-bold text-primary dark:text-accent mb-2 flex items-center gap-2"><Shield size={16}/> Coordonnées</h4>
                            <p className="text-gray-700 dark:text-gray-300">{formData.name}</p>
                            <p className="text-gray-700 dark:text-gray-300">{formData.email} | {formData.phone}</p>
                            <p className="text-gray-700 dark:text-gray-300">{formData.company}</p>
                             <button type="button" onClick={() => goToStep(5)} className="text-xs text-gray-500 underline mt-1 flex items-center gap-1"><Edit3 size={10}/> Modifier</button>
                         </div>
                      </div>
                   </div>
                   <p className="text-center text-xs text-gray-500 mt-6">En cliquant sur envoyer, vous acceptez que nos équipes vous contactent pour cette proposition.</p>
                </MotionDiv>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200 dark:border-white/10 shrink-0">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors font-semibold flex items-center gap-2 text-gray-700 dark:text-white">
                  <ArrowLeft size={18} /> <span className="hidden sm:inline">Précédent</span>
                </button>
              ) : (<div></div>)}

              {step < 6 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="px-8 py-3 bg-primary text-white hover:bg-primary-light shadow-lg rounded-full font-bold flex items-center gap-2 transition-all transform hover:translate-x-1"
                >
                  {step === 5 ? 'Vérifier' : 'Suivant'} <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-accent text-dark font-bold rounded-full hover:bg-white transition-all shadow-lg hover:shadow-accent/50 flex items-center gap-2 transform hover:-translate-y-1"
                >
                  {isSubmitting ? 'Envoi...' : 'Confirmer & Envoyer'} <Send size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Quote;