
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
  isOpen: boolean;
  onClose: () => void;
  userQuotes: QuoteRequest[]; 
  onClearNotifications: () => void;
}

const ClientSpace: React.FC<ClientSpaceProps> = ({ isOpen, onClose, onClearNotifications }) => {
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
            className="w-full max-w-6xl h-[85vh] bg-slate-50 dark:bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden flex ring-1 ring-white/10"
          >
            {/* Sidebar */}
            <div className="w-20 md:w-72 bg-white dark:bg-[#131323] border-r border-gray-200 dark:border-white/5 flex flex-col shrink-0">
              <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold shadow-lg">M</div>
                <div className="hidden md:block">
                   <h3 className="font-bold text-gray-900 dark:text-white leading-tight">Mon Espace</h3>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wider">Client Premium</p>
                </div>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                  <LayoutDashboard size={20} /> <span className="hidden md:block font-medium">Tableau de bord</span>
                </button>
                <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'chat' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                  <MessageSquare size={20} /> <span className="hidden md:block font-medium">Messagerie</span>
                </button>
                <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'notifications' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
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
                  <X size={20} /> <span className="hidden md:block font-medium">Déconnexion</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              <div className="h-16 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 bg-white dark:bg-[#1a1a2e]">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {activeTab === 'dashboard' && 'Vue d\'ensemble'}
                  {activeTab === 'chat' && 'Support Direct'}
                  {activeTab === 'notifications' && 'Centre de notifications'}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Systèmes opérationnels</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                     <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <h1 className="text-3xl font-bold mb-2">Ravi de vous revoir ! 👋</h1>
                           <p className="opacity-90 max-w-xl">Suivez l'avancement de vos projets en temps réel.</p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                     </div>

                     <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                           <FileText size={20} className="text-accent"/> Mes Projets ({myQuotes.length})
                        </h3>
                        
                        {myQuotes.length === 0 ? (
                           <div className="bg-white dark:bg-white/5 rounded-2xl p-10 text-center border border-gray-200 dark:border-white/5 border-dashed">
                              <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                              <p className="text-gray-500">Aucun projet en cours.</p>
                           </div>
                        ) : (
                           <div className="space-y-6">
                              {myQuotes.map((quote) => (
                                 <div key={quote.id} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between gap-4">
                                       <div>
                                          <div className="flex items-center gap-3 mb-1">
                                             <span className="text-xs font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-600 dark:text-gray-300">#{quote.id.substr(0,8)}</span>
                                             <h4 className="font-bold text-lg text-gray-900 dark:text-white">{quote.subject}</h4>
                                          </div>
                                          <p className="text-sm text-gray-500">{quote.projectNature} • {new Date(quote.date).toLocaleDateString()}</p>
                                       </div>
                                       <div className="text-right">
                                          <span className="text-lg font-bold text-primary">{quote.value ? `${(quote.value/1000).toFixed(0)}k` : '-'}</span>
                                       </div>
                                    </div>
                                    
                                    {/* Enhanced Timeline (Tracker Style) */}
                                    <div className="p-8 bg-gray-50 dark:bg-[#161b2e] relative">
                                       <div className="flex justify-between items-center relative z-10">
                                          {QUOTE_STEPS.map((step, idx) => {
                                             const status = getStepStatus(quote.status, idx);
                                             return (
                                                <div key={step.id} className="flex flex-col items-center gap-3 flex-1 relative group">
                                                   {/* Connecting Line */}
                                                   {idx < QUOTE_STEPS.length - 1 && (
                                                      <div className={`absolute top-4 left-[50%] w-full h-1 -z-10 transition-colors duration-500 ${status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-white/10'}`}></div>
                                                   )}
                                                   
                                                   <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-sm z-10 ${
                                                      status === 'completed' ? 'bg-green-500 border-green-500 text-white scale-110' : 
                                                      status === 'active' ? 'bg-white dark:bg-dark border-primary text-primary ring-4 ring-primary/20 scale-110' : 
                                                      'bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-400'
                                                   }`}>
                                                      {status === 'completed' ? <Check size={16} strokeWidth={3} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                                                   </div>
                                                   
                                                   <div className="text-center">
                                                      <span className={`text-xs font-bold uppercase tracking-wider block ${status === 'active' ? 'text-primary' : status === 'completed' ? 'text-green-500' : 'text-gray-400'}`}>{step.label}</span>
                                                      <span className="text-[10px] text-gray-400">{status === 'completed' ? 'Effectué' : step.date}</span>
                                                   </div>
                                                </div>
                                             );
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 overflow-hidden">
                     <div className="p-4 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">S</div>
                        <div>
                           <h4 className="font-bold text-sm text-gray-900 dark:text-white">Support Client</h4>
                           <span className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> En ligne</span>
                        </div>
                     </div>
                     <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-[#131323]">
                        {messages.map((msg) => (
                           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-tl-none'}`}>
                                 <p className="text-sm">{msg.text}</p>
                                 <p className="text-[10px] mt-2 opacity-70 text-right">{msg.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="p-4 bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-white/5">
                        <form onSubmit={handleSendMessage} className="relative">
                           <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Écrivez votre message..." className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-full py-3.5 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-white" />
                           <button type="submit" className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-full hover:bg-accent hover:text-dark transition-all shadow-md"><Send size={18} /></button>
                        </form>
                     </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="max-w-3xl mx-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-20 text-gray-500 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                        <Bell size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Aucune notification pour le moment.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-gray-800 dark:text-white">Récents</h3>
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
                                  <span className="text-[10px] text-gray-400">{new Date(notif.timestamp).toLocaleDateString()} {new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{notif.message}</p>
                                {notif.relatedId && (
                                  <button onClick={() => setActiveTab('dashboard')} className="mt-3 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                    Voir le projet <ExternalLink size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteNotif(notif.id)} 
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                            {!notif.read && <div className="absolute top-5 right-5 w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ClientSpace;
