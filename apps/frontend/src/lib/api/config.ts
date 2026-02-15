/**
 * ============================================================================
 * 🔌 CONFIGURATION API - Frontend/Backend Communication
 * ============================================================================
 * 
 * Configuration centralisée pour communiquer avec le backend NestJS
 * 
 * Utilisation:
 * - Import dans les services API
 * - Endpoints pré-configurés
 * - Gestion automatique des tokens JWT
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

/**
 * URL de base du serveur API backend
 * En développement: http://localhost:3001
 * En production: https://api.mindgraphix.com
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : `https://api.${process.env.NEXT_PUBLIC_DOMAIN || 'mindgraphix.com'}`);

/**
 * Version de l'API utilisée
 * Route finale: /api/v1/...
 */
export const API_VERSION = 'v1';

/**
 * Endpoints de l'API organisés par module
 */
export const API_ENDPOINTS = {
  // ========================================================================
  // AUTHENTIFICATION
  // ========================================================================
  AUTH: {
    REGISTER: `/api/${API_VERSION}/auth/register`,
    LOGIN: `/api/${API_VERSION}/auth/login`,
    LOGOUT: `/api/${API_VERSION}/auth/logout`,
    REFRESH: `/api/${API_VERSION}/auth/refresh`,
  },

  // ========================================================================
  // UTILISATEURS
  // ========================================================================
  USERS: {
    CREATE: `/api/${API_VERSION}/users`,
    LIST: `/api/${API_VERSION}/users`,
    GET: (id: string) => `/api/${API_VERSION}/users/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/users/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/users/${id}`,
  },

  // ========================================================================
  // PAGES (CMS)
  // ========================================================================
  PAGES: {
    CREATE: `/api/${API_VERSION}/pages`,
    LIST: `/api/${API_VERSION}/pages`,
    GET_BY_SLUG: (slug: string) => `/api/${API_VERSION}/pages/slug/${slug}`,
    GET: (id: string) => `/api/${API_VERSION}/pages/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/pages/${id}`,
    PUBLISH: (id: string) => `/api/${API_VERSION}/pages/${id}/publish`,
    DELETE: (id: string) => `/api/${API_VERSION}/pages/${id}`,
  },

  // ========================================================================
  // MÉDIAS
  // ========================================================================
  MEDIA: {
    CREATE: `/api/${API_VERSION}/media`,
    LIST: `/api/${API_VERSION}/media`,
    SEARCH: `/api/${API_VERSION}/media/search`,
    GET: (id: string) => `/api/${API_VERSION}/media/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/media/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/media/${id}`,
  },

  // ========================================================================
  // PARAMÈTRES (Settings)
  // ========================================================================
  SETTINGS: {
    GET_SITE_CONFIG: `/api/${API_VERSION}/settings/site-config`,
    UPDATE_SITE_CONFIG: `/api/${API_VERSION}/settings/site-config`,
    GET_PUBLIC: `/api/${API_VERSION}/settings/public`,
  },

  // ========================================================================
  // SANTÉ (Health)
  // ========================================================================
  HEALTH: {
    CHECK: `/api/${API_VERSION}/health`,
    SERVER: '/health',
  },

  // ========================================================================
  // INTÉGRATIONS
  // ========================================================================
  INTEGRATIONS: {
    CREATE: `/api/${API_VERSION}/integrations`,
    LIST: `/api/${API_VERSION}/integrations`,
    GET: (id: string) => `/api/${API_VERSION}/integrations/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/integrations/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/integrations/${id}`,
    ACTIVATE: (id: string) => `/api/${API_VERSION}/integrations/${id}/activate`,
    DEACTIVATE: (id: string) => `/api/${API_VERSION}/integrations/${id}/deactivate`,
    GET_STATUS: (id: string) => `/api/${API_VERSION}/integrations/${id}/status`,
    GET_LOGS: (id: string) => `/api/${API_VERSION}/integrations/${id}/logs`,
  },
};

/**
 * Configuration des en-têtes HTTP par défaut
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * Configuration de retry pour les requêtes
 */
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 seconde
  backoffMultiplier: 2,
};

/**
 * Timeout pour les requêtes (en millisecondes)
 */
export const REQUEST_TIMEOUT = 30000; // 30 secondes
