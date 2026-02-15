
import React, { useState, useEffect } from 'react';
import { 
  Monitor, AlertTriangle, FileText, Download, Save, RefreshCw, Power 
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setSettings(mockDB.getSettings());
  }, []);

  const handleUpdate = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    mockDB.saveSettings(newSettings);
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate PDF generation
      const stats = mockDB.getStats();
      const content = `Rapport Mensuel - Mind Graphix Solution\n\nVisiteurs: ${stats.visitors}\nProjets: ${stats.projectsCount}\nConversion: ${stats.conversionRate}%\n\nGénéré le ${new Date().toLocaleDateString()}`;
      
      const blob = new Blob([content], { type: 'application/pdf' }); // Fake PDF (text content)
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Rapport_MGS_${new Date().toISOString().slice(0,10)}.pdf`; // Extension .pdf but content is text for demo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsGenerating(false);
      alert("Rapport généré avec succès !");
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg">
            <Monitor size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Système & Rapports</h1>
            <p className="text-xs text-gray-500">Maintenance et export de données.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MAINTENANCE MODE */}
        <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"><AlertTriangle className="text-orange-500"/> Mode Maintenance</h3>
              <p className="text-sm text-gray-500 mt-1">Activez une page d'attente pour les visiteurs.</p>
            </div>
            <button 
              onClick={() => handleUpdate('maintenanceMode', !settings.maintenanceMode)}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${settings.maintenanceMode ? 'bg-orange-500' : 'bg-gray-300 dark:bg-white/10'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${settings.maintenanceMode ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>

          <div className={`space-y-4 transition-opacity ${settings.maintenanceMode ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre de la page</label>
              <input 
                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl"
                value={settings.maintenanceTitle || 'Site en Maintenance'}
                onChange={(e) => handleUpdate('maintenanceTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
              <textarea 
                rows={3}
                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl resize-none"
                value={settings.maintenanceMessage || 'Nous revenons bientôt.'}
                onChange={(e) => handleUpdate('maintenanceMessage', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* REPORTS */}
        <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2"><FileText className="text-blue-500"/> Rapports Automatiques</h3>
            <p className="text-sm text-gray-500 mb-6">Générez un rapport PDF complet incluant les statistiques clés, les performances financières et les nouveaux leads.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">
                <RefreshCw size={16}/> Périodicité
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">Ce rapport est généré automatiquement chaque 1er du mois et envoyé par email aux admins.</p>
            </div>
          </div>

          <button 
            onClick={generateReport} 
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <div className="animate-spin w-5 h-5 border-2 border-white rounded-full border-t-transparent"></div> : <Download size={20} />}
            Générer Rapport Maintenant
          </button>
        </div>

      </div>
    </div>
  );
};

export default SystemSettings;
