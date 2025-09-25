import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RoundedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'social';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const RoundedButtonInline: React.FC<RoundedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#9D0C11',
          borderRadius: 25,
          paddingVertical: 16,
          paddingHorizontal: 24,
        };
      case 'outline':
        return {
          borderWidth: 2,
          borderColor: '#d1d5db',
          borderRadius: 25,
          paddingVertical: 16,
          paddingHorizontal: 24,
          backgroundColor: 'white',
        };
      case 'social':
        return {
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 24,
          backgroundColor: 'white',
        };
      default:
        return {
          backgroundColor: '#9D0C11',
          borderRadius: 25,
          paddingVertical: 16,
          paddingHorizontal: 24,
        };
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          color: 'white',
          fontWeight: '600' as const,
          textAlign: 'center' as const,
        };
      case 'outline':
        return {
          color: '#374151',
          fontWeight: '600' as const,
          textAlign: 'center' as const,
        };
      case 'social':
        return {
          color: '#374151',
          fontWeight: '500' as const,
          textAlign: 'center' as const,
        };
      default:
        return {
          color: 'white',
          fontWeight: '600' as const,
          textAlign: 'center' as const,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getButtonStyles(),
        disabled && { opacity: 0.5 }
      ]}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : '#6b7280'} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon as any} 
                size={20} 
                color={variant === 'primary' ? 'white' : '#6b7280'} 
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={getTextStyles()}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
