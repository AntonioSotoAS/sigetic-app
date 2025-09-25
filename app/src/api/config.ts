// Configuración base de la API
export const API_CONFIG = {
  // URL del backend - usa variable de entorno si está disponible
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://apisoporteti.cortedelsanta.com/api/v1',
  
  // Configuración de timeouts
  TIMEOUT: 10000, // 10 segundos
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Tipos de respuesta comunes
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
