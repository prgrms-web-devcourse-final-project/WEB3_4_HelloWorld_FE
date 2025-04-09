'use client';

import { create } from 'zustand';
import { setCookie, deleteCookie } from 'cookies-next';
interface AuthState {
  isLoggedIn: boolean;
  userType: 'member' | 'trainer' | null;
  isOwner: boolean | null;
  isInitialized: boolean;
  user: any | null;
  setUser: (user: any) => void;
  setAuth: (data: Partial<AuthState>) => void;
  resetAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userType: null,
  isOwner: null,
  isInitialized: false,
  user: null,
  setAuth: (data) => {
    set(data);

    if (typeof window !== 'undefined') {
      const { userType, isLoggedIn, isOwner } = data;

      const authData = {
        isLoggedIn: !!isLoggedIn,
        userType: userType || null,
        isOwner: userType === 'trainer' ? !!isOwner : null,
      };

      setCookie('auth', userType);
      localStorage.setItem('auth', JSON.stringify(authData));
    }
  },
  setUser: (user: any) =>
    set({
      user,
    }),
  resetAuth: () => {
    set({ isLoggedIn: false, userType: null, isOwner: null });

    if (typeof window !== 'undefined') {
      deleteCookie('auth');
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
