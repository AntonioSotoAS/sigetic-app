import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  className?: string;
}

export function ModernButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
}: ModernButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const baseClasses = `rounded-xl flex-row items-center justify-center ${sizeClasses[size]} ${className}`;

  if (variant === 'gradient') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} className="rounded-xl overflow-hidden">
        <LinearGradient
          colors={disabled ? ['#9ca3af', '#6b7280'] : ['#3b82f6', '#8b5cf6']}
          className={`${baseClasses} ${disabled ? 'opacity-50' : ''}`}
        >
          {icon && <Ionicons name={icon} size={20} color="white" style={{ marginRight: 8 }} />}
          <Text className={`text-white font-semibold ${textSizeClasses[size]}`}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`${baseClasses} border-2 border-blue-500 bg-transparent ${disabled ? 'opacity-50' : ''}`}
      >
        {icon && <Ionicons name={icon} size={20} color="#3b82f6" style={{ marginRight: 8 }} />}
        <Text className={`text-blue-500 font-semibold ${textSizeClasses[size]}`}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const variantClasses = {
    primary: `bg-blue-500 ${disabled ? 'bg-gray-400' : ''}`,
    secondary: `bg-gray-200 dark:bg-gray-700 ${disabled ? 'bg-gray-300 dark:bg-gray-600' : ''}`,
  };

  const textColorClasses = {
    primary: disabled ? 'text-gray-500' : 'text-white',
    secondary: disabled ? 'text-gray-400' : 'text-gray-900 dark:text-white',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50' : ''}`}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={variant === 'primary' ? 'white' : '#374151'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={`font-semibold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
