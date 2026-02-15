
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, Layers, Users, Settings, LogOut, Menu, Bell, Briefcase, FileEdit, Smile, Image as ImageIcon, MessageCircle, Command, Search, ChevronRight, Calendar, Home, Info, Mail, Bug, ScrollText, Newspaper, TrendingUp, Tag, BrainCircuit, PenTool,
  Crown, Package, FileText, FolderOpen, Shield, Lock, Key, Archive, Zap, Bot, Workflow, Code, Database, ChevronDown, Monitor, Globe,
  ExternalLink, MessageCircle as ChatIcon, Sidebar, Palette, Maximize2, Minimize2, BarChart2, Star, Eye, Layout
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
// @ts-ignore
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';
import CommandPalette from '../ui/CommandPalette'; 
import { usePreferences } from '../../context/PreferencesContext'; 

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage, setActivePage }) => {
  const { logout, adminUser, can } = useAdmin();
  const { preferences, updatePreference, focusMode, setFocusMode } = usePreferences();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [branding, setBranding] = useState({ appName: 'AdminForge', primaryColor: '#5e35b1' });
  
  useEffect(() => {
    const updateConfig = () => setBranding(mockDB.getWhiteLabelConfig());
    updateConfig();
    window.addEventListener('mgs_db_update', updateConfig);
    return () => window.removeEventListener('mgs_db_update', updateConfig);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const MENU_GROUPS = [
    { name: 'Général', items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytique', icon: BarChart2 }
    ]},
    { name: 'No-Code CMS', items: [
      { id: 'home_manager', label: 'Accueil & Hero', icon: Home },
      { id: 'services_manager', label: 'Services', icon: Briefcase },
      { id: 'portfolio_manager', label: 'Portfolio', icon: Layout },
      { id: 'team_manager', label: 'Équipe', icon: Users },
      { id: 'media_manager', label: 'Médiathèque', icon: FolderOpen }
    ]},
    { name: 'Outils & IA', items: [
      { id: 'ai_assistant', label: 'Assistant IA', icon: Bot },
      { id: 'crm', label: 'CRM / Leads', icon: MessageSquare },
      { id: 'email_marketing', label: 'Email Marketing', icon: Mail }
    ]},
    { name: 'Système', items: [
      { id: 'roles', label: 'Droits d\'accès', icon: Shield },
      { id: 'backups', label: 'Sauvegardes', icon: Archive }
    ]}
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex text-slate-800 dark:text-white font-sans">
      <CommandPalette />

      {!focusMode && (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-[#131323] border-r border-gray-200 dark:border-white/5 transition-all duration-300 flex flex-col fixed h-full z-50`}>
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg">F</div>
             {sidebarOpen && <span className="font-black text-lg tracking-tighter">FORGE <span className="text-gray-400">v3</span></span>}
          </div>

          <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto no-scrollbar">
            {MENU_GROUPS.map((group) => (
              <div key={group.name}>
                {sidebarOpen && <p className="px-3 mb-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{group.name}</p>}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activePage === item.id ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                    >
                      <item.icon size={20} className="shrink-0" />
                      {sidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
            {sidebarOpen && (
               <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Eye size={20} />
                  <span className="font-bold text-sm">Voir le site</span>
               </Link>
            )}
            <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors ${!sidebarOpen && 'justify-center'}`}>
              <LogOut size={20} />
              {sidebarOpen && <span className="font-bold text-sm">Quitter Forge</span>}
            </button>
          </div>
        </aside>
      )}

      <main className={`flex-1 flex flex-col transition-all duration-300 ${!focusMode ? (sidebarOpen ? 'ml-64' : 'ml-20') : 'ml-0'}`}>
        <div className="p-8 flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0e17]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
