// Ejemplos de uso de la API
import { AuthService, UserService } from '../index';

// Ejemplo de login
export const loginExample = async () => {
  try {
    const result = await AuthService.login({
      email: 'usuario@ejemplo.com',
      password: 'contraseña123'
    });
    
    console.log('Login exitoso:', result);
    // El token se guarda automáticamente en el cliente
  } catch (error) {
    console.error('Error en login:', error);
  }
};

// Ejemplo de registro
export const registerExample = async () => {
  try {
    const result = await AuthService.register({
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      password: 'contraseña123'
    });
    
    console.log('Registro exitoso:', result);
  } catch (error) {
    console.error('Error en registro:', error);
  }
};

// Ejemplo de obtener perfil
export const getProfileExample = async () => {
  try {
    const profile = await UserService.getProfile();
    console.log('Perfil del usuario:', profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
  }
};

// Ejemplo de actualizar perfil
export const updateProfileExample = async () => {
  try {
    const updatedProfile = await UserService.updateProfile({
      name: 'Juan Carlos Pérez',
      email: 'juan.carlos@ejemplo.com'
    });
    
    console.log('Perfil actualizado:', updatedProfile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
  }
};
