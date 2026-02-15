'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Eye, Palette, Check } from 'lucide-react';
import { useTheme, Theme } from '../../context/ThemeContext';

/**
 * Sélecteur de Thème Architectural
 * Permet de basculer entre les modes Clair et Sombre uniquement.
 */
const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--text-main)] shadow-sm border-[var(--border-color)]"
      aria-label="Changer de thème"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeSwitcher;

