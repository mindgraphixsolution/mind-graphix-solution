
import React, { useState, useEffect } from 'react';
import { 
  Palette, Database, Webhook, Key, Save, Plus, Trash2, Copy, 
  RefreshCw, CheckCircle2, Globe, Command, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

const AdvancedSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whitelabel' | 'api' | 'webhooks'>('whitelabel');
  const [branding, setBranding] = useState<any>({});
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [newWebhook, setNewWebhook] = useState({ url: '', events: ['lead.created'] });

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const loadData = () => {
    setBranding(mockDB.getWhiteLabelConfig());
    setApiKeys(mockDB.getApiKeys());
    setWebhooks(mockDB.getWebhooks());
  };

  const handleSaveBranding = () => {
    mockDB.saveWhiteLabelConfig(branding);
    // Dynamically update CSS variables for immediate preview
    document.documentElement.style.setProperty('--primary', branding.primaryColor);
    alert('Configuration visuelle mise à jour !');
  };

  const handleGenerateKey = () => {
    const name = prompt("Nom de la clé (ex: Integration Zapier) :");
    if (name) mockDB.generateApiKey(name);
  };

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhook.url) return;
    mockDB.saveWebhook(newWebhook);
    setNewWebhook({ url: '', events: ['lead.created'] });
  };

  const handleTestWebhook = (hook: any) => {
    alert(`Ping envoyé à ${hook.url} !\nStatut: 200 OK`);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
            <Command size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Options Développeur</h1>
            <p className="text-xs text-gray-500">Personnalisation avancée et intégrations.</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('whitelabel')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'whitelabel' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Palette size={16}/> White Label</button>
        <button onClick={() => setActiveTab('api')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'api' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Key size={16}/> API Keys</button>
        <button onClick={() => setActiveTab('webhooks')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'webhooks' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Webhook size={16}/> Webhooks</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB: WHITE LABEL */}
          {activeTab === 'whitelabel' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl">
              <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-6">
                <h3 className="text-lg font-bold border-b border-gray-100 dark:border-white/5 pb-4">Personnalisation de l'interface</h3>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Nom de l'application</label>
                  <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={branding.appName} onChange={(e) => setBranding({...branding, appName: e.target.value})} />
                  <p className="text-xs text-gray-500 mt-1">Remplace "AdminOS" dans le menu latéral.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">URL du Logo</label>
                  <div className="flex gap-4 items-center">
                    <input className="flex-1 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={branding.logoUrl} onChange={(e) => setBranding({...branding, logoUrl: e.target.value})} placeholder="https://..." />
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border overflow-hidden">
                      {branding.logoUrl ? <img src={branding.logoUrl} className="w-full h-full object-contain"/> : <span className="text-xs text-gray-400">Logo</span>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Couleur Primaire</label>
                  <div className="flex gap-4 items-center">
                    <input type="color" className="h-12 w-24 rounded cursor-pointer" value={branding.primaryColor} onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} />
                    <input className="flex-1 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl uppercase font-mono" value={branding.primaryColor} onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} />
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={handleSaveBranding} className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark flex items-center gap-2">
                    <Save size={18}/> Appliquer les changements
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: API KEYS */}
          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Clés d'API Actives</h3>
                <button onClick={handleGenerateKey} className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark">
                  <Plus size={16}/> Générer une clé
                </button>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Préfixe</th>
                      <th className="px-6 py-4">Créée le</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {apiKeys.map(key => (
                      <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-6 py-4 font-bold">{key.name}</td>
                        <td className="px-6 py-4 font-mono bg-gray-100 dark:bg-white/5 w-fit rounded px-2">{key.key.substring(0, 8)}...</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(key.created).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => mockDB.revokeApiKey(key.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors" title="Révoquer"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))}
                    {apiKeys.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-400">Aucune clé API générée.</td></tr>}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-xl">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2"><Database size={18}/> Documentation API</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">Utilisez ces clés pour authentifier vos requêtes REST via le header <code>Authorization: Bearer sk_live_...</code></p>
                <div className="bg-white dark:bg-black/20 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-blue-100 dark:border-blue-900/20">
                  curl -X GET https://api.mindgraphix.com/v1/leads \<br/>
                  &nbsp;&nbsp;-H "Authorization: Bearer sk_live_..."
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: WEBHOOKS */}
          {activeTab === 'webhooks' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Add Webhook Form */}
              <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                <h3 className="text-lg font-bold mb-4">Ajouter un Endpoint</h3>
                <form onSubmit={handleAddWebhook} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL de destination</label>
                    <input required type="url" placeholder="https://api.monsite.com/hooks/mgs" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newWebhook.url} onChange={e => setNewWebhook({...newWebhook, url: e.target.value})} />
                  </div>
                  <div className="w-64">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Événement</label>
                    <select className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newWebhook.events[0]} onChange={e => setNewWebhook({...newWebhook, events: [e.target.value]})}>
                      <option value="lead.created">Lead Créé</option>
                      <option value="invoice.paid">Facture Payée</option>
                      <option value="ticket.created">Ticket Support</option>
                    </select>
                  </div>
                  <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">Ajouter</button>
                </form>
              </div>

              {/* Webhook List */}
              <div className="space-y-4">
                {webhooks.map(hook => (
                  <div key={hook.id} className="bg-white dark:bg-[#1a1a2e] p-5 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg"><Globe size={20}/></div>
                      <div>
                        <p className="font-bold font-mono text-sm">{hook.url}</p>
                        <div className="flex gap-2 mt-1">
                          {hook.events.map((ev:string) => <span key={ev} className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-gray-500">{ev}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleTestWebhook(hook)} className="px-3 py-1.5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1">
                        <Zap size={12}/> Test Ping
                      </button>
                      <button onClick={() => mockDB.deleteWebhook(hook.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                {webhooks.length === 0 && <div className="text-center text-gray-400 py-8">Aucun webhook configuré.</div>}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedSettings;
