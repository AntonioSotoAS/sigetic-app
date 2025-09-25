// Exportar todos los servicios y configuraciones
export { apiClient } from './client';
export { API_CONFIG } from './config';
export { AuthService } from './services/authService';
export { UserService } from './services/userService';

// Re-exportar tipos
export type { AuthResponse, LoginRequest, RegisterRequest, ResetPasswordRequest, User } from './services/authService';
export type { ChangePasswordRequest, UpdateProfileRequest } from './services/userService';

