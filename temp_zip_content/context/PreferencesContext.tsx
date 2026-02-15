
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { mockDB } from '../utils/mockDatabase';

interface Preferences {
  accentColor: string;
  sidebarPosition: 'left' | 'right';
  density: 'compact' | 'comfortable';
  shortcuts: Record<string, string>;
  dashboardLayout: string[]; // List of widget IDs
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreference: (key: keyof Preferences, value: any) => void;
  registerShortcut: (action: string, key: string) => void;
  resetTour: () => void;
  focusMode: boolean; // Ephemeral state
  setFocusMode: (value: boolean) => void;
  updateDashboardLayout: (newLayout: string[]) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preferences>(mockDB.getPreferences());
  const [focusMode, setFocusMode] = useState(false);

  // Load preferences from DB on init and update
  useEffect(() => {
    const update = () => setPreferences(mockDB.getPreferences());
    update();
    window.addEventListener('mgs_db_update', update);
    return () => window.removeEventListener('mgs_db_update', update);
  }, []);

  // Keyboard shortcut for Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Focus Mode with 'f' if no input focused
      if (e.key === (preferences.shortcuts['toggle_focus'] || 'f') && 
          !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setFocusMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [preferences.shortcuts]);

  // Apply Accent Color to CSS Variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', preferences.accentColor);
  }, [preferences.accentColor]);

  const updatePreference = (key: keyof Preferences, value: any) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    mockDB.savePreferences(newPrefs);
  };

  const registerShortcut = (action: string, key: string) => {
    const newShortcuts = { ...preferences.shortcuts, [action]: key };
    updatePreference('shortcuts', newShortcuts);
  };

  const updateDashboardLayout = (newLayout: string[]) => {
    updatePreference('dashboardLayout', newLayout);
  };

  const resetTour = () => {
    localStorage.removeItem('mgs_db_tour_completed');
    window.location.reload(); 
  };

  return (
    <PreferencesContext.Provider value={{ 
      preferences, 
      updatePreference, 
      registerShortcut, 
      resetTour,
      focusMode,
      setFocusMode,
      updateDashboardLayout
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
