
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bell, MessageSquare, Users, FileText, Settings, Search, Send, 
  Edit3, Save, Trash2, Share, CheckCircle, ArrowLeft, Clock, DollarSign, Calendar
} from 'lucide-react';
import { QuoteRequest } from '../../types';

interface TeamDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: QuoteRequest[];
  onNotificationsChange?: (notifications: QuoteRequest[]) => void;
}

const TeamDashboard: React.FC<TeamDashboardProps> = ({ isOpen, onClose, notifications: initialNotifications, onNotificationsChange }) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'chat'>('notifications');
  const [localNotifications, setLocalNotifications] = useState<QuoteRequest[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuote, setEditedQuote] = useState<QuoteRequest | null>(null);
  
  // Chat state
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, user: 'Badior', avatar: 'B', color: 'bg-blue-500', text: 'On a reçu le cahier des charges pour le projet E-commerce ?', time: '10:30' },
    { id: 2, user: 'Faïz', avatar: 'F', color: 'bg-purple-500', text: 'Oui, je suis en train de l\'analyser. C\'est du lourd !', time: '10:32' },
    { id: 3, user: 'Émilie', avatar: 'E', color: 'bg-pink-500', text: 'J\'ai préparé les wireframes pour la validation.', time: '11:15' },
  ]);

  useEffect(() => {
    setLocalNotifications(initialNotifications);
  }, [initialNotifications]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { 
      id: Date.now(), 
      user: 'Moi', 
      avatar: 'M',
      color: 'bg-accent',
      text: chatMessage, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]);
    setChatMessage('');
  };

  const handleSelectQuote = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setEditedQuote({ ...quote }); // Clone for editing
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    if (editedQuote) {
      // Update local list
      const updatedList = localNotifications.map(n => n.id === editedQuote.id ? editedQuote : n);
      setLocalNotifications(updatedList);
      if (onNotificationsChange) {
        onNotificationsChange(updatedList);
      }
      setSelectedQuote(editedQuote);
      setIsEditing(false);
      alert("Modifications enregistrées !");
    }
  };

  const handleResend = () => {
    alert(`Devis renvoyé à ${selectedQuote?.email} avec les nouvelles informations !`);
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
      const updatedList = localNotifications.filter(n => n.id !== selectedQuote?.id);
      setLocalNotifications(updatedList);
      if (onNotificationsChange) {
        onNotificationsChange(updatedList);
      }
      setSelectedQuote(null);
    }
  };

  // Helper for inputs
  const handleInputChange = (field: keyof QuoteRequest, value: any) => {
    if (editedQuote) {
      setEditedQuote({ ...editedQuote, [field]: value });
    }
  };

  const MotionDiv = motion.div as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <MotionDiv
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-6xl h-[85vh] bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden flex ring-1 ring-white/10"
          >
            {/* Sidebar */}
            <div className="w-20 md:w-64 bg-slate-50 dark:bg-[#131323] border-r border-gray-200 dark:border-white/10 flex flex-col shrink-0">
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="font-bold text-gray-800 dark:text-white hidden md:block">TeamSpace</span>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <button 
                  onClick={() => { setActiveTab('notifications'); setSelectedQuote(null); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeTab === 'notifications' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5'}`}
                >
                  <Bell size={20} /> <span className="hidden md:block">Devis & Leads</span>
                  {localNotifications.length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{localNotifications.length}</span>}
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeTab === 'chat' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5'}`}
                >
                  <MessageSquare size={20} /> <span className="hidden md:block">Discussion</span>
                </button>
                <div className="pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
                  <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 hidden md:block">Équipe</p>
                  <div className="flex -space-x-2 px-3 overflow-hidden mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-[#131323] flex items-center justify-center text-white text-xs">B</div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white dark:border-[#131323] flex items-center justify-center text-white text-xs">F</div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white dark:border-[#131323] flex items-center justify-center text-white text-xs">E</div>
                  </div>
                </div>
              </nav>

              <div className="p-4 border-t border-gray-200 dark:border-white/10">
                <button onClick={onClose} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                  <X size={20} /> <span className="hidden md:block">Fermer</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#0f172a] relative overflow-hidden">
              {/* Top Bar */}
              <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-[#1a1a2e]">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  {activeTab === 'notifications' 
                    ? (selectedQuote ? <button onClick={() => setSelectedQuote(null)} className="flex items-center gap-1 text-gray-500 hover:text-primary"><ArrowLeft size={18}/> Retour</button> : 'Flux des Demandes') 
                    : '#General-Chat'}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary text-gray-700 dark:text-gray-200" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent text-dark flex items-center justify-center font-bold text-sm cursor-pointer">A</div>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-hidden relative">
                
                {/* --- TAB: NOTIFICATIONS / QUOTES --- */}
                {activeTab === 'notifications' && (
                  <div className="h-full flex flex-col">
                    <AnimatePresence mode="wait">
                      {!selectedQuote ? (
                        // LIST VIEW
                        <MotionDiv 
                          key="list"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="p-6 overflow-y-auto space-y-4 h-full"
                        >
                          {localNotifications.length === 0 ? (
                            <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                              <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Bell size={32} className="opacity-40" />
                              </div>
                              <p className="text-lg font-medium">Tout est calme pour le moment.</p>
                              <p className="text-sm">Aucune nouvelle demande de devis.</p>
                            </div>
                          ) : (
                            localNotifications.map((quote, idx) => (
                              <MotionDiv 
                                key={quote.id}
                                layoutId={quote.id}
                                onClick={() => handleSelectQuote(quote)}
                                className="bg-white dark:bg-white/5 p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 cursor-pointer transition-all group"
                              >
                                <div className="flex justify-between items-start mb-3">
                                   <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:text-accent flex items-center justify-center font-bold text-lg">
                                       {quote.name.charAt(0)}
                                     </div>
                                     <div>
                                       <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">{quote.name}</h3>
                                       <p className="text-xs text-gray-500 dark:text-gray-400">{quote.company || 'Particulier'} • {new Date(quote.timestamp).toLocaleDateString()}</p>
                                     </div>
                                   </div>
                                   <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">Nouveau</span>
                                </div>
                                <div className="pl-13 ml-13">
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">{quote.projectType}</span>
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">{quote.projectNature}</span>
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">{quote.budget}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {quote.description}
                                  </p>
                                </div>
                              </MotionDiv>
                            ))
                          )}
                        </MotionDiv>
                      ) : (
                        // DETAIL VIEW
                        <MotionDiv 
                          key="detail"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="h-full flex flex-col"
                        >
                          {/* Detail Header */}
                          <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-start">
                             <div>
                               <div className="flex items-center gap-3 mb-2">
                                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditing ? 'Modification du Devis' : selectedQuote.projectType}</h2>
                                 {!isEditing && <span className="px-2 py-1 bg-accent text-dark text-xs font-bold rounded">ID: {selectedQuote.id}</span>}
                               </div>
                               <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                 <Users size={16}/> {selectedQuote.name} {selectedQuote.company && `— ${selectedQuote.company}`}
                               </p>
                             </div>
                             <div className="flex gap-2">
                               {isEditing ? (
                                 <>
                                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-white/10 transition-colors">Annuler</button>
                                  <button onClick={handleSaveChanges} className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-lg flex items-center gap-2">
                                    <Save size={18}/> Enregistrer
                                  </button>
                                 </>
                               ) : (
                                 <>
                                   <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Modifier">
                                     <Edit3 size={20} />
                                   </button>
                                   <button onClick={handleResend} className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Renvoyer au client">
                                     <Share size={20} />
                                   </button>
                                   <button onClick={handleDelete} className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Supprimer">
                                     <Trash2 size={20} />
                                   </button>
                                 </>
                               )}
                             </div>
                          </div>

                          {/* Detail Body */}
                          <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {/* Left Column: Specs */}
                              <div className="md:col-span-2 space-y-8">
                                <section>
                                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Détails du Projet</h3>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase font-semibold">Type de Projet</label>
                                      {isEditing ? (
                                        <input type="text" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white" value={editedQuote?.projectType} onChange={(e) => handleInputChange('projectType', e.target.value)} />
                                      ) : (
                                        <p className="text-gray-800 dark:text-white font-medium">{selectedQuote.projectType}</p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase font-semibold">Nature</label>
                                       {isEditing ? (
                                        <input type="text" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white" value={editedQuote?.projectNature} onChange={(e) => handleInputChange('projectNature', e.target.value)} />
                                      ) : (
                                        <p className="text-gray-800 dark:text-white font-medium">{selectedQuote.projectNature}</p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1"><DollarSign size={12}/> Budget</label>
                                      {isEditing ? (
                                        <input type="text" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white" value={editedQuote?.budget} onChange={(e) => handleInputChange('budget', e.target.value)} />
                                      ) : (
                                        <p className="text-accent font-bold">{selectedQuote.budget}</p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1"><Clock size={12}/> Délai</label>
                                       {isEditing ? (
                                        <input type="date" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white" value={editedQuote?.deadline} onChange={(e) => handleInputChange('deadline', e.target.value)} />
                                      ) : (
                                        <p className="text-gray-800 dark:text-white font-medium">{selectedQuote.deadline || 'Non spécifié'}</p>
                                      )}
                                    </div>
                                  </div>
                                </section>

                                <section>
                                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Description & Besoins</h3>
                                  {isEditing ? (
                                    <textarea 
                                      rows={6} 
                                      className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded-lg p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                      value={editedQuote?.description}
                                      onChange={(e) => handleInputChange('description', e.target.value)}
                                    />
                                  ) : (
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                      {selectedQuote.description}
                                    </div>
                                  )}
                                </section>
                                
                                <section>
                                   <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Fonctionnalités demandées</h3>
                                   <div className="flex flex-wrap gap-2">
                                      {selectedQuote.features.length > 0 ? selectedQuote.features.map(f => (
                                        <span key={f} className="px-3 py-1 bg-primary/10 text-primary dark:text-accent rounded-full text-sm font-medium border border-primary/20">{f}</span>
                                      )) : <span className="text-gray-500 italic">Aucune option spécifique cochée.</span>}
                                   </div>
                                </section>
                              </div>

                              {/* Right Column: Contact Info */}
                              <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10">
                                  <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><Users size={18} className="text-primary"/> Contact Client</h4>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase block mb-1">Nom</label>
                                      {isEditing ? (
                                        <input type="text" className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white text-sm" value={editedQuote?.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                      ) : (
                                        <p className="font-medium text-gray-800 dark:text-white">{selectedQuote.name}</p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase block mb-1">Email</label>
                                      <a href={`mailto:${selectedQuote.email}`} className="text-primary hover:underline truncate block">{selectedQuote.email}</a>
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase block mb-1">Téléphone</label>
                                       {isEditing ? (
                                        <input type="text" className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded px-2 py-1 text-gray-800 dark:text-white text-sm" value={editedQuote?.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                                      ) : (
                                        <a href={`tel:${selectedQuote.phone}`} className="text-gray-800 dark:text-white hover:text-primary">{selectedQuote.phone}</a>
                                      )}
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500 uppercase block mb-1">Préférence Contact</label>
                                      <span className="capitalize text-gray-800 dark:text-white">{selectedQuote.contactMethod}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-500/20">
                                   <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Note interne</h4>
                                   <textarea placeholder="Ajouter une note pour l'équipe..." className="w-full bg-white dark:bg-black/20 border border-blue-200 dark:border-blue-500/30 rounded-lg p-2 text-sm text-gray-800 dark:text-white min-h-[100px]"></textarea>
                                   <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">Ajouter Note</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </MotionDiv>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* --- TAB: CHAT --- */}
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#131323]">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.user === 'Moi' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0 ${msg.color}`}>
                            {msg.avatar}
                          </div>
                          <div className={`flex flex-col ${msg.user === 'Moi' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                             <div className={`p-4 rounded-2xl shadow-sm ${msg.user === 'Moi' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-white/10 dark:text-white rounded-tl-none border border-gray-100 dark:border-white/5'}`}>
                               <p className="text-sm leading-relaxed">{msg.text}</p>
                             </div>
                             <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.user} • {msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-white/10">
                      <form onSubmit={handleSendChat} className="relative max-w-4xl mx-auto">
                        <input 
                          type="text" 
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Écrire un message à l'équipe..." 
                          className="w-full bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full py-3.5 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-black/20 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                        />
                        <button type="submit" className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-full hover:bg-accent hover:text-dark transition-all shadow-md transform hover:scale-105 active:scale-95">
                          <Send size={18} />
                        </button>
                      </form>
                    </div>
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

export default TeamDashboard;