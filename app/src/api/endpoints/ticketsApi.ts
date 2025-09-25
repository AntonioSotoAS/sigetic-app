import { baseApi } from '../baseApi';

// Tipos para tickets
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
}

export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
}

export interface TicketsResponse {
  tickets: Ticket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Endpoint de tickets
export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener todos los tickets
    getTickets: builder.query<TicketsResponse, { page?: number; limit?: number; status?: string }>({
      query: ({ page = 1, limit = 10, status }) => ({
        url: '/tickets',
        params: { page, limit, status },
      }),
      providesTags: ['Ticket'],
    }),

    // Obtener ticket por ID
    getTicketById: builder.query<Ticket, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Ticket', id }],
    }),

    // Crear ticket
    createTicket: builder.mutation<Ticket, CreateTicketRequest>({
      query: (data) => ({
        url: '/tickets',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ticket'],
    }),

    // Actualizar ticket
    updateTicket: builder.mutation<Ticket, { id: string; data: UpdateTicketRequest }>({
      query: ({ id, data }) => ({
        url: `/tickets/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Ticket', id }],
    }),

    // Eliminar ticket
    deleteTicket: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ticket'],
    }),

    // Asignar ticket
    assignTicket: builder.mutation<Ticket, { id: string; assignedTo: string }>({
      query: ({ id, assignedTo }) => ({
        url: `/tickets/${id}/assign`,
        method: 'POST',
        body: { assignedTo },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Ticket', id }],
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useAssignTicketMutation,
} = ticketsApi;
