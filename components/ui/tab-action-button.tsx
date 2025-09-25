import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabActionButtonProps {
  onPress: () => void;
  icon?: string;
  label?: string;
  color?: string;
}

export const TabActionButton: React.FC<TabActionButtonProps> = ({
  onPress,
  icon = 'add',
  label = 'Crear',
  color = '#9D0C11',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons name={icon as any} size={24} color={color} />
        {label && (
          <Text style={styles.label}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#9D0C11',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
