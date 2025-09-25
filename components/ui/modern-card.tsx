import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ModernCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  gradient?: boolean;
  gradientColors?: string[];
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function ModernCard({
  title,
  subtitle,
  description,
  icon,
  iconColor = '#3b82f6',
  gradient = false,
  gradientColors = ['#3b82f6', '#8b5cf6'],
  onPress,
  children,
  className = '',
}: ModernCardProps) {
  const CardContent = () => (
    <View className={`p-6 ${className}`}>
      {(icon || title) && (
        <View className="flex-row items-center mb-4">
          {icon && (
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl items-center justify-center mr-4">
              <Ionicons name={icon} size={24} color={iconColor} />
            </View>
          )}
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">{title}</Text>
            {subtitle && (
              <Text className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</Text>
            )}
          </View>
        </View>
      )}
      
      {description && (
        <Text className="text-gray-700 dark:text-gray-300 leading-6 mb-4">{description}</Text>
      )}
      
      {children}
    </View>
  );

  if (gradient) {
    return (
      <View className="rounded-2xl overflow-hidden shadow-lg">
        <LinearGradient colors={gradientColors} className="rounded-2xl">
          <CardContent />
        </LinearGradient>
      </View>
    );
  }

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      onPress={onPress}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${onPress ? 'active:scale-95' : ''}`}
    >
      <CardContent />
    </CardComponent>
  );
}
