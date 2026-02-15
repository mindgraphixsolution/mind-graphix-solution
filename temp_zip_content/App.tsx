
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { ToastProvider } from './components/ui/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { PreferencesProvider } from './context/PreferencesContext'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeExtras from './components/HomeExtras';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/modals/AuthModal';
import ChatBot from './components/ChatBot';
import ClientSpace from './components/dashboard/ClientSpace';
import ClientWidget from './components/ui/ClientWidget'; 
import CareerPage from './components/pages/CareerPage';
import ServicesPage from './components/pages/ServicesPage';
import QuotePage from './components/pages/QuotePage';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import NotFound from './components/pages/NotFound';
import PageTransition from './components/ui/PageTransition';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import SpeedDial from './components/SpeedDial';
import Preloader from './components/ui/Preloader'; 
import FloatingIdentity from './components/ui/FloatingIdentity';
import CommonSections from './components/CommonSections';
import { QuoteRequest } from './types';
import { mockDB } from './utils/mockDatabase';
import { AlertTriangle } from 'lucide-react';
import usePageTitle from './hooks/usePageTitle';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ProtectedAdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const MaintenanceScreen = ({ title, message }: { title?: string, message?: string }) => (
  <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center text-[var(--text-main)] p-6 text-center relative overflow-hidden">
    <div className="bg-noise"></div>
    <div className="w-24 h-24 bg-[var(--accent-color)]/20 rounded-full flex items-center justify-center mb-8 animate-pulse relative z-10">
      <AlertTriangle size={48} className="text-[var(--accent-color)]" />
    </div>
    <h1 className="text-4xl font-bold mb-4 relative z-10">{title || "Site en Maintenance"}</h1>
    <p className="text-[var(--text-secondary)] max-w-lg mb-8 relative z-10">{message || "Mise à jour en cours..."}</p>
  </div>
);

const AppContent = () => {
  usePageTitle();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [clientSpaceOpen, setClientSpaceOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [notificationCount, setNotificationCount] = useState(0);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState<any>({}); 
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();

  const updateNotifications = () => {
    const notifs = mockDB.getNotifications();
    setNotificationCount(notifs.filter((n: any) => !n.read).length);
  };

  useEffect(() => {
    mockDB.init();
    const settings = mockDB.getSettings();
    setMaintenanceMode(settings.maintenanceMode === true);
    setMaintenanceData({ title: settings.maintenanceTitle, message: settings.maintenanceMessage });
    updateNotifications();
    window.addEventListener('mgs_db_update', updateNotifications);
    window.addEventListener('open-ai-chat', () => setIsChatOpen(true));
    return () => {
      window.removeEventListener('mgs_db_update', updateNotifications);
      window.removeEventListener('open-ai-chat', () => setIsChatOpen(true));
    };
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {maintenanceMode && !isAdminRoute ? (
            <MaintenanceScreen title={maintenanceData.title} message={maintenanceData.message} />
          ) : (
            <div className="font-sans text-[var(--text-main)] antialiased selection:bg-[var(--accent-color)] selection:text-[var(--bg-primary)]">
              <ScrollToTop />
              {!isAdminRoute && <ScrollProgress />}
              <CustomCursor />
              {!isAdminRoute && <FloatingIdentity />} 
              <div className="bg-noise"></div>

              <div className={`${!isAdminRoute ? 'bg-[var(--bg-primary)] min-h-screen transition-[background-color,color] duration-500 ease-in-out flex flex-col' : ''}`}>
                
                {!isAdminRoute && (
                  <Navbar 
                    onOpenAuth={() => setAuthModalOpen(true)}
                    onOpenClientSpace={() => setClientSpaceOpen(true)}
                    notificationCount={notificationCount}
                  />
                )}
                
                <div className={!isAdminRoute ? "flex-grow" : ""}>
                  <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<PageTransition><Hero /><HomeExtras /></PageTransition>} />
                      <Route path="/about" element={<PageTransition><div className="pt-20 min-h-screen"><About /></div></PageTransition>} />
                      <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
                      <Route path="/portfolio" element={<PageTransition><div className="min-h-screen"><Portfolio /></div></PageTransition>} />
                      <Route path="/team" element={<PageTransition><div className="pt-32 min-h-screen"><Team /></div></PageTransition>} />
                      <Route path="/contact" element={<PageTransition><div className="pt-20 min-h-screen"><Contact /></div></PageTransition>} />
                      <Route path="/devis" element={<PageTransition><QuotePage /></PageTransition>} />
                      <Route path="/careers" element={<PageTransition><CareerPage /></PageTransition>} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
                      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                    </Routes>
                  </AnimatePresence>
                </div>

                {!isAdminRoute && !isHomePage && <CommonSections />}
                {!isAdminRoute && <Footer />}
                
                {/* Centre d'Action Flottant Vertical */}
                {!isAdminRoute && (
                  <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-center gap-3">
                     <ClientWidget onOpenClientSpace={() => setClientSpaceOpen(true)} notificationCount={notificationCount} />
                     <SpeedDial onOpenChat={() => setIsChatOpen(true)} />
                  </div>
                )}
                
                {!isAdminRoute && isChatOpen && <ChatBot isOpen={true} onClose={() => setIsChatOpen(false)} />}
                <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                <ClientSpace isOpen={clientSpaceOpen} onClose={() => setClientSpaceOpen(false)} userQuotes={[]} onClearNotifications={updateNotifications} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <PreferencesProvider>
      <AdminProvider>
        <LanguageProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </LanguageProvider>
      </AdminProvider>
    </PreferencesProvider>
  </ThemeProvider>
);

export default App;
