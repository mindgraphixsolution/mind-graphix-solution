
import React, { useState, useEffect } from 'react';
import { Database, Clock, RefreshCw, Download, Trash2, Settings, Archive, AlertTriangle, CheckCircle, RotateCcw, FileJson, Plus } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const BackupManager: React.FC = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<any | null>(null);

  const loadData = () => {
    setBackups(mockDB.getBackups());
    setConfig(mockDB.getBackupConfig());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const handleCreateBackup = () => {
    setIsProcessing(true);
    setTimeout(() => {
      mockDB.createBackup('manual', 'Sauvegarde manuelle utilisateur');
      setIsProcessing(false);
    }, 1000);
  };

  const handleRestore = (id: string) => {
    setIsProcessing(true);
    // Simuler un délai de traitement
    setTimeout(() => {
      const res = mockDB.restoreBackup(id);
      setIsProcessing(false);
      setRestoreTarget(null);
      if(res.success) {
        alert("Système restauré avec succès ! Rechargement...");
        window.location.reload();
      } else {
        alert("Erreur: " + res.error);
      }
    }, 2000);
  };

  const handleConfigChange = (key: string, value: any) => {
    mockDB.saveBackupConfig({ ...config, [key]: value });
  };

  const getFormatSize = (bytes: number) => {
    if(bytes < 1024) return bytes + ' B';
    if(bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
    return (bytes/(1024*1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl"><Database size={24}/></div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Total Backups</p>
            <h3 className="text-2xl font-black">{backups.length} / {config.retention}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-xl"><Clock size={24}/></div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Dernier Backup</p>
            <h3 className="text-lg font-bold">{config.lastBackup ? new Date(config.lastBackup).toLocaleDateString() : 'Jamais'}</h3>
            <p className="text-xs text-gray-400">{config.lastBackup ? new Date(config.lastBackup).toLocaleTimeString() : ''}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-center justify-between items-center">
           <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Configuration</p>
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${config.autoBackup ? 'bg-green-500' : 'bg-red-500'}`}></span>
                 <span className="font-bold">{config.autoBackup ? 'Auto Actif' : 'Arrêté'}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 capitalize">{config.frequency}</p>
           </div>
           <button onClick={() => mockDB.downloadFullExport()} className="p-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5" title="Export JSON complet">
              <Download size={20} className="text-gray-500"/>
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        
        {/* BACKUP LIST */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2"><Archive size={20}/> Historique des Snapshots</h3>
            <button 
              onClick={handleCreateBackup} 
              disabled={isProcessing}
              className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw size={16} className="animate-spin"/> : <Plus size={16}/>} Créer maintenant
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Taille</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {backups.map((bk) => (
                  <tr key={bk.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{new Date(bk.timestamp).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{bk.note || 'Automatique'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${bk.type === 'auto' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                        {bk.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-500">{getFormatSize(bk.size)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setRestoreTarget(bk)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Restaurer">
                          <RotateCcw size={16}/>
                        </button>
                        <button onClick={() => mockDB.deleteBackup(bk.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Supprimer">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {backups.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-10 text-gray-400">Aucune sauvegarde disponible.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SETTINGS PANEL */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 p-6 h-fit">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Settings size={20}/> Planificateur</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-bold text-slate-700 dark:text-white">Backup Automatique</label>
                <p className="text-xs text-gray-500">Activer les snapshots périodiques.</p>
              </div>
              <button 
                onClick={() => handleConfigChange('autoBackup', !config.autoBackup)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${config.autoBackup ? 'bg-green-500' : 'bg-gray-300 dark:bg-white/10'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.autoBackup ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-white mb-2 block">Fréquence</label>
              <select 
                value={config.frequency}
                onChange={(e) => handleConfigChange('frequency', e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm outline-none"
              >
                <option value="hourly">Toutes les heures</option>
                <option value="daily">Quotidien (Minuit)</option>
                <option value="weekly">Hebdomadaire</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-white mb-2 block">Rétention (Historique)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="3" 
                  max="50" 
                  value={config.retention}
                  onChange={(e) => handleConfigChange('retention', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="font-mono font-bold text-primary">{config.retention}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Les anciens backups seront supprimés automatiquement.</p>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-white/10">
               <h4 className="font-bold text-sm mb-4">Export Global</h4>
               <button onClick={() => mockDB.downloadFullExport()} className="w-full py-3 border border-dashed border-gray-300 dark:border-white/20 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <FileJson size={18}/> Télécharger JSON
               </button>
               <p className="text-[10px] text-gray-400 mt-2 text-center">Inclut la BDD, les settings et les logs.</p>
            </div>
          </div>
        </div>

      </div>

      {/* RESTORE MODAL */}
      {restoreTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-red-200 dark:border-red-900/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertTriangle size={32} />
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-2">Confirmation Requise</h3>
            <p className="text-center text-gray-500 mb-6">
              Vous êtes sur le point de restaurer le backup du <strong>{new Date(restoreTarget.timestamp).toLocaleString()}</strong>.
              <br/><br/>
              <span className="text-red-500 font-bold">ATTENTION :</span> Toutes les données actuelles seront écrasées. Cette action est irréversible.
            </p>

            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 mb-8 text-sm">
               <div className="flex justify-between mb-2">
                  <span>Version App</span>
                  <span className="font-mono">{restoreTarget.version}</span>
               </div>
               <div className="flex justify-between">
                  <span>Taille Données</span>
                  <span className="font-mono">{getFormatSize(restoreTarget.size)}</span>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setRestoreTarget(null)} 
                className="flex-1 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white font-bold rounded-xl"
              >
                Annuler
              </button>
              <button 
                onClick={() => handleRestore(restoreTarget.id)}
                disabled={isProcessing}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCw size={18} className="animate-spin"/> : <RotateCcw size={18}/>} Restaurer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BackupManager;