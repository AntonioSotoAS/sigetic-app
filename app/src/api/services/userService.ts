import { apiClient } from '../client';
import { API_CONFIG } from '../config';
import { User } from './authService';

// Tipos para usuario
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Servicio de usuario
export class UserService {
  // Obtener perfil del usuario
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(
      API_CONFIG.ENDPOINTS.USER.PROFILE
    );
    
    return response.data;
  }

  // Actualizar perfil
  static async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await apiClient.put<User>(
      API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE,
      data
    );
    
    return response.data;
  }

  // Cambiar contraseña
  static async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD,
      data
    );
    
    return response.data;
  }
}
