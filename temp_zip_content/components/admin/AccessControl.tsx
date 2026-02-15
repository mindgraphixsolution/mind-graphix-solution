
import React, { useState, useEffect } from 'react';
import { UserCheck, GitPullRequest, Clock, CheckCircle, XCircle, ArrowRight, UserPlus, AlertCircle, Calendar } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';
import { useAdmin } from '../../context/AdminContext';

const AccessControl: React.FC = () => {
  const { adminUser } = useAdmin();
  const [activeTab, setActiveTab] = useState<'delegation' | 'approval'>('approval');
  const [delegations, setDelegations] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  
  // New Delegation Form
  const [newDelegation, setNewDelegation] = useState({ toUser: '', roleId: '', startDate: '', endDate: '', reason: '' });

  const loadData = () => {
    setDelegations(mockDB.getDelegations());
    setApprovals(mockDB.getApprovals());
    setUsers(mockDB.getUsers());
    setRoles(mockDB.getRoles());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const handleCreateDelegation = (e: React.FormEvent) => {
    e.preventDefault();
    mockDB.saveDelegation({ ...newDelegation, fromUser: adminUser?.id });
    setNewDelegation({ toUser: '', roleId: '', startDate: '', endDate: '', reason: '' });
    alert("Délégation activée !");
  };

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    mockDB.processApproval(id, status);
  };

  const getUserName = (id: string) => users.find(u => u.id === id)?.name || id;
  const getRoleName = (id: string) => roles.find(r => r.id === id)?.name || id;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Tabs */}
      <div className="flex bg-white dark:bg-[#1a1a2e] p-2 rounded-xl border border-gray-200 dark:border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab('approval')} 
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'approval' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          <GitPullRequest size={16}/> Centre d'Approbation
          {approvals.filter(a => a.status === 'pending').length > 0 && <span className="bg-red-500 text-white px-2 rounded-full text-[10px]">{approvals.filter(a => a.status === 'pending').length}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('delegation')} 
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'delegation' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          <UserCheck size={16}/> Délégation de Droits
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* APPROVAL WORKFLOW */}
        {activeTab === 'approval' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {approvals.filter(a => a.status === 'pending').map(app => (
                <div key={app.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border-l-4 border-yellow-500 shadow-sm relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded uppercase tracking-wider">{app.type}</span>
                      <h3 className="text-xl font-bold mt-2 text-slate-800 dark:text-white">{app.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Demandé par <span className="font-bold">{app.requester}</span> le {new Date(app.date).toLocaleDateString()}</p>
                    </div>
                    <Clock size={20} className="text-yellow-500"/>
                  </div>
                  
                  {app.amount && <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-6">{app.amount}</div>}

                  <div className="flex gap-3">
                    <button onClick={() => handleApproval(app.id, 'approved')} className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle size={18}/> Approuver
                    </button>
                    <button onClick={() => handleApproval(app.id, 'rejected')} className="flex-1 py-3 bg-red-100 text-red-500 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2">
                      <XCircle size={18}/> Rejeter
                    </button>
                  </div>
                </div>
              ))}
              {approvals.filter(a => a.status === 'pending').length === 0 && (
                <div className="col-span-2 text-center py-20 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400">
                  <CheckCircle size={48} className="mx-auto mb-4 opacity-20"/>
                  <p>Aucune demande en attente. Tout est à jour !</p>
                </div>
              )}
            </div>

            {/* History */}
            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-white/10 font-bold text-sm bg-gray-50 dark:bg-white/5">Historique</div>
              {approvals.filter(a => a.status !== 'pending').map(app => (
                <div key={app.id} className="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center opacity-70">
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase mr-2 ${app.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{app.status}</span>
                    <span className="font-medium text-sm">{app.title}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(app.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DELEGATION MANAGER */}
        {activeTab === 'delegation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Form */}
            <div className="lg:col-span-1 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 h-fit">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><UserPlus size={20} className="text-primary"/> Nouvelle Délégation</h3>
              <form onSubmit={handleCreateDelegation} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Bénéficiaire</label>
                  <select required className="w-full p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10" value={newDelegation.toUser} onChange={e => setNewDelegation({...newDelegation, toUser: e.target.value})}>
                    <option value="">Sélectionner un utilisateur</option>
                    {users.filter(u => u.id !== adminUser?.id).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Rôle à déléguer</label>
                  <select required className="w-full p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10" value={newDelegation.roleId} onChange={e => setNewDelegation({...newDelegation, roleId: e.target.value})}>
                    <option value="">Sélectionner un rôle</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Début</label>
                    <input type="date" required className="w-full p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10" value={newDelegation.startDate} onChange={e => setNewDelegation({...newDelegation, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Fin</label>
                    <input type="date" required className="w-full p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10" value={newDelegation.endDate} onChange={e => setNewDelegation({...newDelegation, endDate: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Raison</label>
                  <input type="text" required placeholder="Vacances, maladie..." className="w-full p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10" value={newDelegation.reason} onChange={e => setNewDelegation({...newDelegation, reason: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90">Activer</button>
              </form>
            </div>

            {/* Active Delegations */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-lg mb-2">Délégations Actives</h3>
              {delegations.filter(d => d.active).length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400">Aucune délégation active.</div>
              ) : (
                delegations.filter(d => d.active).map(del => (
                  <div key={del.id} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center font-bold text-xs" title={getUserName(del.fromUser)}>{getUserName(del.fromUser).charAt(0)}</div>
                        <div className="w-10 h-10 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center font-bold text-xs z-10" title={getUserName(del.toUser)}>{getUserName(del.toUser).charAt(0)}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 dark:text-white">{getUserName(del.fromUser)}</span>
                          <ArrowRight size={14} className="text-gray-400"/>
                          <span className="font-bold text-slate-800 dark:text-white">{getUserName(del.toUser)}</span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><AlertCircle size={12}/> Rôle : {getRoleName(del.roleId)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Période</div>
                        <div className="text-sm font-mono flex items-center gap-1 justify-end"><Calendar size={12}/> {new Date(del.startDate).toLocaleDateString()} - {new Date(del.endDate).toLocaleDateString()}</div>
                      </div>
                      <button onClick={() => mockDB.revokeDelegation(del.id)} className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-lg font-bold text-xs hover:bg-red-200 transition-colors">Révoquer</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessControl;
