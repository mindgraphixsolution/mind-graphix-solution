
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Settings, Save, AlertCircle, BarChart2, 
  CreditCard, Mail, Facebook, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

const IntegrationsManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const loadData = () => {
    setIntegrations(mockDB.getIntegrations());
  };

  const handleConnect = (id: string) => {
    const target = integrations.find(i => i.id === id);
    setEditing(target);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if(editing) {
      mockDB.saveIntegration({ ...editing, connected: true });
      setEditing(null);
    }
  };

  const handleDisconnect = (id: string) => {
    if(confirm('Déconnecter ce service ?')) {
      const target = integrations.find(i => i.id === id);
      mockDB.saveIntegration({ ...target, connected: false, config: {} });
    }
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'bar_chart': return <BarChart2 size={32} className="text-orange-500"/>;
      case 'credit_card': return <CreditCard size={32} className="text-blue-500"/>;
      case 'mail': return <Mail size={32} className="text-yellow-500"/>;
      case 'facebook': return <Facebook size={32} className="text-blue-600"/>;
      default: return <Settings size={32}/>;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
            <ExternalLink size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Intégrations & API</h1>
            <p className="text-xs text-gray-500">Connectez vos outils favoris.</p>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4">
        {integrations.map(integration => (
          <motion.div 
            key={integration.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${integration.connected ? 'bg-white dark:bg-[#1a1a2e] border-green-500/30 shadow-md' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-80 hover:opacity-100'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm">
                {getIcon(integration.icon)}
              </div>
              {integration.connected ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <CheckCircle2 size={12}/> Connecté
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-500 bg-gray-200 dark:bg-white/10 px-2 py-1 rounded-full">
                  <XCircle size={12}/> Inactif
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[40px]">Synchronisation automatique des données et événements.</p>
            
            {integration.connected ? (
              <div className="flex gap-2">
                <button onClick={() => handleConnect(integration.id)} className="flex-1 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5">Configurer</button>
                <button onClick={() => handleDisconnect(integration.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><XCircle size={20}/></button>
              </div>
            ) : (
              <button onClick={() => handleConnect(integration.id)} className="w-full py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark shadow-lg">Connecter</button>
            )}
          </motion.div>
        ))}
      </div>

      {/* CONFIG MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              {getIcon(editing.icon)} Configuration {editing.name}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              {Object.keys(editing.config).map(key => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{key}</label>
                  <input 
                    required 
                    type="password" 
                    className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl"
                    value={editing.config[key]}
                    onChange={(e) => setEditing({...editing, config: {...editing.config, [key]: e.target.value}})}
                    placeholder={`Entrez votre ${key}`}
                  />
                </div>
              ))}
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-gray-500 hover:text-white">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 flex items-center gap-2">
                  <Save size={18}/> Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default IntegrationsManager;
