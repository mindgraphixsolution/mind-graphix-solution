
import React, { useState, useEffect } from 'react';
import { 
  Zap, GitBranch, Calendar, Plus, PlayCircle, PauseCircle, Trash2, 
  ArrowRight, Settings, CheckCircle2, Clock, Mail, Bell, Shield, 
  FileText, Activity, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

const AutomationRules: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'workflows' | 'scheduler'>('rules');
  const [rules, setRules] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<any | null>(null);

  const loadData = () => {
    setRules(mockDB.getAutomationRules());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const handleToggleRule = (rule: any) => {
    mockDB.saveAutomationRule({ ...rule, active: !rule.active });
  };

  const handleDeleteRule = (id: string) => {
    if(confirm('Supprimer cette règle ?')) {
      mockDB.deleteAutomationRule(id);
    }
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingRule) {
      mockDB.saveAutomationRule(editingRule);
      setEditingRule(null);
      setShowModal(false);
    }
  };

  // Mock Workflows & Tasks (Hardcoded for demo as they are complex structures)
  const workflows = [
    { id: 1, name: 'Publication Blog', steps: ['Brouillon', 'Revue IA', 'Validation Chef', 'Publication'], status: 'active' },
    { id: 2, name: 'Onboarding Client', steps: ['Nouveau Lead', 'Email Bienvenue', 'Création Compte', 'Accès Projet'], status: 'active' },
  ];

  const tasks = [
    { id: 1, name: 'Backup Hebdo', cron: 'Lundi 03:00', nextRun: 'Dans 2 jours' },
    { id: 2, name: 'Rapport SEO', cron: '1er du mois', nextRun: 'Dans 12 jours' },
    { id: 3, name: 'Purge Logs', cron: 'Dimanche 00:00', nextRun: 'Demain' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Centre d'Automatisation</h1>
            <p className="text-xs text-gray-500">Gérez vos règles intelligentes et processus.</p>
          </div>
        </div>
        
        {activeTab === 'rules' && (
          <button 
            onClick={() => { setEditingRule({ name: '', trigger: 'lead_created', action: 'send_email', active: true }); setShowModal(true); }}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary-dark flex items-center gap-2"
          >
            <Plus size={18}/> Nouvelle Règle
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('rules')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'rules' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Zap size={16}/> Règles (Si/Alors)</button>
        <button onClick={() => setActiveTab('workflows')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'workflows' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><GitBranch size={16}/> Workflows</button>
        <button onClick={() => setActiveTab('scheduler')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'scheduler' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Calendar size={16}/> Planificateur</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB: RULES */}
          {activeTab === 'rules' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rules.map(rule => (
                <div key={rule.id} className={`p-6 rounded-2xl border transition-all ${rule.active ? 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/10 shadow-sm' : 'bg-gray-50 dark:bg-white/5 border-transparent opacity-60'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${rule.active ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                      <Zap size={24} />
                    </div>
                    <button onClick={() => handleToggleRule(rule)} className="text-gray-400 hover:text-primary transition-colors">
                      {rule.active ? <PauseCircle size={24}/> : <PlayCircle size={24}/>}
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-4">{rule.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-mono border border-gray-200 dark:border-white/10">{rule.trigger}</div>
                    <ArrowRight size={16} className="text-gray-400"/>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-mono border border-green-200 dark:border-green-900/30">{rule.action}</div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/5">
                    <span className={`text-xs font-bold uppercase ${rule.active ? 'text-green-500' : 'text-gray-400'}`}>{rule.active ? 'Actif' : 'Pause'}</span>
                    <button onClick={() => handleDeleteRule(rule.id)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-white/5 rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB: WORKFLOWS */}
          {activeTab === 'workflows' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {workflows.map(wf => (
                <div key={wf.id} className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <GitBranch className="text-purple-500"/> {wf.name}
                    </h3>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Actif</span>
                  </div>
                  
                  <div className="flex items-center gap-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -z-10"></div>
                    
                    {wf.steps.map((step, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a2e] border-4 border-gray-100 dark:border-white/10 flex items-center justify-center font-bold text-sm z-10 shadow-sm">
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1a1a2e] px-2 py-1 rounded border border-gray-100 dark:border-white/5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB: SCHEDULER */}
          {activeTab === 'scheduler' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Tâche</th>
                    <th className="px-6 py-4">Fréquence (Cron)</th>
                    <th className="px-6 py-4">Prochaine exécution</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {tasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Clock size={16} className="text-gray-400"/> {task.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs bg-gray-100 dark:bg-white/10 rounded w-fit px-2 py-1">{task.cron}</td>
                      <td className="px-6 py-4 text-green-600 dark:text-green-400 font-medium">{task.nextRun}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-primary"><Settings size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* CREATE RULE MODAL */}
      {showModal && editingRule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1a1a2e] w-full max-w-lg rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold mb-6">Nouvelle Règle d'Automation</h3>
            <form onSubmit={handleSaveRule} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">Nom de la règle</label>
                <input required className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10" value={editingRule.name} onChange={e => setEditingRule({...editingRule, name: e.target.value})} placeholder="Ex: Email de Bienvenue" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">Déclencheur (SI)</label>
                  <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10" value={editingRule.trigger} onChange={e => setEditingRule({...editingRule, trigger: e.target.value})}>
                    <option value="lead_created">Nouveau Lead</option>
                    <option value="invoice_overdue">Facture en retard</option>
                    <option value="stock_low">Stock faible</option>
                    <option value="form_submit">Formulaire soumis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">Action (ALORS)</label>
                  <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10" value={editingRule.action} onChange={e => setEditingRule({...editingRule, action: e.target.value})}>
                    <option value="send_email">Envoyer Email</option>
                    <option value="notify_admin">Notifier Admin</option>
                    <option value="create_task">Créer Tâche</option>
                    <option value="update_status">Changer Statut</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-white/5">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark flex items-center gap-2"><Save size={18}/> Enregistrer</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AutomationRules;
