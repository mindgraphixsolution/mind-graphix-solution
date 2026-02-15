
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
import { Link } from 'react-router-dom';
import { mockDB } from '../../utils/mockDatabase';
import { useAdmin } from '../../context/AdminContext';

// --- CONSTANTS & DATA ---
const PROJECT_TYPES = [
  { id: 'web', title: 'Site Web', icon: Globe, desc: 'Vitrine, E-commerce, SaaS, Landing Page' },
  { id: 'mobile', title: 'Application Mobile', icon: Smartphone, desc: 'iOS, Android, React Native, PWA' },
  { id: 'design', title: 'Design & Branding', icon: Palette, desc: 'Logo, Charte Graphique, Maquettes UI/UX' },
  { id: 'marketing', title: 'Marketing Digital', icon: BarChart, desc: 'SEO, Google Ads, Gestion Réseaux Sociaux' },
  { id: 'motion', title: 'Motion Design', icon: Video, desc: 'Animation 2D/3D, Montage Vidéo, Spot Pub' },
  { id: 'software', title: 'Logiciel Sur Mesure', icon: Cpu, desc: 'CRM, ERP, Intranet, Outils Métier' },
];

const PROJECT_NATURE = [
  { id: 'creation', title: 'Création Complète', desc: 'Nouveau projet à partir de zéro' },
  { id: 'redesign', title: 'Refonte / Redesign', desc: 'Modernisation d\'un existant' },
  { id: 'maintenance', title: 'Maintenance / Évol.', desc: 'Mises à jour et correctifs' },
];

const FEATURES_OPTIONS = [
  { id: 'cms', label: 'Administration (CMS)', icon: Layout },
  { id: 'ecommerce', label: 'Paiement en ligne', icon: ShoppingCart },
  { id: 'seo', label: 'SEO Avancé', icon: Zap },
  { id: 'api', label: 'Connexion API / CRM', icon: Database },
  { id: 'multi', label: 'Multilingue', icon: Globe2 },
  { id: 'auth', label: 'Espace Membre', icon: Lock },
];

const BUDGET_RANGES = [
  { id: 'small', label: '< 500.000 FCFA', desc: 'Projets simples' },
  { id: 'medium', label: '500k - 1M FCFA', desc: 'Projets standards' },
  { id: 'large', label: '1M - 3M FCFA', desc: 'Projets avancés' },
  { id: 'xl', label: '3M - 5M FCFA', desc: 'Envergure' },
  { id: 'xxl', label: '> 5M FCFA', desc: 'Grands comptes' },
  { id: 'unknown', label: 'À définir', desc: 'Je ne sais pas encore' },
];

