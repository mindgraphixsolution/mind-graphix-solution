'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bell, MessageSquare, FileText, Settings, Search, Send, 
  LayoutDashboard, Clock, CheckCircle2, AlertCircle, Calendar,
  ArrowRight, ChevronRight, Download, MousePointerClick, Trash2, Check, ExternalLink, Briefcase, Truck
} from 'lucide-react';
import { QuoteRequest } from '../../types';
import { mockDB } from '../../utils/mockDatabase';
import { useToast } from '../ui/ToastContext';

interface ClientSpaceProps {
  isOpen?: boolean;
  onClose?: () => void;
  userQuotes?: QuoteRequest[]; 
  onClearNotifications?: () => void;
}

const ClientSpace: React.FC<ClientSpaceProps> = ({ 
  isOpen = true, 
  onClose = () => {}, 
  onClearNotifications = () => {} 
}) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'notifications'>('dashboard');
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'support', text: 'Bonjour ! Bienvenue dans votre espace Mind Graphix. Je suis Sarah, votre chargée de compte. Avez-vous des questions sur votre devis ?', time: '09:00' },
  ]);
  const [myQuotes, setMyQuotes] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const loadData = () => {
    setMyQuotes(mockDB.getMessages());
    setNotifications(mockDB.getNotifications());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      window.addEventListener('mgs_db_update', loadData);
    }
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, [isOpen]);
  
  useEffect(() => {
    if (activeTab === 'notifications' && notifications.some(n => !n.read)) {
      onClearNotifications();
    }
  }, [activeTab, notifications, onClearNotifications]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      sender: 'user', 
      text: chatMessage, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]);
    setChatMessage('');

    setTimeout(() => {
       setMessages(prev => [...prev, {
         id: Date.now() + 1,
         sender: 'support',
         text: "Merci pour votre message. Un membre de l'équipe technique va vous répondre sous peu.",
         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
       }]);
       addToast("Nouveau message du support", "info");
    }, 2000);
  };

  const handleMarkAllRead = () => {
    mockDB.markAllNotificationsRead();
    addToast("Toutes les notifications marquées comme lues", "success");
  };

  const handleDeleteNotif = (id: string) => {
    mockDB.deleteNotification(id);
    addToast("Notification supprimée", "info");
  };

  const QUOTE_STEPS = [
    { id: 'new', label: 'Demande Reçue', date: 'J-0' },
    { id: 'contacted', label: 'Analyse en cours', date: 'J+1' },
    { id: 'negotiation', label: 'Proposition Envoyée', date: 'J+2' },
    { id: 'won', label: 'Projet Validé', date: 'Final' },
  ];

  const getStepStatus = (status: string, stepIndex: number) => {
    const statusMap: {[key: string]: number} = { 'new': 0, 'contacted': 1, 'negotiation': 2, 'won': 3, 'lost': -1 };
    const currentStep = statusMap[status] || 0;
    
    if (currentStep > stepIndex) return 'completed';
    if (currentStep === stepIndex) return 'active';
    return 'pending';
  };

  const MotionDiv = motion.div as any;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <MotionDiv
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-4xl h-[70vh] bg-slate-50 dark:bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden flex ring-1 ring-white/10"
          >
            {/* Sidebar (Minimaliste - Uniquement Notifications) */}
            <div className="w-20 md:w-64 bg-white dark:bg-[#131323] border-r border-gray-200 dark:border-white/5 flex flex-col shrink-0">
              <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold shadow-lg">M</div>
                <div className="hidden md:block">
                   <h3 className="font-bold text-gray-900 dark:text-white leading-tight">Centre d'Alertes</h3>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wider">Mind Graphix</p>
                </div>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <button className="w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 bg-primary text-white shadow-lg shadow-primary/30">
                  <div className="relative">
                    <Bell size={20} />
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-dark"></span>}
                  </div>
                  <span className="hidden md:block font-medium">Notifications</span>
                  {unreadCount > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{unreadCount}</span>}
                </button>
              </nav>

              <div className="p-4 border-t border-gray-200 dark:border-white/5">
                <button onClick={onClose} className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/10 transition-colors">
                  <X size={20} /> <span className="hidden md:block font-medium">Fermer</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              <div className="h-16 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 bg-white dark:bg-[#1a1a2e]">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Dernières mises à jour
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Activité en direct</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto">
                  {notifications.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                      <Bell size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Aucune notification pour le moment.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-800 dark:text-white">Récent</h3>
                        <button onClick={handleMarkAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                          <Check size={14} /> Tout marquer comme lu
                        </button>
                      </div>
                      {notifications.map((notif) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={notif.id} 
                          className={`p-5 rounded-2xl border transition-all hover:shadow-md relative group ${notif.read ? 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5 opacity-80' : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'}`}
                        >
                          <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                              {notif.type === 'success' ? <CheckCircle2 size={20} /> : <Bell size={20} />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{notif.title}</h4>
                                <span className="text-[10px] text-gray-400">{new Date(notif.timestamp).toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{notif.message}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteNotif(notif.id)} 
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ClientSpace;

