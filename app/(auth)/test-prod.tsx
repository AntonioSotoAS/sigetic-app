import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginMutation } from '../src/api/endpoints/authApi';

// Componente para probar el login con el backend de producción
export default function TestProdScreen() {
  const [dni, setDni] = useState('99887766');
  const [password, setPassword] = useState('123456');
  const [login, { isLoading }] = useLoginMutation();

  const handleTestLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor ingresa DNI y contraseña');
      return;
    }

    try {
      console.log('🚀 ===== PROBANDO BACKEND DE PRODUCCIÓN =====');
      console.log('🌐 URL: https://apisoporteti.cortedelsanta.com/api/v1/auth/login');
      console.log('📱 DNI:', dni);
      console.log('🔒 Password:', '***'.repeat(password.length));
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('===============================================');

      const result = await login({
        dni: dni.trim(),
        password: password.trim(),
      }).unwrap();

      console.log('✅ ===== LOGIN EXITOSO =====');
      console.log('👤 Usuario:', result.user.nombres, result.user.apellidos_paterno);
      console.log('🎭 Rol:', result.user.rol);
      console.log('🏢 Sede:', result.user.sede?.nombre);
      console.log('📧 Email:', result.user.correo);
      console.log('📱 Teléfono:', result.user.telefono);
      console.log('🔑 Token recibido:', result.access_token ? 'Sí' : 'No');
      console.log('🔄 Refresh token:', result.refresh_token ? 'Sí' : 'No');
      console.log('============================');

      Alert.alert(
        '✅ ¡Login Exitoso!',
        `Usuario: ${result.user.nombres} ${result.user.apellidos_paterno}\nRol: ${result.user.rol}\nSede: ${result.user.sede?.nombre}`,
        [{ text: 'Continuar' }]
      );

    } catch (error: any) {
      console.log('❌ ===== ERROR EN PRODUCCIÓN =====');
      console.log('🚨 Tipo:', error.name || 'Unknown');
      console.log('📊 Status:', error.status || 'N/A');
      console.log('💬 Mensaje:', error.message || 'Sin mensaje');
      console.log('📦 Datos:', error.data);
      console.log('🌐 URL:', 'https://apisoporteti.cortedelsanta.com/api/v1/auth/login');
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('=================================');

      let errorMessage = 'Error desconocido';
      
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor de producción';
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert(
        '❌ Error de Login',
        `${errorMessage}\n\nRevisa la consola para más detalles`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌐 Prueba Backend Producción</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Información del Backend:</Text>
        <Text style={styles.infoText}>
          • URL: https://apisoporteti.cortedelsanta.com/api/v1{'\n'}
          • Endpoint: /auth/login{'\n'}
          • Método: POST{'\n'}
          • Protocolo: HTTPS{'\n'}
          • Estado: Producción
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Credenciales de Prueba:</Text>
        
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
            {isLoading ? '🔄 Probando...' : '🚀 Probar Login Producción'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Credenciales Válidas:</Text>
        <Text style={styles.infoText}>
          • DNI: 99887766{'\n'}
          • Password: 123456{'\n'}
          • Usuario: Juan Carlos Ramírez Soto{'\n'}
          • Rol: usuario{'\n'}
          • Sede: ARCHIVO CENTRAL SAENZ PEÑA
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Instrucciones:</Text>
        <Text style={styles.infoText}>
          1. Usa las credenciales de prueba mostradas{'\n'}
          2. Revisa la consola para logs detallados{'\n'}
          3. Si funciona, tu app está conectada correctamente{'\n'}
          4. Si hay error, verifica la conexión a internet
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
    marginBottom: 10,
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
