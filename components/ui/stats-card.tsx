import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  gradient?: boolean;
  gradientColors?: string[];
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconColor = '#3b82f6',
  gradient = false,
  gradientColors = ['#3b82f6', '#8b5cf6'],
  trend,
  trendValue,
  className = '',
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const CardContent = () => (
    <View className={`p-6 ${className}`}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">{value}</Text>
          {subtitle && (
            <Text className="text-sm text-gray-500 dark:text-gray-500 mt-1">{subtitle}</Text>
          )}
        </View>
        {icon && (
          <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl items-center justify-center">
            <Ionicons name={icon} size={24} color={iconColor} />
          </View>
        )}
      </View>
      
      {trend && trendValue && (
        <View className="flex-row items-center">
          <Ionicons 
            name={getTrendIcon()} 
            size={16} 
            color={trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280'} 
          />
          <Text className={`text-sm font-medium ml-1 ${getTrendColor()}`}>
            {trendValue}
          </Text>
        </View>
      )}
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

  return (
    <View className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${className}`}>
      <CardContent />
    </View>
  );
}
