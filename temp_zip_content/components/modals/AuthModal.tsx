
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMode('login');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setShowPassword(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'login') {
      const status = login(formData.email, formData.password);
      if (status === 'success') {
        onClose();
        navigate('/admin/dashboard');
        return;
      } else if (status === '2fa_required') {
        onClose();
        navigate('/admin/login'); // Redirige vers la page dédiée pour la 2FA
        return;
      }
    }

    if (mode === 'register') {
       // Simulation Inscription
       alert(`Inscription réussie pour ${formData.name} !`);
       onClose();
    } else {
       setError('Identifiants invalides.');
    }
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: -20 }
  };

  const MotionDiv = motion.div as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial="hidden" animate="visible" exit="hidden">
          <MotionDiv variants={backdropVariants} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <MotionDiv variants={modalVariants} className="relative w-full max-w-md bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors z-20">
              <X size={20} />
            </button>
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mode === 'login' ? 'Bon retour !' : 'Rejoignez-nous'}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {mode === 'login' ? 'Connectez-vous pour accéder à votre espace.' : 'Créez votre compte pour démarrer l\'aventure.'}
                </p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-xs rounded-lg font-bold">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === 'register' && (
                    <MotionDiv key="name" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="relative group">
                        <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input type="text" placeholder="Nom complet" required={mode === 'register'} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>

                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                  <input type="email" placeholder="Email professionnel" required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-12 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-accent transition-colors focus:outline-none">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-primary/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  {mode === 'login' ? 'Se connecter' : "S'inscrire"} <ArrowRight size={18} />
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {mode === 'login' ? "Pas encore de compte ? " : "Déjà un compte ? "}
                  <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-accent font-bold hover:underline">
                    {mode === 'login' ? "S'inscrire" : "Se connecter"}
                  </button>
                </p>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
