'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';
import AdminLogin from '@/components/admin/AdminLogin';

/**
 * Component Tasks:
 * - [x] Corriger les erreurs de type strict (null checks) dans `AdminModules.tsx`, `AdminPanel.tsx` et `PageBuilder.tsx`.
 * - [x] Corriger les erreurs de type dans `Tour.tsx`, `WorldGlobe.tsx`, `ProjectCalculator.tsx`, `NeuralBackground.tsx`.
 * - [x] Résoudre les erreurs de compilation du backend (Prisma `UserStatus`).
 * - [x] Vérifier le build complet du monorepo.
 */

export default function AdminLayout() {
  const { isAuthenticated } = useAdmin();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminPanel />;
}
