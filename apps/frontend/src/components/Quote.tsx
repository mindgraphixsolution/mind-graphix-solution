'use client';
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
import { useLanguage } from '../context/LanguageContext';

/**
 * Composant Quote - Formulaire de demande de devis interactif en 6 étapes.
 * Architecturé pour le Design System Mind Graphix avec support bilingue et mode sombre.
 */

// Types de projets avec traductions
const getProjectTypes = (t: any) => [
  { id: 'web', title: t('quote.types.web.title'), icon: Globe, desc: t('quote.types.web.desc') },
  { id: 'mobile', title: t('quote.types.mobile.title'), icon: Smartphone, desc: t('quote.types.mobile.desc') },
  { id: 'design', title: t('quote.types.design.title'), icon: Palette, desc: t('quote.types.design.desc') },
  { id: 'marketing', title: t('quote.types.marketing.title'), icon: BarChart, desc: t('quote.types.marketing.desc') },
  { id: 'motion', title: t('quote.types.motion.title'), icon: Video, desc: t('quote.types.motion.desc') },
  { id: 'software', title: t('quote.types.software.title'), icon: Cpu, desc: t('quote.types.software.desc') },
];

// Nature du projet avec traductions
const getProjectNature = (t: any) => [
  { id: 'creation', title: t('quote.nature.creation.title'), desc: t('quote.nature.creation.desc') },
  { id: 'redesign', title: t('quote.nature.redesign.title'), desc: t('quote.nature.redesign.desc') },
  { id: 'maintenance', title: t('quote.nature.maintenance.title'), desc: t('quote.nature.maintenance.desc') },
];

// Fonctionnalités additionnelles avec traductions
const getFeatures = (t: any) => [
  { id: 'cms', label: t('quote.features.cms'), icon: Layout },
  { id: 'ecommerce', label: t('quote.features.ecommerce'), icon: ShoppingCart },
  { id: 'multilang', label: t('quote.features.multilang'), icon: Globe2 },
  { id: 'seo', label: t('quote.features.seo'), icon: Zap },
  { id: 'auth', label: t('quote.features.auth'), icon: Shield },
  { id: 'api', label: t('quote.features.api'), icon: Database },
];

