
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Command, ArrowRight, Settings, LayoutDashboard, 
  Users, Mail, FileText, Moon, Sun, Monitor, LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../../context/PreferencesContext';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const { setTheme } = useTheme();
  const { logout } = useAdmin();

  // Define Commands
  const commands = [
    { id: 'home', label: 'Aller au Dashboard', icon: LayoutDashboard, action: () => navigate('/admin/dashboard'), category: 'Navigation' },
    { id: 'crm', label: 'Ouvrir CRM', icon: Users, action: () => navigate('/admin/dashboard', { state: { page: 'crm' } }), category: 'Navigation' }, // Note: simplified nav logic
    { id: 'email', label: 'Email Marketing', icon: Mail, action: () => navigate('/admin/dashboard'), category: 'Navigation' },
    
    { id: 'theme_light', label: 'Thème Clair', icon: Sun, action: () => setTheme('light'), category: 'Apparence' },
    { id: 'theme_dark', label: 'Thème Sombre', icon: Moon, action: () => setTheme('dark'), category: 'Apparence' },
    
    { id: 'logout', label: 'Déconnexion', icon: LogOut, action: () => logout(), category: 'Système' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Key Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Palette
      if ((e.metaKey || e.ctrlKey) && e.key === preferences.shortcuts['open_command']) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, preferences.shortcuts]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[60vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-white/10">
              <Search className="text-gray-400 mr-3" size={20} />
              <input 
                ref={inputRef}
                className="flex-1 bg-transparent outline-none text-lg text-gray-800 dark:text-white placeholder-gray-400"
                placeholder="Tapez une commande..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex gap-2">
                <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded text-xs text-gray-500 font-mono">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Aucun résultat trouvé.</div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => { cmd.action(); setIsOpen(false); }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${
                        index === selectedIndex 
                          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cmd.icon size={18} />
                        <span>{cmd.label}</span>
                      </div>
                      {index === selectedIndex && <ArrowRight size={16} className="opacity-50" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/10 text-[10px] text-gray-500 flex justify-between">
               <span><strong>↑↓</strong> pour naviguer</span>
               <span><strong>↵</strong> pour valider</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
