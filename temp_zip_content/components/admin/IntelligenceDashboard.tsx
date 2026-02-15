
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu, Eye, MousePointer, TrendingUp, AlertTriangle, 
  ArrowRight, RefreshCw, Smartphone, Monitor, Globe, Zap,
  Target, BarChart2, PieChart, Users, DollarSign, BrainCircuit
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

// --- SUB-COMPONENTS ---

const LiveIndicator = () => (
  <div className="flex items-center gap-2">
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
    <span className="text-xs font-mono text-green-400 uppercase tracking-widest">Live Data</span>
  </div>
);

const HeatmapOverlay = ({ points }: { points: any[] }) => (
  <div className="relative w-full h-[400px] bg-slate-800 rounded-xl overflow-hidden border border-white/10 group">
    {/* Fake UI for Website Preview */}
    <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
       <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
       </div>
       <div className="mx-auto w-1/2 h-4 bg-slate-800 rounded text-[8px] flex items-center justify-center text-gray-500">mindgraphixsolution.com</div>
    </div>
    
    {/* Content Placeholder */}
    <div className="mt-8 p-4 space-y-4 opacity-30 grayscale pointer-events-none">
       <div className="h-32 w-full bg-white/20 rounded-lg"></div>
       <div className="flex gap-4">
          <div className="h-20 w-1/3 bg-white/20 rounded-lg"></div>
          <div className="h-20 w-1/3 bg-white/20 rounded-lg"></div>
          <div className="h-20 w-1/3 bg-white/20 rounded-lg"></div>
       </div>
       <div className="h-40 w-full bg-white/20 rounded-lg"></div>
    </div>

    {/* Heatmap Blobs */}
    {points.map((pt, i) => (
       <motion.div 
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: i * 0.2 }}
          className="absolute rounded-full blur-xl bg-gradient-to-r from-red-500 to-yellow-500 mix-blend-screen"
          style={{ 
             left: `${pt.x}%`, 
             top: `${pt.y}%`, 
             width: `${pt.value}px`, 
             height: `${pt.value}px`,
             transform: 'translate(-50%, -50%)'
          }}
       />
    ))}
    
    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">
       Carte Thermique : 24h
    </div>
  </div>
);

const FunnelChart = ({ data }: { data: any }) => {
   const maxVal = data.impressions;
   return (
      <div className="space-y-4">
         {[
            { label: 'Impressions', val: data.impressions, color: 'bg-blue-500' },
            { label: 'Clics (CTR 21%)', val: data.clicks, color: 'bg-purple-500' },
            { label: 'Leads (14%)', val: data.leads, color: 'bg-orange-500' },
            { label: 'Ventes (18%)', val: data.conversions, color: 'bg-green-500' }
         ].map((step, i) => (
            <div key={step.label} className="relative h-12">
               <div className="absolute inset-0 flex items-center justify-between z-10 px-4 text-white font-bold text-sm drop-shadow-md">
                  <span>{step.label}</span>
                  <span>{step.val.toLocaleString()}</span>
               </div>
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step.val / maxVal) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={`h-full ${step.color} opacity-80 rounded-r-lg shadow-lg relative`}
               >
                  {/* Glass shine */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
               </motion.div>
            </div>
         ))}
      </div>
   );
};

