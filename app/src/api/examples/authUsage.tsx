import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
    LoginRequest,
    useGetProfileQuery,
    useGetTokenQuery,
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useResetPasswordMutation,
} from '../endpoints/authApi';

// Componente de ejemplo para mostrar cómo usar la API de autenticación
export const AuthExample = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  // Hooks de la API
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [refreshToken, { isLoading: isRefreshing }] = useRefreshTokenMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  // Queries
  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();
  const { data: tokenData, isLoading: isLoadingToken } = useGetTokenQuery();

  // Función para hacer login
  const handleLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const loginData: LoginRequest = {
        dni: dni.trim(),
        password: password.trim(),
      };

      const result = await login(loginData).unwrap();
      
      Alert.alert(
        'Login Exitoso',
        `Bienvenido ${result.user.nombres} ${result.user.apellidos_paterno}`
      );
      
      console.log('Login exitoso:', result);
    } catch (error: any) {
      Alert.alert('Error de Login', error.data?.message || 'Error desconocido');
      console.error('Error en login:', error);
    }
  };

  // Función para hacer logout
  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      Alert.alert('Logout', result.message);
      console.log('Logout exitoso:', result);
    } catch (error: any) {
      Alert.alert('Error', error.data?.message || 'Error al cerrar sesión');
      console.error('Error en logout:', error);
    }
  };

  // Función para refrescar token
  const handleRefreshToken = async () => {
    try {
      const result = await refreshToken().unwrap();
      Alert.alert('Token Refrescado', 'El token se ha actualizado correctamente');
      console.log('Token refrescado:', result);
    } catch (error: any) {
      Alert.alert('Error', error.data?.message || 'Error al refrescar token');
      console.error('Error al refrescar token:', error);
    }
  };

  // Función para reset de contraseña (solo superadmin)
  const handleResetPassword = async () => {
    if (!dni) {
      Alert.alert('Error', 'Por favor ingresa el DNI');
      return;
    }

    try {
      const result = await resetPassword({ dni: dni.trim() }).unwrap();
      Alert.alert(
        'Contraseña Reseteada',
        `Nueva contraseña: ${result.newPassword}`
      );
      console.log('Contraseña reseteada:', result);
    } catch (error: any) {
      Alert.alert('Error', error.data?.message || 'Error al resetear contraseña');
      console.error('Error al resetear contraseña:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Ejemplo de Autenticación
      </Text>

      {/* Formulario de Login */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Login</Text>
        <TextInput
          placeholder="DNI (8 dígitos)"
          value={dni}
          onChangeText={setDni}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
          keyboardType="numeric"
          maxLength={8}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        />
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoggingIn}
          style={{
            backgroundColor: isLoggingIn ? '#ccc' : '#007AFF',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botones de acción */}
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={handleLogout}
          disabled={isLoggingOut}
          style={{
            backgroundColor: isLoggingOut ? '#ccc' : '#FF3B30',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRefreshToken}
          disabled={isRefreshing}
          style={{
            backgroundColor: isRefreshing ? '#ccc' : '#34C759',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isRefreshing ? 'Refrescando...' : 'Refrescar Token'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResetPassword}
          disabled={isResetting}
          style={{
            backgroundColor: isResetting ? '#ccc' : '#FF9500',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isResetting ? 'Reseteando...' : 'Resetear Contraseña'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      {isLoadingProfile ? (
        <Text>Cargando perfil...</Text>
      ) : profile?.success ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Perfil del Usuario:</Text>
          <Text>Nombre: {profile.user.nombres} {profile.user.apellidos_paterno}</Text>
          <Text>Email: {profile.user.correo}</Text>
          <Text>Rol: {profile.user.rol}</Text>
          <Text>Sede: {profile.user.sede?.nombre || 'No asignada'}</Text>
        </View>
      ) : null}

      {/* Información del token */}
      {isLoadingToken ? (
        <Text>Cargando token...</Text>
      ) : tokenData?.success ? (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Token:</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            {tokenData.token?.substring(0, 50)}...
          </Text>
        </View>
      ) : (
        <Text style={{ color: '#FF3B30' }}>
          {tokenData?.message || 'No hay token disponible'}
        </Text>
      )}
    </View>
  );
};
