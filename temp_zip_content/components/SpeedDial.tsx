
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail, FileText, Plus, X } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface SpeedDialProps {
  onOpenChat: () => void;
}

const SpeedDial: React.FC<SpeedDialProps> = ({ onOpenChat }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const actions = [
    { icon: MessageSquare, label: t('widget.ai_chat'), onClick: () => { onOpenChat(); setIsOpen(false); }, color: 'bg-blue-500/20 text-blue-400' },
    { icon: Phone, label: t('widget.call'), onClick: () => window.open('tel:+22601511146'), color: 'bg-green-500/20 text-green-400' },
    { icon: Mail, label: t('widget.email'), onClick: () => window.open('mailto:mindgraphixsolution@gmail.com'), color: 'bg-purple-500/20 text-purple-400' },
    { icon: FileText, label: t('widget.quote'), isLink: true, to: '/devis', color: 'bg-accent/20 text-accent' },
  ];

  return (
    <div className="relative group">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-4 flex flex-col items-end gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                  {action.label}
                </span>
                {action.isLink ? (
                  <Link
                    to={action.to!}
                    onClick={() => setIsOpen(false)}
                    className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 shadow-xl flex items-center justify-center hover:scale-110 transition-all ${action.color}`}
                  >
                    <action.icon size={20} />
                  </Link>
                ) : (
                  <button
                    onClick={action.onClick}
                    className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 shadow-xl flex items-center justify-center hover:scale-110 transition-all ${action.color}`}
                  >
                    <action.icon size={20} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-2xl transition-all ${
          isOpen 
            ? 'bg-primary border-primary text-white' 
            : 'bg-white/10 text-white border-white/20 backdrop-blur-xl hover:border-primary/50'
        }`}
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
};

export default SpeedDial;
