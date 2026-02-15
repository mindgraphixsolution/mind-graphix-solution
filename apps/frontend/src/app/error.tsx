'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur vers un service de monitoring
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02040a] px-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <AlertCircle size={40} className="text-red-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Oups ! Quelque chose a mal tourné.
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Une erreur inattendue est survenue. Nos ingénieurs ont été notifiés et travaillent sur la résolution du problème.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={18} /> Réessayer
          </button>
          
          <Link href="/" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <Home size={18} /> Retour à l'accueil
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-left">
            <p className="text-red-400 font-mono text-xs break-all">
              {error.message}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
