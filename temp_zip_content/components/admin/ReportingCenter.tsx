
import React, { useState, useEffect } from 'react';
import { 
  BarChart2, PieChart, TrendingUp, Calendar, Download, Mail, 
  FileText, Plus, Trash2, Clock, CheckCircle2, FileSpreadsheet, FileJson,
  ArrowUp, ArrowDown, Activity, DollarSign, Users, RefreshCw,
  Share2, Link, Lock, Copy, Eye, Layout, Target, TrendingDown, Layers, Grid,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

// --- TYPES & SUB-COMPONENTS ---

const KPICard = ({ title, value, change, isPositive, icon: Icon, color, comparisonMode, target }: any) => {
  let subText = null;
  let visual = null;

  if (comparisonMode === 'period') {
    subText = (
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {isPositive ? <ArrowUp size={12}/> : <ArrowDown size={12}/>}
        {change}
      </div>
    );
  } else if (comparisonMode === 'goals' && target) {
    const rawValue = parseInt(value.toString().replace(/[^0-9]/g, ''));
    const percentage = Math.min(100, Math.round((rawValue / target) * 100));
    visual = (
      <div className="w-full mt-2">
        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
          <span>Objectif: {target.toLocaleString()}</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${percentage}%` }} 
            className={`h-full ${percentage >= 100 ? 'bg-green-500' : percentage > 80 ? 'bg-blue-500' : 'bg-orange-500'}`}
          />
        </div>
      </div>
    );
  } else if (comparisonMode === 'competitors') {
    // Mock diff
    const isLeader = Math.random() > 0.5;
    subText = (
      <div className={`text-xs ${isLeader ? 'text-green-600' : 'text-orange-500'} font-bold flex items-center gap-1`}>
        {isLeader ? 'Leader' : 'Challenger'}
        <span className="text-[10px] opacity-70">vs Market</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        {subText}
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">{value}</h3>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{title}</p>
        {visual}
      </div>
    </div>
  );
};

const ShareModal = ({ isOpen, onClose, onShare }: any) => {
  const [duration, setDuration] = useState('24h');
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLink('');
      setIsCopied(false);
      setPassword('');
    }
  }, [isOpen]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newLink = `https://mgs-admin.com/share/${Math.random().toString(36).substring(2, 10)}`;
      setLink(newLink);
      onShare({ link: newLink, duration, password });
      setIsGenerating(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><Share2 size={20} className="text-primary"/> Partager le rapport</h3>
          <button onClick={onClose}><Trash2 size={20} className="text-gray-400 hover:text-red-500"/></button>
        </div>

        {!link ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Expiration du lien</label>
              <div className="grid grid-cols-3 gap-2">
                {['1h', '24h', '7j'].map(d => (
                  <button 
                    key={d} 
                    onClick={() => setDuration(d)}
                    className={`py-2 rounded-lg text-sm font-bold border transition-all ${duration === d ? 'bg-primary text-white border-primary' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Mot de passe (Optionnel)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                <input 
                  type="password" 
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-primary outline-none"
                  placeholder="Protéger l'accès"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-70"
            >
              {isGenerating ? <RefreshCw className="animate-spin" size={18}/> : <Link size={18}/>} Générer le lien sécurisé
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32}/>
            </div>
            <h4 className="font-bold text-lg mb-2">Lien généré !</h4>
            <p className="text-sm text-gray-500 mb-6">Ce lien expirera dans {duration}.</p>
            
            <div className="flex gap-2">
              <input readOnly value={link} className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 text-sm text-gray-600 dark:text-gray-300"/>
              <button 
                onClick={() => { navigator.clipboard.writeText(link); setIsCopied(true); }} 
                className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                {isCopied ? <CheckCircle2 size={18} className="text-green-600"/> : <Copy size={18}/>}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const DataStudio = () => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [widgets, setWidgets] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newWidget, setNewWidget] = useState({ title: '', source: 'traffic', metric: 'visitors', type: 'number' });

  useEffect(() => {
    setDashboards(mockDB.getCustomDashboards());
  }, []);

  const addWidget = () => {
    if (!newWidget.title) return;
    setWidgets([...widgets, { ...newWidget, id: Date.now() }]);
    setIsEditing(false);
  };

  const getWidgetPreview = (w: any) => {
    switch (w.type) {
      case 'number': return <div className="text-4xl font-black text-primary mt-2">12,450</div>;
      case 'line': return <div className="h-16 w-full bg-primary/10 rounded mt-2 flex items-end"><div className="w-full h-1/2 bg-primary/40"></div></div>;
      case 'bar': return <div className="h-16 w-full flex items-end gap-1 mt-2 justify-center"><div className="w-4 h-full bg-primary/60"></div><div className="w-4 h-2/3 bg-primary/40"></div></div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-indigo-900/5 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/20">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-300"><Layout size={24}/> Data Studio</h2>
          <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">Créez des vues personnalisées en combinant vos sources de données.</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={18}/> Nouveau Widget
        </button>
      </div>

      {isEditing && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
          <h3 className="font-bold mb-4">Configurateur de Widget</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre</label>
              <input className="w-full p-2 rounded border bg-transparent" value={newWidget.title} onChange={e => setNewWidget({...newWidget, title: e.target.value})} placeholder="Mon indicateur"/>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Source</label>
              <select className="w-full p-2 rounded border bg-transparent" value={newWidget.source} onChange={e => setNewWidget({...newWidget, source: e.target.value})}>
                <option value="traffic">Trafic Web</option>
                <option value="sales">Ventes / CRM</option>
                <option value="social">Réseaux Sociaux</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Métrique</label>
              <select className="w-full p-2 rounded border bg-transparent" value={newWidget.metric} onChange={e => setNewWidget({...newWidget, metric: e.target.value})}>
                <option value="visitors">Visiteurs</option>
                <option value="revenue">Revenus</option>
                <option value="leads">Nouveaux Leads</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Visuel</label>
              <div className="flex bg-gray-100 dark:bg-white/5 rounded p-1">
                {['number', 'line', 'bar'].map(t => (
                  <button key={t} onClick={() => setNewWidget({...newWidget, type: t})} className={`flex-1 flex justify-center py-1 rounded ${newWidget.type === t ? 'bg-white shadow text-primary' : 'text-gray-400'}`}>
                    {t === 'number' ? '123' : t === 'line' ? <TrendingUp size={14}/> : <BarChart2 size={14}/>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded text-gray-500">Annuler</button>
            <button onClick={addWidget} className="px-4 py-2 bg-primary text-white rounded font-bold">Ajouter à la grille</button>
          </div>
        </motion.div>
      )}

      {/* GRID */}
      {widgets.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl text-gray-400">
          <Grid size={48} className="mx-auto mb-4 opacity-20"/>
          <p>Votre studio est vide. Ajoutez des widgets pour commencer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map(w => (
            <div key={w.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm relative group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-200">{w.title}</h4>
                <button onClick={() => setWidgets(widgets.filter(x => x.id !== w.id))} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
              </div>
              <div className="text-xs text-gray-400 uppercase mb-4">{w.source} • {w.metric}</div>
              <div className="flex items-center justify-center py-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                {getWidgetPreview(w)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const ReportingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'studio' | 'scheduler' | 'archive'>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [benchmark, setBenchmark] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ name: '', type: 'executive', frequency: 'weekly', email: '' });
  const [comparisonMode, setComparisonMode] = useState<'period' | 'goals' | 'competitors'>('period');
  
  // Share State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const loadData = () => {
    setStats(mockDB.getStats());
    setSchedules(mockDB.getScheduledReports());
    setBenchmark(mockDB.getBenchmarkData());
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    mockDB.saveScheduledReport({ ...newSchedule, status: 'active', lastRun: null, nextRun: new Date(Date.now() + 86400000).toISOString() });
    setShowScheduleModal(false);
    setNewSchedule({ name: '', type: 'executive', frequency: 'weekly', email: '' });
  };

  const handleDeleteSchedule = (id: string) => {
    if(confirm('Arrêter ce rapport automatique ?')) mockDB.deleteScheduledReport(id);
  };

  const handleShare = (config: any) => {
    mockDB.saveSharedLink({ reportId: selectedReportId, ...config, created: new Date().toISOString() });
    // In a real app, API call to register link
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json' | 'excel') => {
    // Reuse existing export logic
    mockDB.exportData('stats', format);
  };

  if (!stats) return <div className="p-8 text-center">Chargement des données BI...</div>;

  return (
    <div className="h-full flex flex-col space-y-6">
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} onShare={handleShare} />
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
            <BarChart2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Reporting & BI</h1>
            <p className="text-xs text-gray-500">Analyses avancées et exports.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {activeTab === 'dashboard' && (
            <div className="relative group">
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary-dark flex items-center gap-2">
                <Download size={16}/> Exporter
              </button>
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-50">
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"><FileText size={14}/> PDF Pro</button>
                <button onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"><FileSpreadsheet size={14}/> Excel</button>
                <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"><FileText size={14}/> CSV Brut</button>
                <button onClick={() => handleExport('json')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"><FileJson size={14}/> JSON API</button>
              </div>
            </div>
          )}
          {activeTab === 'scheduler' && (
            <button onClick={() => setShowScheduleModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary-dark flex items-center gap-2">
              <Plus size={16}/> Programmer
            </button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Activity size={16}/> Dashboard Exécutif</button>
        <button onClick={() => setActiveTab('studio')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'studio' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Layout size={16}/> Data Studio</button>
        <button onClick={() => setActiveTab('scheduler')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'scheduler' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><Clock size={16}/> Programmation</button>
        <button onClick={() => setActiveTab('archive')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'archive' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><FileText size={16}/> Archives</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              {/* SMART COMPARISON SELECTOR */}
              <div className="flex justify-end">
                <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-gray-200 dark:border-white/10 p-1 flex">
                  <button onClick={() => setComparisonMode('period')} className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ${comparisonMode === 'period' ? 'bg-gray-100 dark:bg-white/10 text-primary' : 'text-gray-500'}`}><Clock size={12}/> vs Période N-1</button>
                  <button onClick={() => setComparisonMode('goals')} className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ${comparisonMode === 'goals' ? 'bg-gray-100 dark:bg-white/10 text-primary' : 'text-gray-500'}`}><Target size={12}/> vs Objectifs</button>
                  <button onClick={() => setComparisonMode('competitors')} className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ${comparisonMode === 'competitors' ? 'bg-gray-100 dark:bg-white/10 text-primary' : 'text-gray-500'}`}><Users size={12}/> vs Concurrents</button>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Revenu Mensuel" value={`${(stats.pipelineValue/1000).toFixed(0)}k F`} change="+12%" isPositive={true} icon={DollarSign} color="bg-green-500" comparisonMode={comparisonMode} target={benchmark?.goals.revenue} />
                <KPICard title="Utilisateurs Actifs" value={stats.usersCount} change="+5" isPositive={true} icon={Users} color="bg-blue-500" comparisonMode={comparisonMode} target={benchmark?.goals.visitors / 100} /> {/* Mock target logic */}
                <KPICard title="Trafic Hebdo" value={stats.visitors.toLocaleString()} change="-2%" isPositive={false} icon={TrendingUp} color="bg-orange-500" comparisonMode={comparisonMode} target={benchmark?.goals.visitors / 4} />
                <KPICard title="Taux Conversion" value={`${stats.conversionRate}%`} change="+0.4%" isPositive={true} icon={Activity} color="bg-purple-500" comparisonMode={comparisonMode} target={benchmark?.goals.conversion} />
              </div>

              {/* Charts Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Graph */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 min-h-[300px] flex flex-col">
                  <h3 className="font-bold text-lg mb-6">Croissance & Revenus</h3>
                  <div className="flex-1 flex items-end gap-2 relative">
                    {/* Grid lines background */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                       <div className="border-t border-gray-500 w-full"></div>
                       <div className="border-t border-gray-500 w-full"></div>
                       <div className="border-t border-gray-500 w-full"></div>
                       <div className="border-t border-gray-500 w-full"></div>
                    </div>
                    {/* Bars */}
                    {stats.trafficData.map((val: number, i: number) => (
                      <div key={i} className="flex-1 bg-primary/20 dark:bg-primary/40 rounded-t-lg relative group h-full flex flex-col justify-end">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                          style={{ height: `${(val / Math.max(...stats.trafficData)) * 80}%` }}
                        ></div>
                        <div className="text-center text-[10px] text-gray-400 mt-2">M{i+1}</div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                           {val} visites
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie Chart / Distribution */}
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col">
                  <h3 className="font-bold text-lg mb-6">Répartition Projets</h3>
                  <div className="flex-1 flex items-center justify-center relative">
                     {/* CSS Conic Gradient Pie Chart */}
                     <div className="w-48 h-48 rounded-full" style={{ background: 'conic-gradient(#5e35b1 0% 40%, #ffab00 40% 70%, #10b981 70% 100%)' }}></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white dark:bg-[#1a1a2e] rounded-full flex flex-col items-center justify-center">
                           <span className="text-2xl font-black">{stats.projectsCount}</span>
                           <span className="text-xs text-gray-500 uppercase">Total</span>
                        </div>
                     </div>
                  </div>
                  <div className="mt-6 space-y-3">
                     <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div> Web Dev</span>
                        <span className="font-bold">40%</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2"><div className="w-3 h-3 bg-accent rounded-full"></div> Marketing</span>
                        <span className="font-bold">30%</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Design</span>
                        <span className="font-bold">30%</span>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* DATA STUDIO TAB */}
          {activeTab === 'studio' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DataStudio />
            </motion.div>
          )}

          {/* SCHEDULER TAB */}
          {activeTab === 'scheduler' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {schedules.length === 0 ? (
                <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                  <Clock size={48} className="mx-auto mb-4 opacity-30"/>
                  <p>Aucun rapport programmé.</p>
                  <button onClick={() => setShowScheduleModal(true)} className="text-primary font-bold hover:underline mt-2">Créer un planning</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {schedules.map(sch => (
                    <div key={sch.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm relative group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                          <Mail size={24}/>
                        </div>
                        <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded uppercase">Actif</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{sch.name}</h4>
                      <p className="text-sm text-gray-500 mb-4 capitalize">{sch.type} • {sch.frequency}</p>
                      
                      <div className="text-xs bg-gray-50 dark:bg-white/5 p-3 rounded-lg mb-4">
                        <div className="flex justify-between mb-1">
                           <span>Prochain envoi:</span>
                           <span className="font-bold">{new Date(sch.nextRun).toLocaleDateString()}</span>
                        </div>
                        <div className="text-gray-400 truncate">{sch.email}</div>
                      </div>

                      <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-white/5">
                         <button onClick={() => handleDeleteSchedule(sch.id)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ARCHIVE TAB */}
          {activeTab === 'archive' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
               <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                           <th className="px-6 py-4">Nom du Rapport</th>
                           <th className="px-6 py-4">Date Génération</th>
                           <th className="px-6 py-4">Type</th>
                           <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {/* Mock Archive Data */}
                        {[1,2,3].map(i => (
                           <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-bold flex items-center gap-2"><FileText size={16} className="text-gray-400"/> Rapport Mensuel #{100+i}</td>
                              <td className="px-6 py-4 text-gray-500">Il y a {i*7} jours</td>
                              <td className="px-6 py-4"><span className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-bold uppercase">PDF</span></td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex justify-end gap-2">
                                    <button 
                                      onClick={() => { setSelectedReportId(`report_${100+i}`); setShareModalOpen(true); }}
                                      className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                                      title="Partager"
                                    >
                                      <Share2 size={16}/>
                                    </button>
                                    <button className="text-primary hover:underline font-bold text-xs flex items-center gap-1"><Download size={14}/> Télécharger</button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold mb-6">Programmer un rapport</h3>
            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nom</label>
                <input required className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newSchedule.name} onChange={e => setNewSchedule({...newSchedule, name: e.target.value})} placeholder="Rapport Hebdo" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Type de données</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newSchedule.type} onChange={e => setNewSchedule({...newSchedule, type: e.target.value})}>
                  <option value="executive">Exécutif (KPIs Financiers)</option>
                  <option value="technical">Technique (Performance)</option>
                  <option value="marketing">Marketing (Leads & Trafic)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Fréquence</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newSchedule.frequency} onChange={e => setNewSchedule({...newSchedule, frequency: e.target.value})}>
                  <option value="daily">Quotidien (08:00)</option>
                  <option value="weekly">Hebdomadaire (Lundi)</option>
                  <option value="monthly">Mensuel (1er du mois)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email destinataire</label>
                <input required type="email" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={newSchedule.email} onChange={e => setNewSchedule({...newSchedule, email: e.target.value})} placeholder="boss@company.com" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark">Programmer</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default ReportingCenter;
