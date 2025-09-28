import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeTabBarProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderTopColor?: string;
  shadowColor?: string;
}

export const SafeTabBar: React.FC<SafeTabBarProps> = ({
  children,
  backgroundColor = 'white',
  borderTopColor = '#e5e7eb',
  shadowColor = '#000',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor,
        borderTopColor,
        shadowColor,
        // Altura dinámica basada en el dispositivo
        height: Platform.OS === 'ios' 
          ? 80 + insets.bottom 
          : 80 + (insets.bottom > 0 ? insets.bottom : 20),
        // Padding inferior para evitar controles del sistema
        paddingBottom: Platform.OS === 'ios' 
          ? insets.bottom + 10 
          : Math.max(insets.bottom, 20),
      }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    // Sombra sutil para separar del contenido
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
