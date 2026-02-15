'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '../translations';
import { DATA_BY_LANG } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  getData: (key: keyof typeof DATA_BY_LANG['fr']) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Fournisseur de Langue - Gère le bilinguisme Français / Anglais
 * Assure la traduction et l'accès aux données localisées.
 */
export const LanguageProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);

  // Chargement depuis le localStorage uniquement côté client
  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('mgs_language');
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mgs_language', lang);
    }
  };

  /**
   * Fonction de traduction par chemin (ex: 'hero.title')
   */
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Traduction manquante pour la clé: ${path} en langue: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return current as string;
  };

  /**
   * Récupère les objets de données (tableaux) selon la langue actuelle
   */
  const getData = (key: keyof typeof DATA_BY_LANG['fr']) => {
    return DATA_BY_LANG[language][key];
  };

  // Éviter les erreurs d'hydratation en retournant le fournisseur avec des valeurs par défaut jusqu'au montage
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

