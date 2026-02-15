
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Eye, Palette, Check } from 'lucide-react';
import { useTheme, Theme } from '../../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: Theme; label: string; icon: any; color: string }[] = [
    { id: 'light', label: 'Clair', icon: Sun, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'dark', label: 'Sombre', icon: Moon, color: 'bg-slate-700 text-slate-200' },
    { id: 'high-contrast', label: 'Contraste', icon: Eye, color: 'bg-black text-white border border-white' },
    { id: 'color-blind', label: 'Daltonien', icon: Palette, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-main)] shadow-sm"
        aria-label="Changer de thème"
      >
        {theme === 'light' && <Sun size={18} />}
        {theme === 'dark' && <Moon size={18} />}
        {theme === 'high-contrast' && <Eye size={18} />}
        {theme === 'color-blind' && <Palette size={18} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute right-0 mt-2 w-48 p-2 rounded-[var(--radius-lg)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl z-50 overflow-hidden"
            >
              <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 px-2 py-1">
                Apparence
              </div>
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setIsOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors ${theme === t.id ? 'bg-[var(--bg-secondary)]' : 'hover:bg-[var(--bg-secondary)]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${t.color}`}>
                        <t.icon size={14} />
                      </div>
                      <span className="text-[var(--text-main)] font-medium">{t.label}</span>
                    </div>
                    {theme === t.id && <Check size={14} className="text-[var(--primary-color)]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
