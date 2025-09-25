import { RoundedButtonInline } from '@/components/ui/rounded-button-inline';
import { RoundedInputInline } from '@/components/ui/rounded-input-inline';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLoginMutation } from '../src/api/endpoints/authApi';

export default function LoginScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Validar que el DNI tenga exactamente 8 dígitos
    if (dni.length !== 8) {
      Alert.alert('Error', 'El DNI debe tener exactamente 8 dígitos');
      return;
    }
    
    try {
      console.log('🔐 ===== INICIANDO LOGIN =====');
      console.log('📱 DNI:', dni.trim());
      console.log('🔒 Password:', '***'.repeat(password.length));
      console.log('🌐 URL destino: https://apisoporteti.cortedelsanta.com/api/v1/auth/login');
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('===============================');
      
      const result = await login({
        dni: dni.trim(),
        password: password.trim(),
      }).unwrap();

      console.log('✅ ===== LOGIN EXITOSO =====');
      console.log('👤 Usuario:', result.user.nombres, result.user.apellidos_paterno);
      console.log('🎭 Rol:', result.user.rol);
      console.log('🏢 Sede:', result.user.sede?.nombre || 'No asignada');
      console.log('🔑 Token recibido:', result.access_token ? 'Sí' : 'No');
      console.log('============================');

      // Mostrar mensaje de éxito
      Alert.alert(
        '¡Bienvenido!',
        `Hola ${result.user.nombres} ${result.user.apellidos_paterno}`,
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
      
    } catch (error: any) {
      console.log('❌ ===== ERROR EN LOGIN =====');
      console.log('🚨 Tipo de error:', error.name || 'Unknown');
      console.log('📊 Status code:', error.status || 'N/A');
      console.log('💬 Mensaje:', error.message || 'Sin mensaje');
      console.log('📦 Datos del error:', error.data);
      console.log('🌐 URL que falló:', 'https://apisoporteti.cortedelsanta.com/api/v1/auth/login');
      console.log('⏰ Timestamp del error:', new Date().toISOString());
      console.log('=============================');
      
      // Mostrar mensaje de error específico
      const errorMessage = error.data?.message || error.message || 'Error de conexión';
      
      if (errorMessage.includes('credenciales') || errorMessage.includes('incorrectas') || errorMessage.includes('inválidas')) {
        Alert.alert('Error', 'DNI o contraseña incorrectos');
      } else if (errorMessage.includes('usuario') && errorMessage.includes('encontrado')) {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if (errorMessage.includes('activo') || errorMessage.includes('inactivo')) {
        Alert.alert('Error', 'Tu cuenta está inactiva. Contacta al administrador');
      } else if (error.status === 0 || error.message?.includes('Network')) {
        Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en localhost:5000');
      } else {
        Alert.alert('Error', errorMessage);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={['#E6F3FF', '#FFFFFF']}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* Header */}
          <View className="items-center pt-8 pb-8">
            {/* Logo */}
            <View style={{ 
              width: 64, 
              height: 64, 
              backgroundColor: '#9D0C11', 
              borderRadius: 16, 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 24 
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>S</Text>
            </View>
            
            <Text className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</Text>
            <Text className="text-gray-600 text-center px-8">
              Bienvenido de vuelta a SIGETIC
            </Text>
          </View>

          {/* Formulario */}
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ 
              backgroundColor: 'white', 
              borderRadius: 24, 
              padding: 24, 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              {/* Campos de entrada */}
              <RoundedInputInline
                label="DNI"
                placeholder="12345678"
                value={dni}
                onChangeText={setDni}
                keyboardType="numeric"
                maxLength={8}
              />

              <RoundedInputInline
                label="Contraseña"
                placeholder="Tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPasswordToggle={true}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              {/* Enlace de recuperar contraseña */}
              <View className="items-end mb-6">
                <Link href="/(auth)/forgot-password" asChild>
                  <TouchableOpacity>
                    <Text style={{ color: '#9D0C11', fontWeight: '500', fontSize: 14 }}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Botón de Login */}
              <RoundedButtonInline
                title="Iniciar sesión"
                onPress={handleLogin}
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
              />

              {/* Enlace de registro */}
              <View style={{ alignItems: 'center', marginTop: 24 }}>
                <Text style={{ color: '#6b7280', fontSize: 14 }}>
                  ¿No tienes una cuenta?{' '}
                  <Link href="/(auth)/register" asChild>
                    <TouchableOpacity>
                      <Text style={{ color: '#9D0C11', fontWeight: '500' }}>Regístrate</Text>
                    </TouchableOpacity>
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
