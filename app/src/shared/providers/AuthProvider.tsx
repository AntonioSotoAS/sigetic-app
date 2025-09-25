import React from 'react';
import { ReduxProvider } from './ReduxProvider';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
};
