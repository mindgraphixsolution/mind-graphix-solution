
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ShieldCheck, AlertCircle, Fingerprint, Smartphone, ArrowRight, Key, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const { login, verify2FA, loginWithSSO } = useAdmin();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'email' | 'password' | '2fa'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulation d'un délai réseau court
    await new Promise(r => setTimeout(r, 600));

    const status = login(email, password);
    setIsLoading(false);

    if (status === 'success') {
      navigate('/admin/dashboard');
    } else if (status === '2fa_required') {
      setStep('2fa');
    } else {
      setError('Identifiants incorrects. Veuillez vérifier votre email et mot de passe.');
      setPassword('');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (verify2FA(code)) {
      navigate('/admin/dashboard');
    } else {
      setError('Code de sécurité incorrect.');
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLElement).focus();
    }
  };

  const handleSSO = async (provider: string) => {
    setIsLoading(true);
    await loginWithSSO(provider);
    navigate('/admin/dashboard');
  };

  const handleBiometric = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // Simulation d'une réussite biométrique liée à l'admin principal
    const status = login('admin@mindgraphix.com', 'MGS_Admin_2025!');
    if (status === 'success' || status === '2fa_required') {
       if (status === '2fa_required') setStep('2fa');
       else navigate('/admin/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '7s'}}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col items-center"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4 border border-white/10">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Accès Administration</h1>
          <p className="text-gray-400 text-sm mt-1">Veuillez vous authentifier</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <div className="w-full">
          <AnimatePresence mode="wait">
            {step === 'email' && (
              <motion.form 
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Professionnel</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder="admin@mindgraphix.com"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  Continuer <ArrowRight size={18} />
                </button>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Ou</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleSSO('Google')} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-white text-sm font-medium">
                    Google
                  </button>
                  <button type="button" onClick={() => handleSSO('Microsoft')} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-white text-sm font-medium">
                    Microsoft
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'password' && (
              <motion.form 
                key="password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePasswordSubmit}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm text-white font-medium truncate">{email}</p>
                    <button type="button" onClick={() => setStep('email')} className="text-xs text-primary hover:text-white transition-colors">Changer de compte</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mot de passe</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder="••••••••"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Se connecter'}
                </button>
                <div className="text-center">
                  <button type="button" onClick={handleBiometric} className="text-gray-500 hover:text-white transition-colors text-sm flex items-center justify-center gap-2 mx-auto">
                    <Fingerprint size={20} /> Utiliser la biométrie
                  </button>
                </div>
              </motion.form>
            )}

            {step === '2fa' && (
              <motion.form 
                key="2fa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handle2FASubmit}
                className="space-y-8 text-center"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400 animate-pulse border border-blue-500/20">
                    <Smartphone size={32} />
                  </div>
                  <h3 className="text-white font-bold text-lg">Double Authentification</h3>
                  <p className="text-gray-400 text-sm mt-1">Entrez le code de sécurité (Par défaut: 123456)</p>
                </div>
                <div className="flex justify-center gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 bg-black/40 border border-white/10 rounded-lg text-center text-xl font-bold text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
                <button 
                  type="submit" 
                  disabled={otp.join('').length < 6}
                  className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Vérifier <CheckCircle2 size={18} />
                </button>
                <button type="button" onClick={() => setStep('password')} className="text-xs text-gray-500 hover:text-white">Retour au mot de passe</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          <span>Forge Dashboard v3</span>
          <span className="flex items-center gap-1"><Key size={10} /> Chiffrement AES-256</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
