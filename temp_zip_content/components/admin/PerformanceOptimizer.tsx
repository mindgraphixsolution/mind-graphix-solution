
import React, { useState, useEffect } from 'react';
import { 
  Zap, Gauge, Layers, Server, Activity, Power, 
  RotateCw, CheckCircle2, AlertTriangle, FileCode,
  Box, Database, Globe, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

const PerformanceOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cache' | 'assets' | 'uptime'>('overview');
  const [config, setConfig] = useState<any>(null);
  const [isPurging, setIsPurging] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    setConfig(mockDB.getPerfConfig());
  }, []);

  const handleToggle = (category: string, key: string) => {
    const newConfig = { ...config, [category]: { ...config[category], [key]: !config[category][key] } };
    setConfig(newConfig);
    mockDB.savePerfConfig(newConfig);
  };

  const handlePurge = async (type: 'all' | 'cdn' | 'server') => {
    setIsPurging(true);
    await mockDB.purgeCache(type);
    setIsPurging(false);
    alert('Cache vidé avec succès !');
  };

  const runSpeedTest = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 5) + 95; // Fake upgrade
      const newConfig = { 
        ...config, 
        score: newScore,
        metrics: { lcp: 0.8, fid: 8, cls: 0.01 }
      };
      setConfig(newConfig);
      mockDB.savePerfConfig(newConfig);
      setIsOptimizing(false);
    }, 3000);
  };

  if (!config) return <div className="p-8 text-center text-gray-500">Chargement du module performance...</div>;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 border-green-500';
    if (score >= 50) return 'text-orange-500 border-orange-500';
    return 'text-red-500 border-red-500';
  };

  const GaugeChart = ({ score, label }: { score: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className={`w-32 h-32 rounded-full border-[8px] flex items-center justify-center relative ${getScoreColor(score)}`}>
        <div className="text-4xl font-black text-slate-800 dark:text-white">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{score}</motion.span>
        </div>
        <div className="absolute inset-0 border-[8px] border-gray-100 dark:border-white/5 rounded-full -z-10"></div>
      </div>
      <p className="mt-4 font-bold text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Optimiseur de Performance</h1>
            <p className="text-xs text-gray-500">Vitesse du site, Cache & Disponibilité</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {activeTab === 'overview' && (
            <button 
              onClick={runSpeedTest} 
              disabled={isOptimizing}
              className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-lg flex items-center gap-2 disabled:opacity-70"
            >
              {isOptimizing ? <RotateCw className="animate-spin" size={18}/> : <PlayCircle size={18}/>}
              {isOptimizing ? 'Analyse en cours...' : 'Lancer Audit Vitesse'}
            </button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto">
        {[
          { id: 'overview', label: 'Vitesse & Score', icon: Gauge },
          { id: 'cache', label: 'Gestion Cache', icon: Database },
          { id: 'assets', label: 'Minification', icon: FileCode },
          { id: 'uptime', label: 'Disponibilité', icon: Activity }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Score Cards */}
              <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-around gap-8">
                <GaugeChart score={config.score} label="Score Global" />
                
                <div className="grid grid-cols-3 gap-8 text-center border-l border-gray-100 dark:border-white/5 pl-8">
                  <div>
                    <div className="text-2xl font-black text-green-500">{config.metrics.lcp}s</div>
                    <div className="text-xs uppercase font-bold text-gray-400 mt-1" title="Largest Contentful Paint">LCP</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-blue-500">{config.metrics.fid}ms</div>
                    <div className="text-xs uppercase font-bold text-gray-400 mt-1" title="First Input Delay">FID</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-500">{config.metrics.cls}</div>
                    <div className="text-xs uppercase font-bold text-gray-400 mt-1" title="Cumulative Layout Shift">CLS</div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Optimisations Actives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle2 size={14} className="text-green-500"/> Minification CSS activée</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle2 size={14} className="text-green-500"/> Images WebP servies</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle2 size={14} className="text-green-500"/> Compression Gzip active</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-orange-500" size={20}/> Opportunités</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-orange-50 dark:bg-orange-500/10 p-2 rounded">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div> 
                      Réduire la taille du DOM (1204 éléments)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-orange-50 dark:bg-orange-500/10 p-2 rounded">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div> 
                      Différer les scripts tiers (Google Maps)
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: CACHE */}
          {activeTab === 'cache' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 text-lg">Cache Système Global</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">Dernière purge : il y a 2 heures</p>
                </div>
                <button 
                  onClick={() => handlePurge('all')}
                  disabled={isPurging}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {isPurging ? <RotateCw className="animate-spin" size={18}/> : <RotateCw size={18}/>} Tout Purger
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: 'browser', label: 'Browser Cache', desc: 'Cache statique navigateur (TTL)', icon: Globe },
                  { id: 'server', label: 'Server Cache', desc: 'Cache rendu pages (SSR/ISR)', icon: Server },
                  { id: 'cdn', label: 'CDN Edge', desc: 'Distribution Cloudflare/AWS', icon: Layers }
                ].map(layer => (
                  <div key={layer.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><layer.icon size={64} /></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg"><layer.icon size={24}/></div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleToggle('caching', layer.id)}
                            className={`w-10 h-6 rounded-full p-1 transition-colors ${config.caching[layer.id] ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${config.caching[layer.id] ? 'translate-x-4' : ''}`}></div>
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg">{layer.label}</h4>
                      <p className="text-sm text-gray-500 mb-6">{layer.desc}</p>
                      
                      {layer.id !== 'browser' && (
                        <button 
                          onClick={() => handlePurge(layer.id as any)}
                          className="w-full py-2 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          Vider ce cache
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB: ASSETS (MINIFICATION) */}
          {activeTab === 'assets' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Code Optimization */}
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><FileCode size={20}/> Code & Scripts</h3>
                  <div className="space-y-4">
                    {['html', 'css', 'js'].map(type => (
                      <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <div>
                          <span className="font-bold uppercase">{type}</span>
                          <p className="text-xs text-gray-500">Minification & Compression</p>
                        </div>
                        <button 
                          onClick={() => handleToggle('minification', type)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors ${config.minification[type] ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.minification[type] ? 'translate-x-6' : ''}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Optimization */}
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Box size={20}/> Médias & Images</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Conversion WebP Auto</span>
                      <button 
                        onClick={() => handleToggle('imageOptimization', 'webp')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${config.imageOptimization.webp ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.imageOptimization.webp ? 'translate-x-6' : ''}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Lazy Loading (Différé)</span>
                      <button 
                        onClick={() => handleToggle('imageOptimization', 'lazyLoad')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${config.imageOptimization.lazyLoad ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.imageOptimization.lazyLoad ? 'translate-x-6' : ''}`}></div>
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Niveau Compression</span>
                        <span className="text-xs font-bold text-primary">{config.imageOptimization.compressionLevel}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        value={config.imageOptimization.compressionLevel}
                        onChange={(e) => {
                           const newConf = {...config, imageOptimization: {...config.imageOptimization, compressionLevel: parseInt(e.target.value)}};
                           setConfig(newConf);
                           mockDB.savePerfConfig(newConf);
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: UPTIME */}
          {activeTab === 'uptime' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-8 rounded-2xl flex items-center gap-6">
                <div className="p-4 bg-green-500 rounded-full text-white shadow-lg shadow-green-500/30 animate-pulse">
                  <Activity size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-green-700 dark:text-green-400">Systèmes Opérationnels</h2>
                  <p className="text-green-600 dark:text-green-300 font-medium">Uptime : {config.uptime.uptimePercentage}% (Derniers 30 jours)</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                <h3 className="font-bold mb-6">Temps de réponse (ms)</h3>
                <div className="h-48 flex items-end justify-between gap-1">
                  {[...Array(30)].map((_, i) => {
                    const height = Math.floor(Math.random() * 40) + 20; // 20-60ms mostly
                    const isSpike = Math.random() > 0.95;
                    const finalHeight = isSpike ? 80 : height;
                    return (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-t ${isSpike ? 'bg-orange-400' : 'bg-green-400'}`}
                        style={{ height: `${finalHeight}%` }}
                        title={`${finalHeight * 5} ms`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                  <span>Il y a 30 min</span>
                  <span>Maintenant</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 font-bold text-sm">
                  Journal des incidents (30 jours)
                </div>
                <div className="p-8 text-center text-gray-500">
                  <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500"/>
                  <p>Aucun incident détecté sur cette période.</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default PerformanceOptimizer;
