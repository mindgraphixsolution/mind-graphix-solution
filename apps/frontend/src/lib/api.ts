/**
 * ============================================================================
 * 🔌 API INTERFACE - Point d'entrée unique pour le Frontend
 * ============================================================================
 * 
 * Cette interface unifie l'ancien système monolithique avec la nouvelle
 * architecture modulaire basée sur ApiClient.
 * 
 * Elle gère automatiquement:
 * - Le basculement vers les données mockées en cas d'erreur
 * - La communication avec le backend via ApiClient
 * - La typage des réponses
 * 
 * @author Mind Graphix Premium
 * @version 1.1.0
 */

import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/config';
import { MOCK_DATA } from './mockData';

/**
 * Helper pour récupérer les données mockées selon l'endpoint
 */
function getFallbackData(endpoint: string) {
  if (endpoint.includes('/content/hero')) return MOCK_DATA.hero;
  if (endpoint.includes('/content/stats')) return MOCK_DATA.stats;
  if (endpoint.includes('/content/services')) return MOCK_DATA.services;
  if (endpoint.includes('/content/portfolio')) return MOCK_DATA.portfolio;
  if (endpoint.includes('/content/testimonials')) return MOCK_DATA.testimonials;
  if (endpoint.includes('/content/team')) return MOCK_DATA.team;
  if (endpoint.includes('/content/faqs')) return MOCK_DATA.faqs;
  if (endpoint.includes('/content/partners')) return MOCK_DATA.partners;
  if (endpoint.includes('/content/blog')) return MOCK_DATA.blog;
  return null;
}

/**
 * Wrapper de requête avec fallback automatique
 */
async function apiCallWithFallback<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: any): Promise<T> {
  try {
    const response = await (method === 'GET' 
      ? apiClient.get<T>(endpoint) 
      : method === 'POST' 
      ? apiClient.post<T>(endpoint, body)
      : method === 'PUT'
      ? apiClient.put<T>(endpoint, body)
      : apiClient.delete<T>(endpoint));

    if (response.success && response.data) {
      return response.data;
    }

    console.warn(`API Warning for ${endpoint}: ${response.error}. Using mock data.`);
    return getFallbackData(endpoint) as unknown as T;
  } catch (error) {
    console.error(`API Fatal Error for ${endpoint}:`, error);
    return getFallbackData(endpoint) as unknown as T;
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiCallWithFallback(API_ENDPOINTS.AUTH.LOGIN, 'POST', { email, password }),

  logout: () =>
    apiCallWithFallback(API_ENDPOINTS.AUTH.LOGOUT, 'POST'),

  getCurrentUser: () =>
    apiCallWithFallback(`${API_ENDPOINTS.USERS.LIST}/me`, 'GET'),

  // Pages/CMS
  getPages: () =>
    apiCallWithFallback(API_ENDPOINTS.PAGES.LIST, 'GET'),

  getPage: (id: string) =>
    apiCallWithFallback(API_ENDPOINTS.PAGES.GET(id), 'GET'),

  createPage: (data: any) =>
    apiCallWithFallback(API_ENDPOINTS.PAGES.CREATE, 'POST', data),

  updatePage: (id: string, data: any) =>
    apiCallWithFallback(API_ENDPOINTS.PAGES.UPDATE(id), 'PUT', data),

  deletePage: (id: string) =>
    apiCallWithFallback(API_ENDPOINTS.PAGES.DELETE(id), 'DELETE'),

  // Settings
  getSettings: () =>
    apiCallWithFallback(API_ENDPOINTS.SETTINGS.GET_SITE_CONFIG, 'GET'),

  updateSettings: (data: any) =>
    apiCallWithFallback(API_ENDPOINTS.SETTINGS.UPDATE_SITE_CONFIG, 'PUT', data),

  // Media/Files
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    // On utilise fetch direct ici car apiClient gère le JSON par défaut
    const response = await fetch(`${apiClient['baseUrl']}${API_ENDPOINTS.MEDIA.CREATE}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.json();
  },

  // Users
  getUsers: () =>
    apiCallWithFallback(API_ENDPOINTS.USERS.LIST, 'GET'),

  createUser: (data: any) =>
    apiCallWithFallback(API_ENDPOINTS.USERS.CREATE, 'POST', data),

  updateUser: (id: string, data: any) =>
    apiCallWithFallback(API_ENDPOINTS.USERS.UPDATE(id), 'PUT', data),

  deleteUser: (id: string) =>
    apiCallWithFallback(API_ENDPOINTS.USERS.DELETE(id), 'DELETE'),

  // Content (Unified Endpoints)
  getHero: () => apiCallWithFallback<any>('/api/v1/content/hero'),
  getStats: () => apiCallWithFallback<any[]>('/api/v1/content/stats'),
  getServices: () => apiCallWithFallback<any[]>('/api/v1/content/services'),
  getTeam: () => apiCallWithFallback<any[]>('/api/v1/content/team'),
  getPortfolio: () => apiCallWithFallback<any[]>('/api/v1/content/portfolio'),
  getTestimonials: () => apiCallWithFallback<any[]>('/api/v1/content/testimonials'),
  submitTestimonial: (data: any) => apiCallWithFallback<any>('/api/v1/content/testimonials', 'POST', data),
  getFAQs: () => apiCallWithFallback<any[]>('/api/v1/content/faqs'),
  getPartners: () => apiCallWithFallback<any[]>('/api/v1/content/partners'),
  getBlogPosts: () => apiCallWithFallback<any[]>('/api/v1/content/blog'),
};
