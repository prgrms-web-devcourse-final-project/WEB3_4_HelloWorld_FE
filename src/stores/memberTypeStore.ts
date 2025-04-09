'use client';

import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userType: 'member' | 'trainer' | null;
  isOwner: boolean | null;
  isInitialized: boolean;
  setAuth: (data: Partial<AuthState>) => void;
  resetAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userType: null,
  isOwner: null,
  isInitialized: false,

  setAuth: (data) => {
    set(data);

    if (typeof window !== 'undefined') {
      const { userType, isLoggedIn, isOwner } = data;

      const authData = {
        isLoggedIn: !!isLoggedIn,
        userType: userType || null,
        isOwner: userType === 'trainer' ? !!isOwner : null,
      };

      localStorage.setItem('auth', JSON.stringify(authData));
    }
  },

  resetAuth: () => {
    set({ isLoggedIn: false, userType: null, isOwner: null });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  },

  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth');

      if (saved) {
        const parsed = JSON.parse(saved);

        set({
          isLoggedIn: parsed.isLoggedIn,
          userType: parsed.userType,
          isOwner: parsed.isOwner,
          isInitialized: true, //  복구
        });
      } else {
        set({ isInitialized: true }); //
      }
    }
  },
}));
