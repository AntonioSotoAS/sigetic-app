import { baseApi } from '../baseApi';

// Tipos para proyectos
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  startDate: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive' | 'completed';
  startDate?: string;
  endDate?: string;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Endpoint de proyectos
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener todos los proyectos
    getProjects: builder.query<ProjectsResponse, { page?: number; limit?: number; status?: string }>({
      query: ({ page = 1, limit = 10, status }) => ({
        url: '/projects',
        params: { page, limit, status },
      }),
      providesTags: ['Project'],
    }),

    // Obtener proyecto por ID
    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),

    // Crear proyecto
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),

    // Actualizar proyecto
    updateProject: builder.mutation<Project, { id: string; data: UpdateProjectRequest }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),

    // Eliminar proyecto
    deleteProject: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
