'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { ADMIN_CREDENTIALS } from '../lib/adminConfig';
import { mockDB } from '../utils/mockDatabase';

type LoginStatus = 'success' | '2fa_required' | 'failed';

interface AdminContextType {
  isAuthenticated: boolean;
  is2FARequired: boolean;
  login: (email: string, pass: string) => LoginStatus;
  verify2FA: (code: string) => boolean;
  loginWithSSO: (provider: string) => Promise<boolean>;
  logout: () => void;
  adminUser: any | null; 
  can: (action: string, resource: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children?: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [is2FARequired, setIs2FARequired] = useState(false);
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [delegations, setDelegations] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  const lastActivityRef = React.useRef(Date.now());

  useEffect(() => {
    setMounted(true);
    mockDB.init();
    setRoles(mockDB.getRoles());
    setDelegations(mockDB.getDelegations());

    const session = localStorage.getItem('mgs_admin_session');
    if (session === 'true') {
      const storedUser = localStorage.getItem('mgs_admin_user');
      if (storedUser) {
        setIsAuthenticated(true);
        setAdminUser(JSON.parse(storedUser));
      }
      lastActivityRef.current = Date.now();
    }
  }, []);

  const can = useCallback((action: string, resource: string) => {
    if (!adminUser) return false;
    let activeRoleId = adminUser.roleId || 'super_admin';
    const now = new Date();
    const activeDelegation = delegations.find(d => 
      d.toUser === adminUser.id && 
      d.active && 
      new Date(d.startDate) <= now && 
      new Date(d.endDate) >= now
    );

    if (activeDelegation) {
      activeRoleId = activeDelegation.roleId;
    }

    const role = roles.find(r => r.id === activeRoleId);
    if (!role) return false;
    if (role.permissions.includes('*')) return true;

    const specificPerm = `${resource}:${action}`;
    const wildPerm = `${resource}:*`;
    const globalWild = `*:${action}`; 

    return role.permissions.includes(specificPerm) || 
           role.permissions.includes(wildPerm) || 
           role.permissions.includes(globalWild);
  }, [adminUser, delegations, roles]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const securityConfig = mockDB.getSecurityConfig();
    const timeoutMs = (securityConfig.sessionTimeout || 30) * 60 * 1000;

    const checkSession = () => {
      const now = Date.now();
      const elapsed = now - lastActivityRef.current;
      if (elapsed > timeoutMs) {
        logout();
      }
    };

    const interval = setInterval(checkSession, 60000);
    const updateActivity = () => { lastActivityRef.current = Date.now(); };
    
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, [isAuthenticated]);

  const login = (email: string, pass: string): LoginStatus => {
    const users = mockDB.getUsers();
    // Recherche dans la DB locale d'abord
    const localUser = users.find((u:any) => u.email.toLowerCase() === email.toLowerCase());
    
    // Vérification des identifiants (Local DB ou Config statique)
    const isValidConfig = email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() && pass === ADMIN_CREDENTIALS.password;
    const isValidLocal = localUser && pass === "admin"; // Dans un vrai système, le mot de passe serait haché en DB

    if (isValidConfig || isValidLocal) {
      const securityConfig = mockDB.getSecurityConfig();
      const userObj = localUser 
        ? { ...localUser, roleId: localUser.role } 
        : { ...ADMIN_CREDENTIALS, id: 'usr_1', roleId: 'super_admin' };

      if (securityConfig.require2FA) {
        setAdminUser(userObj); 
        setIs2FARequired(true);
        return '2fa_required';
      } else {
        finalizeLogin(userObj, 'Password');
        return 'success';
      }
    }
    
    mockDB.logAudit('Login Failed', email, 'Password', 'warning');
    return 'failed';
  };

  const verify2FA = (code: string) => {
    if (code === '123456') { 
      setIs2FARequired(false);
      finalizeLogin(adminUser, '2FA');
      return true;
    }
    return false;
  };

  const loginWithSSO = async (provider: string) => {
    await new Promise(r => setTimeout(r, 1500));
    const ssoUser = { id: 'usr_sso', name: 'SSO User', email: 'sso@mindgraphix.com', roleId: 'editor' };
    finalizeLogin(ssoUser, `SSO (${provider})`);
    return true;
  };

  const finalizeLogin = (user: any, method: string) => {
    setIsAuthenticated(true);
    setAdminUser(user);
    localStorage.setItem('mgs_admin_session', 'true');
    localStorage.setItem('mgs_admin_user', JSON.stringify(user));
    lastActivityRef.current = Date.now();
    mockDB.logAudit('Login Success', user.email, method, 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIs2FARequired(false);
    setAdminUser(null);
    localStorage.removeItem('mgs_admin_session');
    localStorage.removeItem('mgs_admin_user');
    mockDB.logAudit('Logout', adminUser?.email || 'Unknown', 'Session');
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      is2FARequired, 
      login, 
      verify2FA, 
      loginWithSSO, 
      logout, 
      adminUser, 
      can 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

