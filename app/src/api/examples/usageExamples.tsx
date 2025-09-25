import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import {
    useCreateProjectMutation,
    useCreateTicketMutation,
    useGetProjectsQuery,
    useGetTicketsQuery
} from '../endpoints';
import { AuthExample } from './authUsage';
import { LoginTest } from './loginTest';

// Ejemplo de uso de tickets
export const TicketsExample = () => {
  const { data: tickets, isLoading } = useGetTicketsQuery({ page: 1, limit: 10 });
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();

  const handleCreateTicket = async () => {
    try {
      await createTicket({
        title: 'Nuevo ticket',
        description: 'Descripción del ticket',
        priority: 'medium'
      }).unwrap();
      Alert.alert('Éxito', 'Ticket creado correctamente');
    } catch {
      Alert.alert('Error', 'No se pudo crear el ticket');
    }
  };

  if (isLoading) return <Text>Cargando tickets...</Text>;

  return (
    <View>
      <Text>Tickets:</Text>
      {tickets?.tickets.map(ticket => (
        <Text key={ticket.id}>{ticket.title}</Text>
      ))}
      
      <TouchableOpacity onPress={handleCreateTicket} disabled={isCreating}>
        <Text>{isCreating ? 'Creando...' : 'Ticket'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Ejemplo de uso de proyectos
export const ProjectsExample = () => {
  const { data: projects, isLoading } = useGetProjectsQuery({ page: 1, limit: 10 });
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  const handleCreateProject = async () => {
    try {
      await createProject({
        name: 'Nuevo proyecto',
        description: 'Descripción del proyecto',
        startDate: new Date().toISOString()
      }).unwrap();
      Alert.alert('Éxito', 'Proyecto creado correctamente');
    } catch {
      Alert.alert('Error', 'No se pudo crear el proyecto');
    }
  };

  if (isLoading) return <Text>Cargando proyectos...</Text>;

  return (
    <View>
      <Text>Proyectos:</Text>
      {projects?.projects.map(project => (
        <Text key={project.id}>{project.name}</Text>
      ))}
      
      <TouchableOpacity onPress={handleCreateProject} disabled={isCreating}>
        <Text>{isCreating ? 'Creando...' : 'Crear Proyecto'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Exportar también los ejemplos de autenticación
export { AuthExample, LoginTest };
