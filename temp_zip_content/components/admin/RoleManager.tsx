
import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit3, Trash2, Check, X, Info, Lock } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const RESOURCES = ['dashboard', 'cms', 'crm', 'finance', 'hr', 'settings', 'media', 'marketing', 'security', 'analytics'];
const ACTIONS = ['view', 'create', 'edit', 'delete', 'approve', 'publish', 'export'];

const RoleManager: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setRoles(mockDB.getRoles());
  }, []);

  const handleSaveRole = () => {
    if (editingRole) {
      mockDB.saveRole(editingRole);
      setRoles(mockDB.getRoles());
      setEditingRole(null);
      setIsCreating(false);
    }
  };

  const togglePermission = (resource: string, action: string) => {
    if (!editingRole) return;
    const perm = `${resource}:${action}`;
    const hasPerm = editingRole.permissions.includes(perm);
    
    let newPerms = [];
    if (hasPerm) {
      newPerms = editingRole.permissions.filter((p: string) => p !== perm);
    } else {
      newPerms = [...editingRole.permissions, perm];
    }
    setEditingRole({ ...editingRole, permissions: newPerms });
  };

  const toggleAllResource = (resource: string) => {
    if (!editingRole) return;
    const allActions = ACTIONS.map(a => `${resource}:${a}`);
    const hasAll = allActions.every(p => editingRole.permissions.includes(p));
    
    let newPerms = editingRole.permissions.filter((p: string) => !p.startsWith(`${resource}:`));
    if (!hasAll) {
      newPerms = [...newPerms, ...allActions];
    }
    setEditingRole({ ...editingRole, permissions: newPerms });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="text-blue-500"/> Gestion des Rôles (RBAC)</h1>
          <p className="text-gray-500 text-sm">Définissez les niveaux d'accès avec une précision chirurgicale.</p>
        </div>
        {!editingRole && (
          <button 
            onClick={() => { setEditingRole({ id: '', name: 'Nouveau Rôle', description: '', permissions: [] }); setIsCreating(true); }}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-primary-dark"
          >
            <Plus size={18}/> Créer un rôle
          </button>
        )}
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* Role List */}
        <div className={`w-1/3 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-y-auto ${editingRole ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 font-bold text-gray-500 uppercase text-xs sticky top-0">
            Rôles Existants ({roles.length})
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {roles.map(role => (
              <div 
                key={role.id} 
                onClick={() => { setEditingRole(role); setIsCreating(false); }}
                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${editingRole?.id === role.id ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{role.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                  </div>
                  {role.permissions.includes('*') && <Lock size={14} className="text-red-500" title="Super Admin"/>}
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-500">{role.permissions.length} perms</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matrix Editor */}
        {editingRole ? (
          <div className="flex-1 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col overflow-hidden animate-fade-in">
            {/* Editor Header */}
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
              <div className="flex-1 mr-4">
                <input 
                  className="text-xl font-bold bg-transparent border-none outline-none w-full mb-1 text-slate-900 dark:text-white" 
                  value={editingRole.name} 
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                  placeholder="Nom du rôle"
                />
                <input 
                  className="text-sm text-gray-500 bg-transparent border-none outline-none w-full" 
                  value={editingRole.description} 
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                  placeholder="Description..."
                />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingRole(null)} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500">Annuler</button>
                <button onClick={handleSaveRole} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold flex items-center gap-2"><Check size={18}/> Enregistrer</button>
                {!isCreating && <button onClick={() => { if(confirm('Supprimer ?')) { mockDB.deleteRole(editingRole.id); setEditingRole(null); setRoles(mockDB.getRoles()); } }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={18}/></button>}
              </div>
            </div>

            {/* Matrix */}
            <div className="flex-1 overflow-auto p-6">
              {editingRole.permissions.includes('*') ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                  <Shield size={64} className="text-red-500 mb-4"/>
                  <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">Accès Super Admin</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Ce rôle dispose de tous les privilèges système (racine).</p>
                  <button onClick={() => setEditingRole({...editingRole, permissions: []})} className="mt-6 px-6 py-2 bg-white border border-red-200 text-red-500 rounded-lg shadow-sm hover:bg-red-50">Passer en mode granulaire</button>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white dark:bg-[#1a1a2e] z-10 shadow-sm">
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-500 uppercase text-xs">Module</th>
                      {ACTIONS.map(action => (
                        <th key={action} className="text-center py-3 px-2 text-gray-500 uppercase text-[10px] w-20">{action}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {RESOURCES.map(resource => (
                      <tr key={resource} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="py-3 px-4 font-bold capitalize flex items-center gap-2">
                          <button onClick={() => toggleAllResource(resource)} className="w-4 h-4 rounded border flex items-center justify-center text-[8px] hover:border-primary text-gray-300">A</button>
                          {resource}
                        </td>
                        {ACTIONS.map(action => {
                          const isActive = editingRole.permissions.includes(`${resource}:${action}`) || editingRole.permissions.includes(`${resource}:*`);
                          return (
                            <td key={action} className="text-center py-3 px-2">
                              <button 
                                onClick={() => togglePermission(resource, action)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all mx-auto ${
                                  isActive 
                                    ? 'bg-primary border-primary text-white' 
                                    : 'border-gray-300 dark:border-white/20 hover:border-primary text-transparent'
                                }`}
                              >
                                <Check size={12} strokeWidth={4} />
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Shield size={64} className="mb-4 opacity-20"/>
            <p>Sélectionnez un rôle pour éditer ses permissions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManager;
