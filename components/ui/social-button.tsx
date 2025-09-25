import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SocialButtonProps {
  provider: 'google' | 'facebook' | 'twitter';
  onPress: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress }) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: 'logo-google',
          color: '#4285F4',
          text: 'Google',
        };
      case 'facebook':
        return {
          icon: 'logo-facebook',
          color: '#1877F2',
          text: 'Facebook',
        };
      case 'twitter':
        return {
          icon: 'logo-twitter',
          color: '#1DA1F2',
          text: 'Twitter',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 4,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Ionicons name={config.icon as any} size={24} color={config.color} />
        <Text style={{ 
          color: '#374151', 
          fontWeight: '500', 
          fontSize: 12, 
          marginTop: 4 
        }}>
          {config.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
