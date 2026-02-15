'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { mockDB } from '../../utils/mockDatabase';
import { useAdmin } from '../../context/AdminContext';
import { 
  Activity, CheckCircle2, AlertTriangle, ShieldAlert, Terminal, Cpu, Zap, Search,
  LayoutDashboard, Database, ShieldCheck, BrainCircuit, Globe, BarChart2,
  Settings, Users, Briefcase, Star, Newspaper, Mail, Archive, FolderOpen, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MODULE IMPORTS ---
import ModularDashboard from './ModularDashboard'; 
import ReportingCenter from './ReportingCenter'; 
import { AnalyticsDashboard, MediaLibrary, PromotionsManager } from './AdminModules';
import { IntelligenceDashboard } from './IntelligenceDashboard';
import CRM from './CRM';
import EmailMarketing from './EmailMarketing';
import PageBuilder from './PageBuilder'; 
import MediaManager from './MediaManager'; 
import SEOManager from './SEOManager';
import AIAssistant from './AIAssistant'; 
import { HomeManager, ServiceManager, TeamManager, PortfolioManager, TestimonialManager } from './AdminCMS';
import SecuritySettings from './SecuritySettings'; 
import RoleManager from './RoleManager'; 
import BackupManager from './BackupManager';

const ScanningScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Analyse de la structure DOM...');

  useEffect(() => {
    const steps = [
      { p: 20, s: 'Analyse de la structure DOM/UI existante...' },
      { p: 40, s: 'Détection des composants réutilisables...' },
      { p: 60, s: 'Identification des modèles de données (No-Code Tunnel)...' },
      { p: 80, s: 'Cartographie des routes et endpoints API...' },
      { p: 100, s: 'Génération du bureau d\'administration dynamique...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        if (step) {
          setProgress(step.p);
          setStatus(step.s);
        }
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[2000] bg-[#02040a] flex flex-col items-center justify-center p-6 text-center font-mono">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="mb-12 relative">
        <div className="w-32 h-32 border-t-4 border-primary rounded-full blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center"><Terminal size={48} className="text-primary" /></div>
      </motion.div>
      <div className="max-w-md w-full">
        <div className="flex justify-between mb-2 text-xs font-bold text-primary tracking-widest uppercase">
          <span>[SCANNING_IN_PROGRESS]</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-6">
          <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
        </div>
        <p className="text-gray-400 text-sm animate-pulse">{status}</p>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(true);
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const { adminUser } = useAdmin();

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const hasScanned = sessionStorage.getItem('admin_scanned');
    if (hasScanned) setIsScanning(false);
  }, []);

  const handleScanComplete = () => {
    setIsScanning(false);
    sessionStorage.setItem('admin_scanned', 'true');
  };

  if (!adminUser) return <div className="p-10 text-center">Accès non autorisé.</div>;

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard': return <ModularDashboard />;
      case 'home_manager': return <HomeManager showToast={showToast} />;
      case 'services_manager': return <ServiceManager showToast={showToast} />;
      case 'testimonials_manager': return <TestimonialManager showToast={showToast} />;
      case 'portfolio_manager': return <PortfolioManager showToast={showToast} />;
      case 'team_manager': return <TeamManager showToast={showToast} />;
      case 'intelligence': return <IntelligenceDashboard />;
      case 'reports': return <ReportingCenter />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'page_builder': return <PageBuilder />;
      case 'media_manager': return <MediaManager />;
      case 'ai_assistant': return <AIAssistant />;
      case 'crm': return <CRM />;
      case 'email_marketing': return <EmailMarketing />;
      case 'settings': return <SecuritySettings />;
      case 'roles': return <RoleManager />;
      case 'backups': return <BackupManager />;
      default: return <ModularDashboard />;
    }
  };

  return (
    <AdminLayout activePage={activePage} setActivePage={setActivePage}>
      <AnimatePresence>
        {isScanning && <ScanningScreen onComplete={handleScanComplete} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`fixed bottom-8 right-8 z-[2005] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
             {toast.type === 'success' ? <CheckCircle2 size={20}/> : <AlertTriangle size={20}/>}
             <span className="font-bold">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isScanning && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1600px] mx-auto pb-20">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AdminLayout>
  );
};

export default AdminPanel;

