
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Users, Zap, PieChart, Plus, Search, Edit3, Trash2, 
  Send, BarChart2, Clock, Split, Layout, Image, Type, Check,
  PlayCircle, PauseCircle, ChevronRight, UserPlus, FileText,
  Eye, MousePointerClick, ArrowRight, Info, CheckCircle2
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

// --- SUB-COMPONENTS ---

const StatsCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
      <p className={`text-xs mt-1 ${sub.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>{sub}</p>
    </div>
    <div className={`p-3 rounded-xl ${color} text-white`}>
      <Icon size={24} />
    </div>
  </div>
);

const CampaignCard = ({ camp, onEdit, onDelete }: any) => (
  <div className="bg-white dark:bg-[#1a1a2e] p-5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-lg text-slate-900 dark:text-white">{camp.name}</h4>
          {camp.isABTest && <span className="bg-purple-100 text-purple-600 text-[10px] px-2 py-0.5 rounded-full font-bold border border-purple-200">A/B Test</span>}
        </div>
        <p className="text-sm text-gray-500">{camp.subject}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
        camp.status === 'sent' ? 'bg-green-100 text-green-600' :
        camp.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
        'bg-gray-100 text-gray-600'
      }`}>
        {camp.status}
      </div>
    </div>
    
    <div className="flex gap-4 text-sm mb-4">
      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
        <Users size={14} /> <span>{camp.recipients.toLocaleString()}</span>
      </div>
      {camp.status === 'sent' && (
        <>
          <div className="flex items-center gap-1.5 text-green-600">
            <Eye size={14} /> <span>{camp.openRate}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600">
            <MousePointerClick size={14} /> <span>{camp.clickRate}%</span>
          </div>
        </>
      )}
    </div>

    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={() => onEdit(camp)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-500"><Edit3 size={16}/></button>
      <button onClick={() => onDelete(camp.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-red-500"><Trash2 size={16}/></button>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const EmailMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'automation' | 'audience'>('dashboard');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [automations, setAutomations] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<any | null>(null);
  
  // Campaign Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState<any>({ name: '', subjectA: '', subjectB: '', isAB: false, template: 'newsletter', segments: [] });

  const loadData = () => {
    setCampaigns(mockDB.getEmailCampaigns());
    setAutomations(mockDB.getEmailAutomations());
    setSubscribers(mockDB.getSubscribers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const handleDeleteCampaign = (id: string) => {
    if(confirm("Supprimer cette campagne ?")) mockDB.deleteCampaign(id);
  };

  const handleSaveCampaign = () => {
    // Simulate save
    mockDB.saveCampaign({
      id: editingCampaign?.id,
      name: wizardData.name,
      subject: wizardData.subjectA,
      subjectB: wizardData.isAB ? wizardData.subjectB : undefined,
      isABTest: wizardData.isAB,
      status: 'scheduled',
      sentAt: new Date(Date.now() + 86400000).toISOString(),
      recipients: Math.floor(Math.random() * 2000) + 500,
      openRate: 0,
      clickRate: 0
    });
    setEditingCampaign(null);
    setWizardStep(1);
    setWizardData({ name: '', subjectA: '', subjectB: '', isAB: false, template: 'newsletter', segments: [] });
    setActiveTab('campaigns');
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER TABS */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-2 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex gap-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
            { id: 'campaigns', label: 'Campagnes', icon: Mail },
            { id: 'automation', label: 'Automation', icon: Zap },
            { id: 'audience', label: 'Audience', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setEditingCampaign(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === 'campaigns' && (
          <button onClick={() => { setEditingCampaign({}); setWizardStep(1); }} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-dark">
            <Plus size={16} /> Créer Campagne
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* --- DASHBOARD VIEW --- */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Abonnés Total" value={subscribers.length.toLocaleString()} sub="+12% ce mois" icon={Users} color="bg-blue-500" />
                <StatsCard title="Taux d'Ouverture Moyen" value="42.5%" sub="+2.1% vs N-1" icon={Eye} color="bg-green-500" />
                <StatsCard title="Taux de Clic (CTR)" value="12.8%" sub="Stable" icon={MousePointerClick} color="bg-purple-500" />
                <StatsCard title="Automations Actives" value={automations.filter(a => a.status === 'active').length} sub="Génère 15% du CA" icon={Zap} color="bg-orange-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-lg mb-4">Performance Récente</h3>
                  <div className="space-y-4">
                    {campaigns.slice(0, 3).map(c => (
                      <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-white">{c.name}</p>
                          <p className="text-xs text-gray-500">{new Date(c.sentAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-4 text-xs font-mono">
                          <span className="text-green-600">Open: {c.openRate}%</span>
                          <span className="text-blue-600">Click: {c.clickRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-lg mb-4">Segments Populaires</h3>
                  <div className="flex flex-wrap gap-2">
                    {['VIP', 'Nouveaux', 'Inactifs (30j)', 'Acheteurs Récents', 'Lead Magnet A'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-center text-gray-400 text-sm">
                    <PieChart size={16} className="mr-2"/> Répartition de l'audience
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- CAMPAIGNS VIEW --- */}
          {activeTab === 'campaigns' && !editingCampaign && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map(c => (
                <CampaignCard key={c.id} camp={c} onEdit={(camp: any) => { setEditingCampaign(camp); setWizardData({ name: camp.name, subjectA: camp.subject, isAB: camp.isABTest, segments: [] }); }} onDelete={handleDeleteCampaign} />
              ))}
            </motion.div>
          )}

          {/* --- CAMPAIGN WIZARD (CREATION) --- */}
          {activeTab === 'campaigns' && editingCampaign && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 p-8 max-w-4xl mx-auto shadow-2xl">
              {/* Wizard Steps */}
              <div className="flex justify-between items-center mb-10 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -z-10"></div>
                {[1, 2, 3].map(s => (
                  <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${wizardStep >= s ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/10 text-gray-400'}`}>
                    {s}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[300px]">
                {wizardStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Paramètres de la campagne</h3>
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-2">Nom interne</label>
                      <input className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10" placeholder="Ex: Newsletter Juin" value={wizardData.name} onChange={e => setWizardData({...wizardData, name: e.target.value})} />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold">Objet du mail</label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-purple-500">A/B Test</span>
                          <button onClick={() => setWizardData({...wizardData, isAB: !wizardData.isAB})} className={`w-10 h-6 rounded-full transition-colors relative ${wizardData.isAB ? 'bg-purple-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${wizardData.isAB ? 'left-5' : 'left-1'}`}></div>
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <input className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10" placeholder="Objet A" value={wizardData.subjectA} onChange={e => setWizardData({...wizardData, subjectA: e.target.value})} />
                        {wizardData.isAB && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                            <input className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-purple-500/30" placeholder="Objet B (Version alternative)" value={wizardData.subjectB} onChange={e => setWizardData({...wizardData, subjectB: e.target.value})} />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Ciblage & Audience</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Tous les abonnés', 'Clients VIP', 'Nouveaux Inscrits (30j)', 'Ayant cliqué récemment'].map((seg) => (
                        <div key={seg} onClick={() => {
                          const newSegs = wizardData.segments.includes(seg) ? wizardData.segments.filter((s:string) => s !== seg) : [...wizardData.segments, seg];
                          setWizardData({...wizardData, segments: newSegs});
                        }} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${wizardData.segments.includes(seg) ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 hover:border-gray-300'}`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm">{seg}</span>
                            {wizardData.segments.includes(seg) && <CheckCircle2 size={18} className="text-primary"/>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-600 dark:text-blue-300 flex items-center gap-2">
                      <Info size={16}/> Estimation de l'audience : <span className="font-bold">1,240 contacts</span>
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Design & Template</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'newsletter', name: 'Newsletter Classique', icon: Layout },
                        { id: 'promo', name: 'Offre Promotionnelle', icon: Zap },
                        { id: 'simple', name: 'Texte Simple', icon: Type }
                      ].map((tpl) => (
                        <div key={tpl.id} onClick={() => setWizardData({...wizardData, template: tpl.id})} className={`aspect-[3/4] rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center gap-4 transition-all hover:shadow-lg ${wizardData.template === tpl.id ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5'}`}>
                          <tpl.icon size={32} className={wizardData.template === tpl.id ? 'text-primary' : 'text-gray-400'} />
                          <span className="font-bold text-sm text-center px-4">{tpl.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-200 dark:border-white/10">
                <button onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : setEditingCampaign(null)} className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5">
                  {wizardStep === 1 ? 'Annuler' : 'Retour'}
                </button>
                <button onClick={() => wizardStep < 3 ? setWizardStep(wizardStep + 1) : handleSaveCampaign()} className="px-8 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark shadow-lg flex items-center gap-2">
                  {wizardStep === 3 ? 'Planifier l\'envoi' : 'Suivant'} <ChevronRight size={16}/>
                </button>
              </div>
            </motion.div>
          )}

          {/* --- AUTOMATION VIEW --- */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <div className="grid gap-4">
                {automations.map((auto) => (
                  <div key={auto.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${auto.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {auto.status === 'active' ? <PlayCircle size={24}/> : <PauseCircle size={24}/>}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{auto.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-2"><Zap size={12}/> Déclencheur : {auto.trigger}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <span className="block font-bold text-lg">{auto.steps}</span>
                        <span className="text-xs text-gray-400 uppercase">Étapes</span>
                      </div>
                      <div className="text-center">
                        <span className="block font-bold text-lg">{auto.stats.entered}</span>
                        <span className="text-xs text-gray-400 uppercase">Entrés</span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"><Edit3 size={18} className="text-gray-500"/></button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Visual Flow Placeholder */}
              <div className="bg-slate-100 dark:bg-black/20 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl p-12 text-center">
                <p className="text-gray-500 mb-4">L'éditeur visuel d'automation est disponible en version Desktop Pro.</p>
                <div className="flex justify-center items-center gap-4 opacity-50">
                   <div className="px-4 py-2 bg-white dark:bg-white/10 rounded border border-gray-300 dark:border-white/10">Trigger</div>
                   <ArrowRight size={16}/>
                   <div className="px-4 py-2 bg-white dark:bg-white/10 rounded border border-gray-300 dark:border-white/10">Wait 2d</div>
                   <ArrowRight size={16}/>
                   <div className="px-4 py-2 bg-white dark:bg-white/10 rounded border border-gray-300 dark:border-white/10">Send Email</div>
                </div>
              </div>
            </div>
          )}

          {/* --- AUDIENCE VIEW --- */}
          {activeTab === 'audience' && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
                <h3 className="font-bold">Contacts ({subscribers.length})</h3>
                <div className="flex gap-2">
                  <input className="px-3 py-1.5 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm" placeholder="Rechercher..." />
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-1"><UserPlus size={14}/> Ajouter</button>
                </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Nom / Email</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Tags</th>
                    <th className="px-6 py-3">Engagement</th>
                    <th className="px-6 py-3">Inscrit le</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {subscribers.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-gray-500 text-xs">{sub.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${sub.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{sub.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {sub.tags.map((t:string) => <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-xs text-gray-600 dark:text-gray-300">{t}</span>)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 bg-gray-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full ${sub.engagement > 70 ? 'bg-green-500' : sub.engagement > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${sub.engagement}%`}}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{sub.engagement}/100</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{sub.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailMarketing;