const AIRecommendationCard: React.FC<{ rec: any }> = ({ rec }) => (
   <motion.div 
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border-l-4 ${
         rec.impact === 'High' ? 'border-red-500 bg-red-500/10' : 
         rec.type === 'trend' ? 'border-blue-500 bg-blue-500/10' : 'border-yellow-500 bg-yellow-500/10'
      } mb-3`}
   >
      <div className="flex justify-between items-start mb-1">
         <div className="flex items-center gap-2">
            {rec.type === 'alert' && <AlertTriangle size={16} className="text-red-500" />}
            {rec.type === 'trend' && <TrendingUp size={16} className="text-blue-500" />}
            {rec.type === 'opportunity' && <Zap size={16} className="text-yellow-500" />}
            <span className="font-bold text-sm uppercase tracking-wide text-white">{rec.type}</span>
         </div>
         <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{rec.impact} Impact</span>
      </div>
      <p className="text-sm text-gray-300 mb-3">{rec.message}</p>
      <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1">
         Appliquer l'optimisation <ArrowRight size={12} />
      </button>
   </motion.div>
);

// --- MAIN DASHBOARD COMPONENT ---

export const IntelligenceDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [activeView, setActiveView] = useState<'overview' | 'behavior'>('overview');

  // Simulate Realtime Update
  useEffect(() => {
    // Initial Load
    setData(mockDB.getAdvancedStats());

    // 5s Refresh Interval
    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1);
      // Slightly randomize live data
      setData((prev: any) => ({
        ...prev,
        realtime: {
          ...prev.realtime,
          activeUsers: Math.max(2, prev.realtime.activeUsers + (Math.random() > 0.5 ? 1 : -1))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-10 text-white">Initialisation du Core IA...</div>;

  return (
    <div className="space-y-6">
      
      {/* 1. HEADER HUD */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 p-6 bg-[#0a0e17] rounded-2xl border border-white/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
         
         <div className="relative z-10">
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
               <BrainCircuit size={32} className="text-accent animate-pulse" />
               INTELLIGENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">CORE</span>
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-4">
               <span>Analyse prédictive & monitoring temps réel</span>
               <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">v3.5.0</span>
            </p>
         </div>

         <div className="flex items-center gap-6 relative z-10">
            <div className="text-right">
               <div className="text-3xl font-mono font-bold text-white">{data.realtime.activeUsers}</div>
               <div className="text-xs text-gray-400 uppercase tracking-widest">Utilisateurs Actifs</div>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <LiveIndicator />
         </div>
      </div>

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* LEFT COL: METRICS & FUNNEL */}
         <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                  { label: "ROI Global", val: `x${data.roi.ratio}`, icon: DollarSign, color: "text-green-400", sub: "+12% this week" },
                  { label: "Conversion", val: "2.4%", icon: Target, color: "text-purple-400", sub: "Stable" },
                  { label: "Trafic Mobile", val: "68%", icon: Smartphone, color: "text-blue-400", sub: "Dominant" }
               ].map((stat, i) => (
                  <div key={i} className="bg-[#151e32] p-5 rounded-xl border border-white/5 shadow-lg">
                     <div className="flex justify-between items-start mb-2">
                        <stat.icon className={stat.color} size={20} />
                        <span className="text-xs text-gray-500 font-mono">{refreshCount % 2 === 0 ? '▲' : '▼'}</span>
                     </div>
                     <div className="text-2xl font-bold text-white">{stat.val}</div>
                     <div className="text-xs text-gray-400">{stat.label}</div>
                     <div className="text-[10px] text-gray-500 mt-1">{stat.sub}</div>
                  </div>
               ))}
            </div>

            {/* Chart Area */}
            <div className="bg-[#151e32] p-6 rounded-2xl border border-white/5 min-h-[400px]">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2"><BarChart2 size={18} /> Conversion Funnel</h3>
                  <div className="flex gap-2">
                     <button 
                        onClick={() => setActiveView('overview')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${activeView === 'overview' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}
                     >
                        Entonnoir
                     </button>
                     <button 
                        onClick={() => setActiveView('behavior')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${activeView === 'behavior' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}
                     >
                        Heatmap
                     </button>
                  </div>
               </div>

               {activeView === 'overview' ? (
                  <FunnelChart data={data.funnel} />
               ) : (
                  <HeatmapOverlay points={data.heatmap} />
               )}
            </div>
         </div>

         {/* RIGHT COL: AI ASSISTANT */}
         <div className="bg-gradient-to-b from-[#1a1a2e] to-black border border-white/10 rounded-2xl p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
               <Cpu size={20} className="text-accent" />
               <h3 className="font-bold text-white">AI Recommendations</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
               {data.aiInsights.map((rec: any, i: number) => (
                  <AIRecommendationCard key={i} rec={rec} />
               ))}
               
               {/* Skeleton loading simulation for AI thinking */}
               <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/5 animate-pulse">
                  <div className="h-4 w-1/2 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 w-3/4 bg-white/10 rounded"></div>
               </div>
               <p className="text-center text-xs text-gray-600 mt-2 font-mono">Analyzing user patterns...</p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
               <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Prédictions (J+7)</h4>
               <div className="flex justify-between items-center text-sm text-white">
                  <span>Ventes estimées</span>
                  <span className="font-mono text-green-400">+15% 📈</span>
               </div>
               <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '65%' }}
                     className="h-full bg-green-500"
                  />
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};
