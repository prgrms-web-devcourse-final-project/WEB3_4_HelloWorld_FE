'use client';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  profileImage: string | null;
  loginId: number | null;
  userType: 'trainer' | 'member';
  setAuth: (data: Partial<Omit<AuthState, 'setAuth' | 'handleLogin'>>) => void;
  handleLogin: (role: 'member' | 'trainer') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  nickname: null,
  profileImage: null,
  loginId: null,
  userType: 'member',
  setAuth: (data) => set(() => ({ ...data })),
  handleLogin: (role) => {
    const currentUrl = window.location.href;

    localStorage.setItem('lastVisitedPage', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE_URL) {
      return;
    }

    const loginUrl = `${API_BASE_URL}/oauth2/authorization/kakao?state=${role}`;

    window.location.href = loginUrl;
  },
}));
