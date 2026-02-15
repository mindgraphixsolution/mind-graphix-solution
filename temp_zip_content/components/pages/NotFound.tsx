
import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="text-[150px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none select-none">
          404
        </div>
        
        <div className="mt-[-50px] md:mt-[-80px] mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Perdu dans l'espace ?</h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            La page que vous recherchez semble avoir été aspirée par un trou noir ou n'a jamais existé.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
          >
            <Home size={20} /> Retour Accueil
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-3 bg-white/10 border border-white/10 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
          >
            <Compass size={20} /> Contactez-nous
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
