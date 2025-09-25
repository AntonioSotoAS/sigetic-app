import { API_CONFIG, ApiResponse } from './config';

// Cliente HTTP personalizado
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
  }

  // Método para hacer peticiones GET
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, headers);
  }

  // Método para hacer peticiones POST
  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, headers);
  }

  // Método para hacer peticiones PUT
  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, headers);
  }

  // Método para hacer peticiones DELETE
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, headers);
  }

  // Método base para todas las peticiones
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...customHeaders };

    // Agregar token de autenticación si existe
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Error ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Obtener token de autenticación (puedes implementar tu lógica aquí)
  private getAuthToken(): string | null {
    // Aquí puedes obtener el token del AsyncStorage o del estado de Redux
    // Por ahora retornamos null, pero puedes implementar la lógica
    return null;
  }

  // Método para establecer el token de autenticación
  setAuthToken(token: string): void {
    // Aquí puedes guardar el token en AsyncStorage
    // AsyncStorage.setItem('authToken', token);
  }

  // Método para limpiar el token
  clearAuthToken(): void {
    // AsyncStorage.removeItem('authToken');
  }
}

// Instancia única del cliente
export const apiClient = new ApiClient();