// Gammes de budget (constantes car numériques/unités fixes)
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
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Chargement des données traduites
  const PROJECT_TYPES = getProjectTypes(t);
  const PROJECT_NATURE = getProjectNature(t);
  const FEATURES = getFeatures(t);
  
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
      if (!formData.projectType) { newErrors.projectType = t('quote.error_project_type'); isValid = false; }
      if (!formData.projectNature) { newErrors.projectNature = t('quote.error_project_nature'); isValid = false; }
    }
    
    if (currentStep === 3) {
      if (!formData.description.trim()) { newErrors.description = t('quote.error_description'); isValid = false; }
      else if (formData.description.length < 20) { newErrors.description = t('quote.error_description_short'); isValid = false; }
    }

    if (currentStep === 4) {
      if (!formData.budget) { newErrors.budget = t('quote.error_budget'); isValid = false; }
    }

    if (currentStep === 5) {
      if (!formData.name.trim()) { newErrors.name = t('quote.error_name'); isValid = false; }
      if (!formData.email.trim()) { newErrors.email = t('quote.error_email'); isValid = false; }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = t('quote.error_email_invalid'); isValid = false; }
      if (!formData.phone.trim()) { newErrors.phone = t('quote.error_phone'); isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Navigation entre les étapes
  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 6) setStep(step + 1);
      window.scrollTo({ top: document.getElementById('devis')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: document.getElementById('devis')?.offsetTop || 0, behavior: 'smooth' });
  };

  const goToStep = (s: number) => setStep(s);

  // Mise à jour des champs du formulaire
  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur lors de la modification
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
      setFormData(prev => ({ ...prev, file: e.target.files![0] as File | null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return; // Double check final step
    
    setIsSubmitting(true);
    
    // Simulation d'envoi API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Construction de l'objet final
    const newQuote: QuoteRequest = {
      id: Math.random().toString(36).substring(2, 11).toUpperCase(),
      projectType: PROJECT_TYPES.find(t => t.id === formData.projectType)?.title || formData.projectType,
      projectNature: PROJECT_NATURE.find(n => n.id === formData.projectNature)?.title || formData.projectNature,
      features: formData.features.map(f => FEATURES.find(feat => feat.id === f)?.label || f),
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

    if (onQuoteSubmit) {
      onQuoteSubmit(newQuote);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Variantes d'animation Framer Motion
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const MotionDiv = motion.div as any;

  // Écran de succès après envoi
  if (isSuccess) {
    return (
      <Section id="devis" className="bg-[var(--bg-primary)]">
        <MotionDiv 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="glass border border-[var(--border-color)] p-12 rounded-[2.5rem] text-center max-w-lg mx-auto shadow-2xl"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-[var(--text-main)] mb-4 tracking-tighter">
            {t('quote.success_title')}
          </h2>
          <p className="text-[var(--text-muted)] mb-8 font-light leading-relaxed">
            {t('quote.success_desc').replace('{name}', formData.name)}
          </p>
          <button 
            onClick={() => { 
              setIsSuccess(false); 
              setStep(1); 
              setFormData({
                projectType: '',
                projectNature: '',
                features: [],
                description: '',
                budget: '',
                deadline: '',
                file: null,
                name: '',
                company: '',
                email: '',
                phone: '',
                contactMethod: 'email'
              }); 
            }}
            className="btn-architect"
          >
            {t('quote.new_request')}
          </button>
        </MotionDiv>
      </Section>
    );
  }

  return (
    <Section id="devis" className="bg-[var(--bg-primary)]">
      {/* En-tête de section */}
      <div className="text-center mb-16">
        <MotionDiv initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-6 tracking-tighter">
            {t('quote.title')} <span className="text-[var(--accent-color)]">{t('quote.title_span')}</span>
          </h2>
          <div className="w-20 h-1.5 bg-[var(--accent-color)] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-light leading-relaxed">
            {t('quote.subtitle')}
          </p>
        </MotionDiv>
      </div>

      {/* Barre de progression interactive */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--border-color)] rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--accent-color)] rounded-full -z-10 transition-all duration-700 ease-out"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></div>

          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className={`flex flex-col items-center gap-3 ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
              <div 
                onClick={() => s < step && goToStep(s)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 cursor-pointer ${
                step >= s ? 'bg-[var(--accent-color)] text-black scale-110 shadow-lg' : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]'
              }`}>
                {s === 6 ? <CheckCircle2 size={18} /> : s}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hidden sm:block text-[var(--text-muted)]">
                {s === 1 ? t('quote.step_1') : s === 2 ? t('quote.step_2') : s === 3 ? t('quote.step_3') : s === 4 ? t('quote.step_4') : s === 5 ? t('quote.step_5') : t('quote.step_6')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteneur principal du formulaire */}
      <div className="max-w-5xl mx-auto">
        <div className="glass border border-[var(--border-color)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl min-h-[600px] flex flex-col justify-between relative overflow-hidden">
          {/* Effets visuels de fond */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col relative z-10">
            <AnimatePresence mode="wait" custom={step}>
              
              {/* ÉTAPE 1: TYPE ET NATURE DU PROJET */}
              {step === 1 && (
                <MotionDiv key="step1" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-8 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.project_type')} <span className="text-[var(--accent-color)]">*</span>
                  </h3>
                  
                  {errors.projectType && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 justify-center animate-pulse">
                      <AlertCircle size={18} /> {errors.projectType}
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {PROJECT_TYPES.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => updateForm('projectType', type.id)}
                        className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-500 flex flex-col items-center text-center gap-4 group ${
                          formData.projectType === type.id 
                            ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5 shadow-[0_0_30px_rgba(var(--accent-color-rgb),0.1)]' 
                            : 'border-transparent bg-[var(--bg-surface)] hover:border-[var(--border-color)]'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          formData.projectType === type.id ? 'bg-[var(--accent-color)] text-black' : 'bg-[var(--bg-primary)] text-[var(--text-muted)] group-hover:text-[var(--text-main)]'
                        }`}>
                          <type.icon size={28} />
                        </div>
                        <h4 className={`font-bold text-base ${formData.projectType === type.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                          {type.title}
                        </h4>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-black mb-6 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.project_nature')} <span className="text-[var(--accent-color)]">*</span>
                  </h3>
                   {errors.projectNature && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 justify-center animate-pulse">
                      <AlertCircle size={18} /> {errors.projectNature}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PROJECT_NATURE.map((nat) => (
                      <div
                        key={nat.id}
                        onClick={() => updateForm('projectNature', nat.id)}
                        className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-500 ${
                          formData.projectNature === nat.id
                            ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5'
                            : 'border-transparent bg-[var(--bg-surface)] hover:border-[var(--border-color)]'
                        }`}
                      >
                        <h4 className={`font-bold mb-2 ${formData.projectNature === nat.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                          {nat.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{nat.desc}</p>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* ÉTAPE 2: FONCTIONNALITÉS OPTIONNELLES */}
              {step === 2 && (
                <MotionDiv key="step2" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-2 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.features_title')}
                  </h3>
                  <p className="text-center text-[var(--text-muted)] mb-10 font-light">{t('quote.features_subtitle')}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {FEATURES.map((feat) => (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center gap-5 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                          formData.features.includes(feat.id)
                            ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5'
                            : 'border-transparent bg-[var(--bg-surface)] hover:border-[var(--border-color)]'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          formData.features.includes(feat.id) ? 'bg-[var(--accent-color)] text-black' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'
                        }`}>
                          {formData.features.includes(feat.id) ? <CheckCircle2 size={24} /> : <feat.icon size={24} />}
                        </div>
                        <span className={`font-bold text-lg ${formData.features.includes(feat.id) ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                          {feat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* ÉTAPE 3: DESCRIPTION ET FICHIERS */}
              {step === 3 && (
                <MotionDiv key="step3" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-8 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.details_title')} <span className="text-[var(--accent-color)]">*</span>
                  </h3>
                  
                   {errors.description && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3">
                      <AlertCircle size={18} /> {errors.description}
                    </div>
                  )}

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest mb-4 text-[var(--text-muted)]">
                        {t('quote.description_label')} <span className="text-[var(--accent-color)]">*</span>
                      </label>
                      <textarea 
                        rows={6}
                        placeholder={t('quote.description_placeholder')}
                        className={`w-full bg-[var(--bg-surface)] border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 resize-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 ${errors.description ? 'border-red-500/50' : 'border-[var(--border-color)]'}`}
                        value={formData.description}
                        onChange={(e) => updateForm('description', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest mb-4 text-[var(--text-muted)]">
                        {t('quote.attachment_label')}
                      </label>
                      <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-10 text-center hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)]/5 transition-all duration-500 relative cursor-pointer group">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4">
                          {formData.file ? (
                            <>
                              <div className="w-16 h-16 bg-[var(--accent-color)]/20 rounded-2xl flex items-center justify-center text-[var(--accent-color)]">
                                <FileText size={32} />
                              </div>
                              <span className="font-bold text-[var(--text-main)]">{formData.file.name}</span>
                              <span className="text-xs text-green-500 font-bold uppercase tracking-widest">{t('quote.attachment_ready')}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 bg-[var(--bg-primary)] rounded-2xl flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-all duration-500">
                                <UploadCloud size={32} />
                              </div>
                              <span className="text-[var(--text-muted)] font-medium">{t('quote.attachment_drop')}</span>
                              <span className="text-[10px] text-[var(--text-muted)]/50 uppercase tracking-widest font-bold">PDF, JPG, PNG, DOCX (Max 10Mo)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* ÉTAPE 4: BUDGET ET DÉLAIS */}
              {step === 4 && (
                <MotionDiv key="step4" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-10 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.budget_title')} <span className="text-[var(--accent-color)]">*</span>
                  </h3>
                  
                   {errors.budget && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3">
                      <AlertCircle size={18} /> {errors.budget}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest mb-6 text-[var(--text-muted)]">
                        {t('quote.budget_label')} <span className="text-[var(--accent-color)]">*</span>
                      </label>
                      <div className="space-y-4">
                        {BUDGET_RANGES.map((range) => (
                          <div 
                            key={range}
                            onClick={() => updateForm('budget', range)}
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                              formData.budget === range
                                ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5'
                                : 'border-transparent bg-[var(--bg-surface)] hover:border-[var(--border-color)]'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                              formData.budget === range ? 'border-[var(--accent-color)]' : 'border-[var(--border-color)]'
                            }`}>
                              {formData.budget === range && <div className="w-3 h-3 bg-[var(--accent-color)] rounded-full" />}
                            </div>
                            <span className={`font-bold ${formData.budget === range ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                              {range}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest mb-6 text-[var(--text-muted)]">
                        {t('quote.deadline_label')}
                      </label>
                      <div className="relative">
                        <Edit3 className="absolute left-6 top-6 text-[var(--text-muted)]" size={20} />
                        <input 
                          type="text"
                          placeholder={t('quote.deadline_placeholder')}
                          className="w-full bg-[var(--bg-surface)] border-2 border-[var(--border-color)] rounded-2xl pl-16 pr-6 py-5 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 text-[var(--text-main)] font-bold placeholder:text-[var(--text-muted)]/50"
                          value={formData.deadline}
                          onChange={(e) => updateForm('deadline', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* ÉTAPE 5: INFORMATIONS DE CONTACT */}
              {step === 5 && (
                <MotionDiv key="step5" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-2 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.contact_title')} <span className="text-[var(--accent-color)]">*</span>
                  </h3>
                  <p className="text-center text-[var(--text-muted)] mb-12 font-light">{t('quote.contact_subtitle')}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-[var(--text-muted)]">{t('quote.contact_name')} *</label>
                        <input 
                          type="text"
                          className={`w-full bg-[var(--bg-surface)] border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 text-[var(--text-main)] font-bold ${errors.name ? 'border-red-500/50' : 'border-[var(--border-color)]'}`}
                          value={formData.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-[var(--text-muted)]">{t('quote.contact_company')}</label>
                        <input 
                          type="text"
                          className="w-full bg-[var(--bg-surface)] border-2 border-[var(--border-color)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 text-[var(--text-main)] font-bold"
                          value={formData.company}
                          onChange={(e) => updateForm('company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-[var(--text-muted)]">{t('quote.contact_email')} *</label>
                        <input 
                          type="email"
                          className={`w-full bg-[var(--bg-surface)] border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 text-[var(--text-main)] font-bold ${errors.email ? 'border-red-500/50' : 'border-[var(--border-color)]'}`}
                          value={formData.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-[var(--text-muted)]">{t('quote.contact_phone')} *</label>
                        <input 
                          type="tel"
                          className={`w-full bg-[var(--bg-surface)] border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--accent-color)] transition-all duration-500 text-[var(--text-main)] font-bold ${errors.phone ? 'border-red-500/50' : 'border-[var(--border-color)]'}`}
                          value={formData.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-6 text-center text-[var(--text-muted)]">{t('quote.contact_method')}</label>
                    <div className="flex justify-center gap-6">
                      {['email', 'phone', 'whatsapp'].map((method) => (
                        <div 
                          key={method}
                          onClick={() => updateForm('contactMethod', method)}
                          className={`px-8 py-4 rounded-2xl border-2 cursor-pointer transition-all duration-500 font-bold capitalize ${
                            formData.contactMethod === method
                              ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5 text-[var(--text-main)]'
                              : 'border-transparent bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--border-color)]'
                          }`}
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* ÉTAPE 6: RÉCAPITULATIF FINAL */}
              {step === 6 && (
                <MotionDiv key="step6" custom={step} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.4 }} className="flex-grow">
                  <h3 className="text-2xl font-black mb-2 text-center text-[var(--text-main)] tracking-tight">
                    {t('quote.recap_title')}
                  </h3>
                  <p className="text-center text-[var(--text-muted)] mb-12 font-light">{t('quote.recap_subtitle')}</p>
                  
                  <div className="grid md:grid-cols-2 gap-10 bg-[var(--bg-surface)] p-10 rounded-[2.5rem] border border-[var(--border-color)] shadow-inner">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0">
                          <Layout size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{t('quote.project_type')}</p>
                          <p className="font-bold text-[var(--text-main)]">{PROJECT_TYPES.find(t => t.id === formData.projectType)?.title}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0">
                          <Zap size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{t('quote.project_nature')}</p>
                          <p className="font-bold text-[var(--text-main)]">{PROJECT_NATURE.find(n => n.id === formData.projectNature)?.title}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0">
                          <BarChart size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{t('quote.budget_label')}</p>
                          <p className="font-bold text-[var(--text-main)]">{formData.budget}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="flex-grow">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{t('quote.description_label')}</p>
                          <p className="text-sm text-[var(--text-main)] line-clamp-3 leading-relaxed font-medium italic">"{formData.description}"</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0">
                          <Send size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Contact</p>
                          <p className="font-bold text-[var(--text-main)]">{formData.name}</p>
                          <p className="text-xs text-[var(--text-muted)] font-medium">{formData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

            </AnimatePresence>

            {/* Boutons de navigation du formulaire */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--border-color)]">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[var(--border-color)] text-[var(--text-muted)] rounded-2xl font-bold hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-all duration-500"
                >
                  <ArrowLeft size={20} /> {t('quote.btn_prev')}
                </button>
              ) : <div></div>}

              {step < 6 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="btn-architect flex items-center gap-3"
                >
                  {t('quote.btn_next')} <ArrowRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-architect flex items-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      {t('quote.btn_submitting')}
                    </>
                  ) : (
                    <>
                      {t('quote.btn_submit')} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
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
