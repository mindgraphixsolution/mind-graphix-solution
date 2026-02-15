'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { mockDB } from '@/utils/mockDatabase';

import dynamic from 'next/dynamic';

// Composants lourds - Importés dynamiquement
const AuthModal = dynamic(() => import('@/components/modals/AuthModal'), { ssr: false });
const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false });
const ClientSpace = dynamic(() => import('@/components/dashboard/ClientSpace'), { ssr: false });
const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false });

// Imports standards
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FloatingIdentity from '@/components/ui/FloatingIdentity';
import ClientWidget from '@/components/ui/ClientWidget';
import SpeedDial from '@/components/SpeedDial';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [clientSpaceOpen, setClientSpaceOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const isAdminRoute = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';

  const updateNotifications = () => {
    const notifs = mockDB.getNotifications();
    setNotificationCount(notifs.filter((n: any) => !n.read).length);
  };

  useEffect(() => {
    setMounted(true);
    mockDB.init();
    updateNotifications();
    
    // Désactiver le preloader après la première charge
    const hasLoaded = sessionStorage.getItem('app_loaded');
    if (hasLoaded) {
      setIsLoading(false);
    }

    window.addEventListener('mgs_db_update', updateNotifications);
    window.addEventListener('open-ai-chat', () => setIsChatOpen(true));
    return () => {
      window.removeEventListener('mgs_db_update', updateNotifications);
      window.removeEventListener('open-ai-chat', () => setIsChatOpen(true));
    };
  }, []);

  const handlePreloaderComplete = React.useCallback(() => {
    setIsLoading(false);
    sessionStorage.setItem('app_loaded', 'true');
  }, []);

  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="font-sans text-[var(--text-main)] antialiased">
          {!isAdminRoute && <ScrollProgress />}
          <CustomCursor />
          {!isAdminRoute && <FloatingIdentity />}
          <div className="bg-noise"></div>

          <div className={`${!isAdminRoute ? 'bg-[var(--bg-primary)] min-h-screen flex flex-col' : ''}`}>
            {!isAdminRoute && (
              <Navbar 
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenClientSpace={() => setClientSpaceOpen(true)}
                notificationCount={notificationCount}
              />
            )}

            <main className={!isAdminRoute ? "flex-grow" : ""}>
               {children}
            </main>

            {!isAdminRoute && <Footer />}

            {/* Float Action Center */}
            {!isAdminRoute && (
              <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-center gap-3">
                 {/* Bouton Assistance IA Uniquement */}
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
  );
}
