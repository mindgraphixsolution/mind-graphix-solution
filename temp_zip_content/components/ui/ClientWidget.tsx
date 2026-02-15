
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, MessageSquare, LogIn, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

interface ClientWidgetProps {
  onOpenClientSpace: () => void;
  notificationCount: number;
}

const ClientWidget: React.FC<ClientWidgetProps> = ({ onOpenClientSpace, notificationCount }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    setHasUnread(notificationCount > 0);
  }, [notificationCount]);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="absolute bottom-0 right-full mr-4 bg-black/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-4 w-64 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('widget.client_space')}</span>
               {hasUnread && <span className="bg-red-500 text-white text-[10px] px-2 rounded-full font-bold">{notificationCount}</span>}
            </div>
            
            <div className="space-y-1">
               <button 
                 onClick={() => { onOpenClientSpace(); setIsOpen(false); }} 
                 className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-200 group"
               >
                  <div className="bg-primary/20 text-primary p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-all"><MessageSquare size={16}/></div>
                  <span className="font-bold">{t('widget.support')}</span>
               </button>
               <button 
                 onClick={() => { onOpenClientSpace(); setIsOpen(false); }} 
                 className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-200 group"
               >
                  <div className="bg-orange-500/20 text-orange-500 p-2 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-all"><Bell size={16}/></div>
                  <span className="font-bold">{t('widget.notifs')}</span>
               </button>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/10">
               <button 
                 onClick={() => { onOpenClientSpace(); setIsOpen(false); }}
                 className="w-full py-2 bg-white text-black rounded-lg text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-accent transition-colors"
               >
                  {isAuthenticated ? <LayoutDashboard size={14}/> : <LogIn size={14}/>} 
                  {isAuthenticated ? t('nav.clientSpace') : t('widget.login')}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all shadow-xl backdrop-blur-xl ${
          isOpen 
            ? 'bg-white text-black border-white' 
            : 'bg-white/5 text-white border-white/20 hover:border-primary/50'
        }`}
      >
        <div className="relative">
           <User size={24} />
           {hasUnread && !isOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-black rounded-full"></span>
           )}
        </div>
      </motion.button>
    </div>
  );
};

export default ClientWidget;
