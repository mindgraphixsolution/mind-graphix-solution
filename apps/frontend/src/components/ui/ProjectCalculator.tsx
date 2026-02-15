'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Globe, ShoppingCart, Smartphone, Paintbrush, Zap, Check, RotateCcw, Info, Layers, Server, Shield, Database } from 'lucide-react';
// @ts-ignore
import Link from 'next/link';

const ProjectCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState('website');
  const [complexity, setComplexity] = useState(1); // 0: MVP, 1: Standard, 2: Premium
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState<string[]>([]);
  const [displayPrice, setDisplayPrice] = useState(0);

  // Animation du prix
  const springValue = useSpring(0, { stiffness: 100, damping: 30 });
  const priceDisplay = useTransform(springValue, (value) => Math.round(value));

  const PROJECT_TYPES = [
    { id: 'website', label: 'Site Vitrine', icon: Globe, basePrice: 250000, desc: "Présence en ligne essentielle" },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, basePrice: 850000, desc: "Vente de produits en ligne" },
    { id: 'app', label: 'App Mobile/Web', icon: Smartphone, basePrice: 1500000, desc: "SaaS ou Application native" },
    { id: 'branding', label: 'Identité Visuelle', icon: Paintbrush, basePrice: 150000, desc: "Logo & Charte graphique" },
  ];

  const COMPLEXITY_LEVELS = [
    { val: 0, label: 'Essentiel (MVP)', multiplier: 1, desc: "Fonctionnel, design propre, sans fioritures." },
    { val: 1, label: 'Standard (Pro)', multiplier: 1.5, desc: "Animations soignées, UI travaillée, interactif." },
    { val: 2, label: 'Premium (Luxe)', multiplier: 2.5, desc: "Expérience immersive, 3D, Motion, Sur-mesure." }
  ];

  const EXTRA_FEATURES = [
    { id: 'seo', label: 'SEO Avancé & Copywriting', price: 150000, icon: Zap },
    { id: 'cms', label: 'CMS Administrable (Admin Panel)', price: 200000, icon: Layers },
    { id: 'multi', label: 'Multi-langues (i18n)', price: 100000, icon: Globe },
    { id: 'api', label: 'Connexion API Externe', price: 250000, icon: Server },
    { id: 'security', label: 'Pack Sécurité Renforcée', price: 120000, icon: Shield },
  ];

  useEffect(() => {
    calculateTotal();
  }, [projectType, complexity, pages, features]);

  useEffect(() => {
    const unsubscribe = priceDisplay.on("change", (v) => setDisplayPrice(v));
    return () => unsubscribe();
  }, [priceDisplay]);

  const calculateTotal = () => {
    const base = PROJECT_TYPES.find(t => t.id === projectType)?.basePrice || 0;
    
    // Multiplicateur de complexité
    const complexityLevel = COMPLEXITY_LEVELS[complexity];
    const complexityMultiplier = complexityLevel ? complexityLevel.multiplier : 1;
    
    // Coût par page/écran (pour les sites/apps)
    // Moins cher si Branding
    const pageCostBase = (projectType === 'branding') ? 0 : 25000; 
    const pageCost = pageCostBase * pages;
    
    // Coût des fonctionnalités
    const featuresCost = features.reduce((acc, featId) => {
      const feat = EXTRA_FEATURES.find(f => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    const total = (base + pageCost + featuresCost) * complexityMultiplier;
    
    // Mise à jour de l'animation du prix
    springValue.set(Math.round(total / 1000) * 1000); // Arrondir au millier
  };

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* LEFT PANEL: CONFIGURATION */}
        <div className="p-8 lg:p-12 lg:w-2/3 space-y-10">
          
          {/* 1. PROJECT TYPE */}
          <div>
            <div className="flex items-center gap-3 mb-6">
               <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">1</span>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Type de Projet</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECT_TYPES.map((type) => {
                const isSelected = projectType === type.id;
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg shadow-primary/10' 
                        : 'border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-white dark:bg-white/10 text-gray-500'}`}>
                      <type.icon size={24} />
                    </div>
                    <div>
                      <span className={`font-bold block ${isSelected ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{type.label}</span>
                      <span className="text-xs text-gray-500">{type.desc}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-primary">
                        <Check size={20} />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 2. SCALE & COMPLEXITY */}
          {projectType !== 'branding' && (
            <div className="grid md:grid-cols-2 gap-10">
               {/* Complexity Slider */}
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">2</span>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Niveau de Finition</h3>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between bg-gray-100 dark:bg-white/5 p-1 rounded-xl relative">
                        {/* Active Pill Background */}
                        <motion.div 
                           className="absolute top-1 bottom-1 bg-white dark:bg-[#2d2d44] rounded-lg shadow-sm"
                           initial={false}
                           animate={{ 
                              left: `${(complexity / 2) * 100}%`,
                              width: '33.33%',
                              x: complexity === 0 ? 4 : complexity === 2 ? -4 : 0
                           }}
                           transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        
                        {COMPLEXITY_LEVELS.map((level, idx) => (
                           <button
                              key={level.val}
                              onClick={() => setComplexity(level.val)}
                              className={`relative z-10 flex-1 py-3 text-sm font-bold text-center transition-colors ${complexity === level.val ? 'text-primary dark:text-white' : 'text-gray-500'}`}
                           >
                              {level.label.split(' ')[0]}
                           </button>
                        ))}
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5 flex items-start gap-2">
                        <Info size={14} className="mt-0.5 text-primary shrink-0"/>
                         {COMPLEXITY_LEVELS[complexity]?.desc}
                     </p>
                  </div>
               </div>

               {/* Pages Slider */}
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">3</span>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Envergure</h3>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                     <div className="flex justify-between items-end mb-4">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Nombre de pages</label>
                        <span className="text-3xl font-black text-primary">{pages}</span>
                     </div>
                     <motion.input 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1"
                        value={pages} 
                        onChange={(e) => setPages(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                     />
                     <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                        <span>1 page</span>
                        <span>15 pages</span>
                        <span>30+ pages</span>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* 4. ADD-ONS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
               <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">4</span>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fonctionnalités</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {EXTRA_FEATURES.map((feat) => {
                  const isActive = features.includes(feat.id);
                  return (
                     <div 
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                           isActive 
                              ? 'bg-accent/10 border-accent shadow-md' 
                              : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                     >
                        <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-lg ${isActive ? 'bg-accent text-dark' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}>
                              <feat.icon size={18} />
                           </div>
                           <span className={`font-semibold text-sm ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{feat.label}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'bg-accent border-accent text-dark' : 'border-gray-300 dark:border-gray-600'}`}>
                           {isActive && <Check size={14} strokeWidth={3} />}
                        </div>
                     </div>
                  );
               })}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: STICKY RECEIPT */}
        <div className="lg:w-1/3 bg-gray-900 text-white p-8 lg:p-12 flex flex-col relative overflow-hidden">
           {/* Background FX */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
           
           <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                 <h2 className="text-xl font-bold tracking-widest uppercase text-gray-400">Estimation</h2>
                 <button 
                    onClick={() => { setProjectType('website'); setComplexity(1); setPages(5); setFeatures([]); }}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:rotate-180 transition-all text-white"
                    title="Réinitialiser"
                 >
                    <RotateCcw size={16} />
                 </button>
              </div>

              <div className="space-y-4 mb-8 text-sm">
                 <div className="flex justify-between">
                    <span className="text-gray-400">Base Projet</span>
                    <span className="font-mono">{(PROJECT_TYPES.find(t=>t.id===projectType)?.basePrice || 0).toLocaleString()} FCFA</span>
                 </div>
                 {projectType !== 'branding' && (
                     <div className="flex justify-between">
                        <span className="text-gray-400">Pages ({pages})</span>
                        <span className="font-mono">{(pages * 25000 * (COMPLEXITY_LEVELS[complexity]?.multiplier || 1)).toLocaleString()} FCFA</span>
                     </div>
                 )}
                 {features.length > 0 && (
                    <div className="flex justify-between text-accent">
                       <span>Options ({features.length})</span>
                       <span className="font-mono">+ {(features.reduce((acc, id) => acc + (EXTRA_FEATURES.find(f=>f.id===id)?.price || 0), 0) * (COMPLEXITY_LEVELS[complexity]?.multiplier || 1)).toLocaleString()} FCFA</span>
                    </div>
                 )}
                  <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-white/10">
                     <span>Multiplicateur {COMPLEXITY_LEVELS[complexity]?.label}</span>
                     <span>x{COMPLEXITY_LEVELS[complexity]?.multiplier}</span>
                  </div>
              </div>

              <div className="mt-auto">
                 <p className="text-sm text-gray-400 mb-1">Budget Estimé</p>
                 <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
                    {displayPrice.toLocaleString()} <span className="text-2xl text-accent">FCFA</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-8">*Estimation indicative non contractuelle.</p>
                 
                 <Link 
                    href="/devis" 
                    className="block w-full py-4 bg-white text-gray-900 font-bold text-center rounded-xl hover:bg-accent hover:text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,171,0,0.4)]"
                 >
                    Valider ce budget
                 </Link>
                 <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <Zap size={12} className="text-accent"/> Réponse sous 24h garantie
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectCalculator;

