import { RoundedButtonInline } from '@/components/ui/rounded-button-inline';
import { RoundedInputInline } from '@/components/ui/rounded-input-inline';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/shared/hooks/useAuth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, isLoading } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el email. Inténtalo de nuevo.');
    }
  };

  if (emailSent) {
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
                <Ionicons name="checkmark-circle" size={32} color="white" />
              </View>
              
              <Text className="text-2xl font-bold text-gray-800 mb-2">¡Email Enviado!</Text>
              <Text className="text-gray-600 text-center px-8">
                Revisa tu bandeja de entrada
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
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    width: 64, 
                    height: 64, 
                    backgroundColor: '#f0f9ff', 
                    borderRadius: 32, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: 16
                  }}>
                    <Ionicons name="mail" size={32} color="#9D0C11" />
                  </View>
                  
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: '600', 
                    color: '#111827', 
                    textAlign: 'center',
                    marginBottom: 8
                  }}>
                    Instrucciones enviadas
                  </Text>
                  
                  <Text style={{ 
                    color: '#6b7280', 
                    textAlign: 'center', 
                    lineHeight: 24,
                    marginBottom: 8
                  }}>
                    Hemos enviado un enlace de recuperación a{' '}
                    <Text style={{ fontWeight: '500', color: '#111827' }}>{email}</Text>
                  </Text>
                  
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#9ca3af', 
                    textAlign: 'center',
                    marginBottom: 24
                  }}>
                    Revisa tu bandeja de entrada y spam. El enlace expira en 1 hora.
                  </Text>

                  <RoundedButtonInline
                    title="Reenviar email"
                    onPress={() => {
                      setEmailSent(false);
                      setEmail('');
                    }}
                    variant="outline"
                    icon="refresh"
                  />
                  
                  <View style={{ alignItems: 'center', marginTop: 16 }}>
                    <Link href="/(auth)/login" asChild>
                      <TouchableOpacity>
                        <Text style={{ color: '#9D0C11', fontWeight: '500', fontSize: 14 }}>
                          ← Volver al login
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

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
              <Ionicons name="key" size={32} color="white" />
            </View>
            
            <Text className="text-2xl font-bold text-gray-800 mb-2">Recuperar Contraseña</Text>
            <Text className="text-gray-600 text-center px-8">
              Te enviaremos un enlace para restablecer tu contraseña
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
              {/* Campo Email */}
              <RoundedInputInline
                label="Correo electrónico"
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Información adicional */}
              <View style={{ 
                backgroundColor: '#f0f9ff', 
                borderRadius: 16, 
                padding: 16, 
                marginBottom: 24 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Ionicons name="information-circle" size={20} color="#9D0C11" style={{ marginRight: 12, marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      color: '#9D0C11', 
                      fontWeight: '500', 
                      marginBottom: 4,
                      fontSize: 14
                    }}>
                      ¿Qué sucede después?
                    </Text>
                    <Text style={{ 
                      color: '#6b7280', 
                      fontSize: 13, 
                      lineHeight: 20 
                    }}>
                      Te enviaremos un enlace seguro a tu correo electrónico para que puedas crear una nueva contraseña.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Botón de Envío */}
              <RoundedButtonInline
                title={isLoading ? "Enviando..." : "Enviar enlace"}
                onPress={handleResetPassword}
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
                icon="send"
              />

              {/* Botón de Volver */}
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text style={{ color: '#9D0C11', fontWeight: '500', fontSize: 14 }}>
                      ← Volver al login
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
