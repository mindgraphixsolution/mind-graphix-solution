
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Image, Trash2, Copy, Search, ExternalLink, 
  TrendingUp, Users, Clock, MousePointer, 
  Tag, Percent, DollarSign, Calendar, Check, X, AlertTriangle, Download, Activity,
  Zap, BrainCircuit, Map, ShoppingCart, Timer, Gift, BarChart,
  Plus, Edit3, CheckCircle2
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

// --- MEDIA LIBRARY MODULE ---
export const MediaLibrary = ({ onSelect }: { onSelect?: (url: string) => void }) => {
  const [media, setMedia] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  const loadMedia = () => setMedia(mockDB.getMedia());
  useEffect(() => { loadMedia(); window.addEventListener('mgs_db_update', loadMedia); return () => window.removeEventListener('mgs_db_update', loadMedia); }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files);
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const file = files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const result = mockDB.addMedia({
        url: reader.result as string,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      });
      setUploading(false);
      if (!result.success) alert(result.error);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Lien copié !");
  };

  const filteredMedia = media.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Médiathèque</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-transparent focus:border-primary outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-white/10'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="media-upload" 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => e.target.files && handleFiles(e.target.files)} 
        />
        <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center">
            {uploading ? <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div> : <Upload size={32} />}
          </div>
          <div>
            <p className="font-bold text-lg">Cliquez ou déposez une image ici</p>
            <p className="text-sm text-gray-500">JPG, PNG, WEBP (Max 2MB)</p>
          </div>
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto pr-2 pb-4 flex-1">
        {filteredMedia.map((m) => (
          <div key={m.id} className="group relative aspect-square bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
            <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <p className="text-white text-xs truncate w-full text-center">{m.name}</p>
              <div className="flex gap-2">
                <button onClick={() => copyToClipboard(m.url)} className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-lg" title="Copier le lien"><Copy size={14}/></button>
                <button onClick={() => mockDB.deleteMedia(m.id)} className="p-2 bg-red-500/20 hover:bg-red-500 text-white rounded-lg" title="Supprimer"><Trash2 size={14}/></button>
                {onSelect && (
                  <button onClick={() => onSelect(m.url)} className="p-2 bg-green-500/20 hover:bg-green-500 text-white rounded-lg" title="Sélectionner"><Check size={14}/></button>
                )}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">{m.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ANALYTICS DASHBOARD ---
export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(mockDB.getStats());
  }, []);

  if (!stats) return <div>Chargement...</div>;

  const maxTraffic = Math.max(...stats.trafficData);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance & Audience</h2>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <Download size={16}/> Exporter le rapport
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Visiteurs Uniques', val: stats.visitors.toLocaleString(), icon: Users, color: 'text-blue-500', trend: '+12%' },
          { label: 'Taux de Rebond', val: stats.bounceRate, icon: Activity, color: 'text-orange-500', trend: '-2%' },
          { label: 'Temps Moyen', val: stats.avgSession, icon: Clock, color: 'text-green-500', trend: '+15s' },
          { label: 'Conversion', val: stats.conversionRate + '%', icon: TrendingUp, color: 'text-purple-500', trend: '+0.4%' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <div className="text-3xl font-black text-slate-800 dark:text-white">{kpi.val}</div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Traffic Chart (SVG) */}
      <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Trafic Hebdomadaire</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {stats.trafficData.map((val: number, i: number) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-primary/20 dark:bg-primary/40 rounded-t-lg group-hover:bg-primary transition-colors relative"
                style={{ height: `${(val / maxTraffic) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
              </div>
              <span className="text-xs text-gray-400">J-{7-i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap & Sources (Mock UI) */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold mb-4">Sources de Trafic</h3>
          <div className="space-y-4">
            {[
              { src: 'Google / SEO', val: 45 },
              { src: 'Direct', val: 25 },
              { src: 'Social Media', val: 20 },
              { src: 'Référents', val: 10 }
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.src}</span>
                  <span className="font-bold">{s.val}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${s.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
           <MousePointer size={48} className="text-accent mb-4 opacity-50" />
           <h3 className="font-bold mb-2">Carte Thermique (Heatmap)</h3>
           <p className="text-sm text-gray-500 mb-4">Analyse des clics et du scroll disponible dans la version Pro.</p>
           <button className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Voir la démo</button>
        </div>
      </div>
    </div>
  );
};

// --- SMART PROMOTION ENGINE ---
export const PromotionsManager = ({ showToast }: { showToast: any }) => {
  const [promos, setPromos] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'editor' | 'ai_lab'>('overview');
  const [editing, setEditing] = useState<any | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [generatedBundles, setGeneratedBundles] = useState<any[]>([]);

  const loadData = () => {
    setPromos(mockDB.getPromotions());
    setProducts(mockDB.getProducts());
  };

  useEffect(() => { loadData(); window.addEventListener('mgs_db_update', loadData); return () => window.removeEventListener('mgs_db_update', loadData); }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      mockDB.savePromotion(editing);
      setEditing(null);
      setActiveTab('overview');
      showToast("Campagne mise à jour", "success");
    }
  };

  // AI Mock Generator
  const generateAIBundles = () => {
    setAiLoading(true);
    setTimeout(() => {
      // Logic to mix products randomly
      const mixed = products.sort(() => 0.5 - Math.random()).slice(0, 2);
      const total = mixed.reduce((acc: number, p: any) => acc + p.price, 0);
      
      setGeneratedBundles([{
        id: `gen_${Date.now()}`,
        name: `Pack ${mixed.map((p: any) => p.category).join(' & ')}`,
        items: mixed,
        discount: '25%',
        price: total * 0.75,
        originalPrice: total,
        suggestion: "Basé sur les tendances de vente croisée de la semaine dernière."
      }]);
      setAiLoading(false);
    }, 2000);
  };

  const applyBundle = (bundle: any) => {
    setEditing({
      code: `BUNDLE_${Date.now().toString().substr(-4)}`,
      name: bundle.name,
      discount: bundle.discount,
      type: 'bundle',
      active: true,
      trigger: 'cross_sell',
      description: `Inclut : ${bundle.items.map((i:any) => i.name).join(', ')}`
    });
    setActiveTab('editor');
  };

  // Helper Countdown Component
  const FlashCountdown = ({ target }: { target: string }) => {
    const [timeLeft, setTimeLeft] = useState('');
    
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(target).getTime() - now;
        if (distance < 0) {
          setTimeLeft("Terminé");
          clearInterval(interval);
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [target]);

    return <span className="font-mono text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded">{timeLeft}</span>;
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* HEADER TABS */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Zap className="text-accent" /> Smart Engine</h2>
          <p className="text-sm text-gray-500">Marketing Automatisé & Intelligent</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-500'}`}>Campagnes</button>
          <button onClick={() => setActiveTab('ai_lab')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'ai_lab' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}><BrainCircuit size={14}/> AI Lab</button>
          <button onClick={() => { setEditing({ type: 'basic', active: true }); setActiveTab('editor'); }} className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-500'}`}><Plus size={14}/> Créer</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* VIEW 1: ACTIVE CAMPAIGNS */}
        {activeTab === 'overview' && (
          <div className="grid gap-4">
            {promos.map(p => (
              <div key={p.id} className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-lg ${p.active ? 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10' : 'bg-gray-50 dark:bg-white/5 border-transparent opacity-60'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                    p.type === 'flash_sale' ? 'bg-red-100 text-red-600' : 
                    p.type === 'geo_targeted' ? 'bg-blue-100 text-blue-600' : 
                    p.type === 'behavioral' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {p.type === 'flash_sale' ? <Timer size={20}/> : p.type === 'geo_targeted' ? <Map size={20}/> : p.type === 'behavioral' ? <ShoppingCart size={20}/> : <Tag size={20}/>}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      {p.name} <span className="text-xs bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 font-normal">{p.code}</span>
                    </h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span className="text-green-500 font-bold">{p.discount} OFF</span>
                      {p.type === 'flash_sale' && <FlashCountdown target={p.endsAt} />}
                      {p.type === 'geo_targeted' && <span className="flex items-center gap-1"><Map size={12}/> {p.location}</span>}
                      {p.type === 'behavioral' && <span className="flex items-center gap-1"><Clock size={12}/> {p.trigger}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <div className="text-xs text-gray-400 uppercase font-bold">Usage</div>
                    <div className="font-mono font-bold">{p.usage} / {p.maxUsage > 9000 ? '∞' : p.maxUsage}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(p); setActiveTab('editor'); }} className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg hover:text-primary transition-colors"><Edit3 size={18}/></button>
                    <button onClick={() => mockDB.savePromotion({...p, active: !p.active})} className={`p-2 rounded-lg transition-colors ${p.active ? 'text-green-500 bg-green-500/10' : 'text-gray-400 bg-gray-200'}`}>
                      {p.active ? <Check size={18}/> : <X size={18}/>}
                    </button>
                    <button onClick={() => mockDB.deletePromotion(p.id)} className="p-2 bg-red-100 text-red-500 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: AI LAB */}
        {activeTab === 'ai_lab' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><BrainCircuit /> Analyse Prédictive</h3>
                <p className="max-w-xl text-indigo-100 mb-6">L'IA analyse les comportements d'achat pour suggérer des bundles performants et des opportunités de vente croisée.</p>
                <button 
                  onClick={generateAIBundles} 
                  disabled={aiLoading}
                  className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {aiLoading ? <div className="animate-spin w-4 h-4 border-2 border-indigo-900 border-t-transparent rounded-full"></div> : <Zap size={18} />} 
                  {aiLoading ? 'Analyse en cours...' : 'Générer des opportunités'}
                </button>
              </div>
              {/* Abstract BG */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Generated Suggestions */}
            <div className="grid md:grid-cols-2 gap-6">
              {generatedBundles.map((bundle) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={bundle.id} 
                  className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase">Smart Bundle</span>
                    <span className="text-green-500 font-bold text-lg">-{bundle.discount}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{bundle.name}</h4>
                  <p className="text-sm text-gray-500 mb-4 italic flex items-center gap-2"><BrainCircuit size={14} className="text-accent"/> {bundle.suggestion}</p>
                  
                  <div className="space-y-2 mb-6">
                    {bundle.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <span>{item.name}</span>
                        <span className="font-mono text-gray-400 line-through">{item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-white/10">
                      <span>Prix du Pack</span>
                      <span className="text-primary text-lg">{bundle.price} FCFA</span>
                    </div>
                  </div>

                  <button onClick={() => applyBundle(bundle)} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} /> Lancer cette campagne
                  </button>
                </motion.div>
              ))}
              {generatedBundles.length === 0 && !aiLoading && (
                <div className="col-span-2 text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                  Cliquez sur "Générer" pour voir les suggestions de l'IA.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: EDITOR */}
        {activeTab === 'editor' && editing && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#1a1a2e] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">{editing.id ? 'Modifier la campagne' : 'Nouvelle campagne'}</h3>
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-500">Nom Interne</label>
                  <input required className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-white/5 dark:border-white/10" value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} placeholder="Promo Été" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-500">Code Client</label>
                  <input required className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-white/5 dark:border-white/10 uppercase tracking-widest font-mono" value={editing.code || ''} onChange={e => setEditing({...editing, code: e.target.value.toUpperCase()})} placeholder="SUMMER25" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-500">Type de Promotion</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: 'basic', label: 'Classique', icon: Tag },
                    { id: 'flash_sale', label: 'Vente Flash', icon: Timer },
                    { id: 'geo_targeted', label: 'Géolocalisé', icon: Map },
                    { id: 'behavioral', label: 'Comportemental', icon: MousePointer },
                  ].map(t => (
                    <button 
                      key={t.id}
                      type="button"
                      onClick={() => setEditing({...editing, type: t.id})}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${editing.type === t.id ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-primary/50'}`}
                    >
                      <t.icon size={20} /> {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Fields based on Type */}
              <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 space-y-4">
                {editing.type === 'flash_sale' && (
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-red-500 flex items-center gap-2"><Timer size={14}/> Fin de la vente</label>
                    <input type="datetime-local" className="w-full p-2 rounded-lg border bg-white dark:bg-white/5" value={editing.endsAt ? editing.endsAt.substring(0,16) : ''} onChange={e => setEditing({...editing, endsAt: new Date(e.target.value).toISOString()})} />
                  </div>
                )}
                {editing.type === 'geo_targeted' && (
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-blue-500 flex items-center gap-2"><Map size={14}/> Ciblage Géographique</label>
                    <select className="w-full p-2 rounded-lg border bg-white dark:bg-white/5" value={editing.location || ''} onChange={e => setEditing({...editing, location: e.target.value})}>
                      <option value="">Sélectionner une zone</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                      <option value="France">France</option>
                      <option value="Global">Monde entier</option>
                    </select>
                  </div>
                )}
                {editing.type === 'behavioral' && (
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-purple-500 flex items-center gap-2"><ShoppingCart size={14}/> Déclencheur</label>
                    <select className="w-full p-2 rounded-lg border bg-white dark:bg-white/5" value={editing.trigger || ''} onChange={e => setEditing({...editing, trigger: e.target.value})}>
                      <option value="abandoned_cart">Panier Abandonné (2h)</option>
                      <option value="birthday">Anniversaire Client</option>
                      <option value="loyalty_tier">Nouveau Palier Fidélité</option>
                      <option value="dormant_user">Inactif depuis 30 jours</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-500">Réduction</label>
                  <input required className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-white/5 dark:border-white/10" value={editing.discount || ''} onChange={e => setEditing({...editing, discount: e.target.value})} placeholder="-20% ou 5000" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-500">Limite d'usage</label>
                  <input type="number" className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-white/5 dark:border-white/10" value={editing.maxUsage || 100} onChange={e => setEditing({...editing, maxUsage: parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setActiveTab('overview')} className="px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 font-bold">Annuler</button>
                <button type="submit" className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark shadow-xl">Enregistrer la Campagne</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
