
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, UploadCloud, DownloadCloud, FileJson, FileSpreadsheet, 
  CheckCircle2, AlertCircle, ArrowRight, RefreshCw, FileCode, HardDrive
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const DataMigration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [exportType, setExportType] = useState('users');
  const [exportFormat, setExportFormat] = useState('json');
  const [isProcessing, setIsProcessing] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStep, setImportStep] = useState(1); // 1: Upload, 2: Map, 3: Success

  const handleExport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      mockDB.exportData(exportType, exportFormat);
      setIsProcessing(false);
    }, 1500);
  };

  const handleImportDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if(e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImportFile(e.dataTransfer.files[0]);
      setImportStep(2);
    }
  };

  const handleImportSubmit = () => {
    setIsProcessing(true);
    // Simulating parsing and DB update
    setTimeout(() => {
      setIsProcessing(false);
      setImportStep(3);
    }, 2000);
  };

  const resetImport = () => {
    setImportFile(null);
    setImportStep(1);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Migration de Données</h1>
            <p className="text-xs text-gray-500">Import/Export massif et sauvegardes portables.</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('export')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'export' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}>
          <DownloadCloud size={16}/> Export
        </button>
        <button onClick={() => setActiveTab('import')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'import' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-500'}`}>
          <UploadCloud size={16}/> Import
        </button>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* EXPORT TAB */}
          {activeTab === 'export' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto space-y-8 mt-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Data Source Selection */}
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><HardDrive size={18} className="text-primary"/> Source de données</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'users', label: 'Utilisateurs & Rôles' },
                      { id: 'leads', label: 'CRM Leads' },
                      { id: 'content', label: 'Contenu CMS (Pages/Blog)' },
                      { id: 'settings', label: 'Configuration Système' }
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${exportType === opt.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50'}`}>
                        <input type="radio" name="exportType" checked={exportType === opt.id} onChange={() => setExportType(opt.id)} className="accent-primary" />
                        <span className="font-medium text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><FileCode size={18} className="text-primary"/> Format de sortie</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setExportFormat('json')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${exportFormat === 'json' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-white/5 text-gray-500'}`}>
                      <FileJson size={24}/>
                      <span className="text-xs font-bold">JSON</span>
                    </button>
                    <button onClick={() => setExportFormat('csv')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${exportFormat === 'csv' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-white/5 text-gray-500'}`}>
                      <FileSpreadsheet size={24}/>
                      <span className="text-xs font-bold">CSV</span>
                    </button>
                    <button onClick={() => setExportFormat('xml')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${exportFormat === 'xml' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-white/5 text-gray-500'}`}>
                      <FileCode size={24}/>
                      <span className="text-xs font-bold">XML</span>
                    </button>
                  </div>
                  <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 text-xs rounded-lg flex gap-2">
                    <AlertCircle size={16} className="shrink-0"/>
                    <p>Le format JSON est recommandé pour une restauration complète incluant les métadonnées complexes.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={handleExport}
                  disabled={isProcessing}
                  className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:bg-primary-dark transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <RefreshCw size={20} className="animate-spin"/> : <DownloadCloud size={20}/>}
                  {isProcessing ? 'Génération...' : 'Télécharger l\'Export'}
                </button>
              </div>

            </motion.div>
          )}

          {/* IMPORT TAB */}
          {activeTab === 'import' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto mt-8">
              
              {/* Stepper */}
              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/5 -z-10"></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${importStep >= 1 ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-[#1a1a2e] border-gray-200 text-gray-400'}`}>1</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${importStep >= 2 ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-[#1a1a2e] border-gray-200 text-gray-400'}`}>2</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${importStep >= 3 ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-[#1a1a2e] border-gray-200 text-gray-400'}`}>3</div>
              </div>

              {/* Step 1: Upload */}
              {importStep === 1 && (
                <div 
                  className="bg-white dark:bg-[#1a1a2e] border-2 border-dashed border-gray-300 dark:border-white/10 rounded-3xl p-12 text-center hover:border-primary transition-colors cursor-pointer group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleImportDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input type="file" id="file-upload" className="hidden" onChange={(e) => { if(e.target.files?.[0]) { setImportFile(e.target.files[0]); setImportStep(2); } }} />
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                    <UploadCloud size={40} className="text-gray-400 group-hover:text-primary transition-colors"/>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Glissez votre fichier ici</h3>
                  <p className="text-gray-500 text-sm mb-6">Support: JSON, CSV, XML (Max 50MB)</p>
                  <button className="px-6 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-bold hover:bg-gray-200">Parcourir les fichiers</button>
                </div>
              )}

              {/* Step 2: Mapping / Confirm */}
              {importStep === 2 && importFile && (
                <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                      <FileJson size={24}/>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{importFile.name}</h3>
                      <p className="text-gray-500 text-xs">{(importFile.size / 1024).toFixed(2)} KB • Prêt à l'analyse</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <span className="text-gray-500">Destination</span>
                      <span className="font-bold">Base de données Principale</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <span className="text-gray-500">Mode</span>
                      <select className="bg-transparent font-bold text-right outline-none cursor-pointer">
                        <option>Fusionner (Merge)</option>
                        <option>Écraser (Overwrite)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={resetImport} className="flex-1 py-3 border border-gray-200 dark:border-white/10 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/5">Annuler</button>
                    <button 
                      onClick={handleImportSubmit}
                      disabled={isProcessing}
                      className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <RefreshCw size={18} className="animate-spin"/> : <ArrowRight size={18}/>} Lancer l'Import
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {importStep === 3 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle2 size={48}/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Importation Terminée !</h3>
                  <p className="text-gray-500 mb-8">Les données ont été intégrées avec succès à la base.</p>
                  <button onClick={resetImport} className="px-8 py-3 bg-gray-100 dark:bg-white/5 rounded-xl font-bold hover:bg-gray-200 transition-colors">Retour</button>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataMigration;
