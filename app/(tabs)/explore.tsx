import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard } from '@/components/ui/modern-card';
import { StatsCard } from '@/components/ui/stats-card';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        className="px-6 pt-16 pb-8"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-white mb-2">Explorar</Text>
            <Text className="text-gray-200 text-base">Descubre nuevas funcionalidades</Text>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
            <Ionicons name="compass-outline" size={32} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* Cards modernas */}
      <View className="px-6 -mt-4">
        {/* Card principal */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl items-center justify-center mr-4">
              <Ionicons name="code-slash" size={24} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">Desarrollo</Text>
              <Text className="text-gray-600 dark:text-gray-400">Herramientas y recursos</Text>
            </View>
          </View>
          <Text className="text-gray-700 dark:text-gray-300 leading-6">
            Esta aplicación incluye código de ejemplo para ayudarte a comenzar con el desarrollo.
          </Text>
        </View>

        {/* Grid de características */}
        <View className="flex-row flex-wrap -mx-2 mb-6">
          <View className="w-1/2 px-2 mb-4">
            <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg items-center justify-center mb-3">
                <Ionicons name="folder-outline" size={20} color="#10b981" />
              </View>
              <Text className="font-semibold text-gray-900 dark:text-white mb-1">Rutas</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400">Navegación basada en archivos</Text>
            </TouchableOpacity>
          </View>

          <View className="w-1/2 px-2 mb-4">
            <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <View className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg items-center justify-center mb-3">
                <Ionicons name="phone-portrait-outline" size={20} color="#8b5cf6" />
              </View>
              <Text className="font-semibold text-gray-900 dark:text-white mb-1">Multiplataforma</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400">Android, iOS y Web</Text>
            </TouchableOpacity>
          </View>

          <View className="w-1/2 px-2 mb-4">
            <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <View className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg items-center justify-center mb-3">
                <Ionicons name="image-outline" size={20} color="#f59e0b" />
              </View>
              <Text className="font-semibold text-gray-900 dark:text-white mb-1">Imágenes</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400">Optimización automática</Text>
            </TouchableOpacity>
          </View>

          <View className="w-1/2 px-2 mb-4">
            <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <View className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg items-center justify-center mb-3">
                <Ionicons name="moon-outline" size={20} color="#ec4899" />
              </View>
              <Text className="font-semibold text-gray-900 dark:text-white mb-1">Temas</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400">Modo claro y oscuro</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección de animaciones */}
        <View className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center mr-4">
              <Ionicons name="play-circle-outline" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-white">Animaciones</Text>
              <Text className="text-indigo-100">Componentes interactivos</Text>
            </View>
          </View>
          <Text className="text-white/90 leading-6 mb-4">
            Este template incluye ejemplos de componentes animados usando{' '}
            <Text className="font-mono bg-white/20 px-2 py-1 rounded">react-native-reanimated</Text>
          </Text>
          {Platform.select({
            ios: (
              <Text className="text-white/80 text-sm">
                El componente ParallaxScrollView proporciona un efecto parallax para la imagen del header.
              </Text>
            ),
          })}
        </View>

        {/* Footer con información adicional */}
        <ModernCard
          title="Información"
          subtitle="Acerca de esta aplicación"
          description="Esta aplicación demuestra el uso de Tailwind CSS con NativeWind para crear interfaces modernas y responsivas."
          icon="information-circle-outline"
          iconColor="#6b7280"
        />

        {/* Estadísticas */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Estadísticas de la aplicación</Text>
          <View className="flex-row flex-wrap -mx-2">
            <View className="w-1/2 px-2 mb-4">
              <StatsCard
                title="Usuarios activos"
                value="1,234"
                subtitle="Este mes"
                icon="people"
                iconColor="#10b981"
                trend="up"
                trendValue="+12%"
              />
            </View>
            <View className="w-1/2 px-2 mb-4">
              <StatsCard
                title="Descargas"
                value="5,678"
                subtitle="Total"
                icon="download"
                iconColor="#3b82f6"
                trend="up"
                trendValue="+8%"
              />
            </View>
            <View className="w-1/2 px-2 mb-4">
              <StatsCard
                title="Calificación"
                value="4.8"
                subtitle="de 5 estrellas"
                icon="star"
                iconColor="#f59e0b"
                trend="up"
                trendValue="+0.2"
              />
            </View>
            <View className="w-1/2 px-2 mb-4">
              <StatsCard
                title="Tiempo de uso"
                value="2.5h"
                subtitle="Promedio diario"
                icon="time"
                iconColor="#8b5cf6"
                trend="neutral"
                trendValue="0%"
              />
            </View>
          </View>
        </View>

        {/* Botones de demostración */}
        <View className="space-y-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Botones de demostración</Text>
          
          <View className="space-y-3">
            <ModernButton
              title="Botón Primario"
              onPress={() => alert('Botón primario presionado')}
              variant="primary"
              icon="checkmark-circle"
            />
            
            <ModernButton
              title="Botón con Gradiente"
              onPress={() => alert('Botón con gradiente presionado')}
              variant="gradient"
              icon="star"
            />
            
            <ModernButton
              title="Botón Secundario"
              onPress={() => alert('Botón secundario presionado')}
              variant="secondary"
              icon="settings"
            />
            
            <ModernButton
              title="Botón Outline"
              onPress={() => alert('Botón outline presionado')}
              variant="outline"
              icon="arrow-forward"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

