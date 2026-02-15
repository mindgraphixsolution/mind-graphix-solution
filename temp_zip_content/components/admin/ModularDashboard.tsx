
import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Users, Activity, DollarSign, Clock, LayoutGrid, Move, 
  BarChart2, List, TrendingUp, Bell, Plus, FileText 
} from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { mockDB } from '../../utils/mockDatabase';

// --- WIDGET COMPONENTS ---

const StatsWidget = ({ stats }: { stats: any }) => (
  <div className="grid grid-cols-2 gap-4 h-full">
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex flex-col justify-between">
      <Users className="text-blue-500 mb-2" size={20}/>
      <div>
        <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.visitors?.toLocaleString()}</span>
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Visiteurs (7j)</p>
      </div>
    </div>
    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl flex flex-col justify-between">
      <DollarSign className="text-purple-500 mb-2" size={20}/>
      <div>
        <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.pipelineValue > 1000000 ? `${(stats.pipelineValue/1000000).toFixed(1)}M` : stats?.pipelineValue}</span>
        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Pipeline</p>
      </div>
    </div>
  </div>
);

const ChartWidget = ({ stats }: { stats: any }) => {
  const max = Math.max(...(stats?.trafficData || [100]));
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-sm text-gray-500 uppercase">Trafic Hebdomadaire</h4>
        <TrendingUp size={16} className="text-green-500"/>
      </div>
      <div className="flex-1 flex items-end justify-between gap-2">
        {stats?.trafficData?.map((val: number, i: number) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <div 
              className="w-full bg-primary/20 dark:bg-primary/40 rounded-t group-hover:bg-primary transition-colors relative"
              style={{ height: `${(val / max) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityWidget = () => (
  <div className="h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-bold text-sm text-gray-500 uppercase">Dernières Activités</h4>
      <List size={16} className="text-gray-400"/>
    </div>
    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
          <span className="text-gray-600 dark:text-gray-300 truncate">Nouveau lead qualifié : Projet Web...</span>
          <span className="text-xs text-gray-400 ml-auto">2h</span>
        </div>
      ))}
    </div>
  </div>
);

const ActionsWidget = () => (
  <div className="grid grid-cols-2 gap-3 h-full">
    <button className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors border border-gray-100 dark:border-white/5">
      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center mb-2"><Plus size={16}/></div>
      <span className="text-xs font-bold">Nouveau Lead</span>
    </button>
    <button className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors border border-gray-100 dark:border-white/5">
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-2"><FileText size={16}/></div>
      <span className="text-xs font-bold">Créer Devis</span>
    </button>
  </div>
);

// --- MAIN COMPONENT ---

const ModularDashboard: React.FC = () => {
  const { preferences, updateDashboardLayout } = usePreferences();
  const [stats, setStats] = useState<any>(null);
  const [items, setItems] = useState<string[]>(preferences.dashboardLayout || ['stats_visitors', 'chart_traffic']);

  useEffect(() => {
    setStats(mockDB.getStats());
  }, []);

  // Update local state when preferences change (e.g. reset)
  useEffect(() => {
    if (preferences.dashboardLayout) {
      setItems(preferences.dashboardLayout);
    }
  }, [preferences.dashboardLayout]);

  const handleReorder = (newOrder: string[]) => {
    setItems(newOrder);
    updateDashboardLayout(newOrder);
  };

  const WIDGETS: Record<string, { component: React.ReactNode, title: string, size: string }> = {
    'stats_visitors': { component: <StatsWidget stats={stats} />, title: "Métriques Clés", size: "col-span-1 md:col-span-2 lg:col-span-1 row-span-1" },
    'chart_traffic': { component: <ChartWidget stats={stats} />, title: "Trafic & Audience", size: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1" },
    'list_activity': { component: <ActivityWidget />, title: "Flux d'Activité", size: "col-span-1 lg:col-span-1 row-span-2" },
    'card_actions': { component: <ActionsWidget />, title: "Actions Rapides", size: "col-span-1 lg:col-span-1 row-span-1" },
    'stats_projects': { component: (
      <div className="flex items-center justify-between h-full px-4">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase">Projets Actifs</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats?.projectsCount}</h3>
        </div>
        <Activity size={32} className="text-orange-500 opacity-50"/>
      </div>
    ), title: "Projets", size: "col-span-1 row-span-1" },
    'stats_messages': { component: (
        <div className="flex items-center justify-between h-full px-4">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Messages</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats?.unreadMessages}</h3>
            <span className="text-xs text-red-500 font-bold">Non lus</span>
          </div>
          <Bell size={32} className="text-red-500 opacity-50"/>
        </div>
      ), title: "Messages", size: "col-span-1 row-span-1" }
  };

  if (!stats) return <div className="p-10">Chargement du tableau de bord...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tableau de Bord</h1>
          <p className="text-gray-500">Vue d'ensemble modulaire.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
          <LayoutGrid size={14} />
          <span>Glissez pour réorganiser</span>
        </div>
      </div>

      <Reorder.Group 
        axis="y" 
        onReorder={handleReorder} 
        values={items} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((id) => {
          const widget = WIDGETS[id];
          if (!widget) return null;

          return (
            <Reorder.Item 
              key={id} 
              value={id}
              className={`bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col relative group cursor-grab active:cursor-grabbing ${widget.size}`}
              whileDrag={{ scale: 1.05, zIndex: 10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200">{widget.title}</h3>
                <Move size={14} className="text-gray-300 group-hover:text-primary transition-colors"/>
              </div>
              <div className="p-4 flex-1 h-full min-h-[140px]">
                {widget.component}
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default ModularDashboard;
