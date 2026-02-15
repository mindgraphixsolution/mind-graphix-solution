
import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Key, Lock, History, AlertTriangle, Check, Globe, LogOut, Download, Search, Filter, AlertCircle, FileText } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const SecuritySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policy' | 'audit'>('audit');
  const [config, setConfig] = useState<any>({});
  const [logs, setLogs] = useState<any[]>([]);
  
  // Audit Filters
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const refreshData = () => {
    setConfig(mockDB.getSecurityConfig());
    setLogs(mockDB.getAuditLogs());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('mgs_db_update', refreshData);
    return () => window.removeEventListener('mgs_db_update', refreshData);
  }, []);

  const handleToggle = (key: string) => {
    const newConfig = { ...config, [key]: !config[key] };
    setConfig(newConfig);
    mockDB.saveSecurityConfig(newConfig);
  };

  const handleChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    mockDB.saveSecurityConfig(newConfig);
  };

  const handleExport = () => {
    mockDB.exportLogsToCSV();
  };

  // Filter Logic
  const filteredLogs = logs.filter(log => {
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.ip?.includes(searchTerm);
    return matchesSeverity && matchesSearch;
  });

  const criticalCount = logs.filter(l => l.severity === 'critical' && new Date(l.timestamp) > new Date(Date.now() - 86400000)).length;

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* TABS HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-2 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('audit')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
          >
            <History size={16}/> Audit Trail
          </button>
          <button 
            onClick={() => setActiveTab('policy')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'policy' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
          >
            <Shield size={16}/> Politiques de Sécurité
          </button>
        </div>
        
        {criticalCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg animate-pulse">
            <AlertTriangle size={16} />
            <span className="text-xs font-bold">{criticalCount} Alertes Critiques (24h)</span>
          </div>
        )}
      </div>

      {/* --- AUDIT TRAIL VIEW --- */}
      {activeTab === 'audit' && (
        <div className="flex-1 flex flex-col space-y-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Rechercher IP, User, Event..." 
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none cursor-pointer"
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="all">Toutes Sévérités</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white"
            >
              <Download size={16} /> Export CSV Conformité
            </button>
          </div>

          {/* Logs Table */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex-1 relative">
            <div className="absolute inset-0 overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 uppercase text-xs sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3">Sévérité</th>
                    <th className="px-6 py-3">Événement</th>
                    <th className="px-6 py-3">Utilisateur</th>
                    <th className="px-6 py-3">Contexte (IP / Device)</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${log.severity === 'critical' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                      <td className="px-6 py-4">
                        {log.severity === 'critical' && <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1"><AlertCircle size={10}/> CRITIQUE</span>}
                        {log.severity === 'warning' && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1"><AlertTriangle size={10}/> WARNING</span>}
                        {log.severity === 'info' && <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1"><Check size={10}/> INFO</span>}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                        {log.event}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-900 dark:text-gray-200 font-medium">{log.user}</span>
                          <span className="text-xs text-gray-400">{log.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs text-gray-500">
                          <span className="font-mono flex items-center gap-1"><Globe size={10}/> {log.ip} ({log.location})</span>
                          <span className="truncate max-w-[150px]" title={log.device}>{log.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {log.metadata ? (
                          <div className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-black/30 p-1 rounded max-w-[200px] truncate" title={log.metadata}>
                            {log.metadata}
                          </div>
                        ) : <span className="text-gray-300">-</span>}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400">Aucun log trouvé pour ces critères.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- POLICY SETTINGS VIEW --- */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Authentification Forte</h3>
                <p className="text-sm text-gray-500">Politiques d'accès et MFA.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-700 dark:text-gray-200">Double Authentification (2FA)</p>
                  <p className="text-xs text-gray-500">Obliger tous les admins à utiliser l'OTP.</p>
                </div>
                <button 
                  onClick={() => handleToggle('require2FA')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${config.require2FA ? 'bg-green-500' : 'bg-gray-300 dark:bg-white/10'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.require2FA ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-700 dark:text-gray-200">Biométrie / Passkeys</p>
                  <p className="text-xs text-gray-500">Autoriser FaceID/TouchID.</p>
                </div>
                <button 
                  onClick={() => handleToggle('allowBiometrics')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${config.allowBiometrics ? 'bg-green-500' : 'bg-gray-300 dark:bg-white/10'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.allowBiometrics ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Complexité Mot de Passe</label>
                <select 
                  value={config.passwordPolicy}
                  onChange={(e) => handleChange('passwordPolicy', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="basic">Basique (Min 8 chars)</option>
                  <option value="strong">Fort (Min 12 chars, Symbole)</option>
                  <option value="enterprise">Enterprise (Rotation 90j)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                <Key size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Gestion de Session</h3>
                <p className="text-sm text-gray-500">Timeout et contrôles.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-200">Timeout Inactivité</label>
                  <span className="text-xs font-bold text-primary">{config.sessionTimeout} min</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={config.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-gray-500 mt-2">Déconnexion automatique après inactivité.</p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-700 dark:text-yellow-500 text-sm">Kill Switch</h4>
                    <p className="text-xs text-yellow-600/80 mb-3">Déconnecter toutes les sessions actives immédiatement.</p>
                    <button className="px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
                      <LogOut size={12}/> Purger Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
