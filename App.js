import React, {useState, useEffect, useCallback} from 'react';

import 'expo-dev-client';
import AppNavigation from './navigation/appNavigation';
import AuthProvider from './AuthProvider';
export default function App() {
  
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