const generateReferenceID = () => {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MGS-${year}-${randomPart}`;
};

const QuotePage: React.FC = () => {
  const { isAuthenticated } = useAdmin();
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
      if (!formData.projectType) { newErrors.projectType = "Veuillez sélectionner un type de projet."; isValid = false; }
      if (!formData.projectNature) { newErrors.projectNature = "Veuillez préciser la nature du projet."; isValid = false; }
    }
    if (currentStep === 3) {
       if (!formData.description.trim() || formData.description.length < 20) {
         newErrors.description = "Veuillez décrire votre projet (min. 20 caractères)."; isValid = false;
       }
    }
    if (currentStep === 4) {
      if (!formData.budget) { newErrors.budget = "Veuillez sélectionner une fourchette budgétaire."; isValid = false; }
    }
    if (currentStep === 5) {
      if (!formData.firstName) { newErrors.firstName = "Prénom requis."; isValid = false; }
      if (!formData.lastName) { newErrors.lastName = "Nom requis."; isValid = false; }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Email valide requis."; isValid = false; }
      if (!formData.phone) { newErrors.phone = "Téléphone requis."; isValid = false; }
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
        subject: `${PROJECT_TYPES.find(t => t.id === formData.projectType)?.title} - ${formData.company || formData.lastName}`,
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
      <div className="min-h-screen bg-[#02040a] pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-2xl text-center">
           <div className="w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Lock size={40} className="text-accent" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Accès réservé aux <span className="text-primary">Membres</span></h1>
           <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto">
             Pour garantir un accompagnement personnalisé et sécurisé, la création d'un devis nécessite d'être membre Mind Graphix.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin/login" className="px-10 py-5 bg-white text-black font-black rounded-full hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-3">
                 <UserCheck size={20} /> Se connecter / S'inscrire
              </Link>
              <Link to="/contact" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                 Contacter le support
              </Link>
           </div>
           
           <p className="mt-12 text-xs text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldAlert size={14} /> Sécurisation des données SSL 256-bit
           </p>
        </MotionDiv>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark pt-32 pb-20 px-6 flex items-center justify-center">
        <MotionDiv initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-12 rounded-3xl text-center max-w-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
          <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Demande Transmise !</h2>
          <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-2xl mb-8 border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-2">Référence dossier</p>
            <p className="text-3xl font-mono font-bold text-primary dark:text-accent tracking-widest">{referenceID}</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            Merci <strong>{formData.firstName}</strong>. Un chef de projet a été notifié. Votre proposition sera disponible dans votre espace sous 24h.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent hover:text-dark transition-all transform hover:-translate-y-1 shadow-lg">
            Retour à l'accueil <ArrowRight size={20} />
          </Link>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark text-slate-900 dark:text-white pt-24 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-6 text-center mb-12">
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
            <ShieldCheck size={14} /> Espace Sécurisé
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Parlez-nous de votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projet</span></h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Estimation précise et stratégie adaptée basées sur vos besoins réels.</p>
        </MotionDiv>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 shrink-0">
             <div className="sticky top-32 space-y-1">
                {["Type & Nature", "Fonctionnalités", "Description", "Budget & Délai", "Coordonnées", "Récapitulatif"].map((label, n) => (
                  <div key={n} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${step === n+1 ? 'bg-white dark:bg-white/5 shadow-md border border-gray-100 dark:border-white/10' : 'opacity-60'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= n+1 ? 'bg-primary border-primary text-white' : 'border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                       {step > n+1 ? <CheckCircle2 size={16} /> : n+1}
                    </div>
                    <span className={`font-medium ${step === n+1 ? 'text-primary dark:text-accent' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
                  </div>
                ))}
                <div className="mt-8 p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 text-center">
                   <p className="text-xs text-gray-500 uppercase font-bold mb-1">Dossier Réf.</p>
                   <p className="font-mono text-gray-800 dark:text-white font-bold">{referenceID}</p>
                </div>
             </div>
          </div>

          <div className="flex-1">
             <div className="bg-white dark:bg-[#151e32] border border-gray-200 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative min-h-[500px] flex flex-col">
                <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex flex-col">
                   <AnimatePresence mode="wait" custom={step}>
                      {step === 1 && (
                        <MotionDiv key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Globe className="text-accent" /> Quel est votre projet ?</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                              {PROJECT_TYPES.map((type) => (
                                 <div key={type.id} onClick={() => updateForm('projectType', type.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex items-start gap-4 ${formData.projectType === type.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-100 dark:border-white/5 hover:border-primary/30'}`}>
                                    <div className={`p-3 rounded-lg ${formData.projectType === type.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}><type.icon size={24} /></div>
                                    <div><h3 className={`font-bold ${formData.projectType === type.id ? 'text-primary dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>{type.title}</h3><p className="text-xs text-gray-500 mt-1">{type.desc}</p></div>
                                    {formData.projectType === type.id && <div className="ml-auto text-primary"><CheckCircle2 size={20} /></div>}
                                 </div>
                              ))}
                           </div>
                           <h3 className="text-lg font-bold mb-4">Nature du besoin</h3>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {PROJECT_NATURE.map((nat) => (
                                 <button key={nat.id} onClick={() => updateForm('projectNature', nat.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.projectNature === nat.id ? 'border-accent bg-accent/5' : 'border-gray-100 dark:border-white/5 hover:border-gray-300'}`}>
                                    <div className="font-bold text-gray-800 dark:text-white">{nat.title}</div><div className="text-xs text-gray-500 mt-1">{nat.desc}</div>
                                 </button>
                              ))}
                           </div>
                        </MotionDiv>
                      )}
                      {step === 2 && (
                         <MotionDiv key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Cpu className="text-accent" /> Fonctionnalités</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {FEATURES_OPTIONS.map((feat) => (
                                 <div key={feat.id} onClick={() => toggleFeature(feat.id)} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.features.includes(feat.id) ? 'border-accent bg-accent/5' : 'border-gray-100 dark:border-white/5 hover:border-gray-300'}`}>
                                    <div className={`p-2 rounded-lg ${formData.features.includes(feat.id) ? 'bg-accent text-dark' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}><feat.icon size={20} /></div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{feat.label}</span>
                                    {formData.features.includes(feat.id) && <CheckCircle2 size={20} className="ml-auto text-accent" />}
                                 </div>
                              ))}
                           </div>
                        </MotionDiv>
                      )}
                      {step === 3 && (
                         <MotionDiv key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FileText className="text-accent" /> Détails du projet</h2>
                           <div className="space-y-6">
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description du besoin *</label>
                                 <textarea value={formData.description} onChange={(e) => updateForm('description', e.target.value)} rows={8} className={`w-full bg-gray-50 dark:bg-black/20 border rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`} placeholder="Décrivez votre projet en détail..."></textarea>
                              </div>
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Cahier des charges (Optionnel)</label>
                                 <div className="relative border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                    <input type="file" onChange={(e) => e.target.files && updateForm('file', e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    {formData.file ? (
                                       <><div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-2"><FileText /></div><span className="font-bold text-gray-800 dark:text-white">{formData.file.name}</span></>
                                    ) : (
                                       <><UploadCloud size={40} className="text-gray-400 group-hover:text-primary mb-2 transition-colors"/><span className="text-gray-600 dark:text-gray-400 font-medium">Glissez un fichier ou cliquez ici</span></>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                      {step === 4 && (
                         <MotionDiv key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><DollarSign className="text-accent" /> Budget & Planning</h2>
                           <div className="mb-8">
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Estimation Budgétaire *</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 {BUDGET_RANGES.map((range) => (
                                    <button key={range.id} onClick={() => updateForm('budget', range.label)} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.budget === range.label ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 hover:border-gray-300'}`}>
                                       <div className={`font-bold ${formData.budget === range.label ? 'text-primary' : 'text-gray-800 dark:text-white'}`}>{range.label}</div><div className="text-xs text-gray-500">{range.desc}</div>
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Date souhaitée</label>
                              <div className="relative">
                                 <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                 <input type="date" value={formData.deadline} onChange={(e) => updateForm('deadline', e.target.value)} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white outline-none" />
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                      {step === 5 && (
                         <MotionDiv key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><User className="text-accent" /> Vos Coordonnées</h2>
                           <div className="grid md:grid-cols-2 gap-6">
                              <input placeholder="Prénom" value={formData.firstName} onChange={(e) => updateForm('firstName', e.target.value)} className="w-full bg-gray-50 dark:bg-black/20 border rounded-xl p-3 outline-none focus:border-primary transition-all dark:text-white" />
                              <input placeholder="Nom" value={formData.lastName} onChange={(e) => updateForm('lastName', e.target.value)} className="w-full bg-gray-50 dark:bg-black/20 border rounded-xl p-3 outline-none focus:border-primary transition-all dark:text-white" />
                              <input placeholder="Email" type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="w-full md:col-span-2 bg-gray-50 dark:bg-black/20 border rounded-xl p-3 outline-none focus:border-primary transition-all dark:text-white" />
                              <input placeholder="Téléphone" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="w-full md:col-span-2 bg-gray-50 dark:bg-black/20 border rounded-xl p-3 outline-none focus:border-primary transition-all dark:text-white" />
                           </div>
                        </MotionDiv>
                      )}
                      {step === 6 && (
                         <MotionDiv key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Récapitulatif</h2>
                           <div className="space-y-4">
                              <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Projet</h3>
                                 <p className="font-bold text-lg text-slate-800 dark:text-white">{PROJECT_TYPES.find(t=>t.id===formData.projectType)?.title} - {PROJECT_NATURE.find(n=>n.id===formData.projectNature)?.title}</p>
                                 <p className="text-sm text-gray-500 mt-2">{formData.description}</p>
                              </div>
                              <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Client</h3>
                                 <p className="font-bold text-slate-800 dark:text-white">{formData.firstName} {formData.lastName}</p>
                                 <p className="text-sm text-gray-500">{formData.email} | {formData.phone}</p>
                              </div>
                           </div>
                        </MotionDiv>
                      )}
                   </AnimatePresence>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                   {step > 1 ? (
                      <button onClick={handleBack} className="px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 font-bold transition-colors flex items-center gap-2">
                         <ArrowLeft size={20} /> Retour
                      </button>
                   ) : <div/>}

                   {step < 6 ? (
                      <button onClick={handleNext} className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all transform hover:translate-x-1 flex items-center gap-2">
                         Suivant <ArrowRight size={20} />
                      </button>
                   ) : (
                      <button onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold shadow-xl hover:shadow-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                         {isSubmitting ? 'Envoi...' : 'Confirmer'} <Send size={20} />
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
