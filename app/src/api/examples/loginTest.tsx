import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginMutation } from '../endpoints/authApi';

// Componente para probar el login con diferentes credenciales
export const LoginTest = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  // Credenciales de prueba (puedes cambiar estos valores)
  const testCredentials = {
    correct: { dni: '12345678', password: 'password123' },
    incorrect: { dni: '87654321', password: 'wrongpass' },
    invalidDni: { dni: '123', password: 'password123' },
    empty: { dni: '', password: '' }
  };

  const handleLogin = async (credentials: { dni: string; password: string }) => {
    try {
      console.log('🔐 Intentando login con:', credentials);
      
      const result = await login(credentials).unwrap();
      
      Alert.alert(
        '✅ Login Exitoso',
        `Usuario: ${result.user.nombres} ${result.user.apellidos_paterno}\nRol: ${result.user.rol}\nSede: ${result.user.sede?.nombre || 'No asignada'}`,
        [{ text: 'OK' }]
      );
      
      console.log('✅ Login exitoso:', result);
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      
      const errorMessage = error.data?.message || error.message || 'Error desconocido';
      
      Alert.alert(
        '❌ Error de Login',
        `Mensaje: ${errorMessage}\n\nCódigo: ${error.status || 'N/A'}`,
        [{ text: 'OK' }]
      );
    }
  };

  const testCorrectCredentials = () => {
    handleLogin(testCredentials.correct);
  };

  const testIncorrectCredentials = () => {
    handleLogin(testCredentials.incorrect);
  };

  const testInvalidDni = () => {
    handleLogin(testCredentials.invalidDni);
  };

  const testEmptyFields = () => {
    handleLogin(testCredentials.empty);
  };

  const testCustomCredentials = () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor ingresa DNI y contraseña');
      return;
    }
    handleLogin({ dni, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Pruebas de Login</Text>
      
      {/* Credenciales predefinidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pruebas Automáticas:</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={testCorrectCredentials}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            ✅ Probar Credenciales Correctas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.errorButton]}
          onPress={testIncorrectCredentials}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            ❌ Probar Credenciales Incorrectas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.warningButton]}
          onPress={testInvalidDni}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            ⚠️ Probar DNI Inválido (3 dígitos)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={testEmptyFields}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            📝 Probar Campos Vacíos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Credenciales personalizadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prueba Personalizada:</Text>
        
        <TextInput
          style={styles.input}
          placeholder="DNI (8 dígitos)"
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
          maxLength={8}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={testCustomCredentials}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '🔄 Probando...' : '🚀 Probar Credenciales Personalizadas'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información de debug */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Información:</Text>
        <Text style={styles.infoText}>
          • Revisa la consola para logs detallados{'\n'}
          • Las credenciales correctas deben existir en tu base de datos{'\n'}
          • El backend debe estar ejecutándose en localhost:5000{'\n'}
          • Verifica la configuración CORS del backend
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  errorButton: {
    backgroundColor: '#EF4444',
  },
  warningButton: {
    backgroundColor: '#F59E0B',
  },
  infoButton: {
    backgroundColor: '#3B82F6',
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
