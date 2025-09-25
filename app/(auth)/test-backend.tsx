import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginMutation } from '../src/api/endpoints/authApi';

// Componente simple para probar la conexión con el backend
export default function TestBackendScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleTestLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor ingresa DNI y contraseña');
      return;
    }

    try {
      console.log('🧪 Probando conexión con backend...');
      console.log('URL del backend: http://localhost:5000/api/v1/auth/login');
      console.log('Credenciales:', { dni, password: '***' });

      const result = await login({
        dni: dni.trim(),
        password: password.trim(),
      }).unwrap();

      Alert.alert(
        '✅ ¡Conexión Exitosa!',
        `Usuario: ${result.user.nombres} ${result.user.apellidos_paterno}\nRol: ${result.user.rol}\nSede: ${result.user.sede?.nombre || 'No asignada'}`,
        [{ text: 'OK' }]
      );

      console.log('✅ Respuesta del backend:', result);
    } catch (error: any) {
      console.error('❌ Error de conexión:', error);
      
      let errorMessage = 'Error desconocido';
      
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en localhost:5000';
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert(
        '❌ Error de Conexión',
        `${errorMessage}\n\nCódigo: ${error.status || 'N/A'}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Prueba de Conexión con Backend</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración:</Text>
        <Text style={styles.infoText}>
          • Backend URL: http://localhost:5000/api/v1{'\n'}
          • Endpoint: /auth/login{'\n'}
          • Método: POST{'\n'}
          • Headers: Content-Type: application/json
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credenciales de Prueba:</Text>
        
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
          style={[styles.button, isLoading ? styles.buttonDisabled : styles.buttonActive]}
          onPress={handleTestLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '🔄 Probando...' : '🚀 Probar Conexión'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Instrucciones:</Text>
        <Text style={styles.infoText}>
          1. Asegúrate de que tu backend NestJS esté ejecutándose{'\n'}
          2. Verifica que el puerto 5000 esté disponible{'\n'}
          3. Usa credenciales que existan en tu base de datos{'\n'}
          4. Revisa la consola para logs detallados
        </Text>
      </View>
    </ScrollView>
  );
}

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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
