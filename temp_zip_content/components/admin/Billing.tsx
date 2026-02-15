
import React, { useState, useEffect } from 'react';
import { FileText, Download, Send, AlertCircle, CheckCircle2, Clock, Printer, Settings } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const Billing: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  const loadData = () => setInvoices(mockDB.getInvoices());
  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAction = (action: string, id: string) => {
    alert(`${action} pour la facture ${id}`);
  };

  const filteredInvoices = filter === 'all' ? invoices : invoices.filter(inv => inv.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-purple-500"/> Facturation Automatisée</h1>
          <p className="text-gray-500 text-sm">Gérez vos factures, relances et paiements.</p>
        </div>
        <div className="flex gap-2">
           <button className="p-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5" title="Paramètres d'automation"><Settings size={20} className="text-gray-500"/></button>
           <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary-dark">Nouvelle Facture</button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-4">
         {['all', 'paid', 'pending', 'overdue'].map(f => (
            <button 
               key={f} 
               onClick={() => setFilter(f)} 
               className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${filter === f ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
            >
               {f === 'all' ? 'Tout' : f === 'paid' ? 'Payés' : f === 'pending' ? 'En attente' : 'Retard'}
            </button>
         ))}
      </div>

      {/* Invoice List */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
               <tr>
                  <th className="px-6 py-4">Réf.</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Montant</th>
                  <th className="px-6 py-4">Échéance</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
               {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                     <td className="px-6 py-4 font-mono font-bold text-gray-600 dark:text-gray-300">{inv.id}</td>
                     <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{inv.client}</td>
                     <td className="px-6 py-4 font-mono">{inv.amount.toLocaleString()} FCFA</td>
                     <td className="px-6 py-4 text-gray-500">{new Date(inv.dueDate).toLocaleDateString()}</td>
                     <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(inv.status)} flex items-center gap-1 w-fit`}>
                           {inv.status === 'paid' && <CheckCircle2 size={12}/>}
                           {inv.status === 'pending' && <Clock size={12}/>}
                           {inv.status === 'overdue' && <AlertCircle size={12}/>}
                           {inv.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => handleAction('Impression', inv.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500" title="Imprimer"><Printer size={16}/></button>
                           <button onClick={() => handleAction('Téléchargement PDF', inv.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500" title="PDF"><Download size={16}/></button>
                           <button onClick={() => handleAction('Relance Email', inv.id)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-500" title="Envoyer"><Send size={16}/></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {filteredInvoices.length === 0 && (
            <div className="p-12 text-center text-gray-400">Aucune facture trouvée.</div>
         )}
      </div>
    </div>
  );
};

export default Billing;
