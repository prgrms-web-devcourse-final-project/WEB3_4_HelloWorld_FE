'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/memberTypeStore';

const AuthInitializer = () => {
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);

  return null;
};

export default AuthInitializer;
