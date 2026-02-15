
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Kanban, List, Plus, Search, User, Phone, Mail, Building, 
  MoreVertical, CheckSquare, Clock, ArrowRight, DollarSign, 
  Trash2, Edit3, X, Calendar, Activity, StickyNote, Filter, ChevronRight
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

const STAGES = [
  { id: 'new', label: 'Nouveaux', color: 'bg-blue-500' },
  { id: 'qualified', label: 'Qualifiés', color: 'bg-indigo-500' },
  { id: 'proposal', label: 'Proposition', color: 'bg-purple-500' },
  { id: 'negotiation', label: 'Négociation', color: 'bg-orange-500' },
  { id: 'won', label: 'Gagnés', color: 'bg-green-500' },
  { id: 'lost', label: 'Perdus', color: 'bg-red-500' },
];

const LeadCard = ({ lead, onDragStart, onClick }: any) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  };

  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={() => onClick(lead)}
      className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group relative"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{lead.company || 'Particulier'}</span>
        <div className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColor(lead.score)}`}>
          {lead.score}
        </div>
      </div>
      <h4 className="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-primary transition-colors">{lead.name}</h4>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
        {lead.value > 0 ? (
          <span className="font-mono text-slate-700 dark:text-gray-300 font-bold">{lead.value.toLocaleString()} F</span>
        ) : (
          <span>-</span>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        {lead.tags?.slice(0, 2).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 rounded text-[10px] text-gray-500 border border-gray-200 dark:border-white/10">{tag}</span>
        ))}
      </div>
    </div>
  );
};

const LeadDetailPanel = ({ lead, onClose, onUpdate, onDelete }: any) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'notes' | 'tasks'>('activity');
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState('');

  if (!lead) return null;

  const handleAddNote = () => {
    if(!newNote.trim()) return;
    const updatedLead = {
      ...lead,
      notes: [...(lead.notes || []), { id: Date.now(), text: newNote, date: new Date().toISOString(), author: 'Admin' }]
    };
    onUpdate(updatedLead);
    setNewNote('');
  };

  const handleAddTask = () => {
    if(!newTask.trim()) return;
    const updatedLead = {
      ...lead,
      tasks: [...(lead.tasks || []), { id: Date.now(), text: newTask, done: false, due: new Date().toISOString() }]
    };
    onUpdate(updatedLead);
    setNewTask('');
  };

  const toggleTask = (taskId: number) => {
    const updatedLead = {
      ...lead,
      tasks: lead.tasks.map((t: any) => t.id === taskId ? { ...t, done: !t.done } : t)
    };
    onUpdate(updatedLead);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white dark:bg-[#1a1a2e] shadow-2xl border-l border-gray-200 dark:border-white/10 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{lead.name}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Building size={14}/> {lead.company || 'N/A'} 
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span> 
              <span className={`capitalize ${lead.status === 'won' ? 'text-green-500' : 'text-blue-500'}`}>{lead.status}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
        </div>
        
        <div className="flex gap-4 text-sm">
          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"><Mail size={16}/> {lead.email}</a>
          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"><Phone size={16}/> {lead.phone}</a>
        </div>
        
        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
          {['activity', 'notes', 'tasks'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#1a1a2e]">
        {activeTab === 'activity' && (
          <div className="space-y-6 relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-white/5"></div>
            {lead.history?.map((event: any, i: number) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 border-2 border-white dark:border-[#1a1a2e] flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-gray-200">{event.text}</p>
                  <p className="text-xs text-gray-400">{new Date(event.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {(!lead.history || lead.history.length === 0) && <p className="text-gray-500 italic text-sm pl-8">Aucune activité récente.</p>}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
                placeholder="Ajouter une note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <button onClick={handleAddNote} className="p-2 bg-primary text-white rounded-lg"><ArrowRight size={18}/></button>
            </div>
            
            <div className="space-y-3 mt-4">
              {lead.notes?.map((note: any) => (
                <div key={note.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-slate-800 dark:text-gray-200">{note.text}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">{new Date(note.date).toLocaleDateString()}</span>
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">{note.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
                placeholder="Nouvelle tâche..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <button onClick={handleAddTask} className="p-2 bg-primary text-white rounded-lg"><Plus size={18}/></button>
            </div>

            <div className="space-y-2 mt-4">
              {lead.tasks?.map((task: any) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-white/30'}`}>
                    {task.done && <CheckSquare size={12}/>}
                  </div>
                  <span className={`text-sm flex-1 ${task.done ? 'line-through text-gray-400' : 'text-slate-800 dark:text-gray-200'}`}>{task.text}</span>
                  {task.due && <span className="text-xs text-red-400">{new Date(task.due).toLocaleDateString()}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between">
        <button onClick={() => onDelete(lead.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={20}/></button>
        <button onClick={() => alert('Feature: Send Email')} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg flex items-center gap-2"><Mail size={16}/> Contacter</button>
      </div>
    </motion.div>
  );
};

const CRM: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadLeads();
    window.addEventListener('mgs_db_update', loadLeads);
    return () => window.removeEventListener('mgs_db_update', loadLeads);
  }, []);

  const loadLeads = () => {
    setLeads(mockDB.getLeads());
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedLead) {
      mockDB.updateLeadStatus(draggedLead, status);
      setDraggedLead(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSaveLead = (lead: any) => {
    mockDB.saveLead(lead);
    setSelectedLead(lead); // Refresh panel if open
  };

  const handleDeleteLead = (id: string) => {
    if(confirm("Supprimer ce lead ?")) {
      mockDB.deleteLead(id);
      setSelectedLead(null);
    }
  };

  const getColumnTotal = (status: string) => {
    return leads.filter(l => l.status === status).reduce((acc, curr) => acc + (curr.value || 0), 0);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER TOOLBAR */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-2 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex gap-2">
          <button onClick={() => setView('kanban')} className={`p-2 rounded-lg transition-all ${view === 'kanban' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}><Kanban size={20}/></button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}><List size={20}/></button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-gray-500">
            Pipeline: <span className="text-slate-900 dark:text-white font-mono">{leads.reduce((acc,l) => acc + (l.value||0), 0).toLocaleString()} FCFA</span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-dark">
            <Plus size={16} /> Nouveau Lead
          </button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      {view === 'kanban' && (
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex gap-6 h-full min-w-max px-2">
            {STAGES.map(stage => (
              <div 
                key={stage.id}
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
                className="w-80 flex flex-col bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-200/50 dark:border-white/5"
              >
                {/* Column Header */}
                <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex justify-between items-center sticky top-0 bg-inherit rounded-t-2xl z-10 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-bold text-sm text-slate-700 dark:text-gray-200">{stage.label}</h3>
                    <span className="bg-gray-200 dark:bg-white/10 text-xs px-1.5 py-0.5 rounded-full text-gray-500">{leads.filter(l => l.status === stage.id).length}</span>
                  </div>
                  {getColumnTotal(stage.id) > 0 && <span className="text-xs font-mono text-gray-400">{(getColumnTotal(stage.id)/1000).toFixed(0)}k</span>}
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  {leads.filter(l => l.status === stage.id).map(lead => (
                    <LeadCard key={lead.id} lead={lead} onDragStart={handleDragStart} onClick={setSelectedLead} />
                  ))}
                  {leads.filter(l => l.status === stage.id).length === 0 && (
                    <div className="h-24 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center text-gray-400 text-xs">Vide</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIST VIEW (Simple Table) */}
      {view === 'list' && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Société</th>
                <th className="px-6 py-3">Valeur</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {leads.map(lead => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                  <td className="px-6 py-4 font-bold">{lead.name}</td>
                  <td className="px-6 py-4">{lead.company}</td>
                  <td className="px-6 py-4 font-mono">{lead.value.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${lead.score > 70 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{lead.score}</span></td>
                  <td className="px-6 py-4"><span className="uppercase text-xs font-bold">{lead.status}</span></td>
                  <td className="px-6 py-4"><ChevronRight size={16} className="text-gray-400"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL PANEL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setSelectedLead(null)} 
            />
            <LeadDetailPanel 
              lead={selectedLead} 
              onClose={() => setSelectedLead(null)} 
              onUpdate={handleSaveLead}
              onDelete={handleDeleteLead}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ADD LEAD MODAL (Simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Nouveau Lead</h3>
              <form onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.currentTarget);
                 mockDB.saveLead({
                    name: formData.get('name'),
                    company: formData.get('company'),
                    email: formData.get('email'),
                    status: 'new',
                    value: 0,
                    source: 'Manual'
                 });
                 setShowAddModal(false);
              }}>
                 <div className="space-y-4 mb-6">
                    <input name="name" required placeholder="Nom du contact" className="w-full p-3 rounded-lg border bg-transparent dark:text-white" />
                    <input name="company" placeholder="Entreprise" className="w-full p-3 rounded-lg border bg-transparent dark:text-white" />
                    <input name="email" type="email" placeholder="Email" className="w-full p-3 rounded-lg border bg-transparent dark:text-white" />
                 </div>
                 <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white">Annuler</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Créer</button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default CRM;
