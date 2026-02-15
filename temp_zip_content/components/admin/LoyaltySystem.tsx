
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Gift, TrendingUp, Settings, Award } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const LoyaltySystem: React.FC = () => {
  const [data, setData] = useState<any>({ config: {}, members: [] });
  
  const loadData = () => setData(mockDB.getLoyaltyData());
  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Bronze': return 'from-orange-400 to-orange-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-slate-900 to-black border-2 border-white/20';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getProgressToNext = (points: number) => {
    const config = data.config || { silver: 1000, gold: 5000, platinum: 10000 };
    const { silver = 1000, gold = 5000, platinum = 10000 } = config;
    
    if (points < silver) return { next: 'Silver', progress: (points/silver)*100, remain: silver - points };
    if (points < gold) return { next: 'Gold', progress: (points/gold)*100, remain: gold - points };
    if (points < platinum) return { next: 'Platinum', progress: (points/platinum)*100, remain: platinum - points };
    return { next: 'Max', progress: 100, remain: 0 };
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 p-6 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Crown size={32} className="text-yellow-400" />
            Programme <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">VIP & Fidélité</span>
          </h1>
          <p className="text-white/70 mt-2">Engagez vos clients avec des récompenses exclusives.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="text-center">
              <div className="text-2xl font-bold">{data.members ? data.members.length : 0}</div>
              <div className="text-xs uppercase opacity-70">Membres</div>
           </div>
           <div className="text-center">
              <div className="text-2xl font-bold">{(data.members ? data.members.reduce((acc:number,m:any)=>acc+m.points,0) : 0).toLocaleString()}</div>
              <div className="text-xs uppercase opacity-70">Points Total</div>
           </div>
        </div>
      </div>

      {/* TIERS CONFIG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Silver', 'Gold', 'Platinum'].map((tier) => (
          <div key={tier} className={`p-6 rounded-2xl bg-gradient-to-br ${getTierColor(tier)} text-white shadow-xl relative overflow-hidden group`}>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors"></div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Award size={20}/> {tier}
            </h3>
            <p className="text-sm opacity-90 mb-4">Seuil: {data.config ? data.config[tier.toLowerCase()] : '-'} pts</p>
            <ul className="text-xs space-y-2 opacity-80">
              <li className="flex items-center gap-2"><Star size={10}/> Remise automatique</li>
              <li className="flex items-center gap-2"><Star size={10}/> Support prioritaire</li>
            </ul>
          </div>
        ))}
      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-lg">Top Membres</h3>
          <button className="text-sm text-primary hover:underline">Voir tout</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Membre</th>
              <th className="px-6 py-3">Niveau</th>
              <th className="px-6 py-3">Points</th>
              <th className="px-6 py-3">Progression</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {data.members && data.members.sort((a:any,b:any) => b.points - a.points).map((m:any) => {
              const prog = getProgressToNext(m.points);
              return (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-6 py-4 font-bold">{m.name}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold text-white bg-gradient-to-r ${getTierColor(m.tier)}`}>{m.tier}</span></td>
                  <td className="px-6 py-4 font-mono">{m.points.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: `${prog.progress}%`}}></div>
                      </div>
                      <span className="text-xs text-gray-400">{prog.next === 'Max' ? 'Max' : `+${prog.remain}`}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors flex items-center gap-1">
                      <Gift size={12}/> Récompense
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoyaltySystem;
