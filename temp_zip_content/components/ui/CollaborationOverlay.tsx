
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Check, Trash2, Send } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

interface Comment {
  id: string;
  x: number;
  y: number;
  text: string;
  author: string;
  timestamp: string;
  resolved: boolean;
}

interface Props {
  isActive: boolean;
  onClose: () => void;
}

const CollaborationOverlay: React.FC<Props> = ({ isActive, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pendingPin, setPendingPin] = useState<{x: number, y: number} | null>(null);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const loadComments = () => setComments(mockDB.getComments());
    loadComments();
    window.addEventListener('mgs_db_update', loadComments);
    return () => window.removeEventListener('mgs_db_update', loadComments);
  }, []);

  if (!isActive) return null;

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Prevent adding pin if clicking on existing pin modal
    if ((e.target as HTMLElement).closest('.comment-pin')) return;
    
    setPendingPin({ 
      x: (e.clientX / window.innerWidth) * 100, 
      y: (e.clientY / window.innerHeight) * 100 
    });
  };

  const saveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingPin && newText.trim()) {
      mockDB.addComment({
        x: pendingPin.x,
        y: pendingPin.y,
        text: newText,
        author: 'Admin', // In real app, use auth context
        resolved: false
      });
      setPendingPin(null);
      setNewText('');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] cursor-crosshair">
      {/* Interaction Layer */}
      <div className="absolute inset-0 bg-black/10" onClick={handleCanvasClick}></div>

      {/* Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-[2001] cursor-default">
        <span className="flex items-center gap-2 font-bold text-sm"><MessageSquare size={16} className="text-green-400"/> Mode Commentaires Actif</span>
        <div className="h-4 w-px bg-white/20"></div>
        <button onClick={onClose} className="text-xs hover:text-red-400">Quitter</button>
      </div>

      {/* Existing Pins */}
      {comments.map((comment) => !comment.resolved && (
        <div 
          key={comment.id}
          className="absolute comment-pin group z-[2002]"
          style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
        >
          <div className="w-8 h-8 -ml-4 -mt-4 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
            <span className="text-xs font-bold">{comment.author.charAt(0)}</span>
          </div>
          
          {/* Comment Popover */}
          <div className="absolute top-6 left-6 w-64 bg-white dark:bg-[#1a1a2e] p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <p className="text-sm text-slate-800 dark:text-white mb-2">{comment.text}</p>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-400">{new Date(comment.timestamp).toLocaleTimeString()}</span>
              <button onClick={() => mockDB.resolveComment(comment.id)} className="text-green-500 hover:text-green-600 p-1 rounded hover:bg-green-50"><Check size={14}/></button>
            </div>
          </div>
        </div>
      ))}

      {/* Pending Pin Form */}
      {pendingPin && (
        <div 
          className="absolute comment-pin z-[2003]"
          style={{ left: `${pendingPin.x}%`, top: `${pendingPin.y}%` }}
        >
          <div className="w-8 h-8 -ml-4 -mt-4 bg-accent rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <form onSubmit={saveComment} className="absolute top-6 left-6 w-72 bg-white dark:bg-[#1a1a2e] p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10">
            <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Nouveau Commentaire</h4>
            <textarea 
              autoFocus
              rows={3}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-2 text-sm mb-3 resize-none outline-none focus:border-primary"
              placeholder="Écrivez votre remarque..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setPendingPin(null)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
              <button type="submit" className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"><Send size={16}/></button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CollaborationOverlay;
