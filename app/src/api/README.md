# API Structure con RTK Query

Esta es la estructura de la API para la aplicación SIGETIC usando RTK Query, actualizada para trabajar con el backend NestJS.

## Estructura de Archivos

```
src/api/
├── baseApi.ts              # Base API con RTK Query
├── config.ts              # Configuración base
├── endpoints/
│   ├── authApi.ts         # Endpoints de autenticación
│   ├── userApi.ts         # Endpoints de usuario
│   ├── ticketsApi.ts      # Endpoints de tickets
│   ├── projectsApi.ts     # Endpoints de proyectos
│   └── index.ts           # Exportaciones de endpoints
├── examples/
│   ├── usageExamples.tsx  # Ejemplos de uso
│   └── authUsage.tsx      # Ejemplo específico de autenticación
└── README.md              # Esta documentación
```

## Configuración

### 1. Configurar la URL base

Edita `src/api/config.ts` y cambia la URL base:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api/v1', // URL del backend NestJS
  // ... resto de configuración
};
```

### 2. Configurar el store

El store ya está configurado en `src/store/index.ts`:

```typescript
import { baseApi } from '../api/baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
```

## Uso de Endpoints

### Autenticación

```typescript
import { 
  useLoginMutation, 
  useLogoutMutation, 
  useGetProfileQuery,
  useGetTokenQuery,
  useRefreshTokenMutation 
} from '@/api/endpoints';

function LoginScreen() {
  const [login, { isLoading }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery();
  const { data: tokenData } = useGetTokenQuery();
  
  const handleLogin = async () => {
    try {
      const result = await login({ 
        dni: '12345678', 
        password: 'password123' 
      }).unwrap();
      console.log('Login exitoso:', result.user);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };
}
```

### Tickets

```typescript
import { useGetTicketsQuery, useCreateTicketMutation } from '@/api/endpoints';

function TicketsScreen() {
  const { data: tickets, isLoading, error } = useGetTicketsQuery({ page: 1 });
  const [createTicket] = useCreateTicketMutation();
  
  const handleCreateTicket = async () => {
    try {
      await createTicket({
        title: 'Nuevo ticket',
        description: 'Descripción',
        priority: 'medium'
      }).unwrap();
    } catch (error) {
      // Manejar error
    }
  };
}
```

### Proyectos

```typescript
import { useGetProjectsQuery, useCreateProjectMutation } from '@/api/endpoints';

function ProjectsScreen() {
  const { data: projects, isLoading } = useGetProjectsQuery({ page: 1 });
  const [createProject] = useCreateProjectMutation();
  
  // Usar datos y mutaciones
}
```

## Ventajas de RTK Query

1. **Caché automático**: Los datos se cachean automáticamente
2. **Refetch automático**: Se actualizan cuando es necesario
3. **Loading states**: Estados de carga automáticos
4. **Error handling**: Manejo de errores integrado
5. **Optimistic updates**: Actualizaciones optimistas
6. **Invalidación de caché**: Se invalida automáticamente

## Agregar Nuevos Endpoints

### 1. Crear el archivo del endpoint

```typescript
// src/api/endpoints/notificationsApi.ts
import { baseApi } from '../baseApi';

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      providesTags: ['Notification'],
    }),
    
    markAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} = notificationsApi;
```

### 2. Exportar en el índice

```typescript
// src/api/endpoints/index.ts
export * from './notificationsApi';
```

### 3. Usar en componentes

```typescript
import { useGetNotificationsQuery } from '@/api/endpoints';

function NotificationsScreen() {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  
  // Usar datos
}
```

## Ejemplos Completos

Revisa `examples/usageExamples.tsx` para ver ejemplos completos de uso de todos los endpoints.

## Configuración del Backend

Asegúrate de que tu backend NestJS tenga los siguientes endpoints configurados con CORS:

### Endpoints de Autenticación
- `POST /api/v1/auth/login` - Login con DNI y contraseña
- `POST /api/v1/auth/logout` - Cerrar sesión
- `GET /api/v1/auth/perfil` - Obtener perfil del usuario autenticado
- `GET /api/v1/auth/token` - Obtener token desde cookies
- `POST /api/v1/auth/refresh` - Refrescar token
- `POST /api/v1/auth/reset-password` - Reset de contraseña (solo superadmin)

### Configuración CORS del Backend
El backend debe tener CORS configurado para permitir:
- Origin: `http://localhost:3000`, `http://localhost:5173`, `http://localhost:4173`
- Credentials: `true`
- Headers: `Content-Type`, `Authorization`, `x-user-id`, etc.

### Autenticación con Cookies
La API está configurada para usar cookies httpOnly para la autenticación, lo que proporciona mayor seguridad que los tokens en localStorage.

## Cambios Realizados

### 1. Tipos de Datos Actualizados
- Cambio de `email` a `dni` para el login
- Estructura de usuario actualizada con campos del backend
- Nuevos tipos para manejar respuestas del backend

### 2. Endpoints Actualizados
- Soporte para cookies con `credentials: 'include'`
- Endpoints que coinciden con el backend NestJS
- Manejo correcto de respuestas del backend

### 3. Configuración de API
- URL base actualizada a `http://localhost:5000/api/v1`
- Headers CORS configurados
- Soporte automático para cookies

### 4. Ejemplos de Uso
- Nuevo componente `AuthExample` con ejemplos completos
- Manejo de errores y estados de carga
- Integración con todos los endpoints de autenticación