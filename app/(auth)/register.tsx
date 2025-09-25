import { RoundedButtonInline } from '@/components/ui/rounded-button-inline';
import { RoundedInputInline } from '@/components/ui/rounded-input-inline';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/shared/hooks/useAuth';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await register({ name, email, password });
      
      Alert.alert(
        'Registro exitoso', 
        'Tu cuenta ha sido creada correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    } catch {
      Alert.alert('Error', 'No se pudo crear la cuenta. Inténtalo de nuevo.');
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
            {/* Botón Volver */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 16 }}>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={{
                  backgroundColor: 'rgba(157, 12, 17, 0.1)',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Ionicons name="arrow-back" size={20} color="#9D0C11" />
                  <Text style={{ color: '#9D0C11', marginLeft: 8, fontWeight: '500' }}>
                    Volver
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
            
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
              <Ionicons name="person-add" size={32} color="white" />
            </View>
            
            <Text className="text-2xl font-bold text-gray-800 mb-2">Crear Cuenta</Text>
            <Text className="text-gray-600 text-center px-8">
              Únete a SIGETIC y comienza tu experiencia
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
                label="Nombre completo"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
              />

              <RoundedInputInline
                label="Correo electrónico"
                placeholder="tu@email.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <RoundedInputInline
                label="Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                showPasswordToggle={true}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <RoundedInputInline
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                showPasswordToggle={true}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              {/* Términos y condiciones */}
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 16 }}>
                <View style={{ 
                  width: 20, 
                  height: 20, 
                  borderWidth: 2, 
                  borderColor: '#d1d5db', 
                  borderRadius: 4, 
                  marginRight: 12, 
                  marginTop: 2 
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: '#6b7280' }}>
                  Al crear una cuenta, aceptas nuestros{' '}
                  <Text style={{ color: '#9D0C11', fontWeight: '500' }}>
                    Términos de Servicio
                  </Text>{' '}
                  y{' '}
                  <Text style={{ color: '#9D0C11', fontWeight: '500' }}>
                    Política de Privacidad
                  </Text>
                </Text>
              </View>

              {/* Botón de Registro */}
              <RoundedButtonInline
                title={isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                onPress={handleRegister}
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
              />

              {/* Enlace de login */}
              <View style={{ alignItems: 'center', marginTop: 24 }}>
                <Text style={{ color: '#6b7280', fontSize: 14 }}>
                  ¿Ya tienes una cuenta?{' '}
                  <Link href="/(auth)/login" asChild>
                    <TouchableOpacity>
                      <Text style={{ color: '#9D0C11', fontWeight: '500' }}>Iniciar Sesión</Text>
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
