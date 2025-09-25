import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginMutation } from '../src/api/endpoints/authApi';

// Componente para debugging detallado del login
export default function DebugLoginScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const [logs, setLogs] = useState<string[]>([]);

  // Función para agregar logs
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Limpiar logs
  const clearLogs = () => {
    setLogs([]);
  };

  const handleDebugLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor ingresa DNI y contraseña');
      return;
    }

    // Limpiar logs anteriores
    clearLogs();
    
    addLog('🚀 Iniciando proceso de login...');
    addLog(`📱 DNI: ${dni}`);
    addLog(`🔒 Password: ${'*'.repeat(password.length)}`);
    addLog(`🌐 URL: http://localhost:5000/api/v1/auth/login`);
    addLog(`⏰ Timestamp: ${new Date().toISOString()}`);

    try {
      addLog('📡 Enviando petición al backend...');
      
      const result = await login({
        dni: dni.trim(),
        password: password.trim(),
      }).unwrap();

      addLog('✅ Petición exitosa!');
      addLog(`👤 Usuario: ${result.user.nombres} ${result.user.apellidos_paterno}`);
      addLog(`🎭 Rol: ${result.user.rol}`);
      addLog(`🏢 Sede: ${result.user.sede?.nombre || 'No asignada'}`);
      addLog(`🔑 Token: ${result.access_token ? 'Recibido' : 'No recibido'}`);

      Alert.alert(
        '✅ Login Exitoso',
        `Usuario: ${result.user.nombres} ${result.user.apellidos_paterno}\nRol: ${result.user.rol}`,
        [{ text: 'OK' }]
      );

    } catch (error: any) {
      addLog('❌ Error en la petición');
      addLog(`🚨 Tipo: ${error.name || 'Unknown'}`);
      addLog(`📊 Status: ${error.status || 'N/A'}`);
      addLog(`💬 Mensaje: ${error.message || 'Sin mensaje'}`);
      addLog(`📦 Datos: ${JSON.stringify(error.data || {})}`);

      let errorMessage = 'Error desconocido';
      
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor';
        addLog('🔌 Error de conexión - Backend no disponible');
      } else if (error.data?.message) {
        errorMessage = error.data.message;
        addLog(`📝 Error del servidor: ${error.data.message}`);
      } else if (error.message) {
        errorMessage = error.message;
        addLog(`💬 Error de red: ${error.message}`);
      }

      Alert.alert(
        '❌ Error de Login',
        `${errorMessage}\n\nRevisa los logs para más detalles`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔍 Debug de Login</Text>
      
      {/* Información del sistema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Información del Sistema:</Text>
        <Text style={styles.infoText}>
          • Backend: http://localhost:5000/api/v1{'\n'}
          • Endpoint: /auth/login{'\n'}
          • Método: POST{'\n'}
          • Headers: Content-Type: application/json{'\n'}
          • Cookies: Incluidas automáticamente
        </Text>
      </View>

      {/* Formulario de prueba */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Prueba de Login:</Text>
        
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
          onPress={handleDebugLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '🔄 Probando...' : '🚀 Probar Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearLogs}
        >
          <Text style={styles.buttonText}>🗑️ Limpiar Logs</Text>
        </TouchableOpacity>
      </View>

      {/* Logs en tiempo real */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Logs en Tiempo Real:</Text>
        <View style={styles.logsContainer}>
          {logs.length === 0 ? (
            <Text style={styles.noLogsText}>No hay logs aún. Prueba hacer login.</Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </View>
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
    marginBottom: 10,
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
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
  logsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    maxHeight: 300,
  },
  noLogsText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  logText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
    fontFamily: 'monospace',
  },
});
