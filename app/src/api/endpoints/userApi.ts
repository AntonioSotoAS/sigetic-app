import { baseApi } from '../baseApi';

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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Endpoint de usuario
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener perfil del usuario
    getProfile: builder.query<User, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),

    // Actualizar perfil
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Cambiar contraseña
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (data) => ({
        url: '/user/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Subir avatar
    uploadAvatar: builder.mutation<{ avatar: string }, FormData>({
      query: (formData) => ({
        url: '/user/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
} = userApi;
