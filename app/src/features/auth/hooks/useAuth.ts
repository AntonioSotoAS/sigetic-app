import { useAuth as useAuthContext } from '../../../shared/context/AuthContext';

// Hook personalizado que re-exporta el hook de autenticación
// Esto permite agregar lógica adicional específica para auth si es necesario
export const useAuth = () => {
  const auth = useAuthContext();
  
  // Aquí podrías agregar lógica adicional específica para autenticación
  // Por ejemplo: validaciones, transformaciones de datos, etc.
  
  return auth;
};
