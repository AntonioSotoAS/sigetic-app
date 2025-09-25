import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/shared/hooks/useAuth';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error durante logout:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#9D0C11', '#B91C1C']}
        className="px-6 pt-16 pb-8"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-2">
              ¡Hola, {user?.name || 'Usuario'}!
            </Text>
            <Text className="text-gray-200 text-base">Sistema de Tickets SIGETIC</Text>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
            <Ionicons name="ticket" size={32} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* Cards principales */}
      <View className="px-6 -mt-4 pb-6">
        {/* Card 1: Crear Ticket */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center mr-4">
              <Ionicons name="ticket" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">Crear Ticket</Text>
              <Text className="text-gray-600 text-sm">Crear un nuevo ticket de soporte</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => alert('Función de crear ticket próximamente')}
          >
            <Text className="text-white font-semibold mr-2">Acceder</Text>
            <Ionicons name="ticket" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Card 2: Mis Tickets */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-12 h-12 bg-orange-500 rounded-xl items-center justify-center mr-4">
              <Ionicons name="ticket" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">Mis Tickets</Text>
              <Text className="text-gray-600 text-sm">Ver tickets que he creado</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => alert('Función de mis tickets próximamente')}
          >
            <Text className="text-white font-semibold mr-2">Acceder</Text>
            <Ionicons name="ticket" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Card 3: Tickets sin Asignar */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-12 h-12 bg-red-500 rounded-xl items-center justify-center mr-4">
              <Ionicons name="people" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">Tickets sin Asignar</Text>
              <Text className="text-gray-600 text-sm">Tickets pendientes de asignación</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => alert('Función de tickets sin asignar próximamente')}
          >
            <Text className="text-white font-semibold mr-2">Acceder</Text>
            <Ionicons name="people" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Card 4: Mis Tickets Asignados */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-12 h-12 bg-purple-500 rounded-xl items-center justify-center mr-4">
              <Ionicons name="person" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">Mis Tickets Asignados</Text>
              <Text className="text-gray-600 text-sm">Tickets asignados a mí</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => alert('Función de tickets asignados próximamente')}
          >
            <Text className="text-white font-semibold mr-2">Acceder</Text>
            <Ionicons name="person" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Card 5: Configuración */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-12 h-12 bg-gray-500 rounded-xl items-center justify-center mr-4">
              <Ionicons name="settings" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">Configuración</Text>
              <Text className="text-gray-600 text-sm">Ajustes y preferencias del sistema</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => alert('Función de configuración próximamente')}
          >
            <Text className="text-white font-semibold mr-2">Acceder</Text>
            <Ionicons name="settings" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Botón de Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-gray-500 rounded-xl p-4 items-center"
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

