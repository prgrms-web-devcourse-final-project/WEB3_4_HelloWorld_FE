'use client';

import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userType: 'member' | 'trainer' | null;
  isOwner: boolean | null; // trainer일 때만 의미 있음
  setAuth: (data: Partial<AuthState>) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userType: null,
  isOwner: null,

  setAuth: (data) => {
    set(data);

    if (typeof window !== 'undefined') {
      const { userType, isLoggedIn, isOwner } = data;

      const authData = {
        isLoggedIn: !!isLoggedIn,
        userType: userType || null,
        isOwner: userType === 'trainer' ? !!isOwner : null, // trainer일 때만 저장
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
}));
