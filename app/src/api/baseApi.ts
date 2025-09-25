import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from './config';

// Base API con RTK Query y logging detallado
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: 'include', // Incluir cookies automáticamente
    prepareHeaders: (headers, { getState }) => {
      // Obtener token del estado de Redux (opcional, ya que usamos cookies)
      const token = (getState() as any).auth?.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      // Headers por defecto
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      // Headers adicionales para CORS
      headers.set('x-requested-with', 'XMLHttpRequest');
      
      return headers;
    },
  }),
  tagTypes: ['User', 'Auth', 'Ticket', 'Project'],
  endpoints: () => ({}),
});
