import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeTabBar } from '@/components/ui/safe-tab-bar';
import { TabActionButton } from '@/components/ui/tab-action-button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
      
      {/* Barra de tabs personalizada con espaciado seguro */}
      <SafeTabBar>
        {/* Tab Home */}
        <View style={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingVertical: 8,
          // Espaciado adicional para evitar toques accidentales
          paddingHorizontal: 10,
        }}>
          <IconSymbol size={24} name="house.fill" color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={{ 
            fontSize: 12, 
            color: Colors[colorScheme ?? 'light'].tint, 
            marginTop: 4,
            fontWeight: '500',
          }}>Home</Text>
        </View>
        
        {/* Botón de crear ticket en el centro */}
        <TabActionButton
          onPress={() => {
            alert('Función de crear ticket próximamente');
          }}
          icon="add"
          label="Crear Ticket"
        />
        
        {/* Tab Explore */}
        <View style={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingVertical: 8,
          // Espaciado adicional para evitar toques accidentales
          paddingHorizontal: 10,
        }}>
          <IconSymbol size={24} name="paperplane.fill" color="#6b7280" />
          <Text style={{ 
            fontSize: 12, 
            color: '#6b7280', 
            marginTop: 4,
            fontWeight: '500',
          }}>Explore</Text>
        </View>
      </SafeTabBar>
    </View>
  );
}
