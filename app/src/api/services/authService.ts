import { apiClient } from '../client';

// Tipos para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Servicio de autenticación
export class AuthService {
  // Login
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    
    if (response.success && response.data.token) {
      // Guardar token en el cliente
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  // Registro
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      userData
    );
    
    if (response.success && response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Limpiar token local
      apiClient.clearAuthToken();
    }
  }

  // Recuperar contraseña
  static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      '/auth/reset-password',
      data
    );
    
    return response.data;
  }

  // Verificar token
  static async verifyToken(): Promise<User> {
    const response = await apiClient.get<User>(
      '/auth/verify'
    );
    
    return response.data;
  }

  // Refrescar token
  static async refreshToken(): Promise<{ token: string }> {
    const response = await apiClient.post<{ token: string }>(
      '/auth/refresh'
    );
    
    if (response.success && response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }
}
