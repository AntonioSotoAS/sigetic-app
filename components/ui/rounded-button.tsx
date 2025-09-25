import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface RoundedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'social';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
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
        return 'bg-blue-600 rounded-full py-4 px-6';
      case 'outline':
        return 'border-2 border-gray-300 rounded-full py-4 px-6 bg-white';
      case 'social':
        return 'border border-gray-300 rounded-2xl py-4 px-6 bg-white';
      default:
        return 'bg-blue-600 rounded-full py-4 px-6';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white font-semibold text-center';
      case 'outline':
        return 'text-gray-700 font-semibold text-center';
      case 'social':
        return 'text-gray-700 font-medium text-center';
      default:
        return 'text-white font-semibold text-center';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${getButtonStyles()} ${className} ${disabled ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : '#6b7280'} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon as any} 
                size={20} 
                color={variant === 'primary' ? 'white' : '#6b7280'} 
                className="mr-2"
              />
            )}
            <Text className={getTextStyles()}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
