'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02040a] px-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10"
        >
          <Ghost size={48} className="text-blue-400" />
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6">
          Page Introuvable
        </h2>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Il semble que vous vous soyez perdu dans le cyberespace. La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            <Home size={18} /> Accueil
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} /> Retour
          </button>
        </div>
      </motion.div>
    </div>
  );
}
