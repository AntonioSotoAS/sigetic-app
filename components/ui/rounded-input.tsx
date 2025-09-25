import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RoundedInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

export const RoundedInput: React.FC<RoundedInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  showPasswordToggle = false,
  onTogglePassword,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2 text-sm">{label}</Text>
      <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
        <TextInput
          className="flex-1 text-gray-900"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} className="ml-2">
            <Ionicons 
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#6b7280" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
