
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, User, Search, Command } from 'lucide-react';

const AISearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const event = new CustomEvent('open-ai-chat', { detail: { initialMessage: query } });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-16 z-30">
      {/* Glow Effect Background */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-0 transition-opacity duration-500 blur-xl ${isFocused ? 'opacity-40' : 'opacity-0'}`}></div>

      <motion.div 
        animate={{ 
          scale: isFocused ? 1.02 : 1,
        }}
        className="relative bg-white/80 dark:bg-[#1a1a2e]/80 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleAskAI} className="flex items-center pl-6 pr-2 py-2">
          <div className={`p-2 rounded-full transition-colors duration-300 ${isFocused ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
             {isFocused ? <Sparkles size={20} className="animate-pulse" /> : <Search size={20} />}
          </div>
          
          <input
            type="text"
            placeholder="Demandez-moi n'importe quoi sur Mind Graphix..."
            className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 h-12 px-4 text-lg font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="flex items-center gap-2">
            <span className="hidden md:flex items-center gap-1 text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded mr-2">
               <Command size={10} /> K
            </span>
            <button 
              type="submit"
              className="p-4 bg-primary text-white rounded-full hover:bg-accent hover:text-dark transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-accent/50"
              title="Lancer l'IA"
            >
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Quick Suggestions with Stagger Animation */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-4 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: User, text: "Parler à un expert", action: () => document.getElementById('expert-btn')?.click() },
              { icon: Sparkles, text: "Générer un devis", action: () => setQuery("Génère un devis pour un site web") },
              { icon: Search, text: "Voir le portfolio", action: () => setQuery("Montre-moi vos réalisations") }
            ].map((item, idx) => (
              <motion.button 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => { if(item.action) item.action(); }}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary hover:bg-primary/20 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
              >
                <item.icon size={12} /> {item.text}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <a href="/contact" id="expert-btn" className="hidden"></a>
    </div>
  );
};

export default AISearch;
