'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface SpeedDialProps {
  onOpenChat: () => void;
}

/**
 * Composant SpeedDial - Chat IA uniquement
 */
const SpeedDial: React.FC<SpeedDialProps> = ({ onOpenChat }) => {

  return (
    <div className="relative group">
      <motion.button
        onClick={onOpenChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-2xl border flex items-center justify-center shadow-2xl transition-all duration-500 glass border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent-color)]"
      >
        <MessageSquare size={32} strokeWidth={1.5} />
      </motion.button>
    </div>
  );
};

export default SpeedDial;

