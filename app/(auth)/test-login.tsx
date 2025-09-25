import React from 'react';
import { ScrollView, View } from 'react-native';
import { LoginTest } from '../src/api/examples/loginTest';

// Pantalla temporal para probar el login
export default function TestLoginScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <LoginTest />
      </View>
    </ScrollView>
  );
}
