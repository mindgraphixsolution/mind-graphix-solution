
import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingDown, RefreshCw, ShoppingCart, Activity } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const Inventory: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  
  const loadData = () => setItems(mockDB.getInventory());
  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const handleRestock = (item: any) => {
    if(confirm(`Commander ${item.reorderQty} unités de ${item.name} ?`)) {
      mockDB.updateInventory({ ...item, stock: item.stock + item.reorderQty });
    }
  };

  const getStockStatus = (item: any) => {
    if (item.stock === 0) return { label: 'Rupture', color: 'bg-red-500', text: 'text-red-500' };
    if (item.stock <= item.threshold) return { label: 'Faible', color: 'bg-orange-500', text: 'text-orange-500' };
    return { label: 'OK', color: 'bg-green-500', text: 'text-green-500' };
  };

  const getForecast = (item: any) => {
    if (item.stock === 0) return "Maintenant";
    const daysLeft = Math.floor(item.stock / item.velocity);
    return `${daysLeft} jours`;
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Package className="text-blue-500"/> Gestion des Stocks</h1>
          <p className="text-gray-500 text-sm">Suivi temps réel et réapprovisionnement intelligent.</p>
        </div>
        <div className="flex gap-4 text-center">
           <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
              <div className="text-xl font-bold text-red-500">{items.filter(i => i.stock <= i.threshold).length}</div>
              <div className="text-xs text-red-400 font-bold uppercase">Alertes</div>
           </div>
           <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl">
              <div className="text-xl font-bold text-green-500">{items.reduce((acc, i) => acc + (i.stock * i.price), 0).toLocaleString()}</div>
              <div className="text-xs text-green-400 font-bold uppercase">Valeur (FCFA)</div>
           </div>
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const status = getStockStatus(item);
          return (
            <div key={item.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full ${status.color}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-xs font-mono text-gray-500">{item.sku}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase text-white ${status.color}`}>{status.label}</span>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-4xl font-black text-slate-800 dark:text-white">{item.stock}</span>
                  <span className="text-xs text-gray-400 ml-1">unités</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase font-bold">Vélocité</div>
                  <div className="font-mono text-blue-500">{item.velocity}/j</div>
                </div>
              </div>

              {/* Forecast Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Rupture estimée:</span>
                  <span className={`font-bold ${status.text}`}>{getForecast(item)}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${status.color}`} style={{width: `${Math.min(100, (item.stock / (item.threshold * 3)) * 100)}%`}}></div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleRestock(item)}
                  className="flex-1 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart size={14}/> Commander (+{item.reorderQty})
                </button>
                <button className="p-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500">
                  <Activity size={18}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
