import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipos para el usuario y autenticación
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si el usuario está autenticado al cargar la app
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Aquí verificarías si hay un token válido guardado
      // Por ejemplo: const token = await AsyncStorage.getItem('authToken');
      // if (token) { const userData = await validateToken(token); setUser(userData); }
      
      // Por ahora simulamos que no hay usuario autenticado
      setUser(null);
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Aquí iría tu lógica de login
      // const response = await authService.login(email, password);
      // const userData = response.user;
      // await AsyncStorage.setItem('authToken', response.token);
      
      // Simulación de login exitoso
      const userData: User = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
        avatar: 'https://via.placeholder.com/150'
      };
      
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Aquí iría tu lógica de registro
      // const response = await authService.register(userData);
      // const newUser = response.user;
      // await AsyncStorage.setItem('authToken', response.token);
      
      // Simulación de registro exitoso
      const newUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        avatar: 'https://via.placeholder.com/150'
      };
      
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Aquí irías tu lógica de logout
      // await AsyncStorage.removeItem('authToken');
      // await authService.logout();
      
      setUser(null);
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Aquí iría tu lógica de recuperación de contraseña
      // await authService.resetPassword(email);
      
      // Simulación de envío de email
      console.log('Email de recuperación enviado a:', email);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
