import { baseApi } from '../baseApi';

// Tipos para autenticación basados en el backend NestJS
export interface LoginRequest {
  dni: string;
  password: string;
}

export interface ResetPasswordRequest {
  dni: string;
}

export interface Sede {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
}

export interface User {
  id: string;
  nombres: string;
  apellidos_paterno: string;
  apellidos_materno: string;
  correo: string;
  dni: string;
  telefono?: string;
  rol: string;
  sede?: Sede;
  cargo?: string;
  foto_perfil?: string;
  activo: boolean;
  password_resetada: boolean;
  sede_soporte?: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  access_token: string;
  refresh_token?: string;
  user: User;
}

export interface TokenResponse {
  success: boolean;
  message: string;
  token: string | null;
  user?: {
    id: string;
    rol: string;
    sedeId: string;
    correo: string;
  };
}

// Endpoint de autenticación
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => {
        console.log('🚀 ===== PETICIÓN LOGIN =====');
        console.log('📡 Método: POST');
        console.log('🌐 URL: /auth/login');
        console.log('📦 Datos:', credentials);
        console.log('🍪 Cookies: include');
        console.log('============================');
        
        return {
          url: '/auth/login',
          method: 'POST',
          body: credentials,
          credentials: 'include', // Incluir cookies en la petición
        };
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // Logout
    logout: builder.mutation<{ message: string; success: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Obtener perfil del usuario autenticado
    getProfile: builder.query<{ user: User; success: boolean }, void>({
      query: () => ({
        url: '/auth/perfil',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),

    // Obtener token desde cookies
    getToken: builder.query<TokenResponse, void>({
      query: () => ({
        url: '/auth/token',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),

    // Refrescar token
    refreshToken: builder.mutation<{ success: boolean; access_token: string; user: User }, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Reset de contraseña (solo superadmin)
    resetPassword: builder.mutation<{ message: string; success: boolean; newPassword: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useGetTokenQuery,
  useRefreshTokenMutation,
  useResetPasswordMutation,
} = authApi;
