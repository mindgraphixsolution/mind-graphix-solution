/**
 * ============================================================================
 * 🔗 SERVICE API CLIENT - Gestion des requêtes HTTP
 * ============================================================================
 * 
 * Service centralisé pour toutes les requêtes vers le backend
 * Gère automatiquement:
 * - Les tokens JWT
 * - Les errors
 * - Les retries
 * - Les timeouts
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT, RETRY_CONFIG } from './config';

/**
 * Interface pour les options de requête personnalisées
 */
interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

/**
 * Interface pour la réponse API
 */
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Récupérer le token JWT depuis le stockage
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  /**
   * Sauvegarder les tokens après authentification
   */
  private saveTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      // Stockage dans les cookies pour le middleware (Expire dans 15 min pour access, 7 jours pour refresh)
      document.cookie = `accessToken=${accessToken}; path=/; max-age=900; SameSite=Lax`;
      
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
      }
    }
  }

  /**
   * Supprimer les tokens lors de la déconnexion
   */
  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Suppression des cookies
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  /**
   * Construire les en-têtes avec authentification
   */
  private getHeaders(headers?: HeadersInit): Headers {
    const finalHeaders = new Headers({
      ...DEFAULT_HEADERS,
      ...headers,
    });

    const token = this.getAuthToken();
    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`);
    }

    return finalHeaders;
  }

  /**
   * Effectuer une requête HTTP avec gestion des erreurs et retries
   */
  private async request<T = any>(
    url: string,
    options: ApiRequestOptions = {},
    retryCount: number = 0,
  ): Promise<ApiResponse<T>> {
    const timeout = options.timeout || REQUEST_TIMEOUT;
    const maxRetries = options.retries || RETRY_CONFIG.maxRetries;

    try {
      // Créer un contrôleur d'abort pour le timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: this.getHeaders(options.headers),
        signal: controller.signal,
      });

      // Gérer le timeout et la réponse
      clearTimeout(timeoutId);

      // Lire le texte de la réponse pour éviter les erreurs de parsing JSON sur corps vide
      const text = await response.text();
      let data: any = {};
      
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error(`Erreur de parsing JSON sur ${url}:`, text);
          data = { message: text };
        }
      }

      if (!response.ok) {
        // Gérer les erreurs d'authentification
        if (response.status === 401) {
          this.clearTokens();
          // Rediriger vers la page de connexion
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        return {
          success: false,
          error: data.message || `Erreur ${response.status}`,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data,
        statusCode: response.status,
      };
    } catch (error: any) {
      // Retry en cas d'erreur réseau
      if (retryCount < maxRetries && error.name !== 'AbortError') {
        const delay = RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.request<T>(url, options, retryCount + 1);
      }

      return {
        success: false,
        error: error.message || 'Erreur de connexion au serveur',
      };
    }
  }

  /**
   * Requête GET
   */
  async get<T = any>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Requête POST
   */
  async post<T = any>(
    url: string,
    body?: any,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Requête PUT
   */
  async put<T = any>(
    url: string,
    body?: any,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Requête DELETE
   */
  async delete<T = any>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * Sauvegarder l'authentification après connexion
   */
  setAuthentication(accessToken: string, refreshToken?: string): void {
    this.saveTokens(accessToken, refreshToken);
  }

  /**
   * Supprimer l'authentification lors de la déconnexion
   */
  clearAuthentication(): void {
    this.clearTokens();
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }
}

// Instance unique du client API
export const apiClient = new ApiClient();

export default ApiClient;
